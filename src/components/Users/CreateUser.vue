<template>
  <div>
    <q-dialog v-model="opened" position="right">
      <q-card style="width: 60vw">
        <q-toolbar class="bg-primary text-grey-1">
          <q-toolbar-title>Create new user</q-toolbar-title>
<!--          <q-btn flat round dense icon="close" v-close-popup />-->
        </q-toolbar>

        <q-card-section>
          <q-form
            @submit="createUser"
            class="q-gutter-md"
          >
            <div class="row q-col-gutter-sm">
              <div class="col-xs-12 col-sm-6">
                <q-input
                  filled
                  v-model="firstName"
                  label="First name"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'This field is required']"
                />
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  filled
                  v-model="lastName"
                  label="Last name"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'This field is required']"
                />
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  filled
                  v-model="userName"
                  label="Username"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'This field is required']"
                />
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  filled
                  v-model="email"
                  label="Email address"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'This field is required']"
                />
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  type="password"
                  filled
                  v-model="password"
                  label="Password"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'This field is required']"
                />
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  filled
                  v-model="phone"
                  label="Phone"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'This field is required']"
                />
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  filled
                  v-model="plexUsername"
                  label="Plex username"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'This field is required']"
                />
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  type="password"
                  dark
                  filled
                  v-model="plexPassowrd"
                  label="Plex password"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'This field is required']"
                />
              </div>
            </div>
            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      opened: false,
      firstName: 'John',
      lastName: 'Doe',
      userName: 'jdoe',
      email: 'j@j.com',
      password: 'jdoe123',
      phone: '45454545',
      plexUsername: 'jdoe',
      plexPassowrd: 'jdoe123',
      role: ''
    }
  },
  methods: {
    createUser () {
      console.log('create user')
      const formData = {
        first_name: this.firstName,
        last_name: this.lastName,
        username: this.userName,
        email: this.email,
        password: this.password,
        phone: this.phone,
        plex_username: this.plexUsername,
        plex_password: this.plexPassowrd,
        role: this.role
      }
      console.log(formData)
      this.$axios.post('user/new', formData)
        .then(() => {
          this.$emit('addedUser')
          this.opened = false
          this.resetForm()
          this.$q.notify({
            type: 'positive',
            message: 'New user added successfully!'
          })
        })
        .catch(e => {
          let errors = ''
          const response = e.response

          if (response.data.error) {
            response.data.error.forEach(error => {
              errors = error.message
            })
          }
          this.$q.notify({
            type: 'negative',
            message: errors
          })
          console.log(e)
          console.log(e.response)
        })
    },
    resetForm () {
      this.firstName = ''
      this.lastName = ''
      this.userName = ''
      this.email = ''
      this.password = ''
      this.phone = ''
      this.plexUsername = ''
      this.plexPassowrd = ''
      this.role = ''
    }
  }
}
</script>
