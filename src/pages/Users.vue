<template>
  <q-page padding>
    <!-- content -->
    <q-table
      card-class="text-grey-8 "
      table-class="text-grey-5"
      table-header-class="text-grey-5"
      title="Users"
      :data="users"
      :columns="columns"
      row-key="name"
    />
    <q-page-sticky position="bottom-right" :offset="[18, 18]" @click="$refs.createUser.opened = true">
      <q-btn fab icon="add" color="primary" />
    </q-page-sticky>

    <create-user  ref="createUser" @addedUser="fetchUsers" />
  </q-page>
</template>

<script>
import CreateUser from '../components/Users/CreateUser'

export default {
  components: { CreateUser },
  data () {
    return {
      users: [],
      columns: [{
        name: 'first_name',
        required: true,
        label: 'First Name',
        align: 'left',
        field: 'first_name',
        // format: val => `${val}`,
        sortable: true
      }, {
        name: 'last_name',
        required: true,
        label: 'Last Name',
        align: 'left',
        field: 'last_name',
        // format: val => `${val}`,
        sortable: true
      }, {
        name: 'plex_username',
        required: true,
        label: 'Plex Username',
        align: 'left',
        field: 'plex_username',
        // format: val => `${val}`,
        sortable: true
      }, {
        name: 'plex_password',
        required: true,
        label: 'Plex Password',
        align: 'left',
        field: 'plex_password',
        // format: val => `${val}`,
        sortable: true
      }, {
        name: 'email',
        required: true,
        label: 'Email',
        align: 'left',
        field: 'email',
        // format: val => `${val}`,
        sortable: true
      }, {
        name: 'username',
        required: true,
        label: 'Username',
        align: 'left',
        field: 'username',
        // format: val => `${val}`,
        sortable: true
      }, {
        name: 'phone',
        required: true,
        label: 'Phone',
        align: 'left',
        field: 'phone',
        // format: val => `${val}`,
        sortable: true
      }]
    }
  },
  methods: {
    fetchUsers () {
      this.$axios.get('user')
        .then(res => {
          console.log('data', res)
          this.users = res.data
        })
        .catch(e => {
          console.log(e)
          console.log(e.response)
        })
    }
  },
  created () {
    this.fetchUsers()
  }
}
</script>
