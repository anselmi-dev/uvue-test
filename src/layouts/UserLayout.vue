<template>
    <div class="parent-content">
        <div class="content">
            <!-- your content here -->
            <div class="account-profile punku-before-head">
                <div class="container">
                    <div class="row">
                        <div class="account-slider col-12 col-md-4 col-lg-3">
                            <div class="punku-box">
                                <account-menu/>
                            </div>
                        </div>
                        <vue-page-transition
                            name="fade-in-up"
                            class="account-content col-12 col-md-8 col-lg-9">
                            <router-view class="punku-box" />
                        </vue-page-transition>
                    </div>
                    <div class="punku-box mt-4 p-0" v-if="!isPremium && isTeacher">
                        <contentPremiumAccount/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import accountMenu from '@/components/account/accountMenu';
import contentPremiumAccount from '@/components/premium/blocks/contentPremiumAccount';

export default {
    components: {
        accountMenu,
        contentPremiumAccount
    },
    beforeMount() {
        document.body.classList.add('page-account')
    },
    beforeDestroy() {
        document.body.classList.remove('page-account')
    }
}
</script>
