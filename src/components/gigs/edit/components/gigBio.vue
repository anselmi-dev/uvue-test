<template>
    <div class="teacher-bio position-relative">
        <loading :active.sync="isLoading" :is-full-page="false"></loading>

        <div class="title">
            Sobre mí
            <actions @actionEdit="edit"/>
        </div>

        <div v-if="!disabled">
            <div
                v-if="modelInitial"
                class="text text-break"
                v-html="modelInitial">
            </div>
            <div v-else class="text-muted">
                Sin definir
            </div>
        </div>

        <div v-else>
            <div class="textarea-autosize-count">
                <textarea-autosize
                    class="form-control"
                    placeholder="Ej: Estudiante de ingeniería da clases de matematias"
                    :maxlength="$v.modelEdit.$params.maxLength.max"
                    :minlength="$v.modelEdit.$params.minLength.min"
                    v-model.trim.lazy="modelEdit"
                />
                <small>{{ modelEdit.length }} / {{ $v.modelEdit.$params.maxLength.max }}</small>
            </div>

            <small
                class="invalid-feedback error" v-if="$v.modelEdit.$error">
                Debe contener al menos <strong>{{ $v.modelEdit.$params.minLength.min }} caracteres</strong>
            </small>

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
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    mixins: [gigEdit],
    methods: {
        getDataFormat () {
            return {
                description: this.modelEdit
            }
        }
    },
    validations: {
        modelEdit: {
            required,
            minLength: minLength(40),
            maxLength: maxLength(200)
        }
    }
}
</script>
