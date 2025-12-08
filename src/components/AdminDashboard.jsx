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
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administrador</h1>
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
        {/* Action Bar */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Fases de Acreditación</h2>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            + Nueva Fase
          </button>
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
              No hay fases creadas. Crea una nueva fase para comenzar.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {phases.map((phase) => (
                <li key={phase.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{phase.title}</h3>
                        {getStatusBadge(phase.status)}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{phase.description}</p>
                      {phase.linkResponse && (
                        <div className="mt-2">
                          <span className="text-sm text-gray-500">Link de respuesta: </span>
                          <a
                            href={phase.linkResponse}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:text-indigo-500"
                          >
                            {phase.linkResponse}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={() => handleStatusChange(phase.id, 'approved')}
                        disabled={phase.status === 'approved'}
                        className="px-3 py-1 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => handleStatusChange(phase.id, 'rejected')}
                        disabled={phase.status === 'rejected'}
                        className="px-3 py-1 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Rechazar
                      </button>
                      <button
                        onClick={() => handleStatusChange(phase.id, 'pending')}
                        disabled={phase.status === 'pending'}
                        className="px-3 py-1 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
