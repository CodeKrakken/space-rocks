<template>
  <div v-if = "searchType == 'id'">
    <h3>Search Results: <i>{{id}}</i></h3>
    Name: {{result.designation}}<br><br>
    Absolute Magnitude: {{result.absolute_magnitude_h}}<br><br>
    Estimated Diameter: {{result.estimated_diameter.meters.estimated_diameter_min}} - {{result.estimated_diameter.meters.estimated_diameter_max}} meters<br><br>
    <span v-if="result.is_potentially_hazardous_asteroid === true">Potentially Hazardous<br><br></span>
    <span v-if="result.is_sentry_object === true">Sentry Object<br><br></span>
    <button @click="toggleOrbitalData()">Show/Hide Orbital Data</button>
    &nbsp;
    <button @click="toggleCloseApproachData()">Show/Hide Close Approach Data</button>
    &nbsp;
    <span v-show="loggedIn === 'true'">
      <button @click="saveAsteroid(id, result.designation)">Save Asteroid</button>
    </span>
    <br><br>
    <span v-if="orbital === true">
      <p v-for="(item, key, index) in result.orbital_data" :key="index">
        {{ key }}: {{ item }}
      </p>
      <br><br></span>
    <span v-if="closeApproach === true">
      <p v-for="(item, key, index) in result.close_approach_data" :key="index">
        {{ key }}: {{ item }}
      </p>
    </span>
  </div>
  <div v-else-if="searchType === 'date'">
    Date based Results
    {{ result }}
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
      result: ' ',
      searchType: '',
      responseAvailable: false,
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
      this.responseAvailable = false;
      this.searchType = "date";
      fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-04-28&end_date=2015-04-28&detailed=true&api_key=${this.apiKey}`, {
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
        this.result = response;
        sessionStorage.result = response;
        this.responseAvailable = true;
        console.log(this.result)
      })
      .catch(err => {
        console.log(err);
      });
    },
    fetchAPIData() {
      this.responseAvailable = false;
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
        this.result = response;
        sessionStorage.result = response;
        this.responseAvailable = true;
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