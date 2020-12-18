<template>
    <div class="teacher-bio">
        <div class="title">
            Mi nivel de instrucción en el tema
            <actions @actionEdit="edit"/>
        </div>

        <div v-if="!disabled">
            {{ modelInitial }}
        </div>

        <div v-else>
            <select class="form-control" v-model="model.education_level" @change="next">
                <option value="Autodidacta">Autodidacta</option>
                <option value="Certificado">Certificado</option>
                <option value="Técnico">Técnico</option>
                <option value="Universitario">Universitario</option>
                <option value="Profesional">Profesional</option>
                <option value="Maestro">Maestro</option>
                <option value="Doctor">Doctor</option>
            </select>

            <actions
                @actionCancel="cancel"
                @actionUpdate="update"
                :isEdit="disabled"
            />
        </div>
    </div>
</template>

<script>
import gigEdit from '@/mixins/gig.edit'
import { required } from 'vuelidate/lib/validators'

export default {
    mixins: [gigEdit],
    methods: {
        getDataFormat () {
            return {
                education_level: this.modelEdit
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
