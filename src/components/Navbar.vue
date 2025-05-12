<template>
    <nav class="navbar">
      <div class="navbar-left">
        <button class="hamburger" @click="$emit('toggleSidebar')">☰</button>
        <span class="navbar-title">My App</span>
      </div>
      <div class="navbar-links">
        <router-link to="/" class="nav-link">Dashboard</router-link>
        <router-link to="/users" class="nav-link">Users</router-link>
        <router-link to="/organisations" class="nav-link">Organisations</router-link>
        <router-link to="/settings" class="nav-link">Settings</router-link>
      </div>
    </nav>
  </template>
  
  <script setup>
    // No special logic needed here as the hamburger click simply emits an event.
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #2c3e50;
    color: white;
    padding: 0.5rem 1rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  
  .navbar-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .hamburger {
    font-size: 24px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
  
  .navbar-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .navbar-links {
    display: flex;
    gap: 1rem;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
  }
  
  .nav-link:hover {
    text-decoration: underline;
  }
  </style>
  