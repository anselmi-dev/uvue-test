<template>
    <div class="teacher-similar" v-if="related.length">
        <div class="teacher-similar__title">
            <span>{{ title }}</span>
        </div>
        <carousel
            class="teacher-similar__carousel"
            :autoplay="false"
            :autoplayHoverPause="false"
            :rewind="true"
            :nav="false"
            :items="4"
            :pagination-enabled="false"
            :responsive="{0: {items:2} ,600: {items:3}, 800: {items:4}}">
            <div class="px-2" v-for="(gig, index) in related" :key="index">
                <CardTeacher :gig="gig"/>
            </div>
        </carousel>
    </div>
</template>

<script>
import CardTeacher from '../CardTeacher'
import carousel from 'vue-owl-carousel'

export default {
    components: {
        CardTeacher,
        carousel
    },
    props: {
        title: {
            type: String,
            default: 'Alternativas similares',
            required: false
        },
        related: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss">
    .teacher-similar {
        margin-top: 2rem;
        &__title {
            font-size: 2rem;
            color: $dark;
            font-weight: bold;
            margin-bottom: 1rem;
        }
    }
</style>
