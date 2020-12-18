<template>
    <div>
        <loading :active.sync="isLoading" :is-full-page="true"></loading>
        <button class="btn btn-light" @click="$modal.show('modal-deactivate-punku')">
            Desactivar
        </button>
        <modal
            name="modal-deactivate-punku"
            :scrollable="true"
            width="768"
            height="auto">
            <div class="container py-4">
                <h4>Desactivar su cuenta en Punku</h4>
                <p>

                </p>
                <button class="btn btn-danger" @click="deactivate()">
                    Desactivar mi cuenta
                </button>
            </div>
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
        deactivate (id, status = 'RECHAZADA') {
            this.$confirm({
                title: `¿Estás seguro de querer continuar?`,
                message: 'Al cancelar la reserva no podrá recuperarla.',
                button: { no: 'No', yes: 'Si'},
                callback: confirm => {
                    if (confirm) {
                        this.isLoading = true
                        UserConfigurationsService.toggleUser().then(resp => {})
                    }
                }
            })
        }
    }
}
</script>
