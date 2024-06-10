<template>
  <header id="revving-header">
    <div class="header-container">
      <a href="https://www.revving.io/">
        <img
          alt="Revving logo"
          class="revving-logo"
          src="@/assets/logoRevving.svg"
          width="125"
          height="125"
        />
      </a>
      <HamburgerComponent v-if="isMobile" />
      <div class="nav-items" v-if="!isMobile">
        <a class="nav-link" href="https://www.revving.io/">Solutions</a>
        <a class="nav-link" href="https://www.revving.io/about-us">Company</a>
        <a class="nav-link" href="https://www.revving.io/contact-us">Contact Us</a>
        <a class="nav-link" href="https://app.revving.io/login">Login</a>
        <a href="https://www.revving.io/contact-us">
          <button class="nav-button" @click="login">
            Get Demo <i class="fa-sharp fa-solid fa-angles-right arrow-icon"></i>
          </button>
        </a>
      </div>
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
      isMobile: window.innerWidth <= 800
    }
  },
  methods: {
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 800
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--bg-primary);
  height: 90px;
  box-shadow: 0 8px 6px -6px var(--bg-primary);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px 20px;
}

.revving-logo {
  width: auto;
  height: 40px;
  cursor: pointer;
}

.nav-items {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--text-tertiary);
  text-decoration: none;
  cursor: pointer;
}

.nav-link:hover {
  color: var(--text-secondary);
}

.nav-button {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 1rem;
}

.nav-button:hover {
  background-color: var(--text-secondary);
}
.arrow-icon {
  margin-left: 0.5rem;
}
</style>
