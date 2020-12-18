<template>
    <div class="teacher-create__step" :id="'teacher-create-'+index" :class="{'teacher-create__step-error': isError}">
        <div class="punku__title mb-0">
            Sobre mí <small>(opcional)</small>
        </div>
        <hr>
        <div class="textarea-autosize-count">
            <textarea-autosize
                class="form-control"
                placeholder="Ej: Estudiante de ingeniería da clases de matematias"
                v-model="model"
                :maxlength="$v.model.$params.maxLength.max"
                :minlength="$v.model.$params.minLength.min"
            />
            <small>{{ model.length }} / {{ $v.model.$params.maxLength.max }}</small>
        </div>

        <small class="invalid-feedback error" v-if="$v.model.$error">
            Debe contener al menos <strong>{{ $v.model.$params.minLength.min }} caracteres</strong>
        </small>

        <div class="punku-alert punku-alert--warning mt-2">
            Recuerda que esto puede marcar la diferencia para que te elijan, por ello te recomendamos tener en cuenta lo siguiente:
            <ul class="mb-0">
                <li>
                    Comenta tu formación y experiencia de forma clara y vendedora.

                </li>
                <li>
                    Comenta un poco sobre tu forma de enseñanza.

                </li>
                <li>
                    Comenta a quiénes van dirigidas tus clases (nivel). Ej: nivel secundaria, nivel avanzado,
                    etc.
                </li>
                <li>
                    Por seguridad, no compartas ninguna información personal (teléfono, correo, dirección, etc.).

                </li>
            </ul>
        </div>

        <div class="teacher-create__actions" v-show="isVisible && isFirst">
            <button @click="next">
                Siguiente
            </button>
        </div>
    </div>
</template>


<script>
import teacherCreate from '@/mixins/teacherCreate'
import SubjectsService from '@/services/subjects.service';
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    mixins: [teacherCreate],
    data () {
        return {
            isFirst: true,
            model: ''
        };
    },
    watch: {
        model (value) {
            if (!this.isFirst) {
                if (!this.$v.model.$invalid) {
                    this.updateStep({description: this.model})
                } else {
                    this.updateStep({error: 'teacher-create-' + this.index})
                }
            }
        }
    },
    methods: {
        next () {
            this.$v.model.$touch()
            if (!this.$v.model.$invalid) {
                this.isFirst = false
                this.nextStep({description: this.model})
            }
        },
    },
    computed: {
        isError () {
            return !this.isFirst && this.$v.model.$invalid
        }
    },
    validations: {
        model: {
            minLength: minLength(40),
            maxLength: maxLength(1000)
        }
    }
}
</script>
