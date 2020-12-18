<template>
	<div class="classes-recieving">
    
        <classCard v-for="(item, index) in classes.items" :key="index" :item="item"/>

        <div class="alert alert-info alert--app" v-if="!classes.items.length && !isLoading">
            <div class="icon">
                <i class="uil uil-exclamation-triangle"></i>
            </div>
            <div class="content">
                Aún no tienes clases programadas
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
import { VclTable } from 'vue-content-loading';
import classCard from '../classCard'

export default {
    components: {
        VclTable,
        classCard
	},
	methods: {
		toggleModal() {
			this.showModal = true;
		}
  	},
	data () {
		return {
            isLoading: false,
			showModal: false,
            fields: [
                {
                    key: 'object',
                    label: 'Clases confirmadas',
                    sortable: false
                },
                { key: 'actions', label: '' }
            ]
        }
    },
    computed: {
        ...mapGetters({
            classes: 'auth/classes_teacher_confirmed',
        })
    },
    beforeMount() {
        if (!this.classes.items.length) {
            this.loadClass()
        }
    },
    beforeDestroy () {
        this.clearClass('CONFIRMADA')
    },
    methods: {
        ...mapActions({
            clearClass: 'auth/clearClassTeacher',
            getClass: 'auth/classTeacherConfirmed',
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