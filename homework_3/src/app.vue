<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="navbar-brand">
          <router-link to="/" exact>
              <img src="../src/assets/logo.png" alt="" width="70" />
          </router-link>
      </div>
      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <router-link to="/users" tag="li" class="nav-item">
            <a class="nav-link">User list</a>
          </router-link>
          <router-link to="/add" tag="li" class="nav-item">
            <a class="nav-link">Add User</a>
          </router-link>
        </ul>
      </div>
    </nav>
    <main role="main" class="container">
      <router-view />
    </main>
  </div>
</template>

<style>
[role='main'] {
  margin: 60px 0;
}
</style>
