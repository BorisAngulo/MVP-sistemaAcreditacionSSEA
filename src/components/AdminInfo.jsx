import { useNavigate } from 'react-router-dom';

const AdminInfo = ({ user }) => {
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
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
            <svg className="w-16 h-16 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
            Panel de Administrador
          </h1>
          <p className="text-lg text-gray-600">
            Gestión integral del proceso de acreditación
          </p>
        </div>

        {/* Responsabilidades */}
        <div className="bg-blue-50 rounded-lg p-6 sm:p-8 mb-8 border-l-4 border-blue-900">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Responsabilidades</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-blue-900 font-bold">✓</span>
              <span className="text-gray-700">
                Crear y gestionar las fases del proceso de acreditación para todas las carreras
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-900 font-bold">✓</span>
              <span className="text-gray-700">
                Revisar y aprobar la documentación presentada por los coordinadores
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-900 font-bold">✓</span>
              <span className="text-gray-700">
                Cambiar el estado de las fases (Pendiente, Aprobado, Rechazado)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-900 font-bold">✓</span>
              <span className="text-gray-700">
                Supervisar el progreso general del proceso de acreditación
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-900 font-bold">✓</span>
              <span className="text-gray-700">
                Coordinar con los organismos acreditadores y coordinadores de carrera
              </span>
            </li>
          </ul>
        </div>

        {/* Funcionalidades */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Funcionalidades del Sistema</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">📝 Crear Fases</h3>
              <p className="text-sm text-gray-600">
                Define nuevas fases con título y descripción detallada
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">✅ Aprobar/Rechazar</h3>
              <p className="text-sm text-gray-600">
                Revisa y cambia el estado de las fases según el avance
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">🔗 Ver Enlaces</h3>
              <p className="text-sm text-gray-600">
                Accede a los links de respuesta agregados por coordinadores
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">📊 Seguimiento</h3>
              <p className="text-sm text-gray-600">
                Monitorea el estado de todas las fases en tiempo real
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/admin')}
            className="px-8 py-4 bg-blue-900 text-white text-lg font-bold rounded-lg hover:bg-blue-950 shadow-lg transition-colors"
          >
            Ir al Panel de Administración
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminInfo;
