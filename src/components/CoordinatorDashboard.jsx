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
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    const labels = {
      pending: 'Pendiente',
      approved: 'Aprobado',
      rejected: 'Rechazado'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de Coordinador</h1>
            <p className="text-sm text-gray-600">Bienvenido, {user?.fullName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Fases de Acreditación</h2>
          <p className="mt-1 text-sm text-gray-600">
            Actualiza los enlaces de respuesta para cada fase
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}

        {/* Phases List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {phases.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No hay fases disponibles.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {phases.map((phase) => (
                <li key={phase.id} className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{phase.title}</h3>
                        {getStatusBadge(phase.status)}
                      </div>
                      <p className="mt-1 text-sm text-gray-600 mb-3">{phase.description}</p>
                      
                      {/* Link Response Section */}
                      <div className="mt-3 border-t pt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Link de Respuesta:
                        </label>
                        {editingPhase === phase.id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="url"
                              value={linkInput}
                              onChange={(e) => setLinkInput(e.target.value)}
                              className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="https://drive.google.com/..."
                            />
                            <button
                              onClick={() => handleSaveLink(phase.id)}
                              className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              {phase.linkResponse ? (
                                <a
                                  href={phase.linkResponse}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-indigo-600 hover:text-indigo-500 break-all"
                                >
                                  {phase.linkResponse}
                                </a>
                              ) : (
                                <span className="text-sm text-gray-400 italic">
                                  No se ha agregado un link
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => handleEditLink(phase)}
                              className="ml-4 px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
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
