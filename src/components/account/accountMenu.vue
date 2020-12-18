<template>
    <div class="account-menu">
        <div class="account-menu__content" v-if="user">

            <div class="account-menu__picture">
                <span class="premium" v-if="isPremium"></span>
                <profile-avatar />

                <div class="account-picture__info">
                    <b-button variant="outline-primary" class="menu-slider--actions btn-sm ml-auto mb-3" @click="showMenu = !showMenu">MENU</b-button>

                    <div>
                        <span class="d-block text-center text-capitalize text-truncate">
                            {{ user.first_name.split(" ")[0] + ' ' + user.last_name.split(" ")[0] }}
                        </span>
                        <span class="d-block text-center text-muted h7 text-truncate">
                            {{ user.email }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="menu-slider" :class="{'show': showMenu}">
                <b-button variant="none" class="menu-slider__label" @click="showMenu = false">
                    <span>Menu</span>
                    <span class="h7 border border-dark p-1">Cerrar</span>
                </b-button>
                <b-button variant="outline-primary" class="menu-slider__close" @click="showMenu = false">
                </b-button>

                <ul class="account-menu__list">
                    <li>
                        <router-link
                            :to="{name: 'account.dashboard'}"
                            :class="{'active': isActiveRoute('account.dashboard')}">
                            <span>Mi perfil</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            :to="{name: 'account.diary'}"
                            :class="{'active': isActiveRoute('account.diary')}">
                            <span>Mi agenda</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            v-if="!isTeacher"
                            :to="{name: 'account.classes'}"
                            :class="{'active': isActiveRoute('account.classes')}">
                            <span>Mis clases</span>
                        </router-link>
                        <div v-else>
                            <b-button v-b-toggle="'collapse-menu-acclasses'" variant="none" :class="{'active': isVisiblePath('/mi-cuenta/mis-clases')}">Mis clases</b-button>
                            <b-collapse id="collapse-menu-acclasses" :visible="isVisiblePath('/mi-cuenta/mis-clases')">                        
                                <router-link
                                    :to="{name: 'account.classes.teach'}"
                                    :class="{'active': isActiveRoute('account.classes.teach')}">
                                    <span>Por dictar</span>
                                </router-link>
                                <router-link
                                    :to="{name: 'account.classes'}"
                                    :class="{'active': isActiveRoute('account.classes')}">
                                    <span>Por recibir</span>
                                </router-link>
                            </b-collapse>
                        </div>
                        <!-- <div class="dropdown-toggle-account" v-else>
                            <a
                                class="router-link-active"
                                :class="{'active': isActiveRoute('account.classes.teach') || isActiveRoute('account.classes')}"
                                href="javascript:void(0);">
                                <span>Mis clases</span>
                            </a>
                            <div>
                                <router-link
                                    :to="{name: 'account.classes.teach'}"
                                    :class="{'active': isActiveRoute('account.classes.teach')}">
                                    <span>Por dictar</span>
                                </router-link>
                                <router-link
                                    :to="{name: 'account.classes'}"
                                    :class="{'active': isActiveRoute('account.classes')}">
                                    <span>Por recibir</span>
                                </router-link>
                            </div>
                        </div> -->
                    </li>
                    <!-- 
                    <li>
                        <router-link
                            v-if="!isTeacher"
                            :to="{name: 'account.conferences'}"
                            :class="{'active': isActiveRoute('account.conferences')}">
                            <span>Mis conferencias</span>
                        </router-link>
                        <div class="dropdown-toggle-account" v-else>
                            <a
                                class="router-link-active"
                                :class="{'active': isActiveRoute('account.conferences.teach') || isActiveRoute('account.conferences')}"
                                href="javascript:void(0);">
                                <span>Mis conferencias</span>
                            </a>
                            <div>
                                <router-link
                                    :to="{name: 'account.conferences.teach'}"
                                    :class="{'active': isActiveRoute('account.conferences.teach')}">
                                    <span>Por dictar</span>
                                </router-link>
                                <router-link
                                    :to="{name: 'account.conferences'}"
                                    :class="{'active': isActiveRoute('account.conferences')}">
                                    <span>Por recibir</span>
                                </router-link>
                            </div>
                        </div>
                    </li> -->

                    <li>
                        <router-link
                            v-if="!isTeacher"
                            :to="{name: 'account.courses'}"
                            :class="{'active': isActiveRoute('account.courses')}">
                            <span>Mis cursos</span>
                        </router-link>
                        <div v-else>
                            <b-button v-b-toggle="'collapse-menu-acourses'" variant="none" :class="{'active': isVisiblePath('/mi-cuenta/mis-cursos')}">Mis cursos</b-button>
                            <b-collapse id="collapse-menu-acourses" :visible="isVisiblePath('/mi-cuenta/mis-cursos')">                        
                                <router-link
                                    :to="{name: 'account.courses.teach'}"
                                    :class="{'active': isActiveRoute('account.courses.teach')}">
                                    <span>Por dictar</span>
                                </router-link>
                                <router-link
                                    :to="{name: 'account.courses'}"
                                    :class="{'active': isActiveRoute('account.courses')}">
                                    <span>Por recibir</span>
                                </router-link>
                            </b-collapse>
                        </div>
                    </li>

                    <li>
                        <router-link
                            :to="{name: 'account.interactions'}"
                            :class="{'active': isActiveRoute('account.interactions')}">
                            <span>Mis favoritos</span>
                        </router-link>
                    </li>

                    <li v-if="isTeacher">
                        <b-button v-b-toggle="'collapse-menu-teacher'" variant="none" :class="{'active': isVisiblePath('/mi-cuenta/profesor')}">
                            PunkuProfe
                        </b-button>
                        <b-collapse id="collapse-menu-teacher" :visible="isVisiblePath('/mi-cuenta/profesor')">
                            <router-link
                                :to="{name: 'account.teacher.gigs'}"
                                :class="{'active': isActiveRoute('account.teacher.gigs')}">
                                <span>Mis anuncios</span>
                            </router-link>
                            <router-link
                                :to="{name: 'account.teacher.availability'}"
                                :class="{'active': isActiveRoute('account.teacher.availability')}">
                                <span>Mi disponibilidad</span>
                            </router-link>
                            <router-link
                                :to="{name: 'account.teacher.statistics'}"
                                :class="{'active': isActiveRoute('account.teacher.statistics')}">
                                <span>Mis estadisticas</span>
                            </router-link>
                            <router-link
                                :to="{name: 'account.teacher.recomendations'}"
                                :class="{'active': isActiveRoute('account.teacher.recomendations')}">
                                <span>Mis recomendaciones</span>
                            </router-link>
                            <router-link
                                :to="{name: 'account.teacher.my-students'}"
                                :class="{'active': isActiveRoute('account.teacher.my-students')}">
                                <span>Mis alumnos</span>
                            </router-link>
                            <router-link
                                :to="{name: 'account.teacher.confirguration'}"
                                :class="{'active': isActiveRoute('account.teacher.confirguration')}">
                                <span>Configuración</span>
                            </router-link>
                        </b-collapse>
                    </li>
                </ul>
                <div class="account-menu__premiun d-none d-md-block" v-if="!isPremium && isTeacher">
                    <router-link :to="{name: 'premium'}" class="btn btn-danger w-100" v-b-tooltip.hover model="Ve las ventajas de ser premium">
                        <i class="ipunku-crown"></i>
                        <span>PREMIUM</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import profileAvatar from '@/components/profile/profileAvatar'

export default {
    components: {
        profileAvatar
    },
    data () {
        return {
            isLoading: false,
            showMenu: false
        }
    },
    watch: {
        $route(to, from) {
            this.showMenu = false
        }
    },
    methods: {
        isActiveRoute (name) {
            return this.$route.name == name
        },
        isVisiblePath (name) {
            return this.$route.fullPath.includes(name)
        }
    }
}
</script>

<style lang="scss">
    .account-menu__picture .account-picture {
        max-width: 60%;
         margin: auto;
         margin-bottom: .5rem;
    }
    .menu-slider__label,
    .menu-slider--actions,
    .menu-slider__close {
        display: none !important;
    }
    @media screen and (max-width: 768px) {        
        .account-menu__picture {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .menu-slider--actions {
            display: block !important;
        }
        .menu-slider {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            background: #fff;
            z-index: 13;
            width: 300px;
            max-width: calc(100% - 30px);
            padding: 1rem .5rem;
            overflow: auto;
            transition: all .5s;
            left: -300px;
            overflow: hidden;
            &__label {
                width: 100%;
                padding-left: 0;
                padding-top: 0;
                display: flex !important;
                justify-content: space-between;
                align-items: center;
                font-size: 1.5rem;
                text-transform: capitalize;
                font-weight: bold;
            }
            &.show {
                box-shadow: 5px 0px 29px #333;
                left: 0;
            }
            .account-menu__list {
                display: block;
            }
        }
        .menu-slider.show .menu-slider__close {
            display: flex !important;
        }
        .menu-slider__close {
            position: fixed;
            right: 0;
            height: 100vh;
            top: 0;
            max-width: calc(100% - 300px);
            width: 100%;
            border: none;
            display: none;
            border-radius: 0;
            justify-content: center;
            &,
            &:active,
            &:hover,
            &:focus {
                outline: none !important;
                background: #0000002e !important;
                box-shadow: none !important;
                border: none !important;
            }
        }
    }
</style>
