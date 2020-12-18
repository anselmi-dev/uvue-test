<template>
    <div>
        <b-container>
            <b-row class="text-center w-100">
                <b-col cols="12" lg="10" class="mx-auto">
                    <div class="flex flex-wrap align-items-center" v-if="!isLoading">
                        <img :src="require('@/assets/icons/comprobado.svg')" height="90">
                        <h4 class="mt-4 mb-1">
                            {{ classDetails.student_qt > 1 ? `Su clase grupal de` : 'Su clase de' }} <strong>{{classDetails.subject.title}}</strong> fue reservada exitosamente
                        </h4>
                        <p class="mb-1">
                            Su profesor es <strong class="text-capitalize">{{ classDetails.teacher | splitFullName }}</strong> y su clase comienza el <strong>{{ classDetails.date_start | LLL }}</strong>
                        </p>
                        <hr>
                        <div class="flex w-100" v-if="classDetails.student_qt > 1">
                            Recuerde compartir el código para que las otras personas puedan inscribirse en la clase<br>
                            <div class="d-block mt-2">
                                <strong class="alert">{{ classDetails.group_code }}</strong>
                            </div>
                        </div>
                        <hr>
                        <p class="alert alert-light text-dark mt-2">
                            <span class="flex flex-wrap">
                                <i class="uil uil-exclamation-triangle"></i>
                                Le recomendamos estar <strong>15 min</strong> antes de empezar la clase, para evitar cualquier inconveniente.
                            </span>
                        </p>
                        <hr>
                        <b-row class="row--sm justify-content-center">
                            <b-col cols="auto">
                                <b-button variant="outline-primary" :to="{name: 'account.dashboard'}">Ir a mi cuenta</b-button>
                            </b-col>
                            <b-col cols="auto">
                                <b-button variant="primary" :to="{name: 'account.classes'}">Ir a mis clases</b-button>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import GigsFilterService from '@/services/gigs-filter.services'
import ClassesService from '@/services/classes.service';

export default {
    data () {
        return {
            isLoading: true,
            gig: null,
            classDetails: {}
        }
    },
    computed: {
        ...mapGetters({
            classes: 'auth/classes_pending',
            classesConfirmed: 'auth/classes_confirmed',
        }),
    },
    beforeMount() {
        // this.getGig(this.$route.params.slug)
        this.getReservation(this.$route.params.id)
    },
    methods: {
        ...mapActions({
            getClass: 'auth/classPending',
            getClassConfirmed: 'auth/classConfirmed',
        }),
        getReservation () {
            ClassesService.getClassDetails(this.$route.params.id)
            .then((resp) => {
                this.classDetails = resp.classDetails
                this.isLoading = false
            })
            .catch(err => {
                this.$bus.emit("app-error")
            })
        },
        getGig (slug) {
            this.isLoading = true
            GigsFilterService.getGigDetails(slug)
            .then((gig) => {
                this.gig = gig.gigDetails
                this.isLoading = false
            })
            .catch(err => {
                this.$router.push({name: '404'})
            })
        },
        loadClass() {
            this.isLoading = true
            this.getClass({role: 3, limite: 25 })
            .then(resp => {
                this.isLoading = false
            })
        },
    }
}
</script>
