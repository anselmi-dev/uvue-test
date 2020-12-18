<template>
    <div>
        <div class="account-content__title">
            <b-row class="row--xs">
                <b-col>
                    <span>Mis clases</span>
                </b-col>
                <b-col cols="auto">
                    <subscribeToClass />
                </b-col>
            </b-row>
        </div>
        <div class="accout-tabs nav-tabs--overflow">
            <b-tabs content-class="mt-3">
                <b-tab title="Clase por confirmar">
                    <template #title>
                        <span class="account-tabs__pcount">
                            Clases por confirmar
                            <span>{{ classes_pending.totalDocs | totalDocs }}</span>
                        </span>
                    </template>

                    <classesPending/>
                </b-tab>
                <b-tab title="Clases programadas">
                    <template #title>
                        <span class="account-tabs__pcount">
                            Clases programadas
                            <span>{{ classes_confirmed.totalDocs | totalDocs }}</span>
                        </span>
                    </template>
                    <classesConfirmed/>
                </b-tab>
                <b-tab title="Clases recibidas">
                    <template #title>
                        <span class="account-tabs__pcount">
                            Clases recibidas
                            <span>{{ classes_completed.totalDocs | totalDocs }}</span>
                        </span>
                    </template>
                    <classesCompleted/>
                </b-tab>
            </b-tabs>
        </div>
        <modalObservations />
    </div>
</template>

<script>
import classesPending from '@/components/account/classes/student/classesPending'
import classesConfirmed from '@/components/account/classes/student/classesConfirmed'
import classesCompleted from '@/components/account/classes/student/classesCompleted'
import subscribeToClass from '@/components/account/classes/subscribeToClass'

import modalObservations from '@/components/account/classes/modalObservations'
import { mapGetters } from 'vuex'

export default {
    components: {
        classesPending,
        classesConfirmed,
        classesCompleted,
        modalObservations,
        subscribeToClass
    },
    computed: {
        ...mapGetters({
            classes_completed: 'auth/classes_completed',
            classes_pending: 'auth/classes_pending',
            classes_confirmed: 'auth/classes_confirmed',
        })
    },
    filters: {
        totalDocs (value) {
            return  value > 9 ? '+9' : value
        }
    },
    data () {
        return {
            tabsIndex: 0,
        }
    },
    mounted () {
        this.tabsIndex = 0
    },
}
</script>

