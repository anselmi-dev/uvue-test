<template>
	<div class="classes-received">
        <classCard v-for="(item, index) in classes.items" :key="index" :item="item"/>

        <div class="alert alert-info alert--app" v-if="!classes.items.length && !isLoading">
            <div class="icon">
                <i class="uil uil-exclamation-triangle"></i>
            </div>
            <div class="content">
                Aún no tienes clases recibidas
            </div>
        </div>
        <VclTable v-if="isLoading"></VclTable>
        <b-row v-else v-show="classes.nextPage">
            <b-col>
                <b-button variant="outline-primary" size="sm" @click="loadClass()">
                    Ver más
                </b-button>
            </b-col>
        </b-row>
        <b-modal id="modal-request-review" size="lg"  centered hide-footer hide-header>
            <blockRequestReview :reviewed_gig="current_id"/>
        </b-modal>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { VclTable } from 'vue-content-loading';
import classCard from '../classCard'
import blockRequestReview from '@/components/blocks/blockRequestReview'

export default {
    components: {
        VclTable,
        classCard,
        blockRequestReview
    },
	data () {
		return {
            isLoading: false,
            current_id: null,
            fields: [
                {
                    key: 'object',
                    label: 'Clases recibidas',
                    sortable: false
                },
                { key: 'actions', label: '' }
            ]
        }
    },
    computed: {
        ...mapGetters({
            classes: 'auth/classes_completed',
        })
    },
    beforeMount() {
        if (!this.classes.items.length) {
            this.loadClass()
        }
        this.$bus.$on('classes:modal_request_review', this.openModalReview)
    },
    beforeDestroy () {
        this.$bus.$on('classes:modal_request_review', this.openModalReview)
        this.clearClass('FINALIZADA')
    },
    methods: {
        ...mapActions({
            clearClass: 'auth/clearClass',
            getClass: 'auth/classCompleted'
        }),
        openModalReview (id) {
            this.current_id = id
            this.$bvModal.show('modal-request-review')
        },
        loadClass() {
            this.isLoading = true
            this.getClass()
            .then(resp => {
                this.isLoading = false
            })
        }
    }
}
</script>
