<template>
  <div>
    <h2>Profile</h2>
    <h3>Your Asteroids</h3>
    <div 
      v-for="(asteroidId, index) in asteroids"
      :key=index
    >
      Name: {{ asteroidId.asteroid.designation }}<br>
      ID: {{ asteroidId.asteroid.id }}<br> 
      Absolute Magnitude: {{ asteroidId.asteroid.absolute_magnitude_h }}<br>
      Estimated Diameter: {{ asteroidId.asteroid.estimated_diameter.meters.estimated_diameter_min }} - {{ asteroidId.asteroid.estimated_diameter.meters.estimated_diameter_max }} meters<br>
      <span v-if="asteroidId.asteroid.is_potentially_hazardous_asteroid === true">Potentially Hazardous<br></span>
      <span v-if="asteroidId.asteroid.is_sentry_object === true">Sentry Object<br></span>
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