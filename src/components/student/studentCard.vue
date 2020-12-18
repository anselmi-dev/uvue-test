<template>
    <div class="student-card">
        <div class="student-card__profile">
            <img :src="data.interactions.student.pic_url">
        </div>
        <div class="student-card__name">
            {{ data.interactions.student | splitFullName }}
        </div>
    </div>
</template>

<script>
import VClamp from 'vue-clamp'

export default {
	components: {
        VClamp
	},
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    methods: {
    },
}
</script>

<style lang="scss">
    .student-card {
        display: flex;
        align-items: center;
        margin-left: -10px;
        margin-right: -10px;
        & > * {
            margin: 10px;
        }
        &__name {
            text-transform: capitalize;
        }
        &__profile {
            display: block;
            width: 50px;
            height: 50px;
            background: $gray-300;
            border-radius: 50%;
            overflow: hidden;
            position: relative;
            img {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                min-width: 50px;
                min-height: 50px;
            }
        }
        border-bottom: 1px solid $gray-200;
    }
</style>
