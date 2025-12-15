import { useNavigate } from 'react-router-dom';

const CoordinatorInfo = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-blue-200 transition-colors"
            >
              ← Volver al Inicio
            </button>
            {user && (
              <span className="text-sm text-blue-100">
                {user.fullName}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
            <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
            Panel de Coordinador
          </h1>
          <p className="text-lg text-gray-600">
            Gestión de evidencias y seguimiento de fases
          </p>
        </div>

        {/* Responsabilidades */}
        <div className="bg-red-50 rounded-lg p-6 sm:p-8 mb-8 border-l-4 border-red-600">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Responsabilidades</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-bold">✓</span>
              <span className="text-gray-700">
                Revisar las fases de acreditación asignadas a su carrera
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-bold">✓</span>
              <span className="text-gray-700">
                Recopilar y organizar las evidencias requeridas para cada fase
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-bold">✓</span>
              <span className="text-gray-700">
                Agregar y actualizar enlaces de respuesta con la documentación
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-bold">✓</span>
              <span className="text-gray-700">
                Mantener comunicación con el administrador del sistema
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-bold">✓</span>
              <span className="text-gray-700">
                Dar seguimiento al estado de aprobación de las fases
              </span>
            </li>
          </ul>
        </div>

        {/* Proceso de Trabajo */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Proceso de Trabajo</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Revisar Fases Asignadas</h3>
                <p className="text-sm text-gray-600">
                  Consulta las fases de acreditación creadas por el administrador y sus requisitos.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Recopilar Evidencias</h3>
                <p className="text-sm text-gray-600">
                  Reúne toda la documentación, archivos y evidencias necesarias para cumplir con cada fase.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Subir Documentación</h3>
                <p className="text-sm text-gray-600">
                  Organiza los archivos en Google Drive u otra plataforma y obtén el link de acceso.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Agregar Link de Respuesta</h3>
                <p className="text-sm text-gray-600">
                  Ingresa el enlace de la documentación en el sistema para que el administrador pueda revisarla.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Seguimiento</h3>
                <p className="text-sm text-gray-600">
                  Monitorea el estado de aprobación y realiza ajustes si la fase es rechazada.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Funcionalidades */}
        <div className="bg-gray-50 rounded-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Funcionalidades del Sistema</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-bold text-gray-900 mb-2">👁️ Visualizar Fases</h3>
              <p className="text-sm text-gray-600">
                Consulta todas las fases con su título, descripción y estado
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-bold text-gray-900 mb-2">🔗 Agregar Enlaces</h3>
              <p className="text-sm text-gray-600">
                Agrega o edita los links de respuesta con la documentación
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-bold text-gray-900 mb-2">📊 Ver Estados</h3>
              <p className="text-sm text-gray-600">
                Identifica qué fases están pendientes, aprobadas o rechazadas
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-bold text-gray-900 mb-2">✏️ Editar Información</h3>
              <p className="text-sm text-gray-600">
                Actualiza los enlaces cuando haya cambios en la documentación
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/coordinator')}
            className="px-8 py-4 bg-red-600 text-white text-lg font-bold rounded-lg hover:bg-red-700 shadow-lg transition-colors"
          >
            Ir al Panel de Coordinador
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorInfo;
