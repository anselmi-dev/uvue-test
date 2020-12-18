<template>
    <div>
        <div class="account-content__title d-flex justify-content-space-between">
            <span>Mis Alumnos</span>
        </div>
        <div class="position-relative" v-if="load">
            <loading :active.sync="data.isLoading" :is-full-page="false"></loading>
            <div v-for="(item, index) in data.docs" :key="index">
                <studentCard :data="item"/>
            </div>
            <div class="d-flex flex-wrap align-items-center justify-content-space-between alert alert-light"  v-if="!data.docs.length">
                <span class="text-dark font-weight-bold">Aún no tienes alumnos</span>
            </div>
            <div class="teacher-list-recommendations__actions" v-if="data.page">
                <button class="teacher-list-recommendations__action" @click="getMyStudents" :disabled="data.isLoading">VER MÁS</button>
            </div>
        </div>
        <VclTable v-else></VclTable>
    </div>
</template>

<script>
import { VclTable } from 'vue-content-loading'
import InteractionsService from '@/services/interactions.service'
import studentCard from '@/components/student/studentCard'

export default {
    components: {
        VclTable,
        studentCard
    },
	data () {
		return {
            load: false,
            data: {
                // id: null,
                page: 1,
                limit: 6,
                totalDocs: 0,
                docs: [],
                isLoading: true
            }
		}
    },
    beforeMount () {
        this.getMyStudents ()
    },
	methods: {
        getMyStudents () {
            this.data.isLoading = true
            InteractionsService.getMyStudents(this.data)
            .then((resp) => {
                this.data.docs = [
                    ...this.data.docs,
                    ...resp.docs,
                ]
                this.data.totalDocs = resp.totalDocs
                this.data.page = resp.nextPage
            }).finally(()=>{
                this.data.isLoading = false
                this.load = true
            })
        }        
    },
}
</script>