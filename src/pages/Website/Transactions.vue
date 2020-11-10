<template>
  <q-page
    class="" style="background:#f3f3f3"
  >

    <div class="row">
      <div class="col-md-12 q-pa-xl " style="background:#f3f3f3 !important">
        <transactions />
      </div>
    </div>

  </q-page>
</template>

<script>
import Transactions from 'components/Transactions'

export default {
  components: { Transactions },
  methods: {
    goAccess () {
      const token = localStorage.getItem('token')
      token ? this.$router.push('/') : this.$router.push('/login')
    }
  }
}
</script>
