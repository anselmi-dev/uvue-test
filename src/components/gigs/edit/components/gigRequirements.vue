<template>
	<div class="teacher-requirements">
        <loading :active.sync="isLoading" :is-full-page="false"></loading>

        <div class="title">
            Requisitos previos para la clase
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
                    maxlength="2000"
                    placeholder="Ej: Tener un cuaderdo y lapiz."
                    class="form-control mt-2"
                    v-model.trim.lazy="modelEdit"
                    :maxlength="$v.modelEdit.$params.maxLength.max"
                    :minlength="$v.modelEdit.$params.minLength.min"
                />
                <small>
                    <span :class="{'text-danger':$v.modelEdit.$error}">{{ modelEdit.length }}</span> / {{ $v.modelEdit.$params.maxLength.max }}
                </small>
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
import { minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    mixins: [gigEdit],
    methods: {
        getDataFormat () {
            return {
                requirements: this.modelEdit
            }
        }
    },
    validations: {
        modelEdit: {
            minLength: minLength(10),
            maxLength: maxLength(600)
        }
    }
}
</script>
