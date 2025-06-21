import { defineStore } from 'pinia';
import { auth } from '@/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref } from 'vue';
import api from '@/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const error = ref(null);

  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
  });

  async function login(email, password) {
    error.value = null;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Get Firebase ID token
      const idToken = await auth.currentUser.getIdToken();
      // Call backend to exchange for access/refresh token
      const res = await api.post('/auth/token', { idToken });
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('refresh_token', res.refresh_token);
    } catch (err) {
      error.value = err.message;
    }
  }

  async function logout() {
    await signOut(auth);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    user.value = null;
  }

  return { user, login, logout, error };
});