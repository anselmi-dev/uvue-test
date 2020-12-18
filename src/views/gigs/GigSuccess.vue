<template>
    <div class="teacher-success">
        <div class="container">
            <div class="teacher-create__step teacher-create__step-model">
                <div class="punku__title text-center">
                    !Felicidades <span class="text-capitalize">{{ user.split_name }}</span>! <br>
                    Tu anuncio fue publicado
                </div>
                <hr>
                <card-gig :teacher="user" :gig="gig"/>
            </div>

            <div class="teacher-create__step">
                <div class="h3 weight-bold text-center">
                    Solicita recomendaciones porque <br>
                    esto ayudará a posicionarte mejor en las búsquedas
                </div>
                <div class="teacher-success__share d-flex align-center flex-wrap">
                    <links-recomendations :data="{url}"/>
                </div>
            </div>

            <!-- <div class="teacher-create__step" v-if="!isPremium">
                <div class="row">
                    <div class="col pr-2">
                        <img src="https://media.pasionmovil.com/2017/10/Spotify-Premium-Oxxo_2.jpg" style="border-radius: 4px">
                    </div>
                    <div class="col pl-2">
                        <img src="https://media.pasionmovil.com/2017/10/Spotify-Premium-Oxxo.jpg" style="border-radius: 4px">
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import GigsFilterService from '@/services/gigs-filter.services'

import VueSocialSharing from 'vue-social-sharing'
import cardGig from '@/components/gigs/cardGig'
import popupPremium from '@/components/premium/popupPremium'
import linksRecomendations from '@/components/blocks/linksRecomendations'

export default {
    components: {
        cardGig,
        popupPremium,
        VueSocialSharing,
        linksRecomendations
    },
    data () {
        return {
            isLoading: true,
            gigDetails: null
        }
    },
    beforeMount () {
        // GigsFilterService.getGigDetails(this.$route.params.slug)
        // .then((gig) => {
        //     this.gigDetails = gig.gigDetails
        //     this.isLoading = false
        // })
        // .catch(err => {
        //     this.$bus.emit("app-error")
        // })
    },
    computed: {
        gig () {
            return this.user.teacher.gigs[this.user.teacher.gigs.length-1]
        },
        title () {
            return this.user.teacher.gigs[this.user.teacher.gigs.length-1].title
        },
        url () {
            return `${window.location.origin}${this.$router.resolve({name: 'recommendations.request', params: {slug: this.user.slug}}).href}`
        },
        quote () {
            return this.user.teacher.gigs[this.user.teacher.gigs.length-1].title
        },
        description () {
            return this.user.teacher.gigs[this.user.teacher.gigs.length-1].title
        }
    },
    beforeDestroy() {
        localStorage.removeItem('punku.teacher.create')
    }
}
</script>
<style lang="scss" scoped>
    .teacher-success {
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        @media screen and (min-width: 1000px) {
            width: 60%;
        }
    }
    .teacher-create__step {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
    .teacher-create__step.teacher-create__step-model {
        position: relative;
        margin-bottom: 2rem;
    }
    .teacher-success {
        &__share {
            display: flex;
            align-items: center;
            justify-content: center;
            button {
                margin: 5px;
                padding: .4rem 1.2rem;
                text-decoration: none;
                font-size: 1rem;
                line-height: 1;
                border: none;
                background-color: gray;
                border-radius: 4px;
                display: flex;
                align-items: center;
                i {
                    margin-right: .5rem;
                    padding-right: .5rem;
                    border-right: 1px solid $white;
                }
                &.f { color: #fff; background-color: $facebook ; }
                &.g { color: #fff; background-color: $google_plus; }
                &.l { color: #fff; background-color: $linkedin; }
                &.e { color: #fff; background-color: $primary; }
                &.i { color: #fff; background-color: $instagram; }
                &.t { color: #fff; background-color: $twitter; }
            }
        }
    }
</style>
