<template>
  <div id="menu">
    <!-- TODO:Display the menu on mobile -->
    <div id="hamburger" class="menu-container menu-size">
      <input
        id="menu-checkbox"
        class="absolute menu-size"
        type="checkbox"
        v-model="isCheckboxChecked"
      />
      <div id="hamburger-lines" class="absolute menu-size">
        <span class="line line1"></span>
        <span class="line line2"></span>
        <span class="line line3"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCheckboxChecked: false
    }
  }
}
</script>
<style>
#menu {
  display: flex;
  align-items: center;
  font-family: 'Rock Salt', cursive;
  text-transform: uppercase;
}
#menu-items {
  background: var(--bg-primary);
  height: 100%;
  width: 100%;
  padding-top: 6rem;
  padding-left: 1rem;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2rem;
  text-align: center;
  transition: transform 0.5s ease-in-out;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
#menu-items li {
  list-style: none;
}
.nav-links {
  text-decoration: none;
  list-style: none;
  font-size: 1.2rem;
  color: var(--text-primary);
}

.nav-links:hover {
  text-decoration: none;
  color: var(--text-secondary);
}

#menu-checkbox {
  display: inline-block;
  cursor: pointer;
  opacity: 0;
  z-index: 4;
}

input[id='menu-checkbox']:checked ~ #hamburger-lines .line1 {
  transform: rotate(45deg);
}

input[id='menu-checkbox']:checked ~ #hamburger-lines .line2 {
  transform: scaleY(0);
}

input[id='menu-checkbox']:checked ~ #hamburger-lines .line3 {
  transform: rotate(-45deg);
}

.menu-container {
  margin: auto;
  position: relative;
}

.menu-size {
  width: 1.5rem;
  height: 1.5rem;
}

.absolute {
  position: absolute;
  top: 0;
  right: 0;
}

#hamburger-lines {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  position: absolute;
  z-index: 3;
}

#hamburger-lines .line {
  display: block;
  height: 0.15rem;
  width: 100%;
  border-radius: 0.625rem;
  background: var(--text-primary);
}

#hamburger-lines .line1 {
  transform-origin: 0% 0%;
  transition: transform 0.4s ease-in-out;
}

#hamburger-lines .line2 {
  transition: transform 0.2s ease-in-out;
}

#hamburger-lines .line3 {
  transform-origin: 0% 100%;
  transition: transform 0.4s ease-in-out;
}
</style>
