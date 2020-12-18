<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-sm-10 col-md-6 col-lg-5 col-xl-4 mx-auto">
                <form-login @to-register="toRegister" @to-forgot="$modal.show('modal-forgot')" :modal="false"/>
	        </div>
        </div>
    </div>
</template>

<script>
import FormLogin from '@/components/auth/FormLogin'
import FormForgot from '@/components/auth/FormForgot'

export default {
    components: {
        FormLogin,
        FormForgot
    },
    watch: {
        'auth.password': function (val) {
            this.error= null
        },
        'auth.email': function (val) {
            this.error= null
        }
    },
    methods: {
        toRegister () {
            this.$router.push({name: 'register'})
        }
    }
}
</script>
