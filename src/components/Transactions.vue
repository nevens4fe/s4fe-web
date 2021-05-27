<template>
    <q-table
      flat
      class="bg-transparent text-primary"
      :data="data"
      :style="$q.platform.is.mobile ? 'max-width: 75vw' : ''"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <q-input  dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
</template>

<script>
export default {
  data () {
    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        { name: 'item', align: 'center', label: 'Item', field: 'item' },
        { name: 'from_user', align: 'center', label: 'From User', field: 'from_user' },
        { name: 'to_user', align: 'center', label: 'To User', field: 'to_user' },
        { name: 'created', align: 'center', label: 'Date and Time', field: 'created', format: val => `${val.slice(0, 10) + ' | ' + val.slice(11, 19)}` }
      ],
      data: [],
      filter: ''
    }
  },
  methods: {
    fetchTransactions () {
      this.$axios.get('transactions/')
        .then(res => {
          this.data = res.data
        })
        .catch(e => {
          this.$q.notify({
            message: 'Wrong credentials.',
            icon: 'announcement'
          })
          console.log(e)
          console.log(e.response)
        })
    }
  },
  created () {
    this.fetchTransactions()
  }
}
</script>
