<template>
  <div>
    <div
      v-for="(asteroid, index) in asteroids"
      :key = index
    >
      Name: {{ asteroid.designation }}
      ID: {{ asteroid.id }}
      Absolute Magnitude: {{ asteroid.absolute_magnitude_h }}
      Estimated Diameter: {{ asteroid.estimated_diameter.meters.estimated_diameter_min }} 
      - {{ asteroid.estimated_diameter.meters.estimated_diameter_max }}
      <span v-if="asteroid.is_potentially_hazardous_asteroid === true"><br>Potentially Hazardous</span>
      <span v-if="asteroid.is_sentry_object === true"><br>Sentry Object</span><br><br>
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
        console.log(this.asteroids)
      })
      .catch(err => {
        console.log(err);
      });
    },
    newBrowse() {
      sessionStorage.currentBrowse = Math.floor(Math.random() * Math.floor(1252));
      this.browse()
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