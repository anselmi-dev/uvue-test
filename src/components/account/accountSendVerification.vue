<template>
    <div class="account-sent-verification">
        <loading :active.sync="isLoading" :is-full-page="true"></loading>
        <div class="alert alert-warning alert--app">
            <div class="icon">
                <i class="uil uil-exclamation-triangle"></i>
            </div>
            <div class="content text-dark">
                <small>¿No ha recibido el código de verificacion del correo electrónico? <br> Puede solicitarlo un reenvio de verificación desde <strong class="cursor-pointer" @click="sendVerificEmail">aquí</strong>.</small>
            </div>
        </div>
        <b-modal id="modal-before-sent-verification"
            :hide-footer="true"
            :hide-header="true"
            size="md"
            centered>
            <div class="content text-center">
                <p class="mb-1">
                    Se acaba de enviar un mensaje a su correo <strong>{{ user.email }}</strong> para verificarlo.
                </p>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data () {
            return {
                isLoading: false
            }
        },
        methods: {
            ...mapActions({
                sendVerification: 'auth/sendVerification'
            }),
            sendVerificEmail () {
                this.isLoading = true
                this.sendVerification(this.user.email).then((resp) => {
                    console.log(resp)
                    // this.$bvModal.show('modal-before-sent-verification')
                    this.$bus.emit("notifications:push", { type: 'dark', message: 'Se le acaba de enviar un correo de verificación' })
                    this.isLoading = false
                })
            },
        }
    }
</script>
