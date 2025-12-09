import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

// Get user data from Firestore
export const getUserData = async (uid) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (!userDoc.exists()) {
    console.error('Usuario no encontrado en Firestore:', uid);
    return null;
  }
  const data = { uid, ...userDoc.data() };
  return data;
};

// Authentication
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userData = await getUserData(userCredential.user.uid);
  return userData;
};

export const logout = async () => {
  return await signOut(auth);
};

// Phases CRUD
export const getPhases = async () => {
  const querySnapshot = await getDocs(collection(db, 'phases'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createPhase = async (phaseData) => {
  return await addDoc(collection(db, 'phases'), {
    ...phaseData,
    status: 'pending',
    linkResponse: '',
    createdAt: new Date()
  });
};

export const updatePhaseStatus = async (phaseId, status) => {
  const phaseRef = doc(db, 'phases', phaseId);
  return await updateDoc(phaseRef, { status });
};

export const updatePhaseLink = async (phaseId, linkResponse) => {
  const phaseRef = doc(db, 'phases', phaseId);
  return await updateDoc(phaseRef, { linkResponse });
};
