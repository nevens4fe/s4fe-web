<template>
  <q-page class="q-pa-none">

    <div class="row ">
      <div class="col-xl-4 col-md-4 col-xs-12" >
        <q-card class="bg-white text-primary no-shadow q-ma-none no-border-radius" >
          <q-card-section class="bg-primary">
            <img
              alt="App logo"
              style="height: 50px"
              src="~assets/S4FE_Logo_white.png"
            >
          </q-card-section>
          <q-separator color="primary" />
          <q-card-section :style="$q.platform.is.mobile ? '' : 'border-right: 1px solid lightgray; min-height:84vh'">
            <q-item v-ripple v-if="currentUser.first_name && currentUser.last_name" style="font-size:1.5em; font-weight: 600">
              <q-item-section>{{ currentUser.first_name + ' ' + currentUser.last_name }}</q-item-section>
            </q-item>
            <q-item v-ripple style="font-size:1.3em">
              <q-item-section avatar>
                <q-icon name="email" class="cursor-pointer" />
              </q-item-section>
              <q-item-section>{{ currentUser.email }}</q-item-section>
            </q-item>
            <q-item v-ripple style="font-size:1.3em">
              <q-item-section avatar>
                <q-icon name="phone" class="cursor-pointer" />
              </q-item-section>
              <q-item-section>{{ currentUser.phone_number }}</q-item-section>
            </q-item>
            <div class="text-center q-ma-md">
              <h6>MY S4FE</h6>
              <qrcode-vue :value="currentUser.unique_identifier" size="200" level="H" ></qrcode-vue>
              {{currentUser.unique_identifier}}
            </div>
            <q-btn icon="edit" label="Edit Profile" class="bg-primary text-white text-center" style="display: block;margin:auto; margin-top:20px" @click="openEditProfile"/>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xl-8 col-md-8 col-xs-12">
        <q-card class="bg-white no-shadow text-primary q-ma-none no-border-radius">
          <q-card-section class="bg-primary" style="height:89px" >
