<template>
    <modal name="modal-login" :scrollable="true" width="668" height="auto" @before-open="beforeOpen" @before-close="beforeClose" class="punku-login">
        <div class="punku-login__container">
            <div class="punku-login__form">
                <form action="#" :class="{'zumbido': zumbido}">
                    <span class="punku-login__title">Crear una cuenta</span>
                    <div class="punku-login__social-container">
                        <a href="#" class="punku-login__social-link facebook"><i class="flaticon-facebook"></i></a>
                        <a href="#" class="punku-login__social-link twitter"><i class="flaticon-gorjeo-2"></i></a>
                        <a href="#" class="punku-login__social-link linkedin"><i class="flaticon-linkedin"></i></a>
                    </div>
                    <small>o use su correo electrónico para registrarse</small>
                    <input type="email" v-model="email" placeholder="Email" />
                    <small class="punku__field-error" v-if="!$v.email.required">Email es requerido</small>
                    <small class="punku__field-error" v-if="!$v.email.email">No es un formato valido</small>

                    <input type="password" v-model="password" placeholder="Password" />
                    <small class="punku__field-error" v-if="!$v.password.required">Contaseña es requerido</small>
                    <small class="punku__field-error" v-if="!$v.password.minLength">La contraseña debe tener al menos {{$v.password.$params.minLength.min}} caracteres.</small>

                    <a href="#">Forgot your password?</a>

                    <!-- <small>Al registrarme, declaro que soy mayor de edad y acepto los Términos y condiciones y las Políticas de privacidad de Mercado Libre y Mercado Pago.</small> -->

                    <br>
                    <div class="relative">
                        <loading :active.sync="isLoading" :is-full-page="false"></loading>
                        <button @click="submit">Aceptar</button>
                    </div>
                </form>
            </div>
            <div class="punku-login__content">
                <div class="punku-login__overlay-panel">
                    <h1>Hola!</h1>
                    <p>Ingrese sus datos personales y comience su viaje con nosotros</p>
                    <!-- <button class="ghost" id="signUp">Regístrate</button> -->
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import Loading from 'vue-loading-overlay';

export default {
    data() {
        return {
            password: '',
            email: '',
            isLoading: false,
            zumbido: false
        }
    },
    components: {
        Loading
    },
    beforeMount() {
        this.$bus.$on("open-modal-login", this.openModal);
    },
    beforeDestroy() {
        this.$bus.$off("open-modal-login", this.closeModal);
    },
    methods: {
        submit() {
            this.$v.$touch()
            this.isLoading = true
            if (!this.$v.$invalid) {
                // this.zumbido = false
                this.$router.push({ name: 'panel' })
                setTimeout(() => {
                    // this.closeModal()
                    // this.isLoading = false
                }, 1000)
            } else {
                this.zumbido = true
                setTimeout(() => {
                    this.zumbido = false
                }, 500)
            }
        },
        closeModal () {
            this.$modal.hide('modal-login')
        },
        openModal () {
            this.$modal.show('modal-login')
        },
        beforeOpen (event) {
        console.log('Opening...')
        },
        beforeClose (event) {
        console.log('Closing...')
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        }
    }
}
</script>

<style lang="scss" scoped>
    .zumbido {
        -webkit-animation: tiembla .1s infinite;
    }
    @-webkit-keyframes tiembla{
        0%  { -webkit-transform:translateX(-5deg); }
        50% { -webkit-transform:translateX( 0deg); }
        100%{ -webkit-transform:translateX( 5px); }
    }

    .punku__field-error {
        font-size: .7rem;
        color: $red;
        width: 100%;
        text-align: left;
        padding-right: 10px;
        padding-left: 10px;
    }
    .punku-login__container {
        display: flex;
        align-items: stretch;
    }
    .punku-login__container > * {
        left: 0;
        width: 50%;
        z-index: 2;
    }
    .punku-login__content {
        background: $primary;
        background: -webkit-linear-gradient(to right, $primary, #FF416C);
        background: linear-gradient(to right, $primary, darken($primary, 20%));
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0 0;
        color: #FFFFFF;
        position: relative;
        display: flex;
        align-items: center;
        padding: 2rem;
    }
    .punku-login__container form {
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 2.5rem 2rem;
        text-align: center;
        position: relative;
    }
    .punku-login__container form button {
        border-radius: 1rem;
        border: 1px solid #6f42c1;
        background-color: #6f42c1;
        color: #FFFFFF;
        font-size: 1rem;
        padding: 5px 45px;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: transform 80ms ease-in;
        outline: none;
        &:hover {
            background-color: darken($primary, 10%);
        }
    }
    .punku-login__container form input {
        background-color: #eee;
        border: none;
        padding: 12px 15px;
        margin: 8px 0;
        width: 100%;
    }
    .punku-login__overlay-panel {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
    .punku-login__title {
        font-size: 2rem;
        line-height: 1;
    }
    .punku-login__social-link {
        margin: 10px;
        display: inline-block;
        &:hover {
            text-decoration: none;
            color: $primary;
        }
        & i:before {
            font-size: 2rem;
        }
        &.twitter {
            color: #00acee;
            transition: .3s all;
            &:active,
            &:hover {
                color: darken(#00acee, 10%);
            }
        }
        &.facebook {
            color: #3b5998;
            transition: .3s all;
            &:active,
            &:hover {
                color: darken(#3b5998, 10%);
            }
        }
        &.linkedin {
            color: #0e76a8;
            transition: .3s all;
            &:active,
            &:hover {
                color: darken(#0e76a8, 10%);
            }
        }
    }
    @media screen and (max-width: 768px) {
        .punku-login__container > * {
            width: 100%;
        }
        .punku-login__content {
            display: none !important;
        }
        .punku-login .vm--modal {
            width: 450px !important;
        }
    }
</style>
