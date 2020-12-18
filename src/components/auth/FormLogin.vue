<template>
    <form class="punku-auth__form" @submit.prevent="submit" novalidate>
        <loading :active.sync="isLoading" :is-full-page="false"></loading>
        <span class="punku-auth__title">Conéctate</span>

        <div class="punku-auth__social-container mb-3">
            <a  href="javascript:void(0);"
                @click="loginFacebook()"
                class="punku-auth__social-link facebook">
                <span class="flaticon-facebook"></span>
            </a>
            <GoogleLogin :params="paramsGoogle" :onSuccess="onSuccessGoogle" :onFailure="onFailureGoogle" class="punku-auth__social-link google" style="border: none" type="button">
                <span class="ipunku-gplus-circled"></span>
            </GoogleLogin>

            <a href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile%20r_emailaddress&client_id=782ih8ik7o7ivy&redirect_uri=https%3A%2F%2Fpunkusaber.com%2Flinkedin%2Fcallback" class="punku-auth__social-link linkedin">
                <span class="flaticon-linkedin"></span>
            </a>
        </div>

        <!--  form-group:email -->
        <div class="form-group form-group--required">
            <label>Correo electrónico</label>
            <input
                type="email"
                :class="{'form-control': true, 'is-invalid': $v.auth.email.$error }"
                v-model.trim.lazy="$v.auth.email.$model"
                placeholder="mi-correo@email.com"
                :disabled="isLoading" />
            <small class="invalid-feedback" v-if="$v.auth.email.$error && !$v.auth.email.required">
                Correo es requerido.
            </small>
            <small class="invalid-feedback" v-if="$v.auth.email.$error && !$v.auth.email.email">
                No es un formato válido.
            </small>
            <small class="invalid-feedback error" v-if="error">{{ error }}</small>
        </div>

        <!--  form-group:password -->
        <div class="form-group form-group--required">
            <label>Contraseña</label>
            <div class="input-group input-group--password">
                <input
                    :type="!showPass ? 'password' : 'text'"
                    v-model.trim.lazy="$v.auth.password.$model"
                    :class="{'form-control': true, 'is-invalid': $v.auth.password.$error}"
                    placeholder="Tu contraseña"
                    autocomplete="false"/>
                <span class="input-group-btn">
                    <button
                        @click="showPass = !showPass"
                        class="btn btn-default reveal"
                        tabindex="-1" 
                        type="button">
                        <i :class="showPass ? 'ipunku-eye-slash' : 'ipunku-eye'"></i>
                    </button>
                </span>
                <small
                    class="invalid-feedback"
                    v-if="!$v.auth.password.required || !$v.auth.password.minLength">
                    Debe tener <strong>minimó {{ $v.auth.password.$params.minLength.min }} caracteres</strong> y al menos <strong>una mayusula, una minuscula y un número.</strong>
                </small>
            </div>
        </div>

        <div class="form-group form-group--center">
            <button type="submit" class="btn btn-primary w-100">
                <span>Ingresar</span>
            </button>
        </div>

        <a
            href="javascript:void(0);"
            @click="$emit('to-forgot')">
            ¿Olvidaste tu contraseña?
        </a>

        <a
            class="mt-2"
            v-if="!modal"
            href="javascript:void(0);"
            @click="$emit('to-register')">
            Quiero registrarme
        </a>
    </form>
</template>

<script>

import { required, minLength, email, between } from 'vuelidate/lib/validators'
import AuthService from '@/services/auth.service';
import authForm from '@/mixins/auth.form'

export default {
    mixins: [authForm],
    data() {
        return {
            showPass: false,
            auth: {
                password: '',
                email: '',
            }
        }
    },
    watch: {
        'auth.password': function (val) { this.error = null },
        'auth.email': function (val) { this.error = null }
    },
    methods: {
        resetForm () {
            this.$v.auth.$reset()
        },
        submit () {
            this.$v.$touch()
            this.error = null
            if (!this.$v.$invalid) {
                this.isLoading = true
                AuthService.login(this.auth)
                .then((resp) => {
                    const redirect = this.$route.query.redirect ? this.$route.query.redirect : '/'
                    if (this.$route.path !== redirect)
                        this.$router.push(redirect)
                    else
                        this.$router.go()
                    this.resetForm()
                    this.$modal.hide('modal-login')
                })
                .catch(err => {
                    this.$func.buzzing('.punku-auth__form')
                    this.$bus.emit("notifications:push", { title: 'Ups!', type: 'error', message: err})
                    this.isLoading = false
                })
            } else {
                this.$func.buzzing('.punku-auth__form')
            }
        },
    },
    validations: {
        auth: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(8)
            }
        }
    }
}
</script>

<style lang="scss">
    .punku-auth.vm--container .vm--modal {
        border-radius: 6px;
        overflow: initial;
    }
    .punku-auth__content {
        margin: auto;
    }
    .punku-auth__overlay-panel.punku-auth__overlay-panel {
        padding: 1rem;
        margin: 1rem;
        margin-top: -20px;
        border-radius: 6px;
        align-items: flex-end;
        text-align: right;
        box-shadow: -3px 3px 6px #1f5c9885;
        width: 40%;
        button {
            width: 100%;
            height: 40px;
            text-align: right;
            text-transform: uppercase;
        }
    }

</style>
