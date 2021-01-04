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
                <q-item
                  clickable v-ripple
                  v-for="topic in topics"
                  :key="topic.user_id"
                  @click="chosenUser = topic, getMessages()"
                >
                  <q-item-section side>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ topic.user }}</q-item-label>
                    <q-item-label style="font-size: 0.8em" v-if="topic.unread">
                      {{ topic.unread !== 1 ? topic.unread + ' new messages' : '1 new message' }}
                    </q-item-label>
                  </q-item-section>
<!--                  <q-item-section side style="color:#c2c6dc !important;" v-if="user.last_msg_time">-->
<!--                    {{ user.last_msg_time }} ago-->
<!--                  </q-item-section>-->
                </q-item>
                <!-- Contacts / Users List -->

              </q-list>
            </q-scroll-area>
            <q-separator class="q-mt-md q-mb-md bg-secondary"/>

          </div>
          <!-- Choose Users END -->

          <!-- Chat With Selected User -->
          <div class="col-md-8 col-xs-12 q-pa-md bg-white text-primary" >
            <div class="text-h6 text-center" > {{ chosenUser.user ? 'Chat with ' + chosenUser.user : 'Start Chat'}}</div>
            <q-separator class="q-mt-md q-mb-md" />
            <div class="q-pa-md row justify-center">
              <div style="width: 100%; max-width: 800px" v-if="chosenUser.length !== 0">

                <q-scroll-area :layout="layout" style="height: 360px;">
                  <!-- Messages -->
<!--                  <q-chat-message-->
<!--                    v-for="m in messages"-->
<!--                    :key="m.id"-->
<!--                    :name="m.user"-->
<!--                    :text="m.content"-->
<!--                    :stamp="m.time"-->
<!--                    :sent="currentUser.id == m.receiver"-->
<!--                    text-color="white"-->
<!--                    :bg-color="currentUser.id == m.sender ? 'primary' : 'secondary'"-->
<!--                  />-->
                  <q-chat-message
                    v-for="m in messages"
                    :key="m.id"
                    :name="m.user"
                    :text="[m.message]"
                    text-color="white"
                    :bg-color="currentUser.id === m.user_id ? 'primary' : 'secondary'"
                    :sent="currentUser.id === m.user_id"
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
<pre>{{chosenUser}}</pre>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      chosenUser: [],
      newMessage: '',
      search: '',
      topics: [],
      messages: []
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    layout () {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
    }
  },
  methods: {
    sendMessage (id) {
      console.log(this.newMessage)
      const formData = {
        receiver: this.chosenUser.user_id,
        content: this.newMessage
      }
      this.$axios.post('messages/', formData).then(res => {
        console.log('res')
      }, err => {
        console.log(err.response)
      })
      this.newMessage = ''
    },
    getMessages () {
      this.$axios.get('messages-within-topic/?user_id=' + this.chosenUser.user_id)
        .then(res => {
          console.log('messages', res)
          this.messages = res.data
        })
        .catch(e => {
          console.log(e)
          console.log(e.response)
        })
    },
    getTopics () {
      this.$axios.get('messages-by-user/')
        .then(res => {
          console.log('messages by user', res)
          this.topics = res.data
        })
        .catch(e => {
          console.log(e)
          console.log(e.response)
        })
    }
  },
  mounted () {
    this.getMessages()
    this.getTopics()
    if (this.chosenUser) {
      setInterval(() => (this.getMessages()), 1000)
    }
  }
}
</script>
