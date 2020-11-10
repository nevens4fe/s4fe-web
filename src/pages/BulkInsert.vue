<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <h4 style="margin:10px" class="text-primary">Bulk items insert</h4>
      </div>
      <div class="col-md-6 col-xs-12 text-right q-mb-md">
        <q-file v-model="csvfile" style="max-width: 150px; display:inline-block;" filled dense label="Choose File" />
        <q-btn color="primary" @click="uploadFile()" style="margin-left:10px;padding:1px; margin-top:-3px" filled>Upload</q-btn>
      </div>
      <div class="col-12">
        <q-table
          dark
          class="bg-primary no-shadow"
          :data="data"
          :pagination.sync="pagination"
          :columns="columns"
          row-key="name"
          binary-state-sort
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="title">
                <span style="padding:5px;">{{ props.row.title }}</span>
                <br>
                <div v-if="props.row.errors['title']">
                  <span style="color:#fceded" v-for="err in props.row.errors['title']" v-bind:key="err[0]">{{ err }}</span>
                </div>
                <q-popup-edit v-model="props.row.title" buttons @save="editField(props.row)">
                  <q-input v-model="props.row.title" dense autofocus  />
                </q-popup-edit>
              </q-td>
              <q-td key="serial">
                <span style="padding:5px;">{{ props.row.serial }}</span>
                <br>
                <div v-if="props.row.errors['serial']">
                  <span style="color:#fceded" v-for="err in props.row.errors['serial']" v-bind:key="err[0]">{{ err }}</span>
                </div>
                <q-popup-edit v-model="props.row.serial"  buttons @save="editField(props.row)">
                  <q-input type="text" v-model="props.row.serial" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="desc" :props="props">
                <span style="padding:5px;">{{ props.row.desc }}</span>
                <br>
                <div v-if="props.row.errors['desc']">
                  <span style="color:#fceded" v-for="err in props.row.errors['desc']" v-bind:key="err[0]">{{ err }}</span>
                </div>
                <q-popup-edit v-model="props.row.desc" buttons @save="editField(props.row)">
                  <q-input type="text" v-model="props.row.desc" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="category" :props="props" >
                <span style="padding:5px">{{ props.row.category }}</span>
                <br>
                <div v-if="props.row.errors['category']">
                  <span style="color:#fceded" v-for="err in props.row.errors['category']" v-bind:key="err[0]">{{ err }}</span>
                </div>
                <q-popup-edit v-model="props.row.category"  buttons @save="editField(props.row)">
                  <q-input type="text" v-model="props.row.category" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="status" :props="props">
                <span style="padding:5px;">{{ props.row.status }}</span>
                <br>
                <div v-if="props.row.errors['status']">
                  <span style="color:#fceded" v-for="err in props.row.errors['status']" v-bind:key="err[0]">{{ err }}</span>
                </div>
                <q-popup-edit v-model="props.row.status"  buttons @save="editField(props.row)" >
                  <q-input type="text" v-model="props.row.status" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="is_valid" :props="props">
                <q-btn v-if="props.row.is_valid" size="sm">No Errors</q-btn>
                <q-btn v-if="!props.row.is_valid" @click="showErrors(props.row.errors)" size="sm" color="white"><span class="text-primary">See Errors</span></q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <div class="col-12 q-ma-md text-center">
        <q-btn color="primary" size="md" @click="downloadExample()" style="margin-left:10px;padding:1px; margin-top:-3px" outline>Download Example</q-btn>
        <q-btn color="primary" size="md" @click="sendData()" style="margin-left:10px;padding:1px; margin-top:-3px" filled>Import Valid Items</q-btn>
        <q-btn color="primary" size="md" @click="explainModal = true" style="margin-left:10px;padding:1px; margin-top:-3px" outline>How to </q-btn>
      </div>

    </div>

    <!-- Errors  -->
    <q-dialog v-model="errorsModal" class="no-border-radius" :maximized="$q.platform.is.mobile">
      <q-card :style="$q.platform.is.mobile ? '' : 'width: 450px'">
        <q-card-section class="bg-primary text-white"><h5 class="q-ma-xs">Errors</h5>
          <q-btn dense flat icon="close" style="float:right; margin-top:-35px" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-card-section>
        <q-card-section v-for="(item, index) in errors" v-bind:key="index">
          <b>{{ index }}</b> <br>
          <span style="display:block" v-for="el in item" v-bind:key="el[0]">
            - {{ el }}
          </span>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Explain  -->
    <q-dialog v-model="explainModal" class="no-border-radius" :maximized="$q.platform.is.mobile">
      <q-card :style="$q.platform.is.mobile ? '' : 'width: 450px'">
        <q-card-section class="bg-primary text-white"><h5 class="q-ma-xs">Instructions</h5>
          <q-btn dense flat icon="close" style="float:right; margin-top:-35px" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-card-section>
        <q-card-section>
          <b>* Your file has to be .csv</b> <br> <br>
          <b>* You have to choose one of these item categories (use only ID number)</b>:
          <div  v-for="cat in categories" v-bind:key="cat.id">
            <span>{{cat.title + ' (' + cat.id + ')'}}</span>
          </div>
          <br>
          <b>* Status field is mandatory (use only first letter) </b>:<br>
          <span>Active (A)</span><br>
          <span>Lost (L)</span><br>
          <span>Stolen (S)</span>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BulkInsert',
  computed: {
    ...mapGetters(['currentUser'])
  },
  data () {
    return {
      csvfile: [],
      publicPath: process.env.BASE_URL,
      errorsModal: false,
      explainModal: false,
      errors: {},
      pagination: {
        rowsPerPage: 20
      },
      columns: [
        { name: 'title', label: 'Title', field: 'title', align: 'left', sortable: true },
        { name: 'serial', align: 'left', label: 'Serial', field: 'serial', sortable: true },
        { name: 'desc', label: 'Description', field: 'desc', align: 'left', sortable: true },
        { name: 'category', label: 'Category', field: 'category', align: 'left', sortable: true },
        { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },
        { name: 'is_valid', label: 'Validation', field: 'is_valid', align: 'left', sortable: true }
      ],
      data: [],
      categories: {}
    }
  },
  methods: {
    downloadExample () {
      window.location.href = '../../statics/s4fe.csv'
    },
    getCategories () {
      this.$axios.get('categories/')
        .then(res => {
          this.categories = res.data
        })
        .catch(e => {
          this.$q.notify({
            message: 'Error, please try again.',
            icon: 'announcement'
          })
          console.log(e)
          console.log(e.response)
        })
    },
    editField (item) {
      const formData = {
        category: item.category,
        serial: item.serial,
        status: item.status,
        title: item.title,
        desc: item.desc
      }
      this.$axios.patch('item-interface/' + item.id + '/', formData)
        .then(res => {
          this.getData()
        })
        .catch(e => {
          this.$q.notify({
            message: 'Error, please try again.',
            icon: 'announcement'
          })
          console.log(e)
          console.log(e.response)
        })
    },
    showErrors (err) {
      this.errors = err
      this.errorsModal = true
    },
    getData () {
      this.$axios.get('item-interface/')
        .then(res => {
          console.log('tabela', res.data)
          this.data = res.data
          this.data.forEach(el => {
            el.errors = JSON.parse(el.errors)
          })
        })
        .catch(e => {
          this.$q.notify({
            message: 'Error with loading.',
            icon: 'announcement'
          })
          console.log(e)
          console.log(e.response)
        })
    },
    uploadFile () {
      const formData = new FormData()
      formData.append('file', this.csvfile)
      this.$axios.post('item-interface/', formData)
        .then(res => {
          this.getData()
          console.log(res)
        })
        .catch(e => {
          this.$q.notify({
            message: 'Error with file.',
            icon: 'announcement'
          })
          console.log(e)
          console.log(e.response)
        })
    },
    sendData () {
      this.$axios.get('import/')
        .then(res => {
          this.getData()
          this.$q.notify({
            message: 'Valid files imported.',
            type: 'positive'
          })
        })
        .catch(e => {
          this.$q.notify({
            message: 'Error with file.',
            icon: 'announcement'
          })
          console.log(e)
          console.log(e.response)
        })
    }
  },
  created () {
    this.getData()
    this.getCategories()
  }
}
</script>
