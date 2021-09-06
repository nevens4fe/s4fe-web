<template>
  <q-page class="" style="background:#fff">
    <div class="container">
      <div class="justify-center" style="padding-bottom: 5px !important;" >
          <h1 v-if="!$route.params.serial" class="stolen header">List of stolen items</h1>
          <h1 v-if="$route.params.serial" class="stolen header">Item was lost or stolen</h1>
          <p v-if="$route.params.serial" class="stolen subheader">The item below was lost or stolen</p>
      </div>
      <div>
        <div class="stolen page">
          <div :class="[$route.params.serial ? '' : 'item-list']">
            <q-card v-for="(item, index) in items" :key="index" class="item">
              <div class="row item-name">
                <div class="col col-md-3">Item name: </div>
                <div class="col col-md-5">{{ item.title }} </div>
              </div>
              <div class="row item-sn">
                <div class="col col-md-3">Item SN: </div>
                <div class="col col-md-5"> {{ item.serial }}</div>
              </div>
              <div class="row item-sn">
                <div class="col col-md-3">Status: </div>
                <div class="col col-md-5"> {{ item.status }}</div>
              </div>
              <div class="item-link">
                <a v-if="!$route.params.serial" :href="'stolen/' + item.serial_slug" :title="item.title"> Item page </a>
              </div>
            </q-card>
          </div>
          <q-inner-loading :showing="loading">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'Stolen',
  data () {
    return {
      items: [],
      loading: false,
      title: 'S4FE - Stolen Items'
    }
  },
  meta () {
    return {
      title: this.title,
      meta: {
        /* description: { name: 'Stolen item page', content: 'Page 1' },
        keywords: { name: 'stolen item', content: 'S4FE' },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
        */
      }
    }
  },
  methods: {
    setTitle (itemName) {
      this.title = itemName ? 'S4FE - Stolen Item - ' + itemName : 'S4FE - Stolen Items'
    },
    getStolenItems (serial) {
      this.loading = true
      let endpoint = 'stolen/'
      if (serial) {
        endpoint = endpoint + serial
      }
      this.$axios.get(endpoint)
        .then(res => {
          console.log(res.data)
          if (res.data && res.data.length === 1) {
            this.setTitle(res.data[0].title)
          }
          this.items = res.data
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
  },
  beforeMount () {
    this.getStolenItems(this.$route.params.serial)
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
  .container {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
  }
  .stolen.page {
    width: 100%;
  }
  .stolen .item-list {
    display: flex;
    flex-direction: column;
  }
  .stolen .item-list .item {
    max-width: 40%;
  }
  .stolen .item {
    border: 1px solid #ccc;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 15px;
  }
  .stolen .item-link {
    text-align: right;
  }
  .stolen.header {
    margin-bottom: 25px;
    color: #1e0e62;
    font-size: 58px;
    line-height: 70px;
    text-align: left;
    font-weight: 700;
  }
  .stolen.subheader {
    margin-bottom: 10px;
    color: #6b6b6b;
    font-size: 16px;
    line-height: 30px;
  }
  .stolen .item-name div,
  .stolen .item-sn div {
    font-weight: 700;
  }
</style>
