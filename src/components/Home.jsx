import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">SSEA</h1>
              <p className="text-xs text-blue-100">Sistema de Seguimiento de Acreditación</p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-bold rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
            Sistema de Seguimiento del Proceso de Acreditación
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Gestión integral del proceso de acreditación universitaria, facilitando la coordinación
            entre administradores y coordinadores de carrera.
          </p>
        </div>
      </div>

      {/* Información del Proceso */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 text-center mb-8 sm:mb-12">
          ¿Qué es la Acreditación Universitaria?
        </h2>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-900">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Objetivo</h3>
            <p className="text-gray-700">
              La acreditación universitaria es un proceso de evaluación y mejoramiento continuo
              que garantiza la calidad académica y el cumplimiento de estándares educativos
              establecidos por organismos acreditadores.
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
            <h3 className="text-xl font-bold text-red-600 mb-3">Importancia</h3>
            <p className="text-gray-700">
              Permite validar la calidad de los programas académicos, mejora la credibilidad
              institucional y facilita el reconocimiento nacional e internacional de los títulos
              otorgados.
            </p>
          </div>
        </div>

        {/* Fases del Proceso */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-6 text-center">
            Fases del Proceso de Acreditación
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Autoevaluación</h4>
                <p className="text-sm text-gray-600">
                  Análisis interno de fortalezas y debilidades del programa académico.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Documentación</h4>
                <p className="text-sm text-gray-600">
                  Recopilación y organización de evidencias que respalden la calidad del programa.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Evaluación Externa</h4>
                <p className="text-sm text-gray-600">
                  Visita de pares evaluadores para verificar la información presentada.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Certificación</h4>
                <p className="text-sm text-gray-600">
                  Emisión del certificado de acreditación por el organismo competente.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-3">Administrador</h3>
            <p className="text-blue-100 mb-4">
              Gestiona las fases de acreditación, revisa documentación y coordina el proceso
              general entre todas las carreras.
            </p>
            <button
              onClick={() => navigate('/admin-info')}
              className="px-4 py-2 bg-white text-blue-900 font-bold rounded-md hover:bg-blue-50 transition-colors"
            >
              Más información
            </button>
          </div>

          <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-3">Coordinador de Carrera</h3>
            <p className="text-red-100 mb-4">
              Responsable de recopilar evidencias, actualizar información y mantener el
              seguimiento de las fases asignadas a su carrera.
            </p>
            <button
              onClick={() => navigate('/coordinator-info')}
              className="px-4 py-2 bg-white text-red-600 font-bold rounded-md hover:bg-red-50 transition-colors"
            >
              Más información
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 SSEA - Sistema de Seguimiento del Proceso de Acreditación
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
