<template>
    <b-dropdown v-if="isAuth" right :class="'dropdown-notifications'" variant="outline-empyt">
      <template v-slot:button-content>
        <div @click="markAllAsRead">
          <span class="dropdown-notifications__count">
            <!-- {{ notifications.totalDocs }} -->
            {{ notifications.totalUnread }}
          </span>
          <i class="uil uil-bell"></i>
        </div>
      </template>
      <b-tabs>
        <b-tab title="Mensajes" active>
          <div class="dropdown-notifications__content">
            <div class="notifications__items">
              <div v-if="notifications.totalDocs">
                <div class="notifications__item" v-for="(not, index) in notifications.docs" :key="index">
                  <div class="notifications__icon" :class="{'no-show': !not.status}">
                    <!-- <img :src="not.receiver.pic_url"> -->
                    <!-- {{ not.receiver.pic_url }} -->
                  </div>
                  <div class="notifications__content">
                    <div class="d-block ml-1 mb-1 pb-1 border-bottom">
                      <strong>{{ not.notification_type }}</strong>
                    </div>
                    <div class="d-block ml-1 text-muted">{{ not.notification_text }}</div>
                    <!-- <div class="text-muted">Sit amet consectetur, adipisicing elit. Esse, voluptatem.</div> -->
                  </div>
                </div>
                <div class="dropdown-notifications__actions" v-if="notifications.nextPage">
                  <button class="btn btn-primary btn-sm px-3 btn-pill" @click="loadNotificacions()">
                    {{ !notifications.isLoading ? 'VER MÁS' : 'CARGANDO'}}
                  </button>
                </div>
              </div>
              <div v-else class="text-center">
                <span><i class="uil uil-bell-slash"></i> Sin notificaciones</span>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Agenda">
          <div class="position-relative">
            <loading :active.sync="isLoadingCalendar" :is-full-page="false"></loading>
            <v-calendar
                is-expanded
                :attributes='attributesCalendar'
                ref="calendar">
            </v-calendar>
          </div>
        </b-tab>
      </b-tabs>
    </b-dropdown>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ClassesService from '@/services/classes.service';
import moment from 'moment'

export default {
  computed: {
    ...mapGetters({
      notifications: 'notifications/notifications',
    }),
    allNotRead () {
      let count = 0
      for (var i = this.notifications.docs.length - 1; i >= 0; i--) {
        if (!this.notifications.docs[i].status)
          count++
      }
      return count
    }
  },
  data () {
    return {
      schedule: [],
      attributesCalendar: [],
      isLoadingCalendar: true
    }
  },
  watch: {
    isAuth (val, oldVal) {
      if (!this.notifications.docs.length)
        this.getNotifications()
    }
  },
  methods: {
    ...mapActions({
      resetNotifications: 'notifications/resetNotifications',
      getNotifications: 'notifications/getNotifications',
      markAllAsRead: 'notifications/markAllAsRead'
    }),
    loadNotificacions () {
      if (this.isAuth) {
        this.getNotifications()
      }
    },
    getSchedule () {
      this.attributesCalendar = []
      this.isLoadingCalendar = true
      ClassesService.getUserClass()
      .then(
        resp => {
          this.schedule = resp.result.docs
              let dates = []
              for(let i in this.schedule) {
                this.pushEvent(this.schedule[i])
              }
          },
          error => {}
      )
      .finally (() =>{ this.isLoadingCalendar = false })
    },
    pushEvent (schedule) {
        let label = schedule.subject ? `Clase de ${schedule.subject.title} - ${schedule.status}` : `Clase ${schedule.status}`
        let bar = true
        switch (schedule.status) {
            case 'PENDIENTE':
                bar = { color: 'yellow', style: { backgroundColor: '#ffc107', } }
                break;
            case 'CONFIRMADA':
                bar = { color: 'blue', style: { backgroundColor: '#0054cc', } }
                label = schedule.subject ? `Clase de ${schedule.subject.title}` : `Clase ${schedule.status}`
                break;
            case 'FINALIZADA':
                bar = { color: 'green', style: { backgroundColor: 'green' } }
                break;
            case 'RECHAZADA':
                bar = { color: 'black', style: { backgroundColor: '#333' } }
                break;
        }
        this.attributesCalendar.push({
            bar,
            dates: new Date(moment(schedule.date_start)),
            popover: {
                label
            },
        })
    },
    eventDropDown () {
      console.log('eventDropDown')
    }
  },
  beforeMount() {
    if (!this.notifications.docs.length)
      this.loadNotificacions()

    this.$bus.$on('notifications:dropdown:refresh', () => {
      this.resetNotifications()
    })
    this.$bus.$on('refresh:diary', () => {
      this.getSchedule()
    })
  },
  beforeDestroy () {
    this.$bus.$off('notifications:dropdown:refresh', () => {})
    this.$bus.$off('refresh:diary', () => {})
  },
  mounted () {
    this.getSchedule()
  }
}
</script>


<style lang="scss">
  .dropdown-notifications .dropdown-notifications__content {
    max-height: 300px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: lighten($gray-300, 0%);
    }

    &::-webkit-scrollbar-thumb {
      background: lighten($primary, 15%);
    }

    &::-webkit-scrollbar-thumb:hover {
      background: darken($primary, 10%);
    }
  }
  .dropdown-notifications {
    &__count {
      content: "";
      position: absolute;
      top: 0;
      right: 5px;
      background-color: $primary;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      color: #FFF;
      font-size: .7rem;
      line-height: 15px;
    }
    .dropdown-toggle {
      position: relative;
      outline: none;
      padding-top: 0;
      padding-bottom: 0;
      font-size: 1.3rem;
      &::after {
        content: none
      }
    }
    .dropdown-menu {
      width: 280px;
      padding-top: 0px;
      padding-bottom: 0px;
      .dropdown-item {
        padding: .25rem;
        .tab-content {
          padding: 1rem;
        }
        &.active, &:active {
          background-color: transparent;
          color: $dark;
        }
      }
      .nav.nav-tabs li {
        width: 50%;
        text-align: center;
      }
    }
    &__content {
      padding: 1rem 1rem .5rem 1rem;
    }
    &__actions {
      text-align: center;
      margin-top: .25rem;
      padding-top: .25rem;
      border-top: 1px solid $gray-200;
    }
  }
  .notifications {
    &__items {}
    &__item {
      display: flex;
      padding-bottom: .5rem;
      position: relative;
      overflow: hidden;
      &:not(:last-child) {
        margin-bottom: .5rem;
        border-bottom: 1px solid $gray-300;
      }
    }
    &__icon {
      width: 10px;
      &:after {
        content: "";
        height: 100%;
        left: 4px;
        width: 2px;
        background-color: $gray-300;
        position: absolute;
      }
      &:before {
        margin-top: 5px;
        display: block;
        width: 10px;
        height: 10px;
        content: "";
        position: relative;
        border-radius: 50%;
        border: 2px solid $primary;
      }
      &.no-show:before {
        background-color: $primary;
      }
    }
  }
</style>
