<template>
  <div>
    <h2>Profile</h2>
    <h3>Your Asteroids</h3>
    <div 
      v-for="(asteroidId, index) in asteroids"
      :key=index
    > 
      {{ asteroidId.asteroid }}<br><br>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      orbital: false,
      closeApproach: false,
    }
  },
  methods: {
    toggleOrbitalData() {
      this.orbital = !this.orbital;
    },
    toggleCloseApproachData() {
      this.closeApproach = !this.closeApproach;
    },
  },

  props: {
    asteroids: {
      type: Array,
      required: true
    }
  },
}

</script>