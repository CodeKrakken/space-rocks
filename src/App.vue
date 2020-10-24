<template>
  <div id="app">
    <Background />
    <Nav @select-tab="selectTab" @toggle-login="toggleLogin" :loggedIn="loggedIn" />
    <div id="main-content">
      <div v-show="selectedTab === 'Search'"><Search @save-asteroid="saveAsteroid" :loggedIn="loggedIn" /></div>
      <div v-show="selectedTab === 'Browse'">Browse Page</div>
      <div v-show="selectedTab === 'Profile'">
        <div v-if="loggedIn === 'true'"><Profile :asteroids="asteroids" /></div>
        <div v-else><Login @toggle-login="toggleLogin" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import Background from './components/Background.vue'
import Nav from './components/Nav.vue'
import Search from './components/Search.vue'
import Login from './components/Login.vue'
import Profile from './components/Profile.vue'

export default {
  name: 'App',
  components: {
    Nav,
    Background,
    Search,
    Login,
    Profile
  },
  data() {
    return {
      selectedTab: (sessionStorage.tab || 'Search'),
      loggedIn: sessionStorage.loggedIn || false,
      asteroids: []
    }
  },
  beforeUpdate() {
    this.updateLogin()
  }, 
  methods: {
    selectTab(tab) {
      this.selectedTab = tab
      sessionStorage.tab = tab
    },
    updateLogin() {
      this.loggedIn = sessionStorage.loggedIn
    },
    toggleLogin(status) {
      this.loggedIn = status
      sessionStorage.loggedIn = status
    },
    saveAsteroid(id, name) {
      this.asteroids.push(
        {
          "id": id,
          "name": name
        }
      )
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
