<template>
  <div :class="['sidebar', { open: true }]">
    <button @click="$emit('toggle')" class="close-btn">×</button>
    <nav>
      <router-link to="/" class="nav-link">Dashboard</router-link>
      <router-link to="/users" class="nav-link">Users</router-link>
      <router-link to="/organisations" class="nav-link">Organisations</router-link>
      <router-link to="/settings" class="nav-link">Settings</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background: #2c3e50;
  color: white;
  transition: left 0.3s ease-in-out;
  padding: 20px;
  z-index: 90;
}
.sidebar.open {
  left: 0;
}
.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
}
.nav-link {
  display: block;
  margin: 10px 0;
  color: white;
  text-decoration: none;
}
.nav-link:hover {
  text-decoration: underline;
}
</style>
