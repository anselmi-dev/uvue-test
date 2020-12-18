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
                            <router-link :to="{name: 'gig.show', params: { slug: gig.slug }}" class="head-gig__title">
                                {{ gig.title }}
                            </router-link>
                        </b-col>
                        <b-col class="col-auto head-gig__actions">
                            <b-row class="row--sm">
                                <b-col>
                                    <button type="button" class="action btn" @click="$modal.show('modal-share' + gig._id)">
                                        <i class="ipunku-share"></i>
                                    </button>
                                    <modal
                                        :name="'modal-share'+ gig._id"
                                        :scrollable="true"
                                        height="auto"
                                        width="768">
                                        <div class="p-5">
                                            <h3 class="text-center mb-2">
                                                {{ isMyGig ? '¡Comparte tu anuncio!' : '¡Comparte este anuncio!' }}
                                            </h3>
                                            <links-recomendations :data="{url, emailSimple: true, description, title}"/>
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
                                        Profesor de Punku desde {{ gig.teacher.created_at | formatDate }}
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
                    </b-row>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'
import linksRecomendations from '@/components/blocks/linksRecomendations'
import gigPrices from '@/components/gigs/gigPrices'

import InteractionsService from '@/services/interactions.service'

export default {
    components: {
        linksRecomendations,
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
            return `Hola, soy profesor de Punku y quería que pudieras apoyarme con mi publicación ${this.url}`
        },
        title () {
            return `Hola! Soy profesor de Punku`
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
