<template>
    <div class="head-gig">
        <b-row class="row--sm">
            <b-col class="col-auto">
                <div class="head-gig__photo">
                    <avatar
                        :backgroundColor="'#286EB4'"
                        :src="gig.teacher.user.pic_url"
                        :size="133"
                        :username="gig.teacher.user.first_name.split(' ')[0] + ' ' + gig.teacher.user.last_name.split(' ')[0]" />
                </div>
                <div class="head-gig__mpremiun" v-if="gig.teacher.is_premium"></div>
            </b-col>
            <b-col>
                <div class="head-gig__data">
                    <b-row class="row--sm w-100 flex-nowrap">
                        <b-col>
                            <span class="head-gig__title">
                                {{ gig.title }}
                            </span>
                        </b-col>
                        <b-col class="col-auto head-gig__actions">
                            <b-row class="row--sm">
                                <b-col v-if="!isMyGig">
                                    <button type="button" class="action btn" @click="toggleLike">
                                        <i class="uil uil-heart" v-if="!like" v-b-tooltip.hover title="Agregalo a tus favoritos"></i>
                                        <i class="uil uil-heart-break" v-else v-b-tooltip.hover title="Eliminar de tus favoritos"></i>
                                    </button>
                                </b-col>
                                <b-col>
                                    <button type="button" class="action btn" @click="$modal.show('modal-share')">
                                        <i class="ipunku-share"></i>
                                    </button>
                                    <modal
                                        name="modal-share"
                                        :scrollable="true"
                                        height="auto"
                                        width="768">
                                        <div class="p-5">
                                            <h3 class="text-center mb-2">
                                                {{ isMyGig ? '¡Comparte tu anuncio con tus contactos!' : '¡Comparte este anuncio con tus contactos!' }}
                                            </h3>
                                            <linksShare :data="{url, description, title}"/>
                                        </div>
                                    </modal>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row class="row--sm w-100">
                        <b-col col>
                            <b-row class="row--sm mb-1">
                                <b-col cols="12">
                                    <div class="head-gig__activity-start-date">
                                        Profesor de Punku desde el {{ gig.teacher.created_at | gigDateCreate }}
                                    </div>
                                </b-col>
                                <b-col cols="auto">
                                    <span class="text-capitalize">
                                        {{ gig.teacher.user.first_name.split(' ')[0] + ' ' + gig.teacher.user.last_name.split(' ')[0] }}
                                    </span>
                                    <b-badge variant="light" pill>{{ gig.education_level }}</b-badge>
                                </b-col>
                                <b-col cols="auto">
                                    <b-badge variant="light" pill>{{ gig.review_qt | review_qt }}</b-badge>
                                </b-col>
                                <b-col cols="auto" v-if="gig.files_url">
                                    <b-badge variant="warning" pill class="font-weight-bold">{{ gig.files_url | isVerific }}</b-badge>
                                </b-col>
                                <b-col cols="auto">
                                    <b-form-rating v-model="gig.stars_rating" variant="warning" readonly show-value precision="1"></b-form-rating>
                                </b-col>
                            </b-row>
                            <b-row class="row--sm">
                                <b-badge variant="primary" class="mx-1 mb-1" pill v-for="(subject, index) in gig.subject" :key="index">
                                    {{ subject.title }}
                                </b-badge>
                            </b-row>
                        </b-col>
                        <b-col cols="auto" class="mt-auto">
                            <gigPrices :prices="{fare, fare_group, first_class_discount, className: 'simple'}"/>
                            <div v-if="!isMyGig" class="go-to-calendar">
                                <a href="javascript:document.getElementById('calendar-component-id').scrollIntoView()" class="w-100 mt-1 btn btn-danger btn-sm">Elige tu horario</a>
                            </div>
                            <div v-else>
                                <router-link class="btn btn-dark w-100 mt-1" :to="{name: 'gig.edit', params: { slug: gig.slug }}">EDITAR ANUNCIO</router-link>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'
import linksShare from '@/components/blocks/linksShare'
import gigPrices from '@/components/gigs/gigPrices'

import InteractionsService from '@/services/interactions.service'

export default {
    components: {
        linksShare,
        gigPrices,
        Avatar,
    },
    props: {
        gig: {
            type: Object,
            required: true
        },
        discount: {
            type: Number,
            default: .5,
            required: false
        }
    },
    data () {
        return {
            like: false
        }
    },
    mounted () {
        this.like = this.gig.interaction ? this.gig.interaction.like : false
    },
    computed: {
        isMyGig () {
            return this.user && this.user.teacher ? this.gig.teacher._id == this.user.teacher._id : false
        },
        fare () {
            try { return this.gig.fare } catch (error) { return 0 }
        },
        first_class_discount () {
            try {
                return this.discount > 0 && this.gig.first_class_discount
            } catch (error) { return false }
        },
        fare_group () {
            try { return this.gig.fare_group } catch (error) { return 0 }
        },
        url () {
            return `${window.location.origin}${this.$router.resolve({name: 'gig.show', params: { slug: this.gig.slug}}).href}`
        },
        description () {
            return `Hola, estoy dictando clases en Punku: Mi puerta al saber. Te invito a ver y compartir mi anuncio ${this.url}`
        },
        title () {
            return `Hola, estoy dictando clases en Punku: Mi puerta al saber. Te invito a ver y compartir mi anuncio`
        }
    },
    methods: {
        toggleLike () {
            InteractionsService.manageBookmarks({
                gig_id: this.gig._id,
                like: !this.like
            }).then((resp) => {
                this.like = resp.like
            })
        }
    }
}
</script>
