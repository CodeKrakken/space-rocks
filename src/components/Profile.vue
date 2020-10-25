<template>
  <div>
    <h2>Profile</h2>
    <h3>Your Asteroids</h3>
      <div 
        v-for="(asteroidId, index) in asteroids"
        :key=index
      > 
        {{ asteroidId }}<br><br>
      </div>
  </div>
</template>

<script>

export default {

  props: {
    asteroids: {
      type: Array,
      required: true
    }
  },
}

</script>