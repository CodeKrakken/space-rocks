<template>
  <div>
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
    <br>
  </div>
</template>

<script>

export default {
  data() {
    return {
      asteroid: '',
      apiKey: 'IkYVBdLBeJmE1KebssJedxBb4QP8HCPL7WIGq16g',
      id: '',
      orbital: false,
      closeApproach: false
    }
  },
  methods: {
    fetchAPIData() {
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
        this.$emit('set-id-result', response)
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