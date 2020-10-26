<template>
  <div>
    <div v-for="(asteroid, index) in asteroids" :key="index">
      <span v-show="asteroid.name">Name: {{ asteroid.name }} <br></span>
      ID: {{ asteroid.id }} <br>
      <span v-show="asteroid.approach">Close Approach {{ asteroid.approach }} km <br></span>
      <span v-show="asteroid.date">Approach Date: {{ asteroid.date }} <br></span>
      <button @click="toggleOrbitalData()">Orbital Data</button>
      &nbsp;
      <button @click="toggleCloseApproachData()">Close Approach Data</button>
      <span v-show="loggedIn === 'true'">
        <br>
        <button @click="saveAsteroid(asteroid)">Save Asteroid</button>
      </span>
        <br><br>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    asteroids: {
      type: Array,
      required: true
    },
    loggedIn: {
      type: String,
      expected: true
    }
  },
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
    saveAsteroid(asteroid) {
      this.$emit('save-asteroid', asteroid)
    }
  }
}
</script>