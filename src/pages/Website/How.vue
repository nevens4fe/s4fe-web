<template>
  <q-page
    class="row justify-center items-center" style="background:#fff"
  >
    <div class="container" style="margin:0 10%">
      <div class="row q-pa-xl justify-center" style="padding-bottom: 5px !important;" >
        <div class="col-md-12 q-pa-xl " style="background: white; padding-bottom: 5px !important;">
          <q-card square dark class="q-pa-xs q-ma-none bg-transparent no-box-shadow">
            <q-card-section class="text-grey-8">
              <h2 class="q-ma-none text-bold" style="color:black">How Does S4FE Work?</h2>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-12 q-ma-md" style="background: white; margin-bottom: 20px !important;">
          <p style="font-size:1.3em; color:gray;">
            The whole idea behind S4FE is the verification of registered items on the network. Since things are mostly stolen to be resold, the goods lose their commercial value once their authenticity fails. A user signs up on the S4FE system and registers their items using the item's unique characteristics such as an IMEI or serial number. The individual item's unique features are then stored in a blockchain, which allows verification by anyone on the network at any time.
          </p>
        </div>
        <div class="col-md-12 q-ma-md" style="background: white">
          <p style="font-size:1.3em; color:gray;">
            The S4FE network has a series of innovative tracking and positioning devices that apply technologies such as GPS, GSM, RFID, and NFC to track and trace items. The tracker hidden inside the object can be accessed in realtime on a map on the S4FE app from anywhere in the globe.
          </p>
        </div>
        <div class="col-md-12 q-ma-md" style="background: white">
          <p style="font-size:1.3em; color:gray;">
            The S4FE trackers can also be used to authenticate objects. S4FE transceiver chips are encrypted into objects and secured with an encryption signal, scanned using the S4FE app. To identify a counterfeit, users can hold their smartphone against the item to verify whether it matches the manufacturer's signal.
          </p>
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
