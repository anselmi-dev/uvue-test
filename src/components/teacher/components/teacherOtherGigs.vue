<template>
    <div class="teacher-other-gigs" v-if="showGigs">
        <div class="teacher-information__title">
            Tambien enseño
        </div>
        <div class="teacher-information__content">
            <carousel
                class="teacher-similar__carousel"
                :autoplay="false"
                :autoplayHoverPause="false"
                :rewind="true"
                :nav="false"
                :pagination-enabled="false"
                :responsive="{0: {items:1} ,600: {items:2}}">
                <div class="px-2" v-for="(gig, index) in gigs" :key="index">
                    <CardTeacher :gig="gig"/>
                </div>
            </carousel>
        </div>
    </div>
</template>

<script>
import CardTeacher from '@/components/teacher/CardTeacher'
import carousel from 'vue-owl-carousel'

export default {
    components: {
        CardTeacher,
        carousel
    },
    props: {
        gigs: {
            required: true,
            default: null
        }
    },
    computed: {
        showGigs () {
            return this.gigs && this.gigs.length
        }
    },
}
</script>