<!--            <h5 class="q-ma-none" style="display:inline-block">My items</h5>-->
            <q-btn icon="note_add" style="float:right; margin-left: 5px;margin-top:10px" :label="$q.platform.is.mobile ? '' : 'Bulk insert'" class="bg-secondary text-white" @click="$router.push('/bulk-insert')"/>
            <q-btn icon="add" style="float:right; margin-top:10px" :label="$q.platform.is.mobile ? '' : 'Add'" class="bg-secondary text-white" @click="dialog = true"/>
            <q-btn icon="send" style="float:right; margin-right: 5px;margin-top:10px" :label="$q.platform.is.mobile ? '' : 'Send'" class="bg-secondary text-white" @click="dialogTransfer = true, selectedItem = ''"/>
          </q-card-section>
          <q-card-section>
              <p v-if="data.length == 0">You have no items.</p>
              <q-list  v-else>
                <q-item v-for="item in data" :key="item.id" :class="$q.platform.is.mobile ? 'row q-my-sm' : 'q-my-sm'" v-ripple style="border-bottom:1px solid lightgray">

                  <q-item-section :class="$q.platform.is.mobile ? 'col-xs-4' : ''" >
                    <q-item-label style="font-size: 1.3em">{{ item.title }}</q-item-label>
                    <q-item-label caption  lines="1">Status: {{ item.status === "L" ? "Lost" : item.status === "S" ? "Stolen" : "Active"}}</q-item-label>
                  </q-item-section>
                  <q-item-section :side="!$q.platform.is.mobile" >
                    <q-btn icon="remove_red_eye" size="sm" class="text-white bg-secondary q-ma-xs" @click="showInfo(item)"/>
                  </q-item-section>
                  <q-item-section :side="!$q.platform.is.mobile" >
                    <q-btn icon="edit" size="sm" class="text-white bg-secondary q-ma-xs" style="border-radius: 5px" @click="openEdit(item)"/>
                  </q-item-section>
                  <q-item-section :side="!$q.platform.is.mobile">
                    <q-btn icon="send" size="sm" class="text-white bg-secondary q-ma-xs" style="border-radius: 5px" @click="openTransfer(item)"/>
                  </q-item-section>
                  <q-item-section :side="!$q.platform.is.mobile">
                    <q-btn icon="delete" size="sm" class="text-white bg-secondary q-ma-xs" style="border-radius: 5px" @click="deleteItem(item)"/>
                  </q-item-section>

                </q-item>
              </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Edit Profile -->
    <q-dialog v-model="dialogProfile" class="no-border-radius" :maximized="$q.platform.is.mobile">
      <q-card :style="$q.platform.is.mobile ? '' : 'width: 450px'">
        <q-card-section class="bg-primary text-white q-pa-xs"><h6 class="q-ma-xs">Edit Profile</h6>
          <q-btn dense flat icon="close" style="float:right; margin-top:-35px" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-card-section>
        <q-card-section>
          <q-input  square filled  v-model="firstName" type="text" class="q-pa-xs" label="First Name">
          </q-input>
          <q-input  square filled  v-model="lastName" type="text" class="q-pa-xs" label="Last Name">
          </q-input>
        </q-card-section>
        <q-card-section class="text-white text-center q-ma-md">
          <q-btn class="bg-primary" @click="changeInfo()" size="md" style="padding: 6px 25px; display: block; margin:auto" >Change Info</q-btn>
        </q-card-section>
        <q-card-section class="bg-primary text-white q-pa-xs"><h6 class="q-ma-xs">Change Password</h6></q-card-section>
        <q-card-section>
          <q-input  square filled  v-model="password1" type="password" class="q-pa-xs" label="New Password">
          </q-input>
          <q-input  square filled  v-model="password2" type="password" class="q-pa-xs" label="Confirm New Password">
          </q-input>
        </q-card-section>
        <q-card-section class="text-white text-center q-ma-md">
          <q-btn class="bg-primary" @click="changePassword()" size="md" style="padding: 6px 25px; display: block; margin:auto" >Change Password</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Add Item -->
    <q-dialog v-model="dialog" class="no-border-radius" :maximized="$q.platform.is.mobile">
      <q-card :style="$q.platform.is.mobile ? '' : 'width: 450px'">
        <q-card-section class="bg-primary text-white">
          <h5 class="q-ma-xs">Add new item</h5>
          <q-btn dense flat icon="close" style="float:right; margin-top:-35px" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-card-section>
        <q-card-section>
          <q-input  square filled clearable v-model="title" type="text" class="q-pa-xs" label="Title">
          </q-input>
          <q-input  square filled clearable v-model="serial" type="text" class="q-pa-xs" label="Serial">
          </q-input>
          <q-select filled v-model="categorySelected" :options="categoryOptions" class="q-pa-xs" label="Category" />
          <q-input
            v-model="description"
            filled
            label="Description"
            type="textarea"
          />
          <q-select filled v-model="statusSelected" :options="statusOptions" class="q-pa-xs" label="Status" />
        </q-card-section>
        <q-card-section class="text-white text-center q-ma-md">
          <q-btn class="bg-primary" @click="addItem()" size="md" style="padding: 6px 25px; display: block; margin:auto" >Submit</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Info Modal -->
    <q-dialog v-model="dialogInfo" class="no-border-radius" :maximized="$q.platform.is.mobile">
      <q-card :style="$q.platform.is.mobile ? '' : 'width: 450px'">
        <q-card-section class="bg-primary text-white"><h5 class="q-ma-xs">Item Info</h5>
          <q-btn dense flat icon="close" style="float:right; margin-top:-35px" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-card-section>
        <q-card-section>
          <q-input  square  disable v-model="info.title" type="text" class="q-pa-xs" label="Title">
          </q-input>
          <q-input  square  disable v-model="info.serial" type="text" class="q-pa-xs" label="Serial">
          </q-input>
          <q-input  square  disable v-model="info.desc" type="text" class="q-pa-xs" label="Description">
          </q-input>
          <q-input  square  disable v-model="info.unique_identifier" type="text" class="q-pa-xs" label="Unique Identifier">
          </q-input>
          <q-select disable v-model="info.category" map-options :options="categoryOptions" class="q-pa-xs" label="Category" />
          <q-select disable v-model="info.status" map-options :options="statusOptions" class="q-pa-xs" label="Status" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Edit Item -->
    <q-dialog v-model="dialogEdit" class="no-border-radius" :maximized="$q.platform.is.mobile">
      <q-card :style="$q.platform.is.mobile ? '' : 'width: 450px'">
        <q-card-section class="bg-primary text-white"><h5 class="q-ma-xs">Add new item</h5>
          <q-btn dense flat icon="close" style="float:right; margin-top:-35px" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-card-section>
        <q-card-section>
          <q-input  square filled clearable v-model="titleEdit" type="text" class="q-pa-xs" label="Title">
          </q-input>
          <q-input  square filled clearable v-model="serialEdit" type="text" class="q-pa-xs" label="Serial">
          </q-input>
          <q-select filled v-model="categorySelectedEdit" map-options :options="categoryOptions" class="q-pa-xs" label="Category" />
          <q-input
            v-model="descriptionEdit"
            filled
            label="Description"
            type="textarea"
          />
          <q-select filled v-model="statusSelectedEdit" map-options :options="statusOptions" class="q-pa-xs" label="Status" />
        </q-card-section>
        <q-card-section class="text-white text-center q-ma-md">
          <q-btn class="bg-primary" @click="editItem()" size="md" style="padding: 6px 25px; display: block; margin:auto" >Submit</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Transfer Item -->
    <q-dialog v-model="dialogTransfer" class="no-border-radius" :maximized="$q.platform.is.mobile">
      <q-card :style="$q.platform.is.mobile ? '' : 'width: 450px'">
        <q-card-section class="bg-primary text-white"><h5 class="q-ma-xs">Transfer item</h5>
          <q-btn dense flat icon="close" style="float:right; margin-top:-35px" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-card-section>
        <q-card-section>
          <q-input  square filled clearable v-model="transfer_to" type="text" class="q-pa-xs" label="Unique User ID">
          </q-input>
          <q-select filled v-model="selectedItem" map-options :options="itemOptions" class="q-pa-xs" label="Select Item" />
        </q-card-section>
        <q-card-section class="text-white text-center q-ma-md">
          <q-btn class="bg-primary" @click="transferItem('no')" size="md" style="padding: 6px 25px; display: block; margin:auto" >Submit</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Confirmation Transfer Item -->
    <q-dialog v-model="openConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">You are sure you want to transfer item?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" color="primary" @click="transferItem('yes')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import Axios from 'axios'
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'MainLayout',
  components: { QrcodeVue },
  computed: {
    ...mapGetters(['currentUser'])
  },
  data () {
    return {
      data: [],
      loading: false,
      dialog: false,
      dialogTransfer: false,
      dialogEdit: false,
      dialogProfile: false,
      serial: '',
      serialEdit: '',
      categoryOptions: [],
      categorySelected: '',
      categorySelectedEdit: '',
      choosenItem: '',
      statusOptions: [
        { label: 'Active', value: 'A' },
        { label: 'Lost', value: 'L' },
        { label: 'Stolen', value: 'S' }
      ],
      statusSelected: '',
      statusSelectedEdit: '',
      description: '',
      descriptionEdit: '',
      title: '',
      titleEdit: '',
      transfer_to: '',
      selectedItem: '',
      itemOptions: [],
      firstName: '',
      lastName: '',
      password1: '',
      password2: '',
      info: [],
      confirmation: false,
      openConfirm: false,
      dialogInfo: false
    }
  },
  methods: {
    fetchItems () {
      this.loading = true
      const items = []
      this.$axios.get('items/')
        .then(res => {
          res.data.map(item => {
            items.push({ label: item.title, value: item.id })
          })
          this.itemOptions = items
          this.data = res.data
          this.loading = false
        })
        .catch(e => {
          this.data = []
          this.loading = false
          console.log(e)
          console.log(e.response)
        })
    },
    fetchCategories () {
      const categories = []
      this.$axios.get('categories/')
        .then(res => {
          res.data.map(item => {
            categories.push({ label: item.title, value: item.id })
          })
          this.categoryOptions = categories
        })
        .catch(e => {
          console.log(e)
          console.log(e.response)
        })
    },
    addItem () {
      const formData = {
        title: this.title,
        serial: this.serial,
        category: this.categorySelected.value,
        desc: this.description,
        status: this.statusSelected.value,
        user: this.currentUser.id,
        key: '123123213'
      }
      this.$axios.post('items/', formData)
        .then(res => {
          this.dialog = false
          this.fetchItems()
          this.$q.notify({
            message: 'Item added!',
            icon: 'announcement',
            color: 'primary'
          })
        })
        .catch(e => {
          console.log(e)
          console.log(e.response)
        })
    },
    transferItem (what) {
      console.log(what)
      if (what === 'no') {
        this.openConfirm = true
      } else {
        this.openConfirm = false
        const formData = {
          user: this.transfer_to,
          item: this.selectedItem.value ? this.selectedItem.value : this.selectedItem
        }
        this.$axios.post('item-transfer/', formData)
          .then(res => {
            this.dialogTransfer = false
            this.transfer_to = ''
            this.fetchItems()
            this.$q.notify({
              message: 'Item transferred!',
              icon: 'announcement',
              color: 'primary'
            })
          })
          .catch(e => {
            const errors = e.response.data
            for (const [key, value] of Object.entries(errors)) {
              const name = key
              const text = value
              this.$q.notify({
                message: name.charAt(0).toUpperCase() + name.slice(1) + ' : ' + text,
                icon: 'announcement'
              })
              console.log(`${key}: ${value}`)
            }
            console.log(e)
            console.log(e.response)
          })
      }
    },
    openEditProfile () {
      console.log('popuni fields')
      this.firstName = this.currentUser.first_name
      this.lastName = this.currentUser.last_name
      console.log(this.currentUser)
      this.dialogProfile = true
    },
    showInfo (item) {
      this.info = item
      this.dialogInfo = true
    },
    changeInfo () {
      const formData = {
        first_name: this.firstName,
        last_name: this.lastName
      }
      Axios.patch('https://s4fe.herokuapp.com/rest-auth/user/', formData, { headers: { Authorization: 'Token ' + localStorage.getItem('token') } })
        .then(res => {
          this.$q.localStorage.set('CURRENT_USER', res.data)
          const currentUser = this.$q.localStorage.getItem('CURRENT_USER')
          this.$store.commit('STORE_CURRENT_USER', currentUser)
          this.dialogProfile = false
          this.$q.notify({
            message: 'Profile info changed!',
            icon: 'announcement',
            color: 'primary'
          })
        })
        .catch(e => {
          const errors = e.response.data
          for (const [key, value] of Object.entries(errors)) {
            const name = key
            const text = value
            this.$q.notify({
              message: name.charAt(0).toUpperCase() + name.slice(1) + ' : ' + text,
              icon: 'announcement'
            })
            console.log(`${key}: ${value}`)
          }
          console.log(e)
          console.log(e.response)
        })
    },
    changePassword () {
      const formData = {
        new_password1: this.password1,
        new_password2: this.password2
      }
      Axios.post('https://s4fe.herokuapp.com/rest-auth/password/change/', formData, { headers: { Authorization: 'Token ' + localStorage.getItem('token') } })
        .then(res => {
          this.dialogProfile = false
          this.$q.notify({
            message: 'Password changed!',
            icon: 'announcement',
            color: 'primary'
          })
        })
        .catch(e => {
          const errors = e.response.data
          for (const [key, value] of Object.entries(errors)) {
            const name = key
            const text = value
            this.$q.notify({
              message: name.charAt(0).toUpperCase() + name.slice(1) + ' : ' + text,
              icon: 'announcement'
            })
            console.log(`${key}: ${value}`)
          }
          console.log(e)
          console.log(e.response)
        })
    },
    editItem () {
      const formData = {
        title: this.titleEdit,
        serial: this.serialEdit,
        category: this.categorySelectedEdit.value,
        desc: this.descriptionEdit,
        status: this.statusSelectedEdit.value,
        user: this.currentUser.id,
        key: '123123213'
      }
      this.$axios.patch('items/' + this.choosenItem + '/', formData)
        .then(res => {
          this.dialogEdit = false
          this.fetchItems()
          this.$q.notify({
            message: 'Item edited!',
            icon: 'announcement',
            color: 'primary'
          })
        })
        .catch(e => {
          console.log(e)
          console.log(e.response)
        })
    },
    openEdit (item) {
      this.titleEdit = item.title
      this.choosenItem = item.id
      this.serialEdit = item.serial
      this.categorySelectedEdit = item.category
      this.descriptionEdit = item.desc
      this.statusSelectedEdit = item.status
      this.dialogEdit = true
    },
    deleteItem (item) {
      this.$axios.delete('items/' + item.id + '/')
        .then(res => {
          this.fetchItems()
          this.$q.notify({
            message: 'Item deleted!',
            icon: 'announcement',
            color: 'primary'
          })
        })
        .catch(e => {
          console.log(e)
          console.log(e.response)
        })
    },
    openTransfer (item) {
      this.selectedItem = item.id
      this.dialogTransfer = true
    }
  },
  created () {
    this.fetchCategories()
    this.fetchItems()
  }
}
</script>
