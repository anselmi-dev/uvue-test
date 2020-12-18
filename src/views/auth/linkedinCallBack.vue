<template>
    <div class="container">
        <b-row>
            <b-col>redireccionando....</b-col>
        </b-row>
    </div>
</template>

<script>
import AuthService from '@/services/auth.service';
export default {
    // beforeRouteEnter (to, from, next) {
    //     console.log(to.query.code)
    //     next(vm => {

    //     })
    // },
    beforeMount () {
        AuthService.login({ 'code': this.$route.query.code, 'type': 'linkedin' }).then((resp) => {
            const redirect = this.$route.query.redirect ? this.$route.query.redirect : '/'
            localStorage.setItem('before-register', true);
            if (this.$route.path !== redirect)
                this.$router.push(redirect)
            else
                this.$router.go()
        }).catch(err => {
        })
    }
}
</script>