import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPhases, createPhase, updatePhaseStatus, logout } from '../services/firebase';
import PhaseCreationForm from './PhaseCreationForm';

const AdminDashboard = ({ user }) => {
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
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

  const handleCreatePhase = async (phaseData) => {
    try {
      await createPhase(phaseData);
      setShowForm(false);
      await loadPhases();
    } catch (err) {
      setError('Error al crear la fase');
      console.error(err);
    }
  };

  const handleStatusChange = async (phaseId, newStatus) => {
    try {
      await updatePhaseStatus(phaseId, newStatus);
      await loadPhases();
    } catch (err) {
      setError('Error al actualizar el estado');
      console.error(err);
    }
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
            <h1 className="text-xl sm:text-2xl font-bold text-white">Panel de Administrador</h1>
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
        {/* Action Bar */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Fases de Acreditación</h2>
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 border border-transparent text-sm font-bold rounded-md text-white bg-blue-900 hover:bg-blue-950 shadow-md transition-colors"
          >
            + Nueva Fase
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 border border-red-600">
            <div className="text-sm text-red-600 font-medium">{error}</div>
          </div>
        )}

        {/* Phases List */}
        <div className="bg-gray-50 shadow-lg overflow-hidden rounded-lg border border-gray-200">
          {phases.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-gray-600 font-medium text-sm sm:text-base px-4">
              No hay fases creadas. Crea una nueva fase para comenzar.
            </div>
          ) : (
            <ul className="divide-y divide-gray-300">
              {phases.map((phase) => (
                <li key={phase.id} className="px-3 sm:px-6 py-4 sm:py-5 bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 pr-2">{phase.title}</h3>
                        {getStatusBadge(phase.status)}
                      </div>
                      <p className="mt-1 text-sm text-gray-700">{phase.description}</p>
                      {phase.linkResponse && (
                        <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">Link de respuesta: </span>
                          <a
                            href={phase.linkResponse}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs sm:text-sm text-blue-900 hover:text-blue-950 underline font-medium break-all"
                          >
                            {phase.linkResponse}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:ml-4 gap-2 sm:space-x-2 sm:gap-0">
                      <button
                        onClick={() => handleStatusChange(phase.id, 'approved')}
                        disabled={phase.status === 'approved'}
                        className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-md text-white bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => handleStatusChange(phase.id, 'rejected')}
                        disabled={phase.status === 'rejected'}
                        className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Rechazar
                      </button>
                      <button
                        onClick={() => handleStatusChange(phase.id, 'pending')}
                        disabled={phase.status === 'pending'}
                        className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors border border-gray-300"
                      >
                        Pendiente
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Phase Creation Form Modal */}
      {showForm && (
        <PhaseCreationForm
          onClose={() => setShowForm(false)}
          onSubmit={handleCreatePhase}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
