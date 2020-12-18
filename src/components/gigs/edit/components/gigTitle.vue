<template>
	<div class="teacher-requirements">
        <loading :active.sync="isLoading" :is-full-page="false"></loading>

        <div class="title">
            Título
            <actions @actionEdit="edit"/>
        </div>

        <div v-if="!disabled">
            <div v-html="modelInitial ? modelInitial: 'Sin requerimientos'" class="text-break"></div>
        </div>

        <div v-else>
            <div class="textarea-autosize-count">
                <textarea-autosize
                    class="form-control pb-3"
                    placeholder="Ej: Cocinera especialista en platos criollos te enseña a preparar comida peruana."
                    v-model.trim.lazy="modelEdit"
                    :maxlength="$v.modelEdit.$params.maxLength.max"
                    :minlength="$v.modelEdit.$params.minLength.min"
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
                title: this.modelEdit
            }
        }
    },
    validations: {
        modelEdit: {
            required,
            minLength: minLength(60),
            maxLength: maxLength(180)
        }
    }
}
</script>
