<template>
  <div class="app-wrapper">

    <!-- toggle the 'overlay' class based on isActive state what we stored in editbutton.vue component -->
    <div class="body-container" :class="{ overlay: isActive }"></div>

    <header class="appHeader">

      <!-- Include the HamMenu component -->
      <HamMenu />
    </header>

    <router-view></router-view>

    <footer class="appFooter">

      <!-- background images -->
      <div class="images-wrapper">
        <div class="pyramid-wrapper">
          <img src="./assets/img/pyramid1.png" alt="pyramid" class="pyramid">
        </div>
        <div class="sand-wrapper">
            <img src="./assets/img/sand.png" alt="sand" class="sand">
        </div>
      </div>

      <!-- container with add button which adding new to do items -->
      <div class="footerContainer">
        <button class="add">
        <svg class="adds" viewBox="0 0 16 16" width="100%" height="100%" fill="black" v-b-modal.modal-prevent-closing>
          <g>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z">
          </path>
          </g>
        </svg>
      </button>
      </div>
    </footer>
  </div>
</template>

<script>
//import store getter
import { mapGetters } from 'vuex';

//import component
import HamMenu from './components/HamMenu.vue'

export default {

  // Register the HamMenu component
  components: {
    HamMenu
  },

  //computed for isActive what is stored in editbutton.vue
  computed: {
    ...mapGetters(['getIsActive']),
    isActive() {
      return this.getIsActive;
    }
  }
}
</script>

<style lang="scss">

/* imports for fonts and variables */
@import './assets/fonts.scss';
@import './assets/variables.scss';

html {
  width: 100%;
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
  max-width: 100%;
}

/* Styling for the main application wrapper */
.app-wrapper {
  background: url('./assets/img/star.png') no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  overflow-y: hidden;
  transform-style: preserve-3d;
  perspective: 1px;
  perspective-origin: calc(50% - var(--scroll-bar-width) / 2) center;
  display: grid;
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
  overflow-x: hidden;
  touch-action: pan-y;
}

/* Styling for the pyramid image and wrapper */
.pyramid-wrapper {
  width: 100%;
  position: fixed;
}

.pyramid {
  position: fixed;
  top: 0;
  transform: translate3d(42%, -21%, 0px) scale(1);
  -webkit-transform: translate3d(42%, -21%, 0px) scale(1);
  -moz-transform: translate3d(42%, -21%, 0px) scale(1);
  -ms-transform: translate3d(42%, -21%, 0px) scale(1);
  -o-transform: translate3d(42%, -21%, 0px) scale(1);
}

/* Styling for the sand image and wrapper */
.sand-wrapper {
  width: 100%;
  position: fixed;
}

.sand {
  position: fixed;
  top: 0;
  transform: translate3d(-37%, -10%, 0px) scale(1);
  -webkit-transform: translate3d(-37%, -10%, 0px) scale(1);
  -moz-transform: translate3d(-37%, -10%, 0px) scale(1);
  -ms-transform: translate3d(-37%, -10%, 0px) scale(1);
  -o-transform: translate3d(-37%, -10%, 0px) scale(1);
}

/* Styling for the header area */
.appHeader {
  grid-area: header;
}

/* Styling for the footer area */
.appFooter {
  grid-area: footer;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.footerContainer{
  display: flex;
  justify-content: flex-end;
}

/* Styling for the 'add' button and its hover effect */
.add {
  margin: 3em !important;
  width: 60px;
  height: 60px;
  background: $sandDarker !important;
  border: 1px solid $sandDarker !important;
  border-radius: 15px;
  box-shadow: 1px 4px 4px 1px $sandShadow !important;
  margin: 0 3em;

  &:hover {
    transform: scale(1.1);
    transition: .25s ease;
  }
}

/* Styling for the 'adds' SVG icon within the 'add' button */
.adds {
  transform: rotate(45deg);
}

/* Styling for the overlay */
.body-container {
  width: 100%;
  position: absolute;
}

.overlay {
  height: 100%;
  background: $overlay1;
  z-index: 2;
}

</style>