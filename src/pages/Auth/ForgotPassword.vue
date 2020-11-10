<template>
<q-page class="row justify-center items-center" style="background:#f3f3f3">

  <div class="row q-pa-xl" style="background: linear-gradient(90deg, rgba(242,111,67,1) 0%, rgba(236,168,36,1) 100%); border-radius: 10px;">
    <q-card square dark class="login-box q-pa-xs q-ma-none bg-transparent no-box-shadow" style="width:480px;">
      <q-card-section v-if="!showMessage">
        <p class="text-white text-center">Enter your email and we will send you instructions</p>
        <q-input dark  square filled clearable v-model="email" type="text" label="Email" >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
        <div class="col-12 text-center q-mt-md">
          <q-btn outline color="white" class="no-shadow" style="height:45px; padding: 0 55px" label="Submit" @click="resetPass" />
        </div>
      </q-card-section>
      <q-card-section v-else>
        <div class="col-12 text-center q-mt-md">
          <p>Password reset e-mail has been sent.</p>
        </div>
      </q-card-section>
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
      email: '',
      showMessage: false
    }
  },
  methods: {
    resetPass () {
      const formData = {
        email: this.email
      }
      Axios.post('https://s4fe.herokuapp.com/rest-auth/password/reset/', formData)
        .then(res => {
          console.log(res.data)
          this.showMessage = true
        })
        .catch(e => {
          this.$q.notify({
            message: 'Wrong email.',
            icon: 'announcement'
          })
          console.log(e)
          console.log(e.response)
        })
    }
  }
}
</script>
