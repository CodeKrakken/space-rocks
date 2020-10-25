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

import { db } from '@/firebase'
import * as fb from '../firebase' 

export default {

  data() {
    return {
      asteroids: []
    }
  },
  created() {
    this.getAsteroids()
  },
  methods: {
    getAsteroids() {
      db.collection('asteroids').where('userId', '==', fb.auth.currentUser.uid).get()
      .then(snapshot => {
        this.asteroids = []
        snapshot.forEach(doc => {  
          this.asteroids.push(doc.data()) 
        })
      })
    }
  }
}

</script>