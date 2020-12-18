<template>
  <div id="app">
    <div class="parent-content">
      <Header/>
      <div class="router-view-content">
        <vue-page-transition name="fade-in-up">
          <div v-show="!error">
            <router-view/>
          </div>
        </vue-page-transition>
        <errorNotFound v-show="error"/>
      </div>
      <Footer />
    </div>
    <modalBeforeRegister/>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import modalBeforeRegister from '@/components/auth/modalBeforeRegister';
import errorNotFound from '@/components/errors/errorNotFound'
const io = require('./socket.io')
import Push from 'push.js';
 import { mapActions } from 'vuex'

export default {
  data () {
    return {
      isLoading: false,
      error: false
    };
  },
  components: {
    Header,
    Footer,
    modalBeforeRegister,
    errorNotFound
  },
  watch: {
    '$route.meta'(to, from) {
      this.error = false
      if (from.bodyClass)
        document.body.classList.remove(from.bodyClass)
      if (to.bodyClass)
        document.body.classList.add(to.bodyClass)
    }
  },
  computed: {
    layout () {
      return (this.$route.meta.layout || default_layout) + '-layout';
    }
  },
  beforeMount() {
    this.$bus.$on("app-error", () => { this.error = true })
    this.$bus.$on("app-loading", (status = true) => {
      this.isLoading = status
    });
  },
  beforeDestroy() {
    this.error = false
    this.$bus.$on("app-refresh", () => { this.$forceUpdate() })
    this.$bus.$on("app-error")
    this.$bus.$off("app-loading", () => {
      this.isLoading = true
    });
  },
  beforeUpdate() {
    if (Boolean(localStorage.getItem('before-register'))) {
      localStorage.removeItem('before-register')
      setTimeout(() => {
        this.$bvModal.show('modal-before-register')
      }, 500)
    }
  },
  methods: {
    ...mapActions({
      resetAllClass: 'auth/resetAllClass',
      resetAllClassTeacher: 'auth/resetAllClassTeacher',
    }),
  },
  metaInfo () {
    return {
      title: 'Punku | Mi puerta al saber',
      meta: [
        {name: 'twitter:card', content: 'article'},
        {name: 'twitter:image', content: require('@/assets/card-punku.png')},
        {name: 'twitter:description', content: 'Aprende o refuerza lo que quieras, cuando quieras y desde donde quieras. La plataforma peruana donde encuentras profesores, mentores, especialistas y apasionados, en un aula virtual intuitiva y segura'},
        {property: 'og:site_name', content: 'Punku - Mi puerta al saber'},
        {property: 'og:type', content: 'article'},
      ]
    }
  },
  mounted () {
    try {      
      const path_socket = process.env.NODE_ENV == 'production' ? 'https://backend.punkusaber.com' : 'http://localhost:1337'
      let socket = io.connect(path_socket, {
          extraHeaders: { 'x-auth-token': localStorage.getItem('token') },
        transportOptions: {
          polling: {
            extraHeaders: {'x-auth-token': localStorage.getItem('token') }
          }
        },
      });

      socket.on('connect', (data) =>  {
        socket.on('state_of_reservation', (data) => {
          console.log('state_of_reservation')
          this.resetAllClass()
          this.resetAllClassTeacher()
          this.$bus.emit('notifications:dropdown:refresh')
          if (Push.Permission.has()) {
            Push.create(data.notification.notification_type, {
              body: data.notification.notification_text,
              icon: './favicon-32x32.png',
              timeout: 4000,
              onClick: function () {
                window.focus();
                this.close();
              }
            });
          } else {
            this.$bus.emit("notifications:push", { type: 'dark', message: data.notification.notification_text })
          }
        });
        socket.on('new_recommendation', (data) => {
          if (Push.Permission.has()) {
            Push.create(data.notification.notification_type, {
              body: data.notification.notification_text,
              icon: './favicon-32x32.png',
              timeout: 4000,
              onClick: function () {
                window.focus();
                this.close();
              }
            });
          } else {
            this.$bus.emit("notifications:push", { type: 'dark', message: data.notification.notification_text })
          }
        });
        socket.on('new_reservation', (data) => {
          console.log('new_reservation')
          this.resetAllClass()
          this.resetAllClassTeacher()
          this.$bus.emit('notifications:dropdown:refresh')
          if (Push.Permission.has()) {
            Push.create(data.notification.notification_type, {
              body: data.notification.notification_text,
              icon: './favicon-32x32.png',
              timeout: 4000,
              onClick: function () {
                window.focus();
                this.close();
              }
            });
          } else {
            this.$bus.emit("notifications:push", { type: 'dark', message: data.notification.notification_text })
          }
        });
        socket.on('disconnectThatSoc', (data) => {
          socket.disconnect();
        });
        socket.on('push_notification', (data) => {
          console.log('push_notification')
          this.resetAllClass()
          this.resetAllClassTeacher()
          this.$bus.emit('notifications:dropdown:refresh')
          console.log('push_notification')
          if (Push.Permission.has()) {
            Push.create(data.notification.notification_type, {
              body: data.notification.notification_text,
              icon: './favicon-32x32.png',
              timeout: 4000,
              onClick: function () {
                window.focus();
                this.close();
              }
            });
          } else {
            this.$bus.emit("notifications:push", { type: 'dark', message: data.notification.notification_text })
          }
        });
      });
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style lang="scss">
  @import "./scss/main.scss";
  @import "./assets/flaticon/flaticon.css";
</style>
