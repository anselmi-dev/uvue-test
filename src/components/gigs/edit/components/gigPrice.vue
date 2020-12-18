<template>
    <div class="teacher-bio position-relative">
        <loading :active.sync="isLoading" :is-full-page="false"></loading>

        <div class="title">
            Precio
            <actions @actionEdit="handleEdit"/>
        </div>

        <table class="border-bottom-0" v-if="modelInitial">
            <tbody>
                <tr>
                    <td>
                        <div class="teacher-price__price mr-2 border-bottom-0">
                            <span class="label"> Individual </span>
                        </div>
                    </td>
                    <td>
                        <div class="teacher-price__price border-bottom-0">
                            <span class="price text-danger font-weight-bold" :inner-html.prop="modelInitial.fare | currencySolHr"></span>
                        </div>
                    </td>
                </tr>
                <tr v-if="modelInitial.group_class">
                    <td>
                        <div class="teacher-price__price mr-2  mt-2 border-bottom-0">
                            <span class="label"> Grupal </span>
                        </div>
                    </td>
                    <td>
                        <div class="teacher-price__price mt-2 border-bottom-0">
                            <span class="price text-danger font-weight-bold" :inner-html.prop="modelInitial.fare_group | currencySolHr"></span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <!--
            CAMBIOS::
            EL PRECIO DEBE SER MENOR A 1000
         -->
        <b-modal
            :hide-header="true"
            size="lg"
            centered
            id="modal-price">
            <div class="teacher-create__subtitle--muted">
                Elige la modalidad en que quieres dictar tu clase
            </div>
            <div class="teacher-create__moptions auto" v-if="modelEdit">
                <label for="individual">
                    <input
                        type="checkbox"
                        v-model="$v.modelEdit.fare_select.$model"
                        disabled
                        id="individual"
                        value="true">
                    <div class="content">
                        <div class="content-img">
                            <img :src="require('@/assets/icons/individual.svg')" alt="individual.svg">
                        </div>
                        <div class="text">
                            <span>Individual</span>
                            Clase para una sola persona
                        </div>

                        <div class="teacher-create__iprice">
                            <money
                                v-model="modelEdit.fare"
                                maxlength="6"
                                class="form-control"
                                :class="{'is-invalid': !$v.modelEdit.fare.prices_greater }" />
                            <small class="d-block mt-1">
                                Gastos y comisión ({{ (modelEdit.fare * 0.2) | currencySol }} )
                            </small>
                            <small class="d-block mt-1">
                                Te depositaremos
                                ({{ (modelEdit.fare - (modelEdit.fare * 0.2)) | currencySol}} )
                            </small>
                            <small
                                class="text-danger"
                                v-if="modelEdit.fare < 30">
                                El precio no puede ser menor a <b>{{ 30 | currencySol }}</b>
                            </small>
                        </div>
                    </div>
                </label>
                <label for="grupal">
                    <input
                        type="checkbox"
                        v-model="modelEdit.group_class"
                        id="grupal"
                        value="true">
                    <div class="content">
                        <div class="content-img">
                           <img :src="require('@/assets/icons/grupo.svg')" alt="grupo.svg">
                        </div>

                        <div class="text">
                            <span>Grupal</span>
                            Clase para máximo 5 personas
                        </div>

                        <div class="teacher-create__iprice">
                            <money
                                v-model="modelEdit.fare_group"
                                maxlength="6"
                                class="form-control"
                                :class="{'is-invalid': !$v.modelEdit.fare_group.priceg_greater }" />

                             <small class="d-block mt-1">
                                Comision Punku
                                ({{ modelEdit.fare_group * 0.2 | currencySol }})
                            </small>
                            <small class="d-block mt-1">
                                Pago al profesor
                                ( {{ (modelEdit.fare_group - (modelEdit.fare_group * 0.2)) | currencySol }} )
                            </small>

                            <small
                                class="text-danger d-block"
                                v-if="modelEdit.fare <= modelEdit.fare_group && modelEdit.group_class">
                                El precio debe ser menor que el precio individual <b>{{modelEdit.fare | currencySol }}</b>
                            </small>
                            <small
                                class="text-danger d-block"
                                v-if="modelEdit.fare_group < 25 && modelEdit.group_class">
                                El precio no puede ser menor a <b>{{ 25 | currencySol }}</b>
                            </small>
                        </div>
                    </div>
                </label>
            </div>
            <template v-slot:modal-footer="{ Cerrar, Guardar }">
                <b-button size="sm" variant="outline-danger" @click="handleCancel()">
                    Cancelar
                </b-button>
                <b-button size="sm" variant="dark" @click="submit()">
                    Guardar
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import gigEdit from '@/mixins/gig.edit'
import { required, between} from 'vuelidate/lib/validators'

function prices_greater (value) {
    if (this.$v.modelEdit.fare_select.$model) {
        return value >= 30
    }
    return true;
}

function priceg_greater (value) {
    if (this.modelEdit.group_class) {
        return value >= 25 && value < this.modelEdit.fare
    }
    return true;
}

export default {
    mixins: [gigEdit],
    mounted () {
        this.$v.modelEdit.fare_select.$model = true
        this.modelEdit = Object.assign({}, this.model)
    },
    methods: {
        getDataFormat () {
            return {
                fare_select: true,
                fare: this.modelEdit.fare,
                group_class: this.modelEdit.group_class,
                fare_group: this.modelEdit.fare_group
            }
        },
        openModal () {
            this.$bvModal.show('modal-price')
        },
        closeModal () {
            this.$bvModal.hide('modal-price')
        },
        submit () {
            this.update()
            this.closeModal()
        },
        handleCancel () {
            this.cancel()
            this.closeModal()
        },
        handleEdit () {
            this.modelEdit = Object.assign({}, this.modelInitial)
            this.toggleEdit()
            this.openModal()
        },
    },
    watch: {
        'modelEdit.group_class' (newVal) {
            this.modelEdit.fare_group = 0
        },
    },
    validations: {
        modelEdit: {
            fare: {
                required,
                prices_greater
            },
            fare_select: { required },
            fare_group: {
                priceg_greater
            }
        }
    }
}
</script>
