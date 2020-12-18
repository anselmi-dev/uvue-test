<template>
    <div class="teacher-create__step" :id="'teacher-create-'+index" :class="{'teacher-create__step-error': isError}">
        <div class="punku__title">
            Indica algún requerimiento previo para la realización de tu clase <small>(opcional)</small>
        </div>

        <div class="textarea-autosize-count">
            <textarea-autosize
                placeholder="Ej: Tener un cuaderdo y lapiz."
                class="form-control mt-2"
                v-model="model"
                :maxlength="$v.model.$params.maxLength.max"
                :minlength="$v.model.$params.minLength.min"
            />
            <small>{{ model.length }} / {{ $v.model.$params.maxLength.max }}</small>
        </div>

        <small class="invalid-feedback error" v-if="$v.model.$error">
            Debe contener al menos <strong>{{ $v.model.$params.minLength.min }} caracteres.</strong>
        </small>

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
        description (value) {
            if (!this.isFirst) {
                if (!this.$v.model.$invalid) {
                    this.updateStep({requirements: this.model})
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
                this.nextStep({requirements: this.model})
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
            minLength: minLength(10),
            maxLength: maxLength(600)
        }
    }
}
</script>
