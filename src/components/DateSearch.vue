<template>
  <div>
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
    <br>
  </div>
</template>

<script>

export default {
  data() {
    return {
      asteroids: [],
      apiKey: 'IkYVBdLBeJmE1KebssJedxBb4QP8HCPL7WIGq16g',
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    fetchByDate() {
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
        this.$emit('set-date-result', this.asteroids)
      })
      .catch(err => {
        console.log(err);
      });
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