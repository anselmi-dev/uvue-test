<template>
    <div class="teacher-reserve">
        <div class="teacher-information__title teacher-reserve__title">
            Revervar
        </div>
        <div class="teacher-reserve__content">
            <div class="teacher-reserve__actions">
                <div>

                    <div class="teacher-reserve__ltop">
                        <i class="ipunku-info"></i>
                        <span>Para una mejor experiencia, te recomendamos reservar tu clase con 8 horas de anticipación como mínimo</span>
                    </div>
                    <gig-auto-reservation :auto_reservation="gig.auto_reservation" />
                </div>
                <div class="teacher-reserve__calender" id="calendar-component-id">
                    <calendarComponent
                        ref="gigCalendar"
                        :teacher_id="gig.teacher.user._id"
                        @emitDateEvents="emitDateEvents"
                        :vacations="gig.teacher.vacation"
                        :schedule="gig.teacher.schedule"/>
                </div>

                <div class="actions teacher-information__reserve" v-if="!gig.is_my_gig && gig.is_active">
                    <hr>
                    <button
                        @click="toReserve"
                        class="teacher-information__reserve-action">
                        Reserva tu clase
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import calendarComponent from '@/components/calendar/calendarComponent'
import gigAutoReservation from '@/components/gigs/gigAutoReservation'

export default {
    components: {
        calendarComponent,
        gigAutoReservation,
    },
    props: {
        gig: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            date: null
        };
    },
    computed: {
        schedule () {
            return this.gig.schedule
        }
    },
    methods: {
        ...mapActions({ reserveClass: 'auth/reserveClass' }),
        emitDateEvents (date) { this.date = date },
        toReserve () {
            if (this.date) {
                localStorage.setItem('reserve_dates', JSON.stringify(this.date))
            }
            this.$router.push({name: 'gig.reservation', params: { slug: this.gig.slug }})
        },
        reserve () {
            if (!this.date) {
                this.$bus.emit("notifications:push", { title: 'Ups!', type: 'error', message: 'Debe seleccionar un fecha para reservar.' })
            } else {
                this.reserveClass({
                    teacher_id: this.gig.teacher.user._id,
                    gig_id: this.gig._id,
                    gig_title: this.gigDetails.title,
                    date_start: this.date.start,
                    date_end: this.date.end,
                    group_class: this.gig.group_class,
                    auto_reservation: this.gig.auto_reservation
                }).then(resp => {
                    this.$bus.emit("notifications:push", { type: 'dark', message: 'Se reservo su clase correctamente!' })
                    this.date = null
                })
                .catch(err => {
                    this.$bus.emit("notifications:push", { title: 'Ups!', type: 'error', message: err })
                })
                .finally(() => {
                    // this.isLoading = false
                })
            }
        }
    }
}
</script>