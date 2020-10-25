<template>
  <form v-if="showLoginForm" @submit.prevent>
    <div>
      <input v-model.trim="loginForm.email" type="text" placeholder="email" id="email1" />
    </div>
    <div>
      <input v-model.trim="loginForm.password" type="password" placeholder="password" id="password1" />
    </div>
    <button @click="login()" class="button">Log In</button>
    <div class="extras">
      <!-- <div class="extras">
        <a @click="togglePasswordReset()">Forgot Password</a>
        </div> -->
      <a @click="toggleForm()">Sign up</a>
    </div>
  </form>
  <form v-else @submit.prevent>
    <div>
      <input v-model.trim="signupForm.email" type="text" placeholder="email" id="email2" />
    </div>
    <div>
      <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />
    </div>
    <button @click="signup()" class="button">Sign Up</button>
    <div class="extras">
      <a @click="toggleForm()">Log In</a>
    </div>
  </form>
</template>

<script>
  // import PasswordReset from '@/components/PasswordReset'
  import * as fb from '../firebase'

  export default {
    data() {
      return {
        loginForm: {
          email: '',
          password: ''
        },
        signupForm: {
          email: '',
          password: ''
        },
        showLoginForm: true,
        showPasswordReset: false,
        userProfile: {}
      }
    },
    methods: {
      async signup() {
        const { user } = await fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password)
        fb.usersCollection.doc(user.uid).set({
          email: this.signupForm.email,
          password: this.signupForm.password
        })
        this.login()
      },
      async login() {
        const { user } = await fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
        this.fetchUserProfile(user)
      },
      async fetchUserProfile(user) {
        const userProfile = await fb.usersCollection.doc(user.uid).get()
        this.userProfile = userProfile.data()
        sessionStorage.loggedIn = true
        this.$emit('toggle-login', true)
      },
      toggleForm() {
        this.showLoginForm = !this.showLoginForm
      },
      togglePasswordReset() {
        this.showPasswordReset = !this.showPasswordReset
      }
    }
  }
</script>