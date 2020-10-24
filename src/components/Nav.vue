<template>
  <div id="nav">
    <h1>Space Rocks.</h1>
    <div id="tabs">
      <span
        v-for="(tab, index) in tabs"
        @click="selectTab(tab)"
        :key="index"
      >
        <a 
          class="tab" 
          :id="tab"
        >
          {{ tab }}
        </a>
      </span>
      <span 
        v-if="loggedIn === 'true'"
        @click="logOut()">
        <a class="tab">
          Log Out
        </a>
      </span>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      tabs: [
        'Search',
        'Browse',
        'Profile'
      ],
      // loggedIn: sessionStorage.loggedIn
    }
  },

  methods: {
    selectTab(tab) {
      this.$emit('select-tab', tab)
    },
    logOut() {
      sessionStorage.loggedIn = false
      this.$emit('toggle-login', false)
    },
    updateLogin() {
      this.loggedIn = sessionStorage.loggedIn
    }
  },
  
  beforeUpdate() {
    this.updateLogin()
  },

  props: {
    loggedIn: {
      type: String,
      required: true
    }
  }
}

</script>

<style scoped>

#nav {
  text-align: center;
  font-size: 200%;
}

.tab {
  filter: brightness(50%);
  background: transparent;
  color: rgb(0, 174, 239);
  transition: all 0.1s ease;
}

.tab:hover {
  cursor: pointer;
  filter: brightness(75%);
  transition: all 0.2s ease;
}

.tab:active {
  filter: brightness(100%);
  transition: all 0.1s ease;
}

</style>