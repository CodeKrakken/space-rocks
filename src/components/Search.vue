<template>
  <div v-if = "searchType == 'id'">
    <span v-if="asteroid.designation">Name: {{asteroid.designation}}<br></span>
    ID: {{asteroid.id}}<br>
    <span v-if="asteroid.absolute_magnitude_h">Absolute Magnitude: {{ formatNumber(asteroid.absolute_magnitude_h) }} h<br></span>
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
    <br>
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
  <div v-else-if="searchType === 'date'">
    <div v-for="(asteroid, index) in asteroids" :key="index">
      Name: {{ asteroid.name }} <br>
      ID: {{ asteroid.id }} <br>
      Close Approach {{ asteroid.approach }} km <br>
      Approach Date: {{ asteroid.date }} <br><br>
    </div>
  </div>
  <div v-else> 
    <form>
      <h2>Find by ID</h2>
      <input v-model="id" type="text" placeholder="asteroid ID" name="search">
      <button
        type="button"
        @click="fetchAPIData"
      >
        Search
      </button>
    </form>
    <form>
      <h2>Find by date</h2>
      <input v-model="startDate" type="date">
      <input v-model="endDate" type="date">
      <button 
        type="button"
        @click="fetchByDate"
      >
        Search
      </button>
    </form>
  </div>
</template>

<script>
// import * as fb from '../firebase'

export default {
  data() {
    return {
      asteroid: '',
      asteroids: [],
      searchType: '',
      apiKey: 'IkYVBdLBeJmE1KebssJedxBb4QP8HCPL7WIGq16g',
      id: '',
      orbital: false,
      closeApproach: false,
      startDate: '',
      endDate: ''
    }
  },
  props: {
    loggedIn: {
      type: String,
      required: true
    }
  },
  methods: {
    fetchByDate() {
      this.searchType = "date";
      fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.startDate}&end_date=${this.endDate}&detailed=true&api_key=${this.apiKey}`, {
        "method": "GET",
        "headers": {
          'Access-Control-Request-Method': 'GET'
        }
      })
      .then(response => {
        if(response.ok){
          return response.json()
        } else{
          alert("Asteroid Not Found.");
        }                
      })
      .then(response => {
        const dateHash = response.near_earth_objects
        const asteroids = []
        for (let indexDate in dateHash) {
          dateHash[indexDate].forEach(asteroid => {
            asteroids.push({
              "id": asteroid.id,
              "name": asteroid.name.replace('(', '').replace(')', ''),
              "approach": asteroid.close_approach_data[0].miss_distance.kilometers,
              "date": asteroid.close_approach_data[0].close_approach_date_full
            })
          })
        }

        asteroids.sort((a, b) => { return parseFloat(a.approach) - parseFloat(b.approach) })
        this.asteroids = asteroids.slice(0,10)
      })
      .catch(err => {
        console.log(err);
      });
    },
    fetchAPIData() {
      this.searchType = "id";
      fetch(`https://api.nasa.gov/neo/rest/v1/neo/${this.id}?api_key=${this.apiKey}`, {
        "method": "GET",
        "headers": {
          'Access-Control-Request-Method': 'GET'
        }
      })
      .then(response => {
        if(response.ok){
          return response.json()
        } else{
          alert("Asteroid Not Found.");
        }                
      })
      .then(response => {
        this.asteroid = response
        console.log(response)
      })
      .catch(err => {
        console.log(err);
      });
    },
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
    formatNumber(num) {
      return Math.round((num + 0.00001) * 100) / 100
    },
  },
}
</script>

<style scoped>
  ::-moz-placeholder { 
    font-family: 'Odibee Sans';
    letter-spacing: 0.03em;
    font-style: italic;
    font-size: 150%;
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    font-family: 'Odibee Sans';
    letter-spacing: 0.03em;
    font-style: italic;
    font-size: 150%;
  }

  :-ms-input-placeholder { /* IE 10+ */
    font-family: 'Odibee Sans';
    letter-spacing: 0.03em;
    font-style: italic;
    font-size: 150%;
  }

  :-moz-placeholder { /* Firefox 18- */
    font-family: 'Odibee Sans';
    letter-spacing: 0.03em;
    font-style: italic;
    font-size: 150%;
  }

</style>