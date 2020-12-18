<template>
	<div class="classes-pending">
        <!-- {{ classes.totalDocs }} -->
        <classCard v-for="(item, index) in classes.items" :key="index"  :item="item"/>

        <div class="alert alert-info alert--app" v-if="!classes.items.length && !isLoading">
            <div class="icon">
                <i class="uil uil-exclamation-triangle"></i>
            </div>
            <div class="content">
                Aún no tienes clases reservadas por confirmar
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
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { VclTable } from 'vue-content-loading'
import classCard from '../classCard'

export default {
    components: {
        VclTable,
        classCard
    },
	data () {
		return {
            isLoading: false,
	        fields: [
	          	{
	            	key: 'object',
	            	label: 'Clases pendientes de confirmación',
		            sortable: false
	          	},
	      		{ key: 'actions', label: '' }
        	],
            currentClass: null
        }
    },
    computed: {
        ...mapGetters({
            classes: 'auth/classes_pending',
        })
    },
    beforeMount() {
        if (!this.classes.items.length) {
            this.loadClass()
        }
        this.$bus.on('refresh:class:pendiente', () => {
            this.clearClass('PENDIENTE')
        })
    },
    beforeDestroy () {
        this.clearClass('PENDIENTE')
        this.$bus.off('refresh:class', () => {})
    },
    methods: {
        ...mapActions({
            clearClass: 'auth/clearClass',
            getClass: 'auth/classPending'
        }),
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
