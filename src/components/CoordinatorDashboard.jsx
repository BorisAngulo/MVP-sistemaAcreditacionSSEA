import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPhases, updatePhaseLink, logout } from '../services/firebase';

const CoordinatorDashboard = ({ user }) => {
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPhase, setEditingPhase] = useState(null);
  const [linkInput, setLinkInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadPhases();
  }, []);

  const loadPhases = async () => {
    try {
      setLoading(true);
      const phasesData = await getPhases();
      setPhases(phasesData);
    } catch (err) {
      setError('Error al cargar las fases');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditLink = (phase) => {
    setEditingPhase(phase.id);
    setLinkInput(phase.linkResponse || '');
  };

  const handleSaveLink = async (phaseId) => {
    try {
      await updatePhaseLink(phaseId, linkInput);
      setEditingPhase(null);
      setLinkInput('');
      await loadPhases();
    } catch (err) {
      setError('Error al actualizar el link');
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingPhase(null);
    setLinkInput('');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-50 text-yellow-700 border border-yellow-300',
      approved: 'bg-blue-50 text-blue-700 border border-blue-300',
      rejected: 'bg-red-50 text-red-700 border border-red-600'
    };
    const labels = {
      pending: 'Pendiente',
      approved: 'Aprobado',
      rejected: 'Rechazado'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-blue-900 font-medium text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Panel de Coordinador</h1>
            <p className="text-xs sm:text-sm text-blue-100">Bienvenido, {user?.fullName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-white text-xs sm:text-sm font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-red-600 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Fases de Acreditación</h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-700 font-medium">
            Actualiza los enlaces de respuesta para cada fase
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 sm:p-4 border border-red-600">
            <div className="text-xs sm:text-sm text-red-600 font-medium">{error}</div>
          </div>
        )}

        {/* Phases List */}
        <div className="bg-gray-50 shadow-lg overflow-hidden rounded-lg border border-gray-200">
          {phases.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-gray-600 font-medium text-sm sm:text-base px-4">
              No hay fases disponibles.
            </div>
          ) : (
            <ul className="divide-y divide-gray-300">
              {phases.map((phase) => (
                <li key={phase.id} className="px-3 sm:px-6 py-4 sm:py-5 bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 pr-2">{phase.title}</h3>
                        {getStatusBadge(phase.status)}
                      </div>
                      <p className="mt-1 text-sm text-gray-700 mb-3">{phase.description}</p>
                      
                      {/* Link Response Section */}
                      <div className="mt-3 border-t border-gray-300 pt-3">
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                          Link de Respuesta:
                        </label>
                        {editingPhase === phase.id ? (
                          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                            <input
                              type="url"
                              value={linkInput}
                              onChange={(e) => setLinkInput(e.target.value)}
                              className="flex-1 border-2 border-blue-900 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-800 text-xs sm:text-sm"
                              placeholder="https://drive.google.com/..."
                            />
                            <button
                              onClick={() => handleSaveLink(phase.id)}
                              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-md text-white bg-blue-900 hover:bg-blue-950 transition-colors"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 border border-gray-300 transition-colors"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              {phase.linkResponse ? (
                                <div className="p-2 bg-blue-50 rounded border border-blue-200">
                                  <a
                                    href={phase.linkResponse}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-900 hover:text-blue-950 break-all underline font-medium"
                                  >
                                    {phase.linkResponse}
                                  </a>
                                </div>
                              ) : (
                                <span className="text-xs sm:text-sm text-gray-500 italic">
                                  No se ha agregado un link
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => handleEditLink(phase)}
                              className="mt-2 sm:mt-0 sm:ml-4 w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-md text-white bg-blue-900 hover:bg-blue-950 transition-colors"
                            >
                              {phase.linkResponse ? 'Editar' : 'Agregar'} Link
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
