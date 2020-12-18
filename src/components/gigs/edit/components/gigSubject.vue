<template>
    <div class="teacher-bio position-relative">
        <loading :active.sync="isLoading" :is-full-page="false"></loading>

        <div class="title">
            Materias
            <actions @actionEdit="handleEdit"/>
        </div>
        <div>
            <!--
                CAMBIOS:
                LINIAL LOS BADGE
             -->
            <div class="row row--sm">
                <!--
                 <p class="col-12 mb-1">
                    <b-badge pill variant="primary">{{ modelInitial[0].category }}</b-badge>
                </p> -->
                <div class="col-auto" v-for="item in modelInitial">
                    <b-badge pill variant="primary">{{ item.title }}</b-badge>
                </div>
            </div>
        </div>
        <b-modal
            size="lg"
            :hide-header="true"
            centered
            id="modal-subjects">

            <editSubjects v-if="modelInitial" :subjects="modelInitial" ref="editSubjects"/>

            <template v-slot:modal-footer="{ Cerrar, Guardar }">
                <b-button size="sm" variant="outline-danger" @click="cancel()">
                    Cancelar
                </b-button>
                <b-button size="sm" variant="primary" @click="submit()">
                    Guardar
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import gigEdit from '@/mixins/gig.edit'
import { required, minLength } from 'vuelidate/lib/validators'
import editSubjects from '@/components/gigs/edit/editSubjects'

export default {
    mixins: [gigEdit],
    components: {
        editSubjects
    },
    methods: {
        getDataFormat () {
            return {
                subject: this.modelEdit
            }
        },
        handleEdit () {
            this.openModal()
        },
        openModal () {
            this.$bvModal.show('modal-subjects')
        },
        closeModal () {
            this.$bvModal.hide('modal-subjects')
        },
        submit () {
            this.modelEdit = this.$refs.editSubjects.disciplines
            if (this.modelEdit.length) {
                this.update()
                this.cancel ()
            } else {
                this.$bus.emit("notifications:push", {
                    type: 'error',
                    message: 'Debe seleccionar al menos una materia'
                })
            }
        },
        cancel () {
            this.closeModal ()
        }
    },
    validations: {
        modelEdit: {}
    }
}
</script>
