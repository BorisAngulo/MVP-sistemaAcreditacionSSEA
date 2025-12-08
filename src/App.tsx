import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// @ts-ignore
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
// @ts-ignore
import { getUserData } from './services/firebase';
// @ts-ignore
import Login from './components/Login';
// @ts-ignore
import ProtectedRoute from './components/ProtectedRoute';
// @ts-ignore
import AdminDashboard from './components/AdminDashboard';
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
        <Route 
          path="/login" 
          element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/coordinator'} replace /> : <Login setUser={setUser} />} 
        />
        
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

        <Route 
          path="/unauthorized" 
          element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso No Autorizado</h1>
                <p className="text-gray-600">No tienes permisos para acceder a esta página.</p>
              </div>
            </div>
          } 
        />
        
        <Route 
          path="/" 
          element={<Navigate to={user ? (user.role === 'admin' ? '/admin' : '/coordinator') : '/login'} replace />} 
        />
        
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
