<template>
  <div :class="['sidebar', { open: isOpen }]">
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
  position: fixed;       /* Ensure the sidebar is fixed in place */
  top: 0;                /* Align it to the top of the viewport */
  left: -250px;          /* Start off-canvas */
  width: 250px;
  height: 100%;
  background: #2c3e50;
  color: white;
  transition: left 0.3s ease-in-out;
  padding: 20px;         /* Optional: adds inner spacing */
  z-index: 90;
}

.sidebar.open {
  left: 0;               /* When open, slide it to the left edge of the viewport */
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
