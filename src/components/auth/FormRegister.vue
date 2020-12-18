<template>
    <form
        class="punku-auth__form"
        autocomplete="false"
        @submit.prevent="submit">
        <loading :active.sync="isLoading" :is-full-page="false"></loading>
        <span class="punku-auth__title">Regístrate</span>

        <div class="punku-auth__social-container">
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

        <p>o usa tu correo electrónico para registrarte</p>

        <div class="row">
            <!-- form-group:first_name -->
            <div class="form-group form-group--required col-12 col-lg-6">
                <label>Nombre</label>
                <input
                    type="text"
                    :class="{'form-control': true, 'is-invalid': $v.model.first_name.$error }"
                    v-model.trim.lazy="$v.model.first_name.$model"
                    placeholder="Tu nombre"
                    maxlength="20"
                    :disabled="isLoading"
                    autocomplete="false"/>
                <small class="invalid-feedback" v-if="!$v.model.first_name.required">
                    Su <strong>Nombre</strong> es requerido.
                </small>
                <small class="invalid-feedback" v-if="!$v.model.first_name.minLength">
                    Su <strong>Nombre</strong> debe tener al menos <strong>{{ $v.model.first_name.$params.minLength.min }} caracteres.</strong>
                </small>
            </div>

            <!-- form-group:last_name -->
            <div class="form-group form-group--required col-12 col-lg-6">
                <label>Apellido</label>
                <input
                    type="text"
                    :class="{'form-control': true, 'is-invalid': $v.model.last_name.$error }"
                    v-model.trim.lazy="$v.model.last_name.$model"
                    @blur="$v.model.last_name.$touch()"
                    placeholder="Tu apellido"
                    maxlength="20"
                    :disabled="isLoading"
                    autocomplete="false" />
                <small class="invalid-feedback" v-if="!$v.model.last_name.required">
                    Su <strong>Apellido</strong> es requerido.
                </small>
                <small class="invalid-feedback" v-if="!$v.model.last_name.minLength">
                    Su <strong>Apellido</strong> debe tener al menos <strong>{{ $v.model.last_name.$params.minLength.min }} caracteres.</strong>
                </small>
            </div>

            <!-- form-group:email -->
            <div class="form-group form-group--required col-12 col-lg-6">
                <label>Correo electrónico</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    v-model.trim.lazy="$v.model.email.$model"
                    placeholder="Correo electrónico"
                    :disabled="isLoading"
                    :class="{'form-control': true, 'is-invalid': $v.model.email.$error }"
                    autocomplete="false"/>
                <small class="invalid-feedback" v-if="!$v.model.email.required">
                    Su <strong>Correo electrónico</strong> es requerido.
                </small>
                <small class="invalid-feedback" v-if="!$v.model.email.email">
                    Su <strong>Correo electrónico</strong> no es un formato válido.
                </small>
            </div>

            <!-- form-group:phone -->
            <div class="form-group col-12 col-lg-6">
                <label>Celular</label>
                <vue-tel-input
                    v-model.trim.lazy="$v.model.phone.$model"
                    :class="{'form-control': true, 'is-invalid': $v.model.phone.$error }"
                    autocomplete="false"
                    placeholder="+00 0000000000"
                    :disabled="isLoading"
                    @input="onInput">
                </vue-tel-input>
                <small class="invalid-feedback" v-if="!$v.model.phone.required">
                    Su <strong>Celular</strong> es requerido.
                </small>
            </div>

            <!--  form-group:password -->
            <div class="form-group form-group--required col-12 col-lg-6">
                <label>Contraseña</label>
                <div class="input-group input-group--password">
                    <input
                        :type="!showPass ? 'password' : 'text'"
                        v-model.trim.lazy="$v.model.password.$model"
                        :class="{'form-control': true, 'is-invalid': $v.model.password.$error}"
                        placeholder="Tu contraseña"
                        :disabled="isLoading"
                        maxlength="18"
                        autocomplete="false"/>
                    <span class="input-group-btn">
                        <button
                            @click="showPass = !showPass"
                            class="btn btn-default reveal"
                            :disabled="isLoading"
                            tabindex="-1" 
                            type="button">
                            <i :class="showPass ? 'uil uil-eye' : 'uil uil-eye-slash'"></i>
                        </button>
                    </span>
                    <small
                        class="invalid-feedback"
                        v-if="$v.model.password.$error">
                        Debe tener <strong>minimó 8 caracteres</strong> y al menos <strong>una mayusula, una minuscula y un número.</strong>
                    </small>
                </div>
            </div>

            <!--  form-group:corfimation_password -->
            <div class="form-group form-group--required col-12 col-lg-6">
                <label>Repita su contraseña</label>
                <div class="input-group input-group--password">
                    <input
                        :type="!showConfirmationPass ? 'password' : 'text'"
                        v-model.trim.lazy="$v.model.corfimation_password.$model"
                        :class="{'form-control': true, 'is-invalid': $v.model.corfimation_password.$error}"
                        placeholder="Repita su contraseña"
                        :disabled="isLoading"
                        maxlength="18"
                        autocomplete="false"/>
                    <span class="input-group-btn">
                        <button
                            @click="showConfirmationPass = !showConfirmationPass"
                            class="btn btn-default reveal"
                            :disabled="isLoading"
                            tabindex="-1" 
                            type="button">
                            <i :class="showConfirmationPass ? 'uil uil-eye' : 'uil uil-eye-slash'"></i>
                        </button>
                    </span>
                    <small
                        class="invalid-feedback"
                        v-if="$v.model.corfimation_password.$error">
                        Debe tener <strong>minimó 8 caracteres</strong> y al menos <strong>una mayusula, una minuscula y un número.</strong>
                    </small>
                    <small
                        class="invalid-feedback"
                        v-if="!$v.model.corfimation_password.sameAsPassword">
                        Tu <strong>confirmación de contraseña</strong> no coincide.
                    </small>
                </div>
            </div>
        </div>

        <div class="form-group form-group--center">
            <button type="submit" class="btn btn-primary">Registrarme</button>
        </div>

        <a href="javascript:void(0)" @click="$emit('to-login')">¿Ya tienes cuenta?</a>

        <p class="mt-2 h7 text-center">
            Al registrarme, declaro que soy mayor de edad y acepto los
            <router-link :to="{name: 'terms-conditions'}">Términos y condiciones</router-link>
            y las <router-link :to="{name: 'policies-privacy'}">Políticas de privacidad</router-link>
             de <strong>Punku</strong>.
        </p>
    </form>
