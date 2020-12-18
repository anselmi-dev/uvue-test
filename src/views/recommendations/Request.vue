<template>
    <div class="container">
        <div class="row" v-if="load">
            <loading :active.sync="isLoading" :is-full-page="false" />
            <div class="col-12 col-lg-7 mx-auto" v-if="!success">
                <div class="punku-box mb-3">
                    <div class="row row--sm">
                        <div class="col-auto">
                            <avatar :backgroundColor="'#0069ff'" :src="user_teacher.pic_url" :username="full_name" />
                        </div>
                        <div class="col">
                            <h3 class="mb-0">Deja una recomendación para</h3>
                            <h3 class="text-capitalize mb-0">
                                <strong>{{ full_name }}</strong>
                            </h3>
                        </div>
                    </div>
                    <hr>
                    <form @submit.prevent="send" novalidate>
                        <div class="textarea-autosize-count">
                            <textarea-autosize
                                class="form-control"
                                :class="{'is-invalid': $v.commended_teacher.$error}"
                                :placeholder="'Escribe algo sobre ' + full_name"
                                v-model="commended_teacher"
                                :maxlength="$v.commended_teacher.$params.maxLength.max"
                                :minlength="$v.commended_teacher.$params.minLength.min"
                            />
                            <small>{{ commended_teacher.length }} / {{ $v.commended_teacher.$params.maxLength.max }}</small>
                        </div>
                        <small class="invalid-feedback error" v-if="$v.commended_teacher.$error">
                            Debe contener al menos <strong>{{ $v.commended_teacher.$params.minLength.min }} caracteres</strong>
                        </small>

                        <div class="row row--sm">
                            <div class="col-auto mt-3">
                                <button class="btn btn-outline-primary" type="submit">Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-12 col-lg-7 mx-auto" v-else>
                <div class="punku-box text-center">
                    <h2 class="mb-2 text-uppercase"><strong>Su recomendación fue enviada</strong></h2>
                    <img :src="require('@/assets/icons/calidad.svg')" alt="recomendacion" width="200">
                    <hr>
                    <router-link class="btn btn-pill px-4 mx-1 btn-primary" :to="{name: 'home'}">INICIO</router-link>
                    <router-link class="btn btn-pill px-3 mx-1 btn-outline-dark" :to="{name: 'account.dashboard'}">MI PERFIL</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { required, minLength, maxLength } from 'vuelidate/lib/validators'
    import RecommendationService from '@/services/recommendation.service'
    import Avatar from 'vue-avatar'
    
    export default {
        components: {
            Avatar
  	    },
        data () {
            return {
                load: false,
                success: false,
                isLoading: true,
                user_teacher: undefined,
                commended_teacher: ''
            }
        },
        metaInfo () {
            return {
                meta: [
                    // Twitter Card
                    {name: 'twitter:card', content: 'summary'},
                    {name: 'twitter:title', content: `Me podrás dejar una recomendación como profesor en Punku?`},
                    {name: 'twitter:description', content: this.title_gig},
                    // image must be an absolute path
                    {name: 'twitter:image', content: this.pick_url },
                    // Facebook OpenGraph
                    {property: 'og:title', content: `Me podrás dejar una recomendación como profesor en Punku?`},
                    {property: 'og:site_name', content: 'Punku - Mi puerta al saber'},
                    {property: 'og:type', content: 'article'},
                    {property: 'og:image', content: this.pick_url },
                    {property: 'og:description', content: this.title_gig}
                ]
            }
        },
        computed: {
            pick_url () {
                if (this.user_teacher && this.user_teacher.pic_url)
                    return this.user_teacher.pic_url
                return undefined
            },
            full_name () {
                if (this.user_teacher)
                    return this.user_teacher.first_name.split(' ')[0] + ' ' + this.user_teacher.last_name.split(' ')[0]
                return null
            },
            title_gig () {
                if (this.user_teacher && this.user_teacher.teacher.gigs.length) 
                    return this.user_teacher.teacher.gigs[0].title
                return null
            }
        },
        beforeMount() {
            RecommendationService.getUser(this.$route.params.slug)
            .then((resp) => {
                if (resp.length == 1) {
                    this.user_teacher = resp[0]
                    this.isLoading = false
                    this.load = true
                } else {
                    this.$bus.emit("app-error")
                }
            })
            .catch(err => {
                this.$bus.emit("app-error")
            })
        },
        methods: {
            share () {
                FB.ui({
                    display: 'popup',
                    method: 'share',
                    href: 'http://192.168.0.100:8080/recomendaciones/eliezer-judio',
                }, function(response){});
            },
            send () {
                this.$v.commended_teacher.$touch()
                if (!this.$v.commended_teacher.$invalid) {
                    this.isLoading = true
                    RecommendationService.createCommendation({
                        teacher: this.user_teacher.teacher._id,
                        text: this.commended_teacher
                    }).then((resp) => {
                        this.isLoading = false
                        this.success = true
                    }).catch(err => {
                        this.isLoading = false
                        this.$bus.emit("notifications:push", { type: 'error', title: 'Ups!', message: err })
                    })
                }
            }
        },
        validations: {
            commended_teacher: {
                required,
                minLength: minLength(40),
                maxLength: maxLength(300)
            }
        }
    }
</script>
