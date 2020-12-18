<template>
    <div @click.prevent="$bvModal.show(modalId)">
        <slot></slot>
        <b-modal :id="modalId" class="modal-confirmation"
            :hide-header="true"
            centered
            size="sm"
            :hide-footer="true">
            <p class="text-center">
                ¿Estás seguro?
            </p>
            <div class="w-100 text-center">
                <button class="btn btn-sm btn-danger mx-1">Si</button>
                <button class="btn btn-sm btn-dark mx-1">No</button>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            modalId: 'modal-' + 'confirmation-' + this.id
        }
    },
    props: {
        id: {
            default: null
        }
    },
    beforeMount() {
        this.$bus.$on("punku:open:confirmation", () => {
            this.$bvModal.show(this.modalId)
        });
    },
    beforeDestroy() {
        this.$bus.$off("punku:open:confirmation")
    },
}
</script>
