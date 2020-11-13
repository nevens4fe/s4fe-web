<template>
  <q-page
    class="row justify-center items-center" style="background:#fff"
  >
    <div class="container" style="margin:0 10%">
      <div class="row q-pa-xl justify-center" style="padding-bottom: 5px !important;" >
        <div class="col-md-12 q-pa-xl " style="background: white; padding-bottom: 5px !important;">
          <q-card square dark class="login-box q-pa-xs q-ma-none bg-transparent no-box-shadow">
            <q-card-section class="text-grey-8">
              <h2 class="q-ma-none text-bold" style="color:black">Our Partners</h2>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-12 q-ma-md" style="background: white; margin-bottom: 20px !important;">
          <p style="font-size:1.3em; color:gray;">
            The beauty of S4FE is that every type of entity can be used, including the government, commercial enterprises, and individuals. S4FE has formed strategic partnerships with various entities to help fight crime around the world. Some of our partners include:
          </p>
        </div>
        <div class="col-md-12 q-ma-md" style="background: white">
          <ul>
            <li style="font-size:1.3em; color:gray;">
              <span style="font-weight: bold">Governments</span> – Geographical borders restrict global crime—the market for stolen and counterfeit items on an advanced international market level. However, the free flow of information between the international market is significantly impaired. S4FE is a much needed 3rd party partner for public authorities to help independently verify items without the bureaucracy that hampers the fight against crime.
            </li>
            <li style="font-size:1.3em; color:gray;">
              <span style="font-weight: bold">Insurance companies</span> - Using S4FE, these companies can have a digital safe for the insured items. In this way, it will be easy to recover any stolen items that have been registered on the S4FE network which ultimately lowers their overall insurance cost. It will also create value addition for their clients.
            </li>
            <li style="font-size:1.3em; color:gray;">
              <span style="font-weight: bold">Commercial entities</span> – Businesses and corporations can diversify their portfolio through a partnership with S4FE. Through the connection to the S4FE network, these retail partners, such as insurance and logistics companies, can provide value to their customers, helping in overall brand growth.
            </li>
            <li style="font-size:1.3em; color:gray;">
              <span style="font-weight: bold">Manufacturers</span> – Since S4FE allows manufacturers to encrypt a code into their product, it's now possible to trace their goods along the supply chain. Through S4FE technology, manufacturers will protect their goods against theft and guard against product piracy.
            </li>
            <li style="font-size:1.3em; color:gray;">
              <span style="font-weight: bold">Individuals</span> – Through registration on the S4FE network, individuals can protect their prized possessions such as luxury goods and high-value items. Using S4FE, a person can conveniently track their items from anywhere in the globe.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'BecomePartner',
  methods: {
    goAccess () {
      const token = localStorage.getItem('token')
      token ? this.$router.push('/') : this.$router.push('/login')
    }
  }
}
</script>
