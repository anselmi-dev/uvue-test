<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-sm-10 col-md-6 col-lg-6 mx-auto">
                <div class="punku-auth__container container">
                    <div class="punku-auth__content w-100" v-if="!success">
                        <form class="punku-auth__form" :class="{'zumbido': zumbido}" @submit.prevent="submit" autocomplete="off">
                            <loading :active.sync="isLoading" :is-full-page="false"></loading>
                            <span class="punku-auth__title text-center h4">
                                Contraseña nueva
                            </span>

                            <p class="text-center text-muted">
                                Establezca una nueva contraseña para su cuenta en Punku
                            </p>

                            <div class="row w-100">
                                <!--  form-group:password -->
                                <div class="form-group form-group--required col-12">
                                    <label>Nueva contraseña</label>
                                    <div class="input-group input-group--password">
                                        <input
                                            :type="!showPass ? 'password' : 'text'"
                                            v-model.trim.lazy="$v.model.password.$model"
                                            :class="{'form-control': true, 'is-invalid': $v.model.password.$error}"
                                            placeholder="Tu contraseña"
                                            autocomplete="off"/>
                                        <span class="input-group-btn">
                                            <button
                                                @click="showPass = !showPass"
                                                class="btn btn-default reveal"
                                                type="button">
                                                <i :class="showPass ? 'ipunku-eye-slash' : 'ipunku-eye'"></i>
                                            </button>
                                        </span>
                                        <small
                                            class="invalid-feedback"
                                            v-if="$v.model.password.$error">
                                            Debe tener <strong>minimó 6 caracteres</strong> y al menos <strong>una mayusula, una minuscula y un número.</strong>
                                        </small>
                                    </div>
                                </div>

                                <!--  form-group:corfimation_password -->
                                <div class="form-group form-group--required col-12">
                                    <label>Repita su contraseña</label>
                                    <div class="input-group input-group--password">
                                        <input
                                            :type="!showConfirmationPass ? 'password' : 'text'"
                                            v-model.trim.lazy="$v.model.corfimation_password.$model"
                                            :class="{'form-control': true, 'is-invalid': $v.model.corfimation_password.$error}"
                                            placeholder="Repita su contraseña"
                                            autocomplete="off"/>
                                        <span class="input-group-btn">
                                            <button
                                                @click="showConfirmationPass = !showConfirmationPass"
                                                class="btn btn-default reveal"
                                                type="button">
                                                <i :class="showConfirmationPass ? 'ipunku-eye-slash' : 'ipunku-eye'"></i>
                                            </button>
                                        </span>
                                        <small
                                            class="invalid-feedback"
                                            v-if="$v.model.corfimation_password.$error">
                                            Debe tener <strong>minimó 6 caracteres</strong> y al menos <strong>una mayusula, una minuscula y un número.</strong>
                                        </small>
                                        <small
                                            class="invalid-feedback"
                                            v-if="!$v.model.corfimation_password.sameAsPassword">
                                            Tu <strong>confirmación de contraseña</strong> no coincide.
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group form-group--center mb-0">
                                <button type="submit" class="btn btn-primary">Recuperar</button>
                            </div>
                        </form>
                    </div>
                    <div class="punku-auth__content w-100" v-else>
                        <div class="punku-auth__form">
                            <span class="punku-auth__title text-center h4">
                                Se ha restablecido su contraseña
                            </span>
                            <p class="text-center text-muted">
                                Ya puede <router-link :to="{name: 'login'}">iniciar sesión</router-link> en su cuenta con la nueva contraseña.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, minLength, sameAs  } from 'vuelidate/lib/validators'
import Loading from 'vue-loading-overlay';
import AuthService from '@/services/auth.service';

function validatePassword (value) {
    return /^(?=.*\d)(?!.* )(?=.*[a-z])(?=.*[A-Z])(?!.*\s)*.{6,18}$/.test(value)
}

export default {
    data() {
        return {
            showPass: false,
            showConfirmationPass: false,
            model: {
                password: '',
                corfimation_password: '',
                code: ''
            },
            success: false,
            isLoading: false,
            zumbido: false,
        }
    },
    components: {
        Loading
    },
    beforeMount() {
        if (!this.$route.params.code) {
            this.$route.push({name: 'notFound'})
        }
    },
    methods: {
        submit() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.isLoading = true

                this.model.code = this.$route.params.code;

                AuthService.resetPassword(this.model)
                .then((resp) => {
                    this.isLoading = false
                    this.success = true
                })
                .catch(err => {
                    this.$bus.emit("notifications:push", { type: 'error', message: err})
                    this.isLoading = false
                })
                .finally(() => {
                    this.isLoading = false
                })
            } else {
                this.zumbido = true
                setTimeout(() => {
                    this.zumbido = false
                }, 250)
            }
        },
    },
    validations: {
        model: {
            password: {
                required,
                minLength: minLength(6),
                validatePassword,
            },
            corfimation_password: {
                required,
                minLength: minLength(6),
                sameAsPassword: sameAs('password'),
                validatePassword,
            },
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
