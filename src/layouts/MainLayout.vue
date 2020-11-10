<template>
  <q-layout view="lhh lpR fFf">
<!--    <q-drawer-->
<!--      v-model="drawer"-->
<!--      show-if-above-->
<!--      :width="250"-->
<!--      :breakpoint="400"-->
<!--      bordered-->
<!--      content-class="bg-grey-1"-->
<!--    >-->
<!--      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px;">-->
<!--        <q-list padding>-->
<!--          <q-item clickable v-ripple to="/" exact>-->
<!--            <q-item-section avatar>-->
<!--              <q-icon name="inbox" />-->
<!--            </q-item-section>-->

<!--            <q-item-section>-->
<!--              Dashboard-->
<!--            </q-item-section>-->
<!--          </q-item>-->

<!--          <q-item clickable v-ripple to="/users" exact>-->
<!--            <q-item-section avatar>-->
<!--              <q-icon name="people" />-->
<!--            </q-item-section>-->

<!--            <q-item-section>-->
<!--              Users-->
<!--            </q-item-section>-->
<!--          </q-item>-->

<!--          <q-item clickable v-ripple to="/customers" exact>-->
<!--            <q-item-section avatar>-->
<!--              <q-icon name="shopping_cart" />-->
<!--            </q-item-section>-->

<!--            <q-item-section>-->
<!--              Customers-->
<!--            </q-item-section>-->
<!--          </q-item>-->

<!--          <q-item clickable v-ripple>-->
<!--            <q-item-section avatar>-->
<!--              <q-icon name="settings" />-->
<!--            </q-item-section>-->

<!--            <q-item-section>-->
<!--              Settings-->
<!--            </q-item-section>-->
<!--          </q-item>-->

<!--        </q-list>-->
<!--      </q-scroll-area>-->

<!--      <div class="absolute-top" style="height: 150px; border-bottom: 1px solid grey">-->
<!--        <div class="absolute-bottom bg-transparent q-ml-md q-mb-md">-->
<!--          <q-avatar size="56px" class="q-mb-sm">-->
<!--            <img src="https://avatarfiles.alphacoders.com/495/thumb-49573.jpg">-->
<!--          </q-avatar>-->
<!--          <div class="text-weight-bold">Admin Kanri</div>-->
<!--          <div>@admin</div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </q-drawer>-->

    <q-page-container style="background: #fff">
      <router-view />
    </q-page-container>
    <q-footer  style="padding:8px;">
      <q-toolbar >
        <!--        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />-->
        <q-toolbar-title class="mobile-hide" >

        </q-toolbar-title>
        <q-btn color="" class="no-shadow" icon="home" :label="$q.platform.is.mobile ? '' : 'Home'"  @click="$router.push('/home')" />
        <q-btn color="" class="no-shadow" icon="search" :label="$q.platform.is.mobile ? '' : 'S4FE Search'" @click="$router.push('/')" />
        <q-btn color="" class="no-shadow" icon="transform" :label="$q.platform.is.mobile ? '' : 'Transactions'"  @click="$router.push('/transactions')" />
        <q-btn color="" class="no-shadow" icon="message" :label="$q.platform.is.mobile ? '' : 'Chat'"  @click="$router.push('/chat')" />
        <q-btn-dropdown color="" class="no-shadow " icon="person" >
          <q-list>
            <!--            <q-item clickable v-close-popup @click="profile">-->
            <!--              <q-item-section side>-->
            <!--                <q-icon name="account_box" color="primary" />-->
            <!--              </q-item-section>-->
            <!--              <q-item-section>-->
            <!--                <q-item-label>Profile</q-item-label>-->
            <!--              </q-item-section>-->
            <!--            </q-item>-->
            <q-separator />
            <q-item clickable v-close-popup @click="logOut">
              <q-item-section side>
                <q-icon name="input" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Log Out</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <!--        <q-avatar size="50px" @click="logOut">-->
        <!--          <img src="https://avatarfiles.alphacoders.com/495/thumb-49573.jpg">-->
        <!--        </q-avatar>-->
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MainLayout',
  computed: {
    ...mapGetters(['currentUser'])
  },
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    logOut () {
      localStorage.clear()
      window.location.href = '/'
    },
    profile () {
      this.$router.push('/profile')
    }
  },
  created () {
    const currentUser = this.$q.localStorage.getItem('CURRENT_USER')
    this.$store.commit('STORE_CURRENT_USER', currentUser)
    console.log('current user', this.$store.getters.currentUser)
  }
}
</script>
<style>
  .q-btn__wrapper:before {
    box-shadow: none !important;
  }
</style>
