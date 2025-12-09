import { useState } from 'react';

const PhaseCreationForm = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ title, description });
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gray-900/50" onClick={onClose}></div>

      {/* Modal panel */}
      <div className="flex items-center justify-center min-h-screen px-3 py-4 sm:px-4">
        <div className="relative inline-block bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all w-full max-w-lg border-2 border-blue-900 z-10">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-2 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg sm:text-xl leading-6 font-bold text-blue-900 mb-3 sm:mb-4">
                    Crear Nueva Fase
                  </h3>
                  <div className="mt-2 space-y-3 sm:space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-xs sm:text-sm font-bold text-gray-900">
                        Título
                      </label>
                      <input
                        type="text"
                        id="title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-900 text-xs sm:text-sm"
                        placeholder="Ej: Fase 1 - Documentación Inicial"
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-xs sm:text-sm font-bold text-gray-900">
                        Descripción
                      </label>
                      <textarea
                        id="description"
                        required
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-900 text-xs sm:text-sm"
                        placeholder="Describe los requisitos y objetivos de esta fase..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col-reverse gap-2 sm:flex-row-reverse sm:gap-0">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-sm sm:text-base font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 sm:ml-3 sm:w-auto disabled:bg-blue-400 transition-colors"
              >
                {loading ? 'Creando...' : 'Crear Fase'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex justify-center rounded-md border-2 border-gray-300 shadow-sm px-4 py-2 bg-white text-sm sm:text-base font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhaseCreationForm;
