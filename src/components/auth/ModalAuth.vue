<template>
    <div>
        <modal
            name="modal-login"
            :scrollable="true"
            width="768"
            height="auto"
            class="punku-auth">
            <div class="punku-auth__container">
                <div class="punku-auth__content">
                    <FormLogin @to-register="openRegister" @to-forgot="openForgot"/>
                </div>
                <div class="punku-auth__overlay-panel">
                    <h1>Hola!</h1>
                    <p>¿No tienes una cuenta en Punku?</p>
                    <button class="btn btn-primary" @click="openRegister">Regístrate</button>
                </div>
            </div>
        </modal>
        <modal
            name="modal-register"
            :scrollable="true"
            width="650"
            height="auto"
            class="punku-auth">
            <div class="punku-auth__container">
                <div class="punku-auth__content w-100">
                    <FormRegister @to-login="openLogin"/>
                </div>
            </div>
        </modal>
        <modal
            name="modal-forgot"
            :scrollable="true"
            width="500"
            height="auto"
            class="punku-forgot">
                <FormForgot />
        </modal>

        <modal
            name="modal-after-register"
            :scrollable="true"
            width="650"
            height="auto">
            <div class="container">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias sapiente maiores molestiae commodi ipsa in facilis rerum incidunt, numquam quibusdam illum temporibus, praesentium asperiores, distinctio, culpa? Porro, suscipit dolores nesciunt.
            </div>
        </modal>
    </div>
</template>

<script>
import FormLogin from './FormLogin.vue';
import FormForgot from './FormForgot.vue';
import FormRegister from './FormRegister.vue';

export default {
    components: {
        FormRegister,
        FormLogin,
        FormForgot
    },
    beforeMount() {
        this.$bus.$on("open-modal-auth", this.openModal);
        this.$bus.$on("close-modal-auth", this.closeModal);
    },
    beforeDestroy() {
        this.$bus.$off("open-modal-auth", ()=> {});
        this.$bus.$off("close-modal-auth", ()=> {});
    },
    methods: {
        closeModal (name = null) {
            if (name)
                this.$modal.hide(name)
            else {
                this.$modal.hide('modal-login')
                this.$modal.hide('modal-register')
                this.$modal.hide('modal-forgot')
            }
        },
        openModal (name = 'modal-login') {
            this.$modal.hide('modal-login')
            this.$modal.hide('modal-register')
            this.$modal.hide('modal-forgot')
            this.$modal.show(name)
        },
        openRegister () {
            this.openModal('modal-register')
        },
        openLogin () {
            this.openModal('modal-login')
        },
        openForgot () {
            this.openModal('modal-forgot')
        }
    }
}
</script>
