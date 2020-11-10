<template>
  <div>
    <q-page class="" style="background:#f3f3f3">

      <q-header style="background: #f3f3f3; padding:15px" >
        <q-toolbar>
            <img
              alt="App logo"
              style="margin-left: 30px"
              width="100px"
              src="~assets/S4FE_Logo.png"
              class="desktop-only"
            >
          <q-input  rounded outlined clearable v-model="search" style="margin-left: 50px; width: 40%" type="text" class="mobile-full" label="Type name or serial number">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn size="md" rounded color="primary" class="no-shadow q-ml-md" style="height:45px; padding: 0 16px" label="SEARCH" @click="searchItems" />
          <q-toolbar-title></q-toolbar-title>
          <q-btn class="desktop-only" flat color="primary" icon="airplay" label="Access App" @click="goAccess"/>
          <q-btn flat color="primary" icon="transform" label="Transactions" class="desktop-only" @click="$router.push('/transactions')"/>

        </q-toolbar>
      </q-header>

        <div class="row justify-center" v-if="!noData">
          <div class="col-md-6 text-center">
            <q-card  class="text-white q-pa-xs q-ma-xl no-box-shadow" style="background: linear-gradient(90deg, rgba(242,111,67,1) 0%, rgba(236,168,36,1) 100%); border-radius:15px">
              <q-card-section v-if="!loading">
               <h3 style="margin-bottom: 25px !important;">{{ item.title }}</h3>
                <span>Status:</span>
                <h6 class="q-ma-none q-mb-lg">{{ item.status }}</h6>
                <q-btn outline color="white" class="no-shadow" style="height:35px" label="Contact Owner" @click="openModal" />
              </q-card-section>
              <q-card-section v-else>
                <q-spinner-hourglass
                  v-if="loading"
                  color="white"
                  size="1.5em"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>

      <!-- Message Modal -->
      <q-dialog v-model="msgModal">
        <q-card style="min-height: 250px" class="desktop-size">
          <q-card-section class="row items-center q-pb-none q-ma-md">
            <div class="text-h6" v-if="!loggedUser">Only for App Users</div>
            <div class="text-h6" v-else>Send Message to the Owner</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section v-if="!loggedUser">
            In order to contact the owner of item you search for please <q-btn flat color="primary"  @click="$router.push('/login')">Access the App</q-btn>.
          </q-card-section>

          <q-card-section v-else class="q-ma-md q-mt-xl row">
            <div class="col-md-9">
              <q-input  square filled  v-model="message" style="height: 35px" type="email" label="Message">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
            </div>
            <div class="col-md-3">
              <q-btn  color="primary" class="no-shadow full-width no-border-radius" label="SEND" style="height: 55px;margin-top:-10px" @click="sendMessage" />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <!-- Message Modal -->

    </q-page>
  </div>
</template>

<script>

export default {
  name: 'SearchItems',
  props: ['searchSerial', 'items'],
  data () {
    return {
      search: '',
      item: [],
      loading: false,
      noData: false,
      msgModal: false,
      loggedUser: false,
      message: ''
    }
  },
  methods: {
    openModal () {
      const token = localStorage.getItem('token')
      console.log(token)
      token ? this.loggedUser = true : this.loggedUser = false
      this.msgModal = true
    },
    sendMessage () {
      const formData = {
        receiver: 1,
        content: this.message
      }
      this.$axios.post('messages/', formData)
        .then(res => {
          console.log(res)
          this.msgModal = false
        }).catch(e => {
          console.log(e)
        })
    },
    goAccess () {
      const token = localStorage.getItem('token')
      token ? this.$router.push('/') : this.$router.push('/login')
    },
    searchItems () {
      this.loading = true
      this.$axios.get('search?serial=' + this.search)
        .then(res => {
          this.item = res.data
          this.loading = false
          this.noData = false
        })
        .catch(e => {
          this.item = []
          this.noData = true
          this.loading = false
          this.$q.notify({
            message: e.response.data.status,
            icon: 'announcement'
          })
          console.log(e)
          console.log(e.response)
        })
    }
  },
  created () {
    this.search = this.searchSerial
    console.log(this.items)
    this.item = this.items
  }
}
</script>

<style>
.q-btn__wrapper:before {
  box-shadow: none !important;
}
@media only screen and (max-width: 600px) {
  .mobile-full {
    margin: 5px !important;
    width: 100% !important;
  }
}
</style>
