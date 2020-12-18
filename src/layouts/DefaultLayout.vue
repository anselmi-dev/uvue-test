<template>
    <div>
        <animationHead/>
        <vue-page-transition name="fade-in-up" class="account-content col-12 col-md-8 col-lg-9">
            <router-view class="punku-box" />
        </vue-page-transition>
    </div>
</template>

<script>
import animationHead from '@/components/blocks/animationHead'

export default {
    components: {
        animationHead
    },
}
</script>
