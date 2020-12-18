<template>
    <div class="teacher-information" v-if="!isLoading">
        <div id="teacher-header" class="teacher-information__container teacher-information__container--header">
            <head-gig
                :gig="gigDetails"/>
        </div>


        <div class="teacher-information__container" v-if="gigDetails.is_my_gig && !user.teacher.is_premium">
            <contentPremiumGig class="mt-4"/>
        </div>

        <div class="teacher-information__container">
            <div class="row">
                <div class="teacher-information__main">
                    <div class="teacher-information__content">
                        <teacherBio :data="{
                            description: gigDetails.description,
                            education_level: gigDetails.education_level
                        }"/>
                    </div>

                    <div class="teacher-information__opinions">
                        <teacherLanguages :languages="gigDetails.languages"/>
                        <teacherRequirements :requirements="gigDetails.requirements"/>
                        <gigPanelReservation
                            v-if="isMobile"
                            class="teacher-reserve--w100"
                            :gig="gigDetails"/>
                        <teacherVideo :video="gigDetails.video_url"/>
                        <div v-if="gigDetails.teacher.is_premium">
                            <teacherCv :files="gigDetails.files_url"/>
                            
                            <teacherOtherGigs :gigs="getOtherGigs(gigDetails._id)"/>
                            
                            <teacherCourses />
                        </div>
                    </div>
                </div>
                <div class="teacher-information__panel">
                    <div class="teache-panel">
                        <gigPanelReservation v-if="!isMobile" :gig="gigDetails"/>
                    </div>
                </div>
            </div>
        </div>    
        <div class="teacher-information__container">
            <div class="teacher-information__main teacher-information__main--100 w-100 mw-100">
                <teacherListOpinions
                    :id="gigDetails._id"
                    :name="gigDetails.teacher.user.first_name + ' ' + gigDetails.teacher.user.last_name"
                    />
                <teacherListRecommendations
                    :id="gigDetails.teacher._id"
                    :name="gigDetails.teacher.user.first_name + ' ' + gigDetails.teacher.user.last_name"
                    />
                <teacherSimilar v-if="gigsRelated" :related="gigsRelated.docs"/>
            </div>
        </div>
    </div>
</template>

<script>
import GigsFilterService from '@/services/gigs-filter.services'

import StarRating from 'vue-star-rating'
import teacherVideo from '@/components/teacher/components/teacherVideo'
import teacherBio from '@/components/teacher/components/teacherBio'
import teacherSimilar from '@/components/teacher/opinions/teacherSimilar'
import teacherListOpinions from '@/components/teacher/opinions/teacherListOpinions'
import teacherStatistics from '@/components/teacher/statistics/teacherStatistics'
import teacherListRecommendations from '@/components/teacher/opinions/teacherListRecommendations'

import teacherCv from '@/components/teacher/components/teacherCv'
import teacherLanguages from '@/components/teacher/components/teacherLanguages'
import teacherModalidad from '@/components/teacher/components/teacherModalidad'
import teacherRequirements from '@/components/teacher/components/teacherRequirements'

import teacherOtherGigs from '@/components/teacher/components/teacherOtherGigs'
import teacherConferences from '@/components/teacher/components/teacherConferences'
import teacherCourses from '@/components/teacher/components/teacherCourses'

import gigPanelReservation from '@/components/gigs/gigPanelReservation'

import headGig from '@/components/gigs/headGig'
import contentPremiumGig from '@/components/premium/blocks/contentPremiumGig';

export default {
    components: {
        StarRating,
        teacherSimilar,
        teacherListOpinions,
        teacherListRecommendations,
        teacherStatistics,
        teacherBio,
        teacherVideo,
        teacherCv,
        teacherLanguages,
        teacherModalidad,
        teacherRequirements,
        headGig,
        teacherOtherGigs,
        teacherConferences,
        teacherCourses,
        gigPanelReservation,
        contentPremiumGig,
    },
    data () {
        return {
            isLoading: true,
            gigDetails: null,
            gigsRelated: null,
            slug: null,
            isMobile: false
        }
    },
    watch: {
        $route(to, from) {
            if (to.params.slug != this.slug)
                this.getGig(to.params.slug)
        }
    },
    beforeMount() {
        this.reportWindowSize()
        window.addEventListener('resize', () => {
            this.reportWindowSize()
        });
        this.getGig(this.$route.params.slug)
    },
    metaInfo () {
        return {
            title: 'hooooooooo',
            meta: [
                // Twitter Card
                {name: 'twitter:card', content: 'article'},
                {name: 'twitter:title', content: this.gigDetails ? this.gigDetails.title : ''},
                // {name: 'twitter:description', content: this.title_gig},
                {name: 'twitter:image', content: this.gigDetails ? this.gigDetails.teacher.user.pic_url: ''},
                // Facebook OpenGraph
                {property: 'og:title', content: this.gigDetails ? this.gigDetails.title : ''},
                {property: 'og:site_name', content: 'Punku - Mi puerta al saber'},
                {property: 'og:type', content: 'article'},
                {property: 'og:image', content: this.gigDetails ? this.gigDetails.teacher.user.pic_url: ''},
                // {property: 'og:description', content: this.title_gig}
            ]
        }
    },
    methods: {
        reportWindowSize () {
            if (window.innerWidth > 1000)
                this.isMobile = false
            else
                this.isMobile = true
        },
        getGig (slug) {
            this.slug = slug
            this.isLoading = true
            GigsFilterService.getGigDetails(slug)
            .then((gig) => {
                if (gig.gigDetails.is_deleted)
                    this.$bus.emit("app-error")
                else {
                    this.gigDetails = gig.gigDetails
                    this.gigDetails.interaction = gig.interaction
                    this.gigDetails.is_my_gig = this.user ? this.user._id == this.gigDetails.teacher.user._id : false
                    this.isLoading = false

                    try {
                        GigsFilterService.getGigsRelated({"subject": gig.gigDetails.subject, 'id': gig.gigDetails._id})
                        .then((gigList) => {
                            this.gigsRelated = gigList
                        })
                        .catch(err => {
                            this.gigsRelated = []
                        })
                    } catch (e) {}
                }
            })
            .catch(err => {
                this.$bus.emit("app-error")
            })
        },
        getOtherGigs (id) {
            let gigs = this.gigDetails.teacher.gigs.filter(gig => {
                return gig._id != id
            })
            let teacher = Object.assign({}, {teacher: this.gigDetails.teacher})
            delete teacher.gigs;
            delete teacher.schedule;
            return gigs.map((gig) => {
                gig = Object.assign({}, gig, teacher)
                return gig;
            });
        }
    },
}
</script>

<style>
    @media screen and (min-width: 768px) {
        body.page-gig-show .calendar-component .table-scroll {
            max-height: 250px;
            min-height: 250px;
        }
    }
</style>
