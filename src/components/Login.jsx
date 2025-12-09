import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/firebase';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = await login(email, password);
      setUser(userData);
      
      // Redirigir según el rol
      if (userData.role === 'admin') {
        navigate('/admin');
      } else if (userData.role === 'coordinator') {
        navigate('/coordinator');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-blue-900">
            SSEA - Sistema de Evaluación y Acreditación
          </h2>
          <p className="mt-2 text-center text-xs sm:text-sm text-gray-600">
            Proceso de Acreditación
          </p>
          <p className="mt-2 text-center text-xs sm:text-sm text-gray-600">
            <b>Admin:</b> admin@gmail.com <b>pass:</b> 123456
          </p>
          <p className="mt-2 text-center text-xs sm:text-sm text-gray-600">
            <b>Coordinador:</b> coordinador@gmail.com <b>pass:</b> 123456
          </p>
        </div>
        <form className="mt-6 sm:mt-8 space-y-6 bg-gray-50 p-4 sm:p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2.5 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-900 focus:border-blue-900 focus:z-10 text-sm sm:text-sm"
                placeholder="Correo electrónico"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2.5 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-900 focus:border-blue-900 focus:z-10 text-sm sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-600">
              <div className="text-sm text-red-600 font-medium">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 sm:py-3 px-4 border border-transparent text-sm sm:text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 disabled:bg-blue-800 transition-colors"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
