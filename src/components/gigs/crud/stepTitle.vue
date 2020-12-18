<template>
	<div class="teacher-create__step" :id="'teacher-create-'+index" :class="{'teacher-create__step-error': isError}">
        <div class="punku__title">
            Coloca el mejor título para tu anuncio.
        </div>

        <div class="textarea-autosize-count">
            <textarea-autosize
                class="form-control pb-3"
                placeholder="Ej: Estudiante de ingeniería da clases de matematias"
                v-model="model"
                :maxlength="$v.model.$params.maxLength.max"
                :minlength="$v.model.$params.minLength.min"
            />
            <small>{{ model.length }} / {{ $v.model.$params.maxLength.max }}</small>
        </div>

        <small :class="{'text-danger': $v.model.$invalid }">
            Debe contener al menos {{ $v.model.$params.minLength.min }} caracteres.
        </small>

        <hr>

        <div class="punku-alert punku-alert--warning">
            Te recomendamos crear un título llamativo donde resaltes tus cualidades y lo que enseñas. Aquí unos ejemplos:

            <ul class="mb-0 mt-2">
                <li class="mb-1"><strong>Ej1:</strong> Estudiante de 9no ciclo de la UNI dicta clases de Estadística a todo nivel.</li>
                <li class="mb-1"><strong>Ej2:</strong> Profesor de matemática con más de 5 en docencia en niveles de primaria y secundaria.</li>
                <li class="mb-1"><strong>Ej3:</strong> Cocinera especialista en platos criollos te enseña a preparar comida peruana.</li>
            </ul>
        </div>

        <div class="teacher-create__actions" v-show="isVisible">
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
    components: {
    },
    data () {
        return {
            model: '',
            isFirst: true,
        };
    },
    watch: {
        model (value) {
            if (!this.isFirst) {
                if (!this.$v.model.$invalid) {
                    this.updateStep({title: this.model})
                } else {
                    this.updateStep({error: 'teacher-create-' + this.index})
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
        next () {
            this.$v.model.$touch()
            if (!this.$v.model.$invalid) {
                this.isFirst = false
                this.nextStep({title: this.model})
            }
        },
    },
    validations: {
        model: {
            required,
            minLength: minLength(60),
            maxLength: maxLength(180)
        }
    }
}
</script>
