<template>
<q-page class="row justify-center items-center" style="background:#f3f3f3">

    <div class="row q-pa-xl" style="background: linear-gradient(90deg, rgba(242,111,67,1) 0%, rgba(236,168,36,1) 100%); border-radius: 10px;">
      <q-card square dark class="login-box q-pa-xs q-ma-none bg-transparent no-box-shadow" style="">

        <q-card-section v-if="!verified && !showOtp">
          <p class="text-white text-center">We require a verified phone number in order to make our platform more secure</p>
          <q-select style="margin-bottom: 10px;" dark  square filled v-model="countryCode" :options="contries" label="Choose Country" />
          <q-input dark  square filled clearable v-model="phoneNumber" type="text" label="Enter Phone Number" >
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
          <div class="col-12 text-center q-mt-md">
            <q-btn outline color="white" class="no-shadow" style="height:45px; padding: 0 55px" label="Continue" @click="verifyPhone" />
          </div>
        </q-card-section>

        <q-card-section v-if="!verified && showOtp">
          <p class="text-white text-center">Please enter otp code from SMS</p>
          <q-input dark  square filled clearable v-model="otp" type="text" label="OTP Code" >
            <template v-slot:prepend>
              <q-icon name="code" />
            </template>
          </q-input>
          <div class="col-12 text-center q-mt-md">
            <q-btn outline color="white" class="no-shadow" style="height:45px; padding: 0 55px" label="Continue" @click="goToReg" />
          </div>
        </q-card-section>

        <q-card-section v-else-if="verified && !showOtp">
          <p class="text-white text-center">Please fill all fields to register new account</p>
          <q-form class="q-gutter-md q-mt-md">
            <q-input dark dense square filled clearable v-model="email" type="text" label="Email" >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
            <q-input dark dense square filled clearable v-model="firstName" type="text" label="First Name" >
              <template v-slot:prepend>
                <q-icon name="add" />
              </template>
            </q-input>
            <q-input dark dense square filled clearable v-model="lastName" type="text" label="Last Name" >
              <template v-slot:prepend>
                <q-icon name="add" />
              </template>
            </q-input>
            <q-input dark dense square filled clearable v-model="password1" type="password" label="Password" >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <q-input dark dense square filled clearable v-model="password2" type="password" label="Password Again" >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
          </q-form>
          <div class="col-12 text-center q-mt-md">
            <q-btn outline color="white" class="no-shadow" style="height:45px; padding: 0 55px" label="Submit" @click="registerUser" />
          </div>
        </q-card-section>
        <q-separator />
        <div class="row q-pt-md" v-if="showSocial">
          <div class="col-md-6 col-xs-12 text-center" style="margin-top:10px">
            <q-btn outline color="white" class="no-shadow" style="height:35px" label="Continue With Facebook" @click="auth('facebook')" />
          </div>
          <div class="col-md-6 col-xs-12 text-center" style="margin-top:10px">
            <q-btn outline color="white" class="no-shadow" style="height:35px" label="Continue With Google" @click="auth('google')" />
          </div>
        </div>
        <div class="col-12 text-center q-mt-md" v-if="showOtp || verified">
          <q-btn flat color="white" class="no-shadow" style="height:45px; padding: 0 55px" label="Reset" @click="cleanAll" />
        </div>

      </q-card>

    </div>

</q-page>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      showOtp: false,
      showSocial: true,
      verified: false,
      phoneNumber: '',
      otp: '',
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: '',
      contries: [],
      countryCode: ''
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
          this.$router.push('/')
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
    goToReg () {
      if (!this.otp) {
        this.$q.notify({
          message: 'Please enter a OTP Code.',
          icon: 'announcement'
        })
      } else {
        this.verified = true
        this.showOtp = false
      }
    },
    renderCountries () {
      const countryTelData = require('country-telephone-data')
      const countries = countryTelData.allCountries
      const result = []
      countries.forEach(country => {
        result.push({
          value: country.dialCode,
          label: `${country.name} +${country.dialCode}`
          // name: country.name
        })
      })
      this.contries = result
    },
    verifyPhone () {
      if (!this.phoneNumber || !this.countryCode.value) {
        this.$q.notify({
          message: 'Please enter a valid phone number.',
          icon: 'announcement'
        })
        return
      }
      const formData = {
        phone_number: '+' + this.countryCode.value + this.phoneNumber
      }

      this.$axios.post('get-otp/', formData)
        .then(res => {
          console.log(res.data)
          this.showSocial = false
          this.showOtp = true
        })
        .catch(e => {
          this.$q.notify({
            message: 'Error. Please try again.',
            icon: 'announcement'
          })
          console.log(e)
          console.log(e.response)
        })
    },
    registerUser () {
      const formData = {
        email: this.email,
        phone_number: '+' + this.countryCode.value + this.phoneNumber,
        otp: this.otp,
        first_name: this.firstName,
        last_name: this.lastName,
        password1: this.password1,
        password2: this.password2
      }

      Axios.post('https://s4fe.herokuapp.com/rest-auth/registration/', formData)
        .then(res => {
          console.log(res.data)
          this.$q.notify({
            message: 'You have successfully registered',
            icon: 'announcement'
          })
          this.$router.push('/login')
        })
        .catch(e => {
          const errors = e.response.data
          for (const [key, value] of Object.entries(errors)) {
            const name = key
            const text = value
            this.$q.notify({
              message: name.charAt(0).toUpperCase() + name.slice(1) + ' : ' + text,
              icon: 'announcement'
            })
            console.log(`${key}: ${value}`)
          }
          console.log(e)
          console.log(e.response)
        })
    },
    cleanAll () {
      this.verified = false
      this.showOtp = false
      this.showSocial = true
      this.countryCode = ''
      this.phoneNumber = ''
      this.otp = ''
      this.email = ''
      this.firstName = ''
      this.lastName = ''
      this.password1 = ''
      this.password2 = ''
    }
  },
  created () {
    this.renderCountries()
  }
}
</script>
