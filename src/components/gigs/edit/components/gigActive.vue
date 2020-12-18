<template>
    <div class="teacher-requirements position-relative">
        <loading :active.sync="isLoading" :is-full-page="false"></loading>
        <div class="title d-flex align-items-center justify-content-between">
            <span>
                {{ modelInitial ? 'Activo' : 'Desactivado'}}
            </span>
            <label for="switch" class="switch">
                <input type="checkbox" id="switch" v-model="modelEdit" @change="toogle" :disabled="isLoading"/>
                <span class="switch--toggle"></span>
                <strong class="ml-2">

                </strong>
            </label>
        </div>
        <small class="d-block text-muted">
            Su anuncio no sera visible al estar desactivado. No podrán reservar.
        </small>
        <hr>
    </div>
</template>

<script>
import gigEdit from '@/mixins/gig.edit'
import { required } from 'vuelidate/lib/validators'

export default {
    mixins: [gigEdit],
    mounted () {
        this.modelEdit = this.modelInitial
    },
    methods: {
        getDataFormat () {
            return {
                is_active: this.modelEdit
            }
        },
        toogle () {
            this.toggleGig()
        }
    },
    validations: {
        modelEdit: {
            required
        }
    }
}
</script>
