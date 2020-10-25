<template>
  <div v-if = "searchType == 'id'">
    Name: {{asteroid.designation}}<br><br> 
    ID: {{asteroid.id}}<br><br>
    Absolute Magnitude: {{asteroid.absolute_magnitude_h}}<br><br>
    Estimated Diameter: {{asteroid.estimated_diameter.meters.estimated_diameter_min}} - {{asteroid.estimated_diameter.meters.estimated_diameter_max}} meters<br><br>
    <span v-if="asteroid.is_potentially_hazardous_asteroid === true">Potentially Hazardous<br><br></span>
    <span v-if="asteroid.is_sentry_object === true">Sentry Object<br><br></span>
    <button @click="toggleOrbitalData()">Show/Hide Orbital Data</button>
    &nbsp;
    <button @click="toggleCloseApproachData()">Show/Hide Close Approach Data</button>
    &nbsp;
    <span v-show="loggedIn === 'true'">
      <button @click="saveAsteroid(id, asteroid.designation)">Save Asteroid</button>
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
import * as fb from '../firebase'

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
      type: Boolean,
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
        for (let indexDate in dateHash) {
          dateHash[indexDate].forEach(asteroid => {
            console.log(asteroid)
            this.asteroids.push({
              "id": asteroid.id,
              "name": asteroid.name.replace('(', '').replace(')', ''),
              "approach": asteroid.close_approach_data[0].miss_distance.kilometers,
              "date": asteroid.close_approach_data[0].close_approach_date_full
            })
          })
        }
        // sessionStorage.asteroids = response.near_earth_objects;
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
        // console.log(response)
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
    saveAsteroid(id, name) {
      this.$emit('save-asteroid', id, name)
      fb.asteroidsCollection.add({
        createdOn: new Date(),
        userId: fb.auth.currentUser.uid,
        asteroidId: id,
        asteroidName: name
      })
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