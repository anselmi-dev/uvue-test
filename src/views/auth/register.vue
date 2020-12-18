<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-sm-10 col-md-8 col-lg-7 mx-auto">
                <form-register @to-login="toLogin"/>
            </div>
        </div>
    </div>
</template>

<script>
import FormRegister from '@/components/auth/FormRegister'

export default {
    components: {
        FormRegister
    },
    methods: {
        toLogin () {
            this.$router.push({name: 'login'})
        },
        submit() {
            this.$v.auth.$touch()
            if (!this.$v.auth.$invalid) {
                this.isLoading = true
                this.auth.username = this.auth.email
                this.$store.dispatch('authentication/register', this.auth)
                .then(() => {
                    this.$router.go({name: 'register.success'})
                })
                .catch(err => {
                    this.isLoading = false
                    this.error = err.response.data.err
                    console.warn({'authentication/login': err.response.data.err})
                })
            } else {
                this.zumbido = true
                setTimeout(() => {
                    this.zumbido = false
                }, 250)
            }
        },
    }
}
</script>
