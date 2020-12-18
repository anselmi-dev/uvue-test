<template>
    <div class="ablock-premium" :class="variant">
        <div class="ablock-premium__content">
            <slot/>
        </div>
        <svg class="ablock-premium__a" viewBox="0 0 375 283" fill="none">
            <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white"></rect>
            <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white"></rect>
        </svg>
        <svg class="ablock-premium__b" viewBox="0 0 375 283" fill="none">
            <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white"></rect>
            <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-85 0 107.48)" fill="white"></rect>
        </svg>
    </div>
</template>

<script>
export default {
    props: {
        variant: {
            default: null,
            type: String
        }
    }
}
</script>

<style lang="scss">
    .ablock-premium {
        box-shadow: 0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04);
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        padding-top: .25rem;
        padding-bottom: .25rem;
        border-radius: .25rem;
        background-color: $danger;
        color: $white;
        overflow: hidden;
        position: relative;
        &.primary {
            background-color: $primary;
        }
        &.warning {
            background-color: $cyan;
        }
        &__a,
        &__b {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            pointer-events: none;
            max-width: 100%;
            transform: scale(1);
            opacity: 0.1;
            &__a {
                max-width: 60%;
                bottom: 0;
            }
            &__b {
                transform: scale(.5);
                opacity: 0.2;
            }
        }
        &__text { max-width: 70%; }
        &__img { max-width: 30%; text-align: center;
            i {
                font-size: 200px;
            }
        }
        &__content {
            display: flex;
            flex-wrap: wrap;
            margin-left: -3px;
            margin-right: -3px;
            align-items: center;
        }
        @media screen and (max-width: 600px) {
            &__text { max-width: 100%; }
            &__img {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                opacity: .4;
            }

        }
    }
</style>