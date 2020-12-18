<template>
    <div>
        <loading :active.sync="isLoading" :is-full-page="true"></loading>
        <button class="btn btn-light" @click="$modal.show('modal-unsubscribe-punku')">
            Darte de baja
        </button>
        <modal
            name="modal-unsubscribe-punku"
            :scrollable="true"
            width="768"
            height="auto">
            <b-container class="py-4">
                <h4>Darte de baja en Punku</h4>
                <p>
                    Lamentamos que te vayas. Una vez que desactives tu cuenta de Punku, dejarás de recibir correos electrónicos de Punku, no podrás ver tu perfil y no aparecerás en las búsquedas.
                </p>
                <b-row class="row--sm">
                    <b-col cols="auto">
                        <button class="btn btn-danger" @click="unsubscribePunku()">
                            Aceptar
                        </button>
                    </b-col>
                    <b-col cols="auto">
                        <button class="btn btn-outline-dark" @click="$modal.hide('modal-unsubscribe-punku')">
                            Cancelar
                        </button>
                    </b-col>
                </b-row>
            </b-container>
        </modal>
    </div>
</template>

<script>
import UserConfigurationsService from '@/services/user.configurations.service';
import AuthService from '@/services/auth.service';

export default {
    data () {
        return {
            isLoading: false
        }
    },
    methods: {
        unsubscribePunku (id, status = 'RECHAZADA') {
            this.$confirm({
                title: `¿Estás seguro de querer continuar?`,
                message: 'Al cancelar la reserva no podrá recuperarla.',
                button: { no: 'No', yes: 'Si'},
                callback: confirm => {
                    if (confirm) {
                        this.isLoading = true
                        UserConfigurationsService.removeUser({status, id, type: 'CONFIRMED', remove: true})
                        .then(resp => {
                            AuthService.logout().then(() => {
                                window.location.href = '/'
                            })
                        })
                    }
                }
            })
        }
    }
}
</script>
