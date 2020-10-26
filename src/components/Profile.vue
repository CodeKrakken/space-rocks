<template>
  <div>
    <h2>Profile</h2>
    <h3>Your Asteroids</h3>
    <div 
      v-for="(asteroidId, index) in asteroids"
      :key=index
    >
      <span v-if="asteroidId.asteroid.designation">Name: {{ asteroidId.asteroid.designation }}<br></span>
      ID: {{ asteroidId.asteroid.id }}<br> 
      <span v-if="asteroidId.asteroid.absolute_magnitude_h">Absolute Magnitude: {{ asteroidId.asteroid.absolute_magnitude_h }}<br></span>
      <span v-if="asteroidId.asteroid.is_potentially_hazardous_asteroid === true">Potentially Hazardous<br></span>
      <span v-if="asteroidId.asteroid.is_sentry_object === true">Sentry Object<br></span>
      <button @click="toggleOrbitalData()">Orbital Data</button>
      &nbsp;
      <button @click="toggleCloseApproachData()">Close Approach Data</button>
      <br><br>
      <span v-if="orbital === true">
        <div v-for="(item, key, index) in asteroidId.asteroid.orbital_data" :key="index">
          {{ formatKey(key) }}: {{ item }}
        </div>
      </span>
      <br>
      <span v-if="closeApproach === true">
        <div v-for="(item, key, index) in asteroidId.asteroid.close_approach_data" :key="index">
          {{ key }}: {{ item }}
          <br><br>
        </div>
      </span>
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
    formatKey(key) {
      var words = key.match(/[A-Za-z][a-z]*/g) || [];
      return words.map(this.capitalize).join(" ");
    },
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.substring(1);
    }
  },

  props: {
    asteroids: {
      type: Array,
      required: true
    }
  },
}

</script>