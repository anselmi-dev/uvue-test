<template>
    <div class="teacher-information" v-if="!isLoading">
        <!--
        <div id="teacher-header" class="teacher-information__container teacher-information__container--header">
            <div class="teacher-information__header">
                <teacher-head :gig="gigDetails"/>
            </div>
        </div> -->

        <div class="teacher-information__container">
            <div class="row">
                <div class="col-12 col-lg-6">
                    <div class="gig-edit-blocks punku-box">
                        <gigActive
                            :id="gigDetails._id"
                            :model="gigDetails.is_active"
                        />
                        <gigTitle
                            class="gig-edit-blocks__item"
                            :id="gigDetails._id"
                            :model="gigDetails.title"
                        />
                        <gigSubject
                            class="gig-edit-blocks__item"
                            :id="gigDetails._id"
                            :model="gigDetails.subject"
                        />
                        <gigBio
                            class="gig-edit-blocks__item"
                            :id="gigDetails._id"
                            :model="gigDetails.description"
                        />
                        <gigEducationLevel
                            class="gig-edit-blocks__item"
                            :id="gigDetails._id"
                            :model="gigDetails.education_level"
                        />
                    </div>
                    <div class="gig-edit-blocks punku-box">
                        <gigLanguages
                            class="gig-edit-blocks__item"
                            :model="gigDetails.languages"
                            :id="gigDetails._id"/>
                        <gigRequirements
                            class="gig-edit-blocks__item"
                            :id="gigDetails._id"
                            :model="gigDetails.requirements"/>
                    </div>
                </div>
                <div class="col-12 col-lg-6">
                    <div class="gig-edit-blocks punku-box">
                        <gigModalidad
                            class="gig-edit-blocks__item"
                            :id="gigDetails._id"
                            :model="gigDetails.auto_reservation"/>
                        <gigPrice
                            class="gig-edit-blocks__item"
                            :id="gigDetails._id"
                            :model="{
                                group_class: gigDetails.group_class,
                                fare: gigDetails.fare,
                                fare_select: true,
                                fare_group: gigDetails.fare_group,
                                first_class_discount: gigDetails.first_class_discount
                            }"/>
                        <gigFirstDiscount
                            class="gig-edit-blocks__item"
                            :id="gigDetails._id"
                            :model="gigDetails.first_class_discount"/>
                    </div>
                    <div class="gig-edit-blocks punku-box">
                        <gigVideo
                            class="gig-edit-blocks__item"
                            :id="gigDetails._id"
                            :gig="gigDetails"
                            :model="gigDetails.video_url"/>
                        <gigCv
                            class="gig-edit-blocks__item"
                            :id="gigDetails._id"
                            :gig="gigDetails"
                            :model="gigDetails.files_url ? gigDetails.files_url : []"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'

import gigTitle from '@/components/gigs/edit/components/gigTitle'
import gigVideo from '@/components/gigs/edit/components/gigVideo'
import gigBio from '@/components/gigs/edit/components/gigBio'
import gigEducationLevel from '@/components/gigs/edit/components/gigEducationLevel'
import gigFirstDiscount from '@/components/gigs/edit/components/gigFirstDiscount'
import gigPrice from '@/components/gigs/edit/components/gigPrice'
import gigCv from '@/components/gigs/edit/components/gigCv'
import gigLanguages from '@/components/gigs/edit/components/gigLanguages'
import gigModalidad from '@/components/gigs/edit/components/gigModalidad'
import gigRequirements from '@/components/gigs/edit/components/gigRequirements'
import gigSubject from '@/components/gigs/edit/components/gigSubject'
import gigActive from '@/components/gigs/edit/components/gigActive'

import teacherHead from '@/components/teacher/head/teacherHead'

import GigsFilterService from '@/services/gigs-filter.services'

export default {
    components: {
        StarRating,
        gigSubject,
        gigTitle,
        gigBio,
        gigVideo,
        gigCv,
        gigLanguages,
        gigModalidad,
        gigRequirements,
        gigEducationLevel,
        gigFirstDiscount,
        gigPrice,
        teacherHead,
        gigActive,
    },
    data () {
        return {
            isLoading: true,
            gigDetails: null
        }
    },
    beforeMount() {

        if (this.$route.params.slug) {
            GigsFilterService.getGigDetails(this.$route.params.slug)
            .then((gig) => {
                gig.files_url = gig.gigDetails.files_url == null ? [] : gig.gigDetails.files_url
                this.gigDetails = gig.gigDetails
                this.gigDetails.is_my_gig = this.user ? this.user._id == this.gigDetails.teacher.user._id : false
                if (!this.gigDetails.is_my_gig) {
                    this.$bus.emit("app-error")
                } else {
                    this.isLoading = false
                }
            })
            .catch(err => {
                this.$bus.emit("app-error")
            })
        } else {
            this.$bus.emit("app-error")
        }
    }
}
</script>

<style lang="scss">
    .gig-edit-blocks {
        margin-bottom: 1rem;
        &__item {
            margin-bottom: .75rem;
            padding-bottom: .75rem;
            border-bottom: 1px solid $gray-400;
        }
        & > &__item:last-child {
            margin-bottom: 0rem;
            padding-bottom: 0rem;
            border-bottom: 0
        }
        .title {
            font-size: $h5-font-size;
            font-weight: bold;
            margin-bottom: .8rem;
        }
        .text {
            word-wrap: break-word;
        }
    }
</style>
