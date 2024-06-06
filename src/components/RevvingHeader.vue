<template>
  <header id="revving-header">
    <img
      alt="Revving logo"
      class="revving-logo"
      src="@/assets/logoRevving.svg"
      width="125"
      height="125"
    />
    <HamburgerComponent v-if="isMobile" />
    <div class="nav-items" v-if="!isMobile">
      <a class="nav-link">Solutions</a>
      <a class="nav-link">Company</a>
      <a class="nav-link">Contact us</a>
      <a class="nav-link">Login</a>
      <!-- TODO: Fix the arrow icon -->
      <button class="nav-button" @click="login">
        Get Demo <i class="fa-sharp fa-solid fa-angles-right"></i>
      </button>
    </div>
  </header>
</template>

<script>
import HamburgerComponent from '/src/components/HamburgerComponent.vue'

export default {
  components: {
    HamburgerComponent
  },
  data() {
    return {
      isMobile: window.innerWidth <= 768
    }
  },
  methods: {
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 768
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateIsMobile)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateIsMobile)
  }
}
</script>

<style scoped>
#revving-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem;
}

.revving-logo {
  width: auto;
  height: 40px;
}

.nav-items {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--text-tertiary);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.nav-link:hover {
  color: var(--text-secondary);
}

.nav-button {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 1rem;
}

.nav-button:hover {
  background-color: var(--text-secondary);
}
.icon {
  color: red;
  background-color: aqua;
}
</style>
