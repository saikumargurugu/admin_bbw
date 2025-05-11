<template>
    <div>
      <!-- Hamburger Button -->
      <button @click="$emit('toggle')" class="hamburger">☰</button> 
  
      <!-- Sidebar Container -->
      <div :class="['sidebar', { open: isOpen }]">
        <button @click="$emit('toggle')" class="close-btn">×</button>
        <nav>
          <router-link to="/" class="hover:text-blue-400">Dashboard</router-link>
          <router-link to="/users" class="hover:text-blue-400">Users</router-link>
          <router-link to="/organisations" class="hover:text-blue-400">Organisations</router-link>
          <router-link to="/settings" class="hover:text-blue-400">Settings</router-link>
        </nav>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: Boolean, // Accept `isOpen` from the parent
    },
  };
  </script>
  
  <style scoped>
  .hamburger {
    position: fixed;
    top: 15px;
    left: 15px;
    font-size: 24px;
    background: none;
    border: none;
    color: black; /* Adjust color for visibility */
    cursor: pointer;
    z-index: 1000;
  }
  
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
  
  nav a {
    display: block;
    color: white;
    margin: 10px 0;
    text-decoration: none;
  }
  </style>
  