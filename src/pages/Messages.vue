<template>
  <q-page padding>

    <q-card>
      <q-card-section class="bg-primary no-border-radius q-pa-none">
        <div class="row">

          <!-- Choose Users -->
          <div class="col-md-4 col-xs-12 bg-primary q-pa-md text-white" >
            <div class="text-h6 text-center" > Contacts </div>
<!--            <q-separator class="q-mt-md q-mb-md bg-dark"/>-->
<!--            &lt;!&ndash; Search Contacts &ndash;&gt;-->
<!--            <q-input-->
<!--              @keyup.enter="searchContact"-->
<!--              color="grey"-->
<!--              dark filled dense label-color="grey"-->
<!--              v-model="search"-->
<!--              label="Search Contacs...">-->
<!--              <template v-slot:append>-->
<!--                <q-icon @click="searchContact" name="search" color="grey" />-->
<!--              </template>-->
<!--            </q-input>-->
<!--            &lt;!&ndash; Search Contacts END &ndash;&gt;-->
            <q-separator class="q-mt-md q-mb-md bg-secondary"/>
            <q-scroll-area style="height: 427px">
              <q-list padding class="rounded-borders menu-items">

                <!-- Contacts / Users List -->
                <q-item clickable v-ripple v-for="user in contacts" :key="user.id" @click="choosenUser = user, getMessages()">
                  <q-item-section side>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ user.name }}</q-item-label>
                    <q-item-label style="font-size: 0.8em" v-if="user.unseen_messages != '0'">
                      {{ user.unseen_messages != '1' ? user.unseen_messages + ' new messages' : '1 new message' }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side style="color:#c2c6dc !important;" v-if="user.last_msg_time">
                    {{ user.last_msg_time }} ago
                  </q-item-section>
                </q-item>
                <!-- Contacts / Users List -->

              </q-list>
            </q-scroll-area>
            <q-separator class="q-mt-md q-mb-md bg-secondary"/>

          </div>
          <!-- Choose Users END -->

          <!-- Chat With Selected User -->
          <div class="col-md-8 col-xs-12 q-pa-md bg-white text-primary" >
            <div class="text-h6 text-center" > {{ choosenUser.name ? 'Chat with ' + choosenUser.name : 'Start Chat'}}</div>
            <q-separator class="q-mt-md q-mb-md" />
            <div class="q-pa-md row justify-center">
              <div style="width: 100%; max-width: 800px" v-if="choosenUser.length !== 0">

                <q-scroll-area :layout="layout" style="height: 360px;">
                  <!-- Messages -->
                  <q-chat-message
                    v-for="m in messages"
                    :key="m.id"
                    :name="m.name"
                    :text="m.text"
                    :stamp="m.time"
                    :sent="currentUser.id == m.sender"
                    text-color="white"
                    :bg-color="currentUser.id == m.sender ? 'primary' : 'secondary'"
                  />
                  <!-- Messages END -->
                </q-scroll-area>

                <!-- Send Message -->
                <q-input
                  @keyup.enter="sendMessage"
                  color="grey"
                  size="70"
                  style="margin-top:35px"
                   filled label-color="grey"
                  v-model="newMessage"
                  label="Write a message...">
                  <template v-slot:append>
                    <q-icon @click="sendMessage" name="send" color="grey" />
                  </template>
                </q-input>
                <!-- Send Message END -->

              </div>
            </div>

          </div>
          <!-- Chat with Selected User END -->

        </div>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      choosenUser: [],
      newMessage: '',
      search: '',
      messages: [
        { id: '1', sender: '52', text: ['Hey how are you?'], time: '21/01/2020 15:35' },
        { id: '2', sender: '2020', text: ['Good, you?'], time: '21/01/2020 14:35' },
        { id: '3', sender: '52', text: ['Not bad. Thanks'], time: '21/01/2020 13:35' },
        { id: '4', sender: '2020', text: ['No problem, see you.'], time: '21/01/2020 12:35' }
      ],
      contacts: [
        { name: 'Goran Markovic', unseen_messages: '4', last_msg_time: '3 min', id: '3010' },
        { name: 'Stefan Veljancic', unseen_messages: '1', last_msg_time: '15 min', id: '3011' },
        { name: 'Nenad Radulovic', unseen_messages: '0', last_msg_time: '', id: '3012' },
        { name: 'Vladimir Stevic', unseen_messages: '0', last_msg_time: '', id: '3013' }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    layout () {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
    }
  },
  methods: {
    sendMessage () {
      console.log(this.newMessage)
      this.newMessage = ''
    },
    getMessages () {
      this.$axios.get('messages/?with=' + this.choosenUser.id)
        .then(res => {
          this.messages = res.data
        })
        .catch(e => {
          console.log(e)
          console.log(e.response)
        })
    },
    getContacts () {
      console.log('test')
    }
  }
}
</script>
