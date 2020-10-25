import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    asteroids: [],
    name: ''
  },
  mutations: {
    setAsteroids(state, val) {
      state.asteroids = val
    }
  },
  actions: {
    async saveAsteroid({ state }, asteroidPackage) {
      console.log(asteroidPackage)
      await fb.asteroidsCollection.add({
        createdOn: new Date(),
        userId: fb.auth.currentUser.uid,
        userName: state.name,
        asteroid: asteroidPackage.content
      })
    },
  },
  modules: {
  }
})

export default store

fb.asteroidsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let asteroidsArray = []

  snapshot.forEach(doc => {
    let asteroid = doc.data()
    asteroid.id = doc.id

    asteroidsArray.push(asteroid)
  })

  store.commit('setAsteroids', asteroidsArray)
})
