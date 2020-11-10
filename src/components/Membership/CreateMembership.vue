<template>
  <div>
    <q-dialog v-model="opened" position="right">
      <q-card class="modal-bg text-grey-4" style="width: 60vw">
        <q-toolbar class="bg-info text-grey-6">
          <q-toolbar-title>Create new membership</q-toolbar-title>
          <!--          <q-btn flat round dense icon="close" v-close-popup />-->
        </q-toolbar>

        <q-card-section>
          <q-form
            @submit="createMembership"
            class="q-gutter-md"
          >
            <div class="row q-col-gutter-sm">
              <div class="col-xs-12 col-sm-6">
                <pre>{{user}}</pre>
                <q-select
                  dark
                  filled
                  v-model="user"
                  :options="users"
                  label="Filled"
                />
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input dark filled v-model="dateFrom" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="dateFrom" @input="() => $refs.qDateProxy.hide()" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input dark filled v-model="dateTo" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="dateTo" @input="() => $refs.qDateProxy.hide()" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  type="number"
                  dark
                  filled
                  v-model="amount"
                  label="Amount"
                  sufix="€"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'This field is required']"
                />
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-toggle
                  v-model="status"
                  label="Active"
                  :true-value="1"
                  :false-value="0"
                />
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-checkbox
                  v-model="paid"
                  label="Paid"
                  :true-value="1"
                  :false-value="0"
                />
              </div>

            </div>
            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: [],
      opened: false,
      user: '',
      dateFrom: '2020-03-01',
      dateTo: '2020-03-31',
      status: 1,
      paid: 1,
      amount: 20
    }
  },
  methods: {
    createMembership () {
      console.log('create user')
      const formData = {
        user_id: this.user.value,
        date_from: this.dateFrom,
        date_to: this.dateTo,
        membership_status: this.status,
        paid: this.paid,
        paid_amount: this.amount
      }
      console.log(formData)
      this.$axios.post('membership/new', formData)
        .then(() => {
          this.$emit('addedMembership')
          this.opened = false
          this.resetForm()
          this.$q.notify({
            type: 'positive',
            message: 'New membership added successfully!'
          })
        })
        .catch(e => {
          let errors = ''
          const response = e.response

          if (response.data.error) {
            response.data.error.forEach(error => {
              errors = error.message
            })
          }
          this.$q.notify({
            type: 'negative',
            message: errors
          })
          console.log(e)
          console.log(e.response)
        })
    },
    fetchUsers () {
      this.$axios.get('user')
        .then(res => {
          const usersParsed = []
          res.data.forEach(user => {
            usersParsed.push({
              label: `${user.first_name} ${user.last_name}`,
              value: user.id
            })
          })
          this.users = usersParsed
        })
    },
    filterFn (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.users = this.users.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    resetForm () {
      this.user = ''
      this.dateFrom = ''
      this.dateTo = ''
      this.status = ''
      this.paid = ''
      this.amount = ''
    }
  },
  created () {
    this.fetchUsers()
  }
}
</script>