</template>

<script>
import authForm from '@/mixins/auth.form'
import AuthService from '@/services/auth.service';
import { VueTelInput } from 'vue-tel-input'
import VuePassword from 'vue-password';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

function validatePassword (value) {
    return /^(?=.*\d)(?!.* )(?=.*[a-z])(?=.*[A-Z])(?!.*\s)*.{8,18}$/.test(value)
}

export default {
    mixins: [authForm],
    data() {
        return {
            showPass: false,
            showConfirmationPass: false,
            model: {
                corfimation_password: '',
                password: '',
                email: '',
                phone: '',
                first_name: '',
                referred: '',
                last_name: '',
                username: ''
            },
        }
    },
    components: {
        VueTelInput,
        VuePassword
    },
    beforeMount() {
        this.$v.model.$reset()
    },
    beforeDestroy() {
        this.$v.model.$reset()
    },
    computed: {
        strength () {
            let passwordStrength = 0;
            let numbers = this.auth.password.replace(/[^0-9]/g,'').length
            let letters = this.auth.password.replace(/[^A-Z]/gi, "").length
            let lettersEspecial = this.auth.password.replace(/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,"").length
            if (numbers > 6)
                passwordStrength = 1;
            return passwordStrength;
        }
    },
    methods: {
        submit() {
            this.$v.model.$touch()
            if (!this.$v.model.$invalid) {
                this.isLoading = true
                this.model.username = this.model.email
                AuthService.register(this.model)
                .then(() => {
                    localStorage.setItem('before-register', true);
                    this.$router.go({name: 'home'})
                })
                .catch(err => {
                    this.$func.buzzing('.punku-auth__form')
                    this.$bus.emit("notifications:push", { type: 'error', message: err })
                    this.isLoading = false
                    this.error = err
                })
            } else {
                this.$func.buzzing('.punku-auth__form')
            }
        },
        onInput(formattedNumber, { number, valid, country }) {
            if (number.international)
                this.model.phone = number.international
        },
        signOut () {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                localStorage.setItem('before-register', true);
            });
        }
    },
    validations: {
        model: {
            email: {
                required,
                email
            },
            first_name: {
                required,
                minLength: minLength(2)
            },
            last_name: {
                required,
                minLength: minLength(2)
            },
            phone: { },
            referred: {
                minLength: minLength(5),
            },
            password: {
                required,
                validatePassword,
            },
            corfimation_password: {
                required,
                validatePassword,
                sameAsPassword: sameAs('password'),
            },
        }
    }
}
</script>
