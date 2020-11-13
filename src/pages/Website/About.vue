<template>
  <q-page
    class="row justify-center items-center" style="background:#fff"
  >
    <div class="container" style="margin:0 10%">
      <div class="row q-pa-xl justify-center" style="padding-bottom: 5px !important;" >
        <div class="col-md-12 q-pa-xl " style="background: white; padding-bottom: 5px !important;">
          <q-card square dark class="q-pa-xs q-ma-none bg-transparent no-box-shadow">
            <q-card-section class="text-grey-8">
              <h2 class="q-ma-none text-bold" style="color:black">About Safe</h2>
              <span style="font-size:1.5em">Did you know that over 12,000 laptops disappear every week in US airports?</span>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-12 q-ma-md" style="background: white; margin-bottom: 20px !important;">
          <p style="font-size:1.3em; color:gray;">
            Worse still, over 5.5 million burglaries are reported every year around the world? The truth is, the statistics of theft and crime are alarming while the tactics used to steal are getting sophisticated by the day.
          </p>
          <p style="font-size:1.3em; color:gray;">
            Protection of property, whether intellectual, physical, or digital, is paramount. With an innovative product such as S4FE, one will always be at peace since an item's security is guaranteed
          </p>
        </div>
        <div class="col-md-12" style="background: white">
          <h4>What is S4FE?</h4>
            <p style="font-size:1.3em; color:gray;">
              S4FE is an advanced, decentralized network that helps prevent global theft using a blockchain-based database. Similar to a search engine, S4FE users can register and track their physical items and properties on the network.
            </p>
            <p style="font-size:1.3em; color:gray;">
              The advanced technology used in the development of S4FE product has a myriad of applications such as verification of items' ownership status, prevention of product piracy, and proof of objects' authenticity.
            </p>
          <p style="font-size:1.3em; color:gray;">
              At the moment, S4FE has three applications that are changing the game of fighting crime. One is the S4FE portable tracker that has multiple applications. There's also the S4FE Pet Tracker, a cosy bracelet to keep track of cats and dogs. There's also the S4FE Luggage Tracker, designed for frequent travellers to help keep track of their personal belongings.
            </p>
        </div>

        <div class="col-md-12" style="background: white">
          <h4>S4FE Reward System</h4>
          <p style="font-size:1.3em; color:gray;">
            There's the S4FE Reward System, which is designed to encourage users to remain active in the network through the promotion of community participation in fighting crime. The reward system awards users that discover a stolen property. Better yet, if the discovery leads to the recovery of the stolen objects, a further reward is given.
          </p>
          <p style="font-size:1.3em; color:gray;">
            For sure, S4FE is a revolution that helps fight global crime an item at a time. It offers verification processes that haven't been available before. With S4FE, users can rest easy knowing a dependable technology has their back.
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
