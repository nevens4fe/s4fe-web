<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-header style="background: #f3f3f3;" class="q-pa-md">
        <q-toolbar>
          <img
            alt="App logo"
            style="width: 140px !important; display:block; margin:auto"
            src="~assets/S4FE_Logo.png"
          >
          <q-toolbar-title class="desktop-only"></q-toolbar-title>

          <q-btn flat color="primary" v-if="!$q.platform.is.mobile" icon="search" :label="$q.platform.is.mobile ? '' : 'S4FE Search'" @click="$router.push('/')"/>
          <q-btn flat color="primary" v-if="!$q.platform.is.mobile" icon="transform" :label="$q.platform.is.mobile ? '' : 'Transactions'" @click="$router.push('/transactions')"/>
          <q-btn flat color="primary" v-if="!$q.platform.is.mobile" icon="shopping_cart" :label="$q.platform.is.mobile ? '' : 'S4FE Shop'" @click="openUrl('https://s4fe-shop.io/')"/>
          <q-btn flat color="primary" v-if="!$q.platform.is.mobile" icon="airplay" :label="$q.platform.is.mobile ? '' : 'Access App'" @click="goAccess"/>
          <q-btn flat color="primary" v-if="$q.platform.is.mobile" @click="drawer = !drawer" round dense icon="menu" />

        </q-toolbar>
      </q-header>
      <router-view />
      <q-drawer
        side="right"
        v-model="drawer"
        show-if-above
        v-if="$q.platform.is.mobile"
        :width="200"
        :breakpoint="700"
        elevated
        content-class="bg-primary text-white"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <h6 class="text-center">S4FE Menu</h6>
            <q-btn flat color="white"  icon="search" label="S4FE Search" @click="$router.push('/')"/>
            <q-btn flat color="white" icon="airplay" label="Access App" @click="goAccess"/>
            <q-btn flat color="white" icon="transform" label="Transactions" @click="$router.push('/transactions')"/>
            <q-btn flat color="white" label="About S4fe" style="margin-top:20px" @click="$router.push('/about')"/>
            <q-btn flat color="white" label="How S4fe works" @click="$router.push('/how-it-works')"/>
            <q-btn flat color="white" label="Become a partner" @click="$router.push('/become-partner')"/>
            <q-btn flat color="white" label="Terms"  @click="$router.push('/terms')"/>
            <q-btn flat color="white" label="Privacy" @click="openUrl('http://localhost:8080/statics/Privacy-Policy_S4FE.pdf')"/>
<!--            <q-btn flat color="white" label="Download App" @click="$router.push('/app')"/>-->
          </div>
        </q-scroll-area>
      </q-drawer>
      <q-footer v-if="!$q.platform.is.mobile" style="background:#f3f3f3" class="q-pa-md">
        <q-btn flat color="primary" label="About S4fe" @click="$router.push('/about')"/>
        <q-btn flat color="primary" label="How S4fe works" @click="$router.push('/how-it-works')"/>
        <q-btn flat color="primary" label="Become a partner" @click="$router.push('/become-partner')"/>
        <q-btn flat color="primary" label="Terms" style="float:right" @click="$router.push('/terms')"/>
        <q-btn flat color="primary" label="Privacy" style="float:right" @click.native="openUrl('https://s4fe.org/statics/Privacy-Policy_S4FE.pdf')"/>
<!--        <q-btn flat color="primary" label="Download App" style="float:right" @click="$router.push('/app')"/>-->
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'MainLayout',
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    goAccess () {
      const token = localStorage.getItem('token')
      token ? this.$router.push('/home') : this.$router.push('/login')
    },
    openUrl (url) {
      openURL(url)
    }
  }
}
</script>
