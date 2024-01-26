<template>

  <!-- Main layout wrapper -->
    <div class="layout-wrapper">

      <!-- Include the ViewLayout component -->
      <ViewLayout/>
    </div>
</template>

<script>

// Import the ViewLayout component
import ViewLayout from '../components/ViewLayout.vue'

export default {

  // Register the ViewLayout component
  components: {
    ViewLayout,
  },
}
</script>

<style>

/* Styles for the layout wrapper */
.layout-wrapper {
  max-width: 100%;
}

</style>

