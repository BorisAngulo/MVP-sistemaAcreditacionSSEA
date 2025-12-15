import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// @ts-ignore
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
// @ts-ignore
import { getUserData } from './services/firebase';
// @ts-ignore
import Home from './components/Home';
// @ts-ignore
import Login from './components/Login';
// @ts-ignore
import ProtectedRoute from './components/ProtectedRoute';
// @ts-ignore
import AdminInfo from './components/AdminInfo';
// @ts-ignore
import AdminDashboard from './components/AdminDashboard';
// @ts-ignore
import CoordinatorInfo from './components/CoordinatorInfo';
// @ts-ignore
import CoordinatorDashboard from './components/CoordinatorDashboard';

interface UserData {
  uid: string;
  email: string;
  role: 'admin' | 'coordinator';
  fullName: string;
}

function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getUserData(firebaseUser.uid);
          setUser(userData);
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Página principal pública */}
        <Route 
          path="/" 
          element={<Home />} 
        />

        {/* Páginas de información */}
        <Route 
          path="/admin-info" 
          element={<AdminInfo user={user} />} 
        />
        
        <Route 
          path="/coordinator-info" 
          element={<CoordinatorInfo user={user} />} 
        />

        {/* Login */}
        <Route 
          path="/login" 
          element={user ? <Navigate to={user.role === 'admin' ? '/admin-info' : '/coordinator-info'} replace /> : <Login setUser={setUser} />} 
        />
        
        {/* Dashboards protegidos */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute user={user} allowedRoles={['admin']}>
              <AdminDashboard user={user} />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/coordinator" 
          element={
            <ProtectedRoute user={user} allowedRoles={['coordinator']}>
              <CoordinatorDashboard user={user} />
            </ProtectedRoute>
          } 
        />

        {/* Error de autorización */}
        <Route 
          path="/unauthorized" 
          element={
            <div className="min-h-screen bg-white flex items-center justify-center">
              <div className="text-center bg-red-50 p-8 rounded-lg border-2 border-red-600 shadow-lg">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso No Autorizado</h1>
                <p className="text-gray-700 font-medium">No tienes permisos para acceder a esta página.</p>
              </div>
            </div>
          } 
        />
        
        {/* Ruta por defecto */}
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
