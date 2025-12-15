# SSEA - Sistema de Seguimiento del Proceso de Acreditación

MVP de una aplicación web para gestionar el proceso de acreditación con roles de Administrador y Coordinador.

## 🚀 Tecnologías

- **Frontend**: React 19 + Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication + Firestore)

## 📋 Características

### Autenticación
- Sistema de login con email y password
- Rutas protegidas basadas en roles

### Dashboard de Administrador
- ✅ Ver todas las fases de acreditación
- ✅ Crear nuevas fases
- ✅ Aprobar/Rechazar/Marcar como pendiente las fases
- ✅ Ver links de respuesta agregados por coordinadores

### Dashboard de Coordinador
- ✅ Ver todas las fases (solo lectura)
- ✅ Agregar/Actualizar links de respuesta para cada fase
- ✅ Ver estado de cada fase

## 🛠️ Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Activa **Authentication** (Email/Password)
4. Activa **Firestore Database**
5. Copia la configuración de tu proyecto

Edita el archivo `src/services/firebase.js` y reemplaza la configuración:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};
```

### 3. Configurar la Base de Datos (Firestore)

#### Colección: `users`

Estructura de documento:
```javascript
{
  email: "admin@example.com",
  role: "admin", // o "coordinator"
  fullName: "Nombre Completo"
}
```

**Importante**: El ID del documento debe ser el mismo que el UID del usuario en Authentication.

#### Colección: `phases`

Estructura de documento (se crea automáticamente al crear fases):
```javascript
{
  title: "Fase 1 - Documentación",
  description: "Descripción de la fase",
  status: "pending", // "pending", "approved", "rejected"
  linkResponse: "https://drive.google.com/...",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

### 4. Crear usuarios de prueba

1. En Firebase Console, ve a **Authentication**
2. Crea usuarios con email/password
3. En Firestore, crea documentos en la colección `users` con los UIDs correspondientes

**Ejemplo de usuarios:**

Usuario Administrador:
- Email: `admin@example.com`
- Password: `admin123`
- En Firestore (`users/{uid}`):
  ```javascript
  {
    email: "admin@example.com",
    role: "admin",
    fullName: "Administrador Principal"
  }
  ```

Usuario Coordinador:
- Email: `coordinator@example.com`
- Password: `coord123`
- En Firestore (`users/{uid}`):
  ```javascript
  {
    email: "coordinator@example.com",
    role: "coordinator",
    fullName: "Coordinador de Área"
  }
  ```

### 5. Ejecutar la aplicación

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
mvp-acreditacion/
├── src/
│   ├── components/
│   │   ├── Login.jsx                    # Formulario de inicio de sesión
│   │   ├── ProtectedRoute.jsx          # Componente para proteger rutas
│   │   ├── AdminDashboard.jsx          # Dashboard del administrador
│   │   ├── CoordinatorDashboard.jsx    # Dashboard del coordinador
│   │   └── PhaseCreationForm.jsx       # Modal para crear fases
│   ├── services/
│   │   └── firebase.js                 # Configuración y funciones de Firebase
│   ├── App.tsx                         # Componente principal con rutas
│   ├── main.tsx                        # Punto de entrada
│   └── index.css                       # Estilos globales con Tailwind
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
```

## 🔐 Reglas de Seguridad de Firestore (Recomendadas)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Función auxiliar para verificar si el usuario está autenticado
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Función para verificar si el usuario es admin
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Función para verificar si el usuario es coordinador
    function isCoordinator() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'coordinator';
    }
    
    // Colección users
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
    
    // Colección phases
    match /phases/{phaseId} {
      // Todos los autenticados pueden leer
      allow read: if isAuthenticated();
      
      // Solo admins pueden crear y actualizar todo
      allow create: if isAdmin();
      allow update: if isAdmin();
      
      // Coordinadores solo pueden actualizar el campo linkResponse
      allow update: if isCoordinator() && 
                       request.resource.data.diff(resource.data).affectedKeys().hasOnly(['linkResponse', 'updatedAt']);
      
      // Solo admins pueden eliminar
      allow delete: if isAdmin();
    }
  }
}
```

## 🎯 Flujo de Uso

1. **Login**: El usuario inicia sesión con su email y contraseña
2. **Redirección automática**: Basado en el rol, se redirige a `/admin` o `/coordinator`
3. **Administrador**:
   - Puede crear nuevas fases
   - Puede cambiar el estado de las fases (Aprobar/Rechazar/Pendiente)
   - Puede ver los links agregados por coordinadores
4. **Coordinador**:
   - Ve todas las fases en modo lectura
   - Puede agregar/editar links de respuesta para cada fase

## 🐛 Solución de Problemas

### Error: "Firebase not configured"
- Verifica que hayas reemplazado la configuración en `src/services/firebase.js`

### Error al iniciar sesión
- Verifica que el usuario exista en Firebase Authentication
- Verifica que exista un documento en Firestore con el UID del usuario

### No se cargan las fases
- Verifica que las reglas de seguridad de Firestore permitan la lectura
- Revisa la consola del navegador para ver errores específicos

## 📝 Notas Adicionales

- Los archivos JSX usan JavaScript, no TypeScript
- El archivo principal (`App.tsx`) usa TypeScript como estaba configurado originalmente
- Tailwind CSS está completamente configurado y listo para usar
- Firebase está configurado pero requiere tus credenciales

## 🚀 Próximos Pasos (Sugerencias para expandir)

- [ ] Agregar paginación a la lista de fases
- [ ] Implementar búsqueda y filtros
- [ ] Agregar notificaciones en tiempo real
- [ ] Implementar carga de archivos adjuntos
- [ ] Agregar historial de cambios
- [ ] Implementar panel de estadísticas
- [ ] Agregar export de reportes

[![](https://mermaid.ink/img/pako:eNp9VNFu2jAU_RXLUqVVggraQiBIkyiBwgoUsWkPS_pg4jvwGmxkJ2gl4pP2tE_oj82xA5itnZ_se8-59_ocyzmOBQXs46UkmxX6EkQc6XVxgaZsCwmq-2jEWcyEjXdDe3pC1epHdJePxZLxfSfiNn2nw2guEh916ZpxplJJqJAG3PsQELVaCCLpefay8ze5J4SkjB-pgUN1cpfHvipb2PkHSfZDnJe3iGL1TLF-2JNAJBoQBU-dU7ZvsoOwiKMCQomP-irVNdAMOGXAU0AU0BzUJgOdcNmn3X3ojt_n29dfBI0Zfz7nmm7DcA5bpspp0MsbOKfH0HBGeQAxU-z1N9fIxF5278BGhY7djRQLYuX7ZO800CMlbOfey6LoWRdDn0O8IruS_2D5ZcyhHyNvKzEw7PsypyV8xy5HrxM5MORx-JWpzIwttTi6baFOMY5CXcWWmkSU231saJP8MyQQ64fKD9p245RtiavTxECnYXcpYWnK_0f7qQE_hgakTWV62qMOfY6Mj4UnLunRkGa51gk2cekYOtq3P1PttJ8VDpxMPphkvey8izu6YYBzV7kBAF2QuLxeARPunHOrxL9GWQfHZcJeZ9jBFf1bMIr97yRRUMFrkGtSnHFeACOcrmANEfb1lhL5HOGI7zVpQ_g3IdbYT2WmaVJky9XhkG0oSSFgRD-ME0KPArInMp5i37s1FbCf45_Yr9auasWqezc39WazVa-3bhstr9mo4BfsN64aXq3p1duN9rXXvG57UPX2Fbwz3XmWJBUMlKVCTuznZ_7A_R_jlIh4?type=png)](https://mermaid.live/edit#pako:eNp9VNFu2jAU_RXLUqVVggraQiBIkyiBwgoUsWkPS_pg4jvwGmxkJ2gl4pP2tE_oj82xA5itnZ_se8-59_ocyzmOBQXs46UkmxX6EkQc6XVxgaZsCwmq-2jEWcyEjXdDe3pC1epHdJePxZLxfSfiNn2nw2guEh916ZpxplJJqJAG3PsQELVaCCLpefay8ze5J4SkjB-pgUN1cpfHvipb2PkHSfZDnJe3iGL1TLF-2JNAJBoQBU-dU7ZvsoOwiKMCQomP-irVNdAMOGXAU0AU0BzUJgOdcNmn3X3ojt_n29dfBI0Zfz7nmm7DcA5bpspp0MsbOKfH0HBGeQAxU-z1N9fIxF5278BGhY7djRQLYuX7ZO800CMlbOfey6LoWRdDn0O8IruS_2D5ZcyhHyNvKzEw7PsypyV8xy5HrxM5MORx-JWpzIwttTi6baFOMY5CXcWWmkSU231saJP8MyQQ64fKD9p245RtiavTxECnYXcpYWnK_0f7qQE_hgakTWV62qMOfY6Mj4UnLunRkGa51gk2cekYOtq3P1PttJ8VDpxMPphkvey8izu6YYBzV7kBAF2QuLxeARPunHOrxL9GWQfHZcJeZ9jBFf1bMIr97yRRUMFrkGtSnHFeACOcrmANEfb1lhL5HOGI7zVpQ_g3IdbYT2WmaVJky9XhkG0oSSFgRD-ME0KPArInMp5i37s1FbCf45_Yr9auasWqezc39WazVa-3bhstr9mo4BfsN64aXq3p1duN9rXXvG57UPX2Fbwz3XmWJBUMlKVCTuznZ_7A_R_jlIh4)
---

**Desarrollado con ❤️ para facilitar el proceso de acreditación**
```
