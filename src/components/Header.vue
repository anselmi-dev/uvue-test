<template>
  <div>
    <header class="header w-100" id="header">
      <div class="header__container">
        <nav class="header__navigation">
          <div class="header__logo">
            <router-link to="/">
              <!-- <logo class="mx-100 h-100"/> -->
              <img :src="require('@/assets/logo/logo.svg')" alt="logo punku">
            </router-link>
          </div>

          <PunkuSearchStudents id="header-punku-search"/>
          <nav class="header__nav d-none d-sm-flex">
            <router-link
              :to="{ name: 'teacher.landing'}"
              v-if="!isTeacher"
              id="tooltip-punku-teacher">
                Enseña en Punku
              <b-tooltip target="tooltip-punku-teacher" triggers="hover">
                Conviertete en profesor.<br><strong>¡Enseña en Punku!</strong>
              </b-tooltip>
            </router-link>

            <a
              href="javascript:void(0);"
              v-if="!isAuth"
              @click="toLogin">
                Conéctate
            </a>

            <dropdown-notifications v-if="isAuth" />

            <b-dropdown v-if="isAuth" right :class="'punku__dropdown-toggle ml-2'" variant="outline-primary" menu-class="py-0">
              <template v-slot:button-content>
                <profileSimpleCard :name="user.first_name"/>
              </template>
              <b-dropdown-item :to="{name: 'account.dashboard'}">
                <i class="uil uil-user"></i> <span>Mi Perfil</span>
              </b-dropdown-item>
              <b-dropdown-item :to="{name: isTeacher ? 'account.classes.teach' : 'account.classes'}">
                <i class="uil uil-chat-bubble-user"></i> <span>Mis clases</span>
              </b-dropdown-item>
              <b-dropdown-item :to="{name: 'help'}">
                <i class="uil uil-question-circle"></i> <span>Ayuda</span>
              </b-dropdown-item>
              <b-dropdown-item @click="logout">
                <i class="uil uil-sign-out-alt"></i> <span>Salir</span>
              </b-dropdown-item>
            </b-dropdown>
          </nav>

          <nav class="header__nav d-block d-sm-none">
            <button class="btn btn-outline-primary" v-b-toggle.sidebar-backdrop>
              <span v-if="!isAuth">Menu</span>
              <profileSimpleCard v-else :name="user.first_name"/>
            </button>
          </nav>
        </nav>
      </div>
    </header>
    <ModalAuth />
    <b-sidebar
      id="sidebar-backdrop"
      title="Menú"
      :backdrop-variant="'light'"
      :bg-variant="'white'"
      backdrop
      shadow

      class="bg-white"
    >
      <nav class="mb-3 px-3">
        <b-nav vertical>
          <b-nav-item :to="{name: 'account.dashboard'}">Mi Perfil</b-nav-item>
          <b-nav-item :to="{name: isTeacher ? 'account.classes.teach' : 'account.classes'}">Mis clases</b-nav-item>
          <b-nav-item :to="{ name: 'teacher.landing'}" v-if="!isTeacher">Enseña en Punku</b-nav-item>
          <b-nav-item :to="{name: 'help'}">Ayuda</b-nav-item>
        </b-nav>
      </nav>
      <template v-slot:footer>
        <div class="d-flex bg-dark text-light align-items-center px-3 py-2" v-if="user">
          <button class="ml-auto btn btn-outline-light" @click="logout">Cerrar sesión</button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import auth from '@/mixins/auth'

import ModalAuth from './auth/ModalAuth.vue'
import profileSimpleCard from './profile/profileSimpleCard'
import PunkuSearchStudents from '@/components/blocks/punkuSearchStudents'
import AuthService from '@/services/auth.service';
import dropdownNotifications from '@/components/notifications/dropdownNotifications'
import logo from '@/assets/logo/logo.svg?inline'

export default {
  mixins: [auth],
  components: {
    ModalAuth,
    profileSimpleCard,
    PunkuSearchStudents,
    dropdownNotifications,
    logo
  },
  methods: {
    toLogin () {
      if (this.$router.currentRoute.name == 'login')
        this.$router.go({ name: 'login' })
      else
        this.$bus.emit('open-modal-auth')
    },
    logout () {
      AuthService.logout().then(() => {
        localStorage.removeItem('token');
        window.location.href = '/'
        try {
          FB.logout((response) => {});
        } catch (error) {}
      })
    },
    openPanel () {
      this.$bus.emit('open-panel-layout');
    },
    handleSubmit(result)  {
      this.nextStep(result)
    }
  }
}
</script>
