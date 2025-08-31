<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold" to="/learn">Women's Health</RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="mainNav" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><RouterLink class="nav-link" to="/learn">Learn & Explore</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/care">Find Care</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/community">Community & Support</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/hub">My Health Hub</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/about">About Us</RouterLink></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- 主体区域：负责居中与留出导航高度 -->
  <main class="main-wrapper">
    <!-- 统一的页面容器：所有路由页内容都会被包在这里 -->
    <div class="page">
      <RouterView />
    </div>
  </main>
</template>

<!-- App.vue -->
<style>
:root { --page-max: 1040px; }

.main-wrapper{
  margin-top:80px;
  min-height:calc(100vh - 80px);
  display:flex; justify-content:center; align-items:flex-start;
}

.page{
  width:100%;
  max-width:var(--page-max);
  margin-inline:auto;
  padding-inline:16px;
  box-sizing:border-box;
}

@media (max-width:575.98px){ .page{ max-width:100%; padding-inline:12px; } }
@media (min-width:576px) and (max-width:767.98px){ .page{ max-width:540px; } }
@media (min-width:768px) and (max-width:991.98px){ .page{ max-width:720px; } }
@media (min-width:992px) and (max-width:1199.98px){ .page{ max-width:960px; } }
@media (min-width:1200px){ .page{ max-width:1040px; } }
</style>