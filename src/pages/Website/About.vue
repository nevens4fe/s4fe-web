<template>
  <q-page
    class="row justify-center items-center" style="background:#fff"
  >
    <div class="container" style="margin:0 10%">
      <div class="row q-pa-xl justify-center" style="padding-bottom: 5px !important;" >
        <div class="col-md-12 q-pa-xl text-center " style="background: white; padding-bottom: 5px !important;">
          <q-card square dark class="login-box q-pa-xs q-ma-none bg-transparent no-box-shadow">
            <q-card-section class="text-grey-8">
              <h2 class="q-ma-none text-bold" style="color:black">About Safe</h2>
              <span style="font-size:1.5em">Why is S4FE important ?</span>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-12 q-ma-md" style="background: white; margin-bottom: 20px !important;">
          <p style="font-size:1.3em">S4FE’s goal is to provide a solution to the dramatic increase in theft, trade in and fencing of personal property by the creation of a platform that will decrease the number and value of stolen and lost items.</p>
        </div>
        <div class="col-md-12 q-ma-md" style="background: white">
            <p style="font-size:1.3em; color:gray;">S4FE is the world’s first blockchain-based global database for the registration and identification of stolen and lost items. The database is accessible to everyone and enables users to register and search for property. The types of property include electronic devices, jewelry, personal collections, documents, sports and hobby equipment, vehicles and machines and any other conceivable item representing value to its owner.</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'About',
  methods: {
    goAccess () {
      const token = localStorage.getItem('token')
      token ? this.$router.push('/') : this.$router.push('/login')
    }
  }
}
</script>
