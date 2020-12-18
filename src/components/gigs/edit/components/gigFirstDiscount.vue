<template>
    <div class="teacher-requirements">
        <loading :active.sync="isLoading" :is-full-page="false"></loading>

        <div class="title">
            Descuento en la primera clase
            <actions @actionEdit="edit"/>
        </div>

        <div v-if="!disabled">
            <b>{{ modelInitial ? 'Sí,' : 'No' }}</b> ofrezco descuento en la primera clase.
        </div>

        <div v-else>
            <label for="checkbox-first_class_discount" class="switch flex-wrap">
                <input
                    type="checkbox"
                    class="mr-2"
                    v-model="modelEdit"
                    id="checkbox-first_class_discount">
                <span class="switch--toggle"></span>
                <span class="ml-2 h6 text-dark mb-0 ">
                    <strong>50% de descuento en la primera clase</strong>
                </span>
                <span class="d-block text-muted mt-1">
                    {{
                        modelEdit ?
                        'Si eliges esta opción todas tus primeras clases individuales tendrán un 50% de descuento y la comisión cobrada por Punku también será de 50%' :
                        'Si eliges esta opción tus tarifas registradas serán aplicadas desde la primera clase. No hay descuento alguno.'
                    }}
                </span>
            </label>

            <br>

            <actions
                v-if="disabled"
                @actionCancel="cancel"
                @actionUpdate="update"
                :isEdit="disabled"
            />
        </div>
    </div>
</template>

<script>
import gigEdit from '@/mixins/gig.edit'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    mixins: [gigEdit],
    methods: {
        getDataFormat () {
            return {
                first_class_discount: this.modelEdit
            }
        }
    },
    validations: {
        modelEdit: {
            required
        }
    }
}
</script>
