<template>
  <div>
    {{ result }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      api_key: 'IkYVBdLBeJmE1KebssJedxBb4QP8HCPL7WIGq16g',
      result: [],
      randomPage: Math.floor(Math.random() * Math.floor(1252))
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
          alert("Asteroid Not Found.");
        }                
      })
      .then(response => {
        this.result = response.near_earth_objects;
        sessionStorage.result = response.near_earth_objects;
        console.log(this.result)
      })
      .catch(err => {
        console.log(err);
      });
    },
  },
  created() {
    if (!sessionStorage.currentBrowse) {
      sessionStorage.currentBrowse = this.randomPage
    }
    this.browse()
  }
}
</script>