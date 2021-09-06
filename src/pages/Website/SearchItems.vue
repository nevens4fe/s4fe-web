<template>
  <div>
    <q-page class="" style="background:#f3f3f3">

      <q-header style="background: #f3f3f3; padding:15px" >
        <q-toolbar>
          <a href="/">
            <img
              alt="App logo"
              style="margin-left: 30px"
              width="100px"
              src="~assets/S4FE_Logo.png"
              class="desktop-only"
            >
          </a>
          <q-input  rounded outlined clearable v-model="search" style="margin-left: 50px; width: 40%" type="text" class="mobile-full" label="Insert serial number">
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
                <div v-for="(item, index) in foundItems" :key="item.title" :class="index == foundItems.length -1 ? '' : 'lost-item'">
                  <h3 style="margin-bottom: 25px !important;">{{ item.title }}</h3>
                  <span>Status:</span>
                  <h6 class="q-ma-none q-mb-lg">{{ item.status }}</h6>
                  <q-btn outline color="white" class="no-shadow" style="height:35px" label="Contact Owner" @click="openModal(item)" />

                </div>
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
        <q-card style="width: 500px" class="desktop-size">
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
              <q-btn  color="primary" class="no-shadow full-width no-border-radius" label="SEND" style="height: 55px;" @click="sendMessage" />
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
      foundItems: [],
      loading: false,
      noData: false,
      msgModal: false,
      loggedUser: false,
      message: '',
      user_id: null
    }
  },
  methods: {
    openModal (item) {
      const token = localStorage.getItem('token')
      token ? this.loggedUser = true : this.loggedUser = false
      this.msgModal = true
      this.user_id = item.user_id
    },
    sendMessage () {
      const formData = {
        receiver: this.user_id,
        content: this.message
      }
      this.$axios.post('messages/', formData)
        .then(res => {
          console.log(res)
          this.msgModal = false
          this.user_id = null
          this.message = ''
        }).catch(e => {
          console.log(e)
          this.user_id = null
          this.message = ''
        })
    },
    goAccess () {
      const token = localStorage.getItem('token')
      token ? this.$router.push('/home') : this.$router.push('/login')
    },
    searchItems () {
      this.loading = true
      this.$axios.get('search?serial=' + this.search)
        .then(res => {
          this.foundItems = res.data
          this.loading = false
          this.noData = false
        })
        .catch(e => {
          this.foundItems = []
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
    this.foundItems = this.items
  }
}
</script>

<style>
.q-btn__wrapper:before {
  box-shadow: none !important;
}
.lost-item {
  padding-bottom: 25px;
  border-bottom: 2px solid rgba(255,242,242, 0.5);
}
@media only screen and (max-width: 600px) {
  .mobile-full {
    margin: 5px !important;
    width: 100% !important;
  }
}
</style>
