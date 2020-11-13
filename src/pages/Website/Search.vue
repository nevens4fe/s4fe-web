<template>
  <div>
    <q-page
      class="row justify-center items-center" style="background:#f3f3f3" v-if="!startSearch"
    >

      <div class="column" >
        <q-card-section class="q-mt-xs">
          <img
            alt="App logo"
            width="230px"
            style="display:block; margin:auto"
            v-if="!$q.platform.is.mobile"
            src="~assets/S4FE_Logo.png"
          >
        </q-card-section>
        <div class="row">
          <q-card square  class="login-box q-pa-xs q-ma-none bg-transparent no-box-shadow" :style="$q.platform.is.mobile ? 'width: 90vw' : ''">

            <q-card-section >
              <q-input  rounded outlined clearable v-model="search" type="text" label="Type serial number">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
              <div class="row">
                <div class="col-md-6 col-xs-12 text-center">
                  <q-btn size="md" rounded color="primary" class="no-shadow q-ml-md q-mt-md" style="height:45px; padding: 0 16px"  @click="startScreen" >
                    <span v-if="!loading" >S4FE SEARCH</span>
                    <q-spinner-hourglass
                      v-else
                      color="white"
                      size="1.5em"
                    />
                  </q-btn>
                </div>
                <div class="col-md-6 col-xs-12 text-center">
                  <q-btn
                    size="md"
                    rounded
                    color="primary"
                    class="no-shadow q-mr-md q-mt-md desktop-only"
                    style="height:45px; padding: 0 16px"
                    label="Report Item"
                    @click="goAccess"
                  />
                </div>
              </div>
            </q-card-section>

          </q-card>

        </div>
      </div>

    </q-page>

    <search-items v-else :searchSerial="search" :items="item" />

  </div>
</template>

<script>
import SearchItems from './SearchItems'

export default {
  name: 'Search',
  components: { SearchItems },
  data () {
    return {
      search: '',
      startSearch: false,
      item: [],
      loading: false
    }
  },
  methods: {
    goAccess () {
      const token = localStorage.getItem('token')
      token ? this.$router.push('/home') : this.$router.push('/login')
    },
    startScreen () {
      this.loading = true
      this.$axios.get('search?serial=' + this.search)
        .then(res => {
          this.item = res.data
          this.startSearch = true
          this.loading = false
        })
        .catch(e => {
          this.loading = false
          this.$q.notify({
            message: e.response.data.status,
            icon: 'announcement'
          })
          console.log(e)
          console.log(e.response)
        })
    }
  }
}
</script>

<style>
.q-btn__wrapper:before {
  box-shadow: none !important;
}
@media only screen and (min-width: 600px) {
  .login-box {
    width: 580px;
  }
}
</style>
