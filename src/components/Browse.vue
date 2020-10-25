<template>
  <div>
    <div
      v-for="(asteroid, index) in asteroids"
      :key = index
    >
      <span v-if="asteroid.designation">Name: {{asteroid.designation}}<br></span>
      ID: {{asteroid.id}}<br>
      <span v-if="asteroid.absolute_magnitude_h">Absolute Magnitude: {{ asteroid.absolute_magnitude_h }}<br></span>
      <span v-if="asteroid.estimated_diameter.meters">Estimated Diameter: {{ asteroid.estimated_diameter.meters.estimated_diameter_min }} - {{ asteroid.estimated_diameter.meters.estimated_diameter_max }} meters<br></span>
      <span v-if="asteroid.is_potentially_hazardous_asteroid === true">Potentially Hazardous<br></span>
      <span v-if="asteroid.is_sentry_object === true">Sentry Object<br></span>
      <button @click="toggleOrbitalData()">Orbital Data</button>
      &nbsp;
      <button @click="toggleCloseApproachData()">Close Approach Data</button>
      <br><br>
      <span v-if="orbital === true">
        <div v-for="(item, key, index) in asteroid.orbital_data" :key="index">
          {{ key }}: {{ item }}
        </div>
      </span>
      <br>
      <span v-if="closeApproach === true">
        <div v-for="(item, key, index) in asteroid.close_approach_data" :key="index">
          {{ key }}: {{ item }}
          <br><br>
        </div>
      </span>
    </div>
    <div>
      <button @click="newBrowse()">
        Another 10?
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      api_key: 'IkYVBdLBeJmE1KebssJedxBb4QP8HCPL7WIGq16g',
      asteroids: [],
      orbital: false,
      closeApproach: false,
    }
  },
  methods: {
    browse() {
      fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?page=${sessionStorage.currentBrowse}&size=10&api_key=${this.api_key}`, {
        "method": "GET",
        "headers": {
          'Access-Control-Request-Method': 'GET'
        }
      })
      .then(response => {
        if(response.ok){
          return response.json()
        } else {
          alert("No Asteroids Found.");
        }                
      })
      .then(response => {
        this.asteroids = response.near_earth_objects;
      })
      .catch(err => {
        console.log(err);
      });
    },
    newBrowse() {
      sessionStorage.currentBrowse = Math.floor(Math.random() * Math.floor(1252));
      this.browse()
    },
    toggleOrbitalData() {
      this.orbital = !this.orbital;
    },
    toggleCloseApproachData() {
      this.closeApproach = !this.closeApproach;
    }
  },
  created() {
    if (!sessionStorage.currentBrowse) {
      sessionStorage.currentBrowse = Math.floor(Math.random() * Math.floor(1252));
    }
    this.browse()
  }
}
</script>