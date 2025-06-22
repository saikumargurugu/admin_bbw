import { defineStore } from 'pinia';
import { auth } from '@/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref } from 'vue';
import api from '@/api';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const error = ref(null);
  const router = useRouter();

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
      const res = await api.post('/login/', { idToken });
      console.log('Token refreshed successfully:', res);
      console.log('Token refreshed successfully:', res.access);
      localStorage.setItem('admin_access_token', res.access);
      localStorage.setItem('is_userlogged', true);
      localStorage.setItem('admin_refresh_token', res.refresh);
      // Redirect to dashboard
      router.push('/');
    } catch (err) {
      error.value = err.message;
    }
  }

  async function logout() {
    await signOut(auth);
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    localStorage.removeItem('is_userlogged');

    user.value = null;
  }

  return { user, login, logout, error };
});