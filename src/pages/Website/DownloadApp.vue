<template>
  <q-page
    class="row justify-center items-center" style="background:#fff"
  >
    <div class="container">
      <div class="row q-pa-xl justify-center" style="padding-bottom: 5px !important;" >
        <div class="col-md-12 text-center " style="background: white; padding-bottom: 5px !important;">
          <q-card square dark class="login-box q-pa-xs q-ma-none bg-transparent no-box-shadow">
            <h4 class="text-primary text-bold q-ma-none">Download S4FE</h4>
            <q-card-section class="text-grey-8">
              <qrcode-vue :value="value" size="200" level="H"></qrcode-vue>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'DownloadApp',
  components: { QrcodeVue },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    goAccess () {
      const token = localStorage.getItem('token')
      token ? this.$router.push('/') : this.$router.push('/login')
    }
  },
  mounted () {
    console.info('App this router:', window.location)
    this.value = window.location.href
    if (this.$q.platform.is.android) {
      window.location = 'https://play.google.com/store'
    } else if (this.$q.platform.is.ios) {
      window.location = 'https://www.apple.com/app-store/'
    }
  }
}
</script>
