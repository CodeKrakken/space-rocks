<template>
  <div id="app">
    <Background />
    <Nav @select-tab="selectTab" @toggle-login="toggleLogin" :loggedIn="loggedIn" />
    <div id="main-content">
      <div v-show="selectedTab === 'Search'">
        <IdSearch @set-id-result="setIdResult" />
        <div v-if="showIdResults === true">
          <IdResults :asteroid="asteroid" />
        </div>
        <div v-else>
          <DateSearch @save-asteroid="saveAsteroid" :loggedIn="loggedIn" />
        </div>
      </div>
      <div v-show="selectedTab === 'Browse'"><Browse /></div>
      <div v-show="selectedTab === 'Profile'">
        <div v-if="loggedIn === 'true'"><Profile :asteroids="asteroids" /></div>
        <div v-else><Login @toggle-login="toggleLogin" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import Background from './components/Background.vue'
import Browse from './components/Browse.vue'
import Nav from './components/Nav.vue'
import DateSearch from './components/DateSearch.vue'
import Login from './components/Login.vue'
import Profile from './components/Profile.vue'
import { db } from '@/firebase'
import * as fb from './firebase' 
import IdSearch from './components/IdSearch.vue'
import IdResults from './components/IdResults.vue'

export default {
  name: 'App',
  components: {
    Nav,
    Background,
    Browse,
    DateSearch,
    Login,
    Profile,
    IdSearch,
    IdResults
  },
  data() {
    return {
      selectedTab: (sessionStorage.tab || 'Search'),
      loggedIn: sessionStorage.loggedIn || false,
      asteroids: [],
      asteroid: {},
      showIdResults: false
    }
  },
  beforeUpdate() {
    this.updateLogin()
  },
  created() {
    this.getAsteroids()
  },
  methods: {
    getAsteroids() {
      db.collection('asteroids').where('userId', '==', fb.auth.currentUser.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {  
          this.asteroids.push(doc.data()) 
        })
        this.asteroids.sort((a, b) => { return parseFloat(b.createdOn) - parseFloat(a.createdOn) })
      })
    },
    selectTab(tab) {
      this.selectedTab = tab
      sessionStorage.tab = tab
    },
    updateLogin() {
      this.loggedIn = sessionStorage.loggedIn
    },
    toggleLogin(status) {
      this.asteroids = []
      this.getAsteroids()
      this.loggedIn = status
      sessionStorage.loggedIn = status
    },
    saveAsteroid(asteroid) {
      this.$store.dispatch('saveAsteroid', { content: asteroid })
      this.asteroids.push(
        {
          'createdOn': new Date(),
          'userId': fb.auth.currentUser.uid,
          'userName': '',
          'asteroid': asteroid
        }
      )
    },
    setIdResult(asteroid) {
      this.asteroid = asteroid
      this.showIdResults = true
    } 
  },
}
</script>

<style>

  @viewport { width: device-width }

  @font-face {
    font-family: 'Odibee Sans';
    src: url('../public/Odibee_Sans/OdibeeSans-Regular.ttf') format('truetype');
  }

  #app {
    font-family: 'Odibee Sans';
    letter-spacing: 0.1em;
    color: white;
  }

  #main-content {
  text-align: center;
  font-size: 150%;
  padding-left: 15%;
  padding-right: 15%;
}

</style>
