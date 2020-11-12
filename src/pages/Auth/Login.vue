<template>
  <q-page
    class="row justify-center items-center" style="background:#f3f3f3"
  >

    <div class="column" >

      <div class="row q-pa-xl" style="background: linear-gradient(90deg, rgba(242,111,67,1) 0%, rgba(236,168,36,1) 100%); border-radius: 10px;">
        <q-card square dark class="login-box q-pa-xs q-ma-none bg-transparent no-box-shadow" style="">
          <img
            alt="App logo"
            style="width: 240px !important; display:block; margin:auto"
            v-if="!$q.platform.is.mobile"
            src="~assets/S4FE_Logo_white.png"
          >
          <q-card-section class="text-grey-8">
            <q-form class="q-gutter-md q-mt-xl">
              <q-input dark square filled clearable v-model="email" style="height: 35px" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input dark square filled clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions>
            <div class="row full-width items-center">
              <div class="col-12 text-center">
                <q-btn outline color="white" class="no-shadow q-mb-md" style="height:45px; padding: 0 55px" label="Login" @click="login" />
              </div>
              <q-separator color="transparent" class="q-mb-md"/>
              <div class="col-6">
                <a  @click="$router.push('/register')" class="cursor-pointer text-no-wrap text-white text-left">Sign up</a>
              </div>
              <div class="col-6">
                <a  @click="$router.push('/forgot-password')" class="cursor-pointer text-no-wrap text-white text-right" style="display: block">Forgot password</a>
              </div>
              <q-separator class="q-ma-md text-left center-phone"/>
              <div class="col-md-6 col-xs-6">
                <q-btn outline color="white" icon="fab fa-facebook-f" class="no-shadow" style="height:35px; font-size: 0.8em" :label="$q.platform.is.mobile ? 'Facebook' : 'Continue With Facebook'" @click="auth('facebook')" />
              </div>
              <div class="col-md-6 col-xs-6 text-right center-phone">
                <q-btn outline color="white" icon="fab fa-google" class="no-shadow" style="height:35px; font-size: 0.8em" :label="$q.platform.is.mobile ? 'Google' : 'Continue With Google'" @click="auth('google')" />
              </div>
            </div>
          </q-card-actions>

        </q-card>

      </div>
    </div>

  </q-page>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      serial: '',
      profile: {}
    }
  },
  methods: {
    auth (network) {
      this.$hello(network).login({ scope: 'email' })
        .then((res) => {
          console.log(res)
          this.socialLogin(res.authResponse.access_token, network)
        })
    },
    socialLogin (token, network) {
      const formData = {
        access_token: token
      }
      Axios.post('https://s4fe.herokuapp.com/rest-auth/' + network + '/', formData)
        .then(res => {
          console.log(res.data)
          localStorage.setItem('token', res.data.key)
          this.$q.localStorage.set('CURRENT_USER', res.data)
          this.$router.push('/home')
        })
        .catch(e => {
          this.$q.notify({
            message: 'Wrong credentials.',
            icon: 'announcement'
          })
          console.log(e)
          console.log(e.response)
        })
    },
    login () {
      const formData = {
        email: this.email,
        password: this.password
      }
      Axios.post('https://s4fe.herokuapp.com/rest-auth/login/', formData)
        .then(res => {
          console.log(res.data)
          localStorage.setItem('token', res.data.key)
          this.$q.localStorage.set('CURRENT_USER', res.data)
          this.$router.push('/home')
        })
        .catch(e => {
          this.$q.notify({
            message: 'Wrong credentials.',
            icon: 'announcement'
          })
          console.log(e)
          console.log(e.response)
        })
    }
  }
}
</script>
<style>
@media only screen and (min-width: 600px) {
  .login-box {
    width: 480px;
  }
}
@media only screen and (max-width: 600px) {
  .q-page {
    padding:10px;
  }
}
</style>
