<template>
    <div class="teacher-create__step" :id="'teacher-create-'+index" :class="{'teacher-create__step-error': isError}">
        <div class="punku__title">
            Mi nivel de instrucción en el tema
        </div>
        <div class="row">
            <div class="col-12 col-md-8 col-lg-6 mx-auto">
                <select class="form-control" v-model="model.education_level" @change="next">
                    <option value="Autodidacta">Autodidacta</option>
                    <option value="Certificado">Certificado</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Universitario">Universitario</option>
                    <option value="Profesional">Profesional</option>
                    <option value="Maestro">Maestro</option>
                    <option value="Doctor">Doctor</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
import teacherCreate from '@/mixins/teacherCreate'
import SubjectsService from '@/services/subjects.service';
import { required } from 'vuelidate/lib/validators'

export default {
    mixins: [teacherCreate],
    data () {
        return {
            isFirst: true,
            model: {
                education_level: null
            }
        };
    },
    watch: {
        model: {
            deep: true,
            handler () {
                if (!this.isFirst) {
                    if (!this.$v.model.$invalid) {
                        this.updateStep(this.model)
                    } else {
                        this.updateStep({error: 'teacher-create-' + this.index})
                    }
                }
            }
        }
    },
    computed: {
        isError () {
            return !this.isFirst && this.$v.model.$invalid
        }
    },
    methods: {
        next() {
            if (!this.$v.model.$invalid) {
                this.nextStep(this.model)
                this.isFirst = false
            }
        }
    },
    validations: {
        model: {
            education_level: {
                required
            }
        }
    }
}
</script>
