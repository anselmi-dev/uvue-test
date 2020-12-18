<template>
    <div>
        <loading :active.sync="isLoading" :is-full-page="true"></loading>
        <button class="btn btn-light" @click="$modal.show('modal-temporarily-punku')">
            {{ !status ? 'Activar' : 'Desactivar' }}
        </button>
        <modal
            name="modal-temporarily-punku"
            :scrollable="true"
            width="768"
            height="auto">
            <b-container class="py-4">
                <h4 class="mb-0">Desactivar sus anuncios</h4>
                <p class="h6">
                    Sus anuncios ya no aparecerá en las busquedas.
                </p>
                <b-row class="row--sm">
                    <b-col cols="auto">
                        <button class="btn btn-danger" @click="temporarilyDisable()">
                            Aceptar
                        </button>
                    </b-col>
                    <b-col cols="auto">
                        <button class="btn btn-outline-dark" @click="$modal.hide('modal-temporarily-punku')">
                            Cancelar
                        </button>
                    </b-col>
                </b-row>
            </b-container>
        </modal>
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
    computed: {
        status () {
            let value = false
            this.user.teacher.gigs.forEach(element => {
                value = value || element.is_active
            });
            return value
        }
    },
    methods: {
        ...mapActions({
            toggleGigs: 'auth/toggleGigs',
        }),
        temporarilyDisable () {
            this.$confirm({
                title: `¿Estás seguro de querer continuar?`,
                button: { no: 'No', yes: 'Si'},
                callback: confirm => {
                    if (confirm) {
                        this.isLoading = true
                        this.toggleGigs(this.status)
                        .then(resp => {
                            this.$bus.emit("notifications:push", { type: 'dark', message: resp })
                        })
                        .finally (() => {
                            this.isLoading = false
                            this.$modal.hide('modal-temporarily-punku')
                        })
                    }
                }
            })
        }
    }
}
</script>
