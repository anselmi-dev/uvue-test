<template>
    <div class="teacher-content-video" v-if="video">
        <div class="teacher-information__title">
            Video de presentación
        </div>
        <div class="teacher-content-video">
            <div class="video">
                <b-embed type="video" aspect="16by9" controls>
                    <source :src="video" type="video/webm">
                    <source :src="video" type="video/mp4">
                </b-embed>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        video: {
            type: String,
            required: false,
            default: null
        }
    }
}
</script>

<style lang="scss">
    .teacher-content-video {
        margin-top: map-get($spacers, 4);
        margin-bottom: map-get($spacers, 4);
        .video { border-left: 4px solid $primary !important; }
    }
</style>
