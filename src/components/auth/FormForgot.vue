<template>
    <div class="punku-auth__container">
        <div class="punku-auth__content w-100">
            <form class="punku-auth__form " @submit.prevent="submit" v-if="!isSuccess">
                <loading :active.sync="isLoading" :is-full-page="false"></loading>
                <span class="punku-auth__title text-center h4">
                    ¿Tienes problema para entrar?
                </span>

                <p class="text-center text-muted">
                    Introduce tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.
                </p>

                <div class="row w-100">
                    <div class="form-group col-12 col-lg-8 mx-auto">
                        <input
                            type="email"
                            :class="{'form-control': true, 'is-invalid': $v.email.$error }"
                            v-model="email"
                            placeholder="mi-correo@email.com"
                            :disabled="isLoading" />
                        <small class="invalid-feedback" v-if="$v.email.$error && !$v.email.required">
                            Correo es requerido.
                        </small>
                        <small class="invalid-feedback" v-if="$v.email.$error && !$v.email.email">
                            No es un formato válido.
                        </small>
                    </div>
                </div>

                <div class="form-group form-group--center mb-0">
                    <button type="submit" class="btn btn-primary">Recuperar</button>
                </div>
            </form>
            <div class="punku-auth__form" v-else>
                <span class="punku-auth__title text-center h4">
                    Revisa tu correo electrónico
                </span>
                <p class="text-center text-muted">
                    Se ha enviado a tu correo electrónico <b>{{email}}</b> las instucciones para poder recuperar tu cuenta.
                </p>
                <!-- <a href="#">¿No recibiste tu código?</a> -->
            </div>
        </div>
    </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import Loading from 'vue-loading-overlay';
import AuthService from '@/services/auth.service';

export default {
    data() {
        return {
            email: '',
            isLoading: false,
            isSuccess: false,
        }
    },
    components: {
        Loading
    },
    methods: {
        submit() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.isLoading = true
                AuthService.recoverPassword(this.email)
                .then((resp) => {
                    this.isSuccess = true
                    this.resetForm()
                })
                .catch(err => {
                    this.$func.buzzing('.punku-auth__form')
                    this.$bus.emit("notifications:push", { type: 'error', message: err})
                })
                .finally(() => {
                    this.isLoading = false
                })
            } else {
                this.$func.buzzing('.punku-auth__form')
            }
        },
        resetForm () {
            this.email = ''
            this.isLoading = false
            this.$v.$reset()
        },
        openLogin () {
            this.$bus.emit('close-modal-auth', 'modal-forgot')
            this.$bus.emit('open-modal-auth', 'modal-login')
        },
        openForgot () {
            this.$bus.emit('close-modal-auth')
            this.$bus.emit('open-modal-auth', 'modal-forgot')
        }
    },
    validations: {
        email: {
            required,
            email
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
