<template>
    <div>
        <div class="row my-4 position-relative">
            <loading :active.sync="isLoading" :is-full-page="false"></loading>
            <b-col sm="12" md="auto">
                <!-- :from-date="moment().format('YYYY/DD/')" -->
                <v-calendar
                    is-expanded
                    :attributes='calendar.attributes'
                    @dayclick="onDayClick"
                    ref="calendar">
                </v-calendar>
            </b-col>
            <b-col>
                <div class="cblock-event">
                    <span class="cblock-event__tday">{{ calendar.current.label }}</span>
                    <div v-if="currentSchedule.length">
                        <div v-for="(item, index) in currentSchedule" :key="index">
                            <classCard v-if="item.gig" :item="item">
                                <template slot="countdown"><span></span></template>
                                <template slot="status"><span></span></template>
                                <template slot="eventDate"> 
                                    <div class="text-white p-1 rounded" :class="'bg' + item.status">
                                        <div class="d-flex" style="flex-direction:column">
                                            <span>{{ item.date_start | getHour }}</span>
                                            <span>{{ item.date_end | getHour }}</span>
                                        </div>
                                    </div>
                                </template>
                            </classCard>
                        </div>
                    </div>
                    <div v-else>
                        <span class="text-dark">Sin eventos</span>
                    </div>
                </div>
            </b-col>
        </div>
        <b-modal id="modal-request-review" hide-footer hide-header>
            <blockRequestReview :reviewed_gig="current_id"/>
        </b-modal>
    </div>
</template>

<script>
import moment from 'moment'
import ClassesService from '@/services/classes.service';
import classCard from '@/components/account/classes/classCard'
import blockRequestReview from '@/components/blocks/blockRequestReview'

export default {
    components: {
        classCard,
        blockRequestReview
    },
    data() {
        return {
            calendar: {
                ref: null,
                attributes: [],
                current: {
                    id: moment().format('YYYY-MM-DD'),
                    label: moment().lang("es").format('LL')
                }
            },
            current_id: null,
            schedule: [],
            currentSchedule: [],
            isLoading: false
        }
    },
    computed: {
        timezone () {
            return 'America/Lima'
        }
    },
    filters: {
        getHour: function (value) {
            return moment(value).format('HH:00')
        }
    },
    beforeMount () {
        this.getSchedule()
        this.$bus.$on('classes:modal_request_review', (id) => {
            this.current_id = id
            this.$bvModal.show('modal-request-review')
        })
        this.$bus.$on('refresh:diary', () => {
            this.calendar.attributes = []
            this.getSchedule()
        })
    },
    beforeDestroy () {
        this.$bus.$off('refresh:diary')
        this.$bus.$off('classes:modal_request_review')
    },
    mounted () {
        this.calendar.ref = this.$refs.calendar;
    },
    methods: {
        onDayClick (day) {
            this.setCurrent(day.id)
            this.getCurrentEvents()
        },
        getSchedule () {
            this.isLoading = true
            ClassesService.getUserClass()
            .then(
                resp => {
                    this.schedule = resp.result.docs
                    let dates = []
                    for(let i in this.schedule) {
                        this.pushEvent(this.schedule[i])
                    }
                    this.getCurrentEvents()
                },
                error => {
                    this.isLoading = false
                    console.log(error)
                }
            )
            .finally (() =>{ this.isLoading = false })
        },
        pushEvent (schedule) {
            // console.log(moment().tz("America/Lima").format('DD/MM/YYYY HH:mm'))
            let label = schedule.subject ? `Clase de ${schedule.subject.title} - ${schedule.status}` : `Clase ${schedule.status}`
            let bar = true
            switch (schedule.status) {
                case 'PENDIENTE':
                    bar = { color: 'yellow', style: { backgroundColor: '#ffc107', } }
                    break;
                case 'CONFIRMADA':
                    bar = { color: 'blue', style: { backgroundColor: '#0054cc', } }
                    label = schedule.subject ? `Clase de ${schedule.subject.title}` : `Clase ${schedule.status}`
                    break;
                case 'FINALIZADA':
                    bar = { color: 'green', style: { backgroundColor: 'green' } }
                    break;
                case 'RECHAZADA':
                    bar = { color: 'black', style: { backgroundColor: '#333' } }
                    break;
            }
            this.calendar.attributes.push({
                bar,
                dates: new Date(moment(schedule.date_start)),
                popover: {
                    label
                },
            })
        },
        getCurrentEvents (date) {
            this.currentSchedule = []
            for(let i in this.schedule) {
                if (moment(this.calendar.current.id).format('YYYY-MM-DD') == moment(this.schedule[i].date_start).format('YYYY-MM-DD'))
                    this.currentSchedule.push(this.schedule[i])
            }
        },
        /**
         * @param   {String}  day  * YYYY-MM-DD
         */
        setCurrent (day) {
            this.calendar.current = {
                id: day,
                label: moment(day).lang("es").format('LL')
            }
        }
    },
}
</script>

<style lang="scss">
    .cblock-event .ablock-event .date {
        display: none;
    }
    span[tabindex="0"] {
        background: $gray-400 !important;
        color: $dark;
    }
</style>