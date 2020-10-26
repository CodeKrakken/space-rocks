<template>
  <div>
    RESULTS
    <span v-if="asteroid.designation">Name: {{asteroid.designation}}<br></span>
    ID: {{asteroid.id}}<br>
    <span v-if="asteroid.absolute_magnitude_h">Absolute Magnitude: {{ asteroid.absolute_magnitude_h }} h<br></span>
    <span v-if="asteroid.estimated_diameter.meters">Estimated Diameter: {{ asteroid.estimated_diameter.meters.estimated_diameter_min }} - {{ asteroid.estimated_diameter.meters.estimated_diameter_max }} meters<br></span>
    <span v-if="asteroid.is_potentially_hazardous_asteroid === true">Potentially Hazardous<br></span>
    <span v-if="asteroid.is_sentry_object === true">Sentry Object<br></span>
    <button @click="toggleOrbitalData()">Orbital Data</button>
    &nbsp;
    <button @click="toggleCloseApproachData()">Close Approach Data</button>
    <span v-show="loggedIn === 'true'">
      <br>
      <button @click="saveAsteroid(asteroid)">Save Asteroid</button>
    </span>
    <br><br>
    <span v-if="orbital === true">
      Orbit ID: {{ asteroid.orbital_data.orbit_id}}<br>
      Orbit Determination Date: {{ asteroid.orbital_data.orbit_determination_date }}<br>
      First Observation Date: {{ asteroid.orbital_data.first_observation_date }}<br>
      Data Arc: {{ asteroid.orbital_data.data_arc_in_days }} days<br>
      Observations Used: {{ asteroid.orbital_data.observations_used }}<br>
      Orbit Uncertainty: {{ asteroid.orbital_data.orbit_uncertainty }}<br>
      Minimum Orbit Intersection: {{ asteroid.orbital_data.minimum_orbit_intersection }}<br>
      Jupiter_Tisserand_Invariant: {{ asteroid.orbital_data.jupiter_tisserand_invariant }}<br>
      Epoch_Osculation: {{ asteroid.orbital_data.epoch_osculation }}<br>
      Eccentricity: {{ asteroid.orbital_data.eccentricity }}<br>
      Semi Major Axis: {{ asteroid.orbital_data.semi_major_axis }}<br>
      Inclination: {{ asteroid.orbital_data.inclination }}<br>
      Ascending Node Longitude: {{ asteroid.orbital_data.ascending_node_longitude }}<br>
      Orbital Period: {{ asteroid.orbital_data.orbital_period }}<br>
      Perihelion Distance: {{ asteroid.orbital_data.perihelion_distance }}<br>
      Perihelion Argument: {{ asteroid.orbital_data.perihelion_argument }}<br>
      Aphelion Distance: {{ asteroid.orbital_data.aphelion_distance }}<br>
      Perihelion Time: {{ asteroid.orbital_data.perihelion_time }}<br>
      Mean Anomaly: {{ asteroid.orbital_data.mean_anomaly }}<br>
      Mean Motion: {{ asteroid.orbital_data.mean_motion }}<br>
      Equinox: {{ asteroid.orbital_data.equinox }}<br>
      <div v-for="(item, key, index) in asteroid.orbital_data.orbit_class" :key="index">
        {{ formatKey(key) }}: {{ item }}
      </div>
    </span>
    <span v-if="closeApproach === true">
      <div v-for="(attributes, index) in asteroid.close_approach_data" :key="index">
        Approach Date: {{ attributes.close_approach_date }}<br>
        Relative Velocity: {{ attributes.relative_velocity.kilometers_per_hour }} km/h<br>
        Close Approach: {{ attributes.miss_distance.kilometers }} km<br>
        Orbiting Body: {{ attributes.orbiting_body }}
        <br><br>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    asteroid: {
      type: Object,
      required: true
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
    },
    formatKey(key) {
      var words = key.match(/[A-Za-z][a-z]*/g) || [];
      return words.map(this.capitalize).join(" ");
    },
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.substring(1);
    },
  }
}
</script>