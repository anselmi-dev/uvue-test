<template>
    <div class="recommendations-confirmation">
        <div class="container">
            <div class="row" v-if="load">
                <loading :active.sync="isLoading" :is-full-page="false" />
                <div class="col-12 col-lg-7 mx-auto">
                    <div class="punku-box mb-3">
                        <div class="row row--sm mb-1 pb-1 border-bottom">
                            <div class="col-auto">
                                <avatar :backgroundColor="'#0069ff'" :src="commend.commend_author.pic_url" :username="full_name" />
                            </div>
                            <div class="col">
                                <h3 class="">
                                    <strong class="text-capitalize">{{ full_name }}</strong> te mando una recomendación
                                </h3>
                            </div>
                        </div>
                        <div class="row row--sm">
                            <div class="col-12">
                                <div class="border-left border-primary pl-1 ml-1">
                                    {{ commend.commend_text }}
                                </div>
                            </div>

                            <div class="col-12" v-if="isPendiente">
                                <hr>
                                <p>Requerimos tu aprobación para permitir la publicación de esta recomendación.</p>
                                <div class="row row--sm">
                                    <div class="col-auto">
                                        <button class="btn btn-outline-danger" @click="denyCommends">Rechazo</button>
                                    </div>
                                    <div class="col-auto">
                                        <button class="btn btn-primary" @click="aproveCommends">Acepto</button>
                                    </div>
                                    <div class="col-12 mt-2">
                                        <span class="text-muted">
                                            No se le notificara al {{ full_name }} si rechazaste su recomendación.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12" v-else>
                                <hr>
                                <p>Requerimos tu aprobación para permitir la publicación de esta recomendación.</p>
                                <div v-if="commend.status == 'CONFIRMADA'">
                                    <div class="alert alert-success" role="alert">
                                        <i class="uil uil-check-circle"></i> La recomendación fue <strong>aceptada</strong>.
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="alert alert-danger" role="alert">
                                        <i class="uil uil-ban"></i> La recomendación fue <strong>rechazada</strong>.
                                    </div>
                                </div>
                                <hr>
                                <b-row class="row--sm">
                                    <b-col cols="auto">
                                        <router-link :to="{name: 'account.dashboard'}" class="btn btn-outline-primary">Ir a mi perfil</router-link>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'
import RecommendationService from '@/services/recommendation.service'

export default {
    components: { Avatar },
    data () {
        return {
            load: false,
            isLoading: false,
            status: false,
            commend: null
        }
    },
    computed: {
        full_name () {
            return this.commend.commend_author.first_name.split(' ')[0] + ' ' + this.commend.commend_author.last_name.split(' ')[0]
        },
        isPendiente () {
            return this.commend.status == 'PENDIENTE'
        }
    },
    beforeMount() {
        RecommendationService.getCommend(this.$route.params.slug)
        .then((resp) => {
            this.commend = resp
            this.load = true
        })
        .catch(err => {
            this.$bus.emit("app-error")
        })
    },
    methods: {
        aproveCommends () {
            this.isLoading = true
            RecommendationService.aproveCommends({commend: this.$route.params.slug})
            .then((resp) => {
                this.status = true
                this.commend.status = resp.status
            })
            .catch(err => {
                })
            .finally (() => {
                this.isLoading = false
            })
        },
        denyCommends () {
            this.isLoading = true
            RecommendationService.denyCommends({commend: this.$route.params.slug})
            .then((resp) => {
                this.commend.status = resp.status
            })
            .catch(err => {
            })
            .finally (() => {
                this.isLoading = false
            })
        },
    }
}
</script>