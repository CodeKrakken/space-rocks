<template>
  <div v-if = "searchType == 'id'">
    <span v-if="asteroid.designation">Name: {{asteroid.designation}}<br></span>
    ID: {{asteroid.id}}<br>
    <span v-if="asteroid.absolute_magnitude_h">Absolute Magnitude: {{ asteroid.absolute_magnitude_h }}<br></span>
    <span v-if="asteroid.estimated_diameter.meters">Estimated Diameter: {{ asteroid.estimated_diameter.meters.estimated_diameter_min }} - {{ asteroid.estimated_diameter.meters.estimated_diameter_max }} meters<br></span>
    <span v-if="asteroid.is_potentially_hazardous_asteroid === true">Potentially Hazardous<br></span>
    <span v-if="asteroid.is_sentry_object === true">Sentry Object<br></span>
    <button @click="toggleOrbitalData()">Show/Hide Orbital Data</button>
    &nbsp;
    <button @click="toggleCloseApproachData()">Show/Hide Close Approach Data</button>
    <br>
    <span v-show="loggedIn === 'true'">
      <button @click="saveAsteroid(asteroid)">Save Asteroid</button>
    </span>
    <br><br>
    <span v-if="orbital === true">
      <p v-for="(item, key, index) in asteroid.orbital_data" :key="index">
        {{ key }}: {{ item }}<br><br>
      </p>
      <br><br></span>
    <span v-if="closeApproach === true">
      <p v-for="(item, key, index) in asteroid.close_approach_data" :key="index">
        {{ key }}: {{ item }}<br><br>
      </p>
    </span>
  </div>
  <div v-else-if="searchType === 'date'">
    <div v-for="(asteroid, index) in asteroids" :key="index">
      Name: {{ asteroid.name }} <br>
      ID: {{ asteroid.id }} <br>
      Miss Distance: {{ asteroid.approach }} <br>
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
        console.log(this.asteroids)
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
        this.asteroid = response;
        sessionStorage.asteroid = response;
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
    }
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