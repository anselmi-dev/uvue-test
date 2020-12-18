<template>
    <div class="d-inline-block">
        <div class="d-inline-block" v-if="!isEdit">
            <button
                class="btn btn-sm px-1 py-0 mr-1 line-height" @click="actionEdit">
                <i class="ipunku-pencil"></i>
            </button>
        </div>
        <div class="d-block mt-2 pt-2 w-100" v-else>
            <button
                class="btn btn-sm btn-outline-danger px-2 py-1 mr-1 line-height" @click="actionCancel">
                <span>Cancelar</span>
            </button>
            <button class="btn btn-sm btn-primary px-2 py-1 line-height" @click="actionUpdate">
                <span>Guardar</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isEdit: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        actionCancel () {
            this.$emit('actionCancel')
        },
        actionUpdate () {
            this.$emit('actionUpdate')
        },
        actionEdit () {
            this.$emit('actionEdit')
        }
    }
}
</script>
