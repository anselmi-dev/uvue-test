<template>
    <b-modal id="modal-before-register"
        :hide-footer="true"
        :hide-header="true"
        size="md"
        centered>
        <div class="content text-center" v-if="user">
            <h3>
                ¡{{ user.split_name }}, ya eres parte de la comunidad Punku!
            </h3>
            <hr>
            <p class="mb-1">
                Para completar tu registro satisfactoriamente, ingresa al enlace que hemos enviado a tu correo y disfruta de toda la experiencia Punku.
                <br>
                Sino recibiste el enlace, ingresa a <router-link :to="{'name': 'account.dashboard'}">Mi Perfil</router-link>.
            </p>
        </div>
    </b-modal>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                user: 'auth/user',
            })
        }
    }
</script>

<style lang="scss">
    #modal-before-register .modal-content h3 {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 1.5rem;
        line-height: 1;
    }
    #modal-before-register .modal-content {
        border-radius: 10px;
        overflow: hidden;
        border: none;
        background: rgba(0,105,255,1);
        background: -moz-linear-gradient(top, rgba(0,105,255,1) 0%, rgba(4,81,189,1) 100%);
        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(0,105,255,1)), color-stop(100%, rgba(4,81,189,1)));
        background: -webkit-linear-gradient(top, rgba(0,105,255,1) 0%, rgba(4,81,189,1) 100%);
        background: -o-linear-gradient(top, rgba(0,105,255,1) 0%, rgba(4,81,189,1) 100%);
        background: -ms-linear-gradient(top, rgba(0,105,255,1) 0%, rgba(4,81,189,1) 100%);
        background: linear-gradient(to bottom, rgba(0,105,255,1) 0%, rgba(4,81,189,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0069ff', endColorstr='#0451bd', GradientType=0 );
        &,
        & a {
            color: #FFF;
        }
    }
</style>
