<template>
    <div class="verify-account">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-10 col-md-6 col-lg-6 mx-auto">
                    <div class="punku-auth__container container">
                        <div class="punku-auth__content w-100" v-if="success">
                            <div class="punku-auth__form">
                                <span class="punku-auth__title text-center h4">
                                    Dirección de correo electrónico verificada
                                </span>
                                <p class="text-center text-muted">
                                    <!-- Ya puede <router-link :to="{name: 'login'}">iniciar sesión</router-link> en su cuenta con la nueva contraseña. -->
                                    Se verificó correctamente tu dirección de correo electrónico <strong>{{ email }}</strong>
                                </p>
                            </div>
                        </div>
                        <div class="punku-auth__content w-100" v-else>
                            <div class="punku-auth__form">
                                <span class="punku-auth__title text-center h4">
                                    El código expiro.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data () {
            return {
                isLoading: true,
                success: false,
                email: null
            }
        },
        beforeMount () {
            this.VerifyAccount(this.$route.params.code).then(
                resp => {
                    this.isLoading = false
                    this.success = true
                    this.email = resp.data
                },
                err => {
                    console.log(err)
            })
        },
        methods: {
            ...mapActions({
                VerifyAccount: 'auth/VerifyAccount'
            })
        }
    }
</script>
