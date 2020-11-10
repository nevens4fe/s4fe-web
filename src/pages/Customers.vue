<template>
  <q-page padding>
    <!-- content -->
    <q-table
      dark
      card-class="transparent text-grey-5 no-shadow"
      table-class="text-grey-5"
      table-header-class="text-grey-5"
      title="Customers"
      :data="memberships"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-membership_status="props">
        <q-td :props="props">
          <q-icon name="lens" :color="props.value === 1 ? 'positive' : 'red-6'" size="22px" />
        </q-td>
      </template>

      <template v-slot:body-cell-paid="props">
        <q-td :props="props">
          <q-badge :color="props.value === 1 ? 'primary' : 'negative'">
            <q-icon :name="props.value === 1 ? 'check' : 'clear'" color="white" size="22px" />
          </q-badge>
        </q-td>
      </template>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" @click="$refs.memberships.opened = true">
      <q-btn fab icon="add" color="primary" />
    </q-page-sticky>

    <create-membership ref="memberships" @addedMembership="fetchMemberships" />
  </q-page>
</template>

<script>
import CreateMembership from '../components/Membership/CreateMembership'
import { date } from 'quasar'

export default {
  components: { CreateMembership },
  data () {
    return {
      memberships: [],
      columns: [{
        name: 'user',
        required: true,
        label: 'User',
        align: 'left',
        field: 'user',
        format: val => `${val.first_name} ${val.last_name}`,
        sortable: true
      }, {
        name: 'date_from',
        required: true,
        label: 'Date from',
        align: 'left',
        field: 'date_from',
        format: val => date.formatDate(val, 'DD/MMM/YYYY'),
        sortable: true
      }, {
        name: 'date_to',
        required: true,
        label: 'Date to',
        align: 'left',
        field: 'date_to',
        format: val => date.formatDate(val, 'DD/MMM/YYYY'),
        sortable: true
      }, {
        name: 'membership_status',
        required: true,
        label: 'Status',
        align: 'left',
        field: 'membership_status',
        // format: val => `${val}`,
        sortable: true
      }, {
        name: 'paid',
        required: true,
        label: 'Paid',
        align: 'left',
        field: 'paid',
        // format: val => `${val}`,
        sortable: true
      }, {
        name: 'paid_amount',
        required: true,
        label: 'Amount',
        align: 'left',
        field: 'paid_amount',
        format: val => `${val}€`,
        sortable: true
      }]
    }
  },
  methods: {
    fetchMemberships () {
      this.$axios.get('membership')
        .then(res => {
          console.log('data', res)
          this.memberships = res.data
        })
        .catch(e => {
          console.log(e)
          console.log(e.response)
        })
    }
  },
  created () {
    this.fetchMemberships()
  }
}
</script>
