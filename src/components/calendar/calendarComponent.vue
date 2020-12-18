<template>
    <div class="calendar-component" id="calendar-component">
        <b-row class="align-items-center mb-1 row-sm">
            <b-col col>
                <div class="calendar-component__title-today">
                    {{ calendar.today | formatToday }}
                </div>
            </b-col>
            <b-col cols="auto">
                <b-row class="row--xs">
                    <b-col cols="auto">
                        <button @click="prevDay" class="btn btn-sm btn-secondary">
                            <i class="uil uil-angle-left"></i>
                        </button>
                    </b-col>
                    <b-col cols="auto">
                        <button @click="nextDay" class="btn btn-sm btn-secondary">
                            <i class="uil uil-angle-right"></i>
                        </button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <table class="table b-table table-striped table-sm table-hover w-100 mb-0 border-bottom">
            <thead>
                <tr>
                    <th v-for="(dayOfWeek, indexWeek) in daysOfWeeks" :key="indexWeek" class="text-center" style="width: calc(100% / 7); max-width: calc(100% / 7); min-width: calc(100% / 7)">
                        {{ calendar.weeks[moment(calendar.today.addDay(indexWeek)).day()] }}<br>
                        {{ moment(calendar.today).add(indexWeek, 'days').format('DD/MM') }}
                    </th>
                </tr>
            </thead>
        </table>

        <div class="table-scroll">
            <table class="table b-table table-striped table-sm table-bordered table-hover w-100 mb-0">
                <tbody>
                    <tr v-for="(hourOfDay, index) in hoursOfDays" :key="index">
                        <td
                            style="width: calc(100% / 7); max-width: calc(100% / 7); min-width: calc(100% / 7)"
                            v-b-tooltip.hover
                            v-for="(item, dayOfWeek) in daysOfWeeks"
                            :key="dayOfWeek"
                            :data-hour="hourOfDay"
                            :title="createDateEvent({dayOfWeek, hourOfDay, format_date: ''}) + ' - ' + createDateEvent({dayOfWeek, hourOfDay: hourOfDay + 1, format_date: ''})"
                            :class="classesEvent(dayOfWeek, hourOfDay)"
                            @click="addEvent(createDateEvent({dayOfWeek, hourOfDay}))"
                            :id="createDateEvent({dayOfWeek, hourOfDay})">
                                <span class="py-2 py-lg-1 d-block">
                                    {{ getHour(hourOfDay) }}
                                </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <b-row class="row--sm pt-3">
            <b-col cols="auto">
                <div class="d-flex mr-3 align-items-center">
                    <span class="badge date-reserved border p-1 mr-1 d-inline-block"></span>
                    <small>No disponible</small>
                </div>
            </b-col>
            <b-col cols="auto">
                <div class="d-flex mr-3 align-items-center">
                    <span class="badge date-available p-1 mr-1 d-inline-block"></span>
                    <small>Libre</small>
                </div>
            </b-col>
            <b-col cols="auto">
                <div class="d-flex mr-3 align-items-center">
                    <span class="badge date-select p-1 mr-1 d-inline-block"></span>
                    <small>Seleccionado</small>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import moment from 'moment'
    import { mapActions } from 'vuex'

    Date.prototype.addHours= function(h){
        this.setHours(this.getHours()+h);
        return this;
    }

    Date.prototype.addDay = function(day = 1) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + day);
        return date;
    }

    export default {
        data () {
            return {
                isLoading: true,
                calendar: {
                    today: new Date(),
                    indexWeek: 7,
                    weeks: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab',],
                    Months: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dec'],
                },
                events: [],
                eventsReserved: [],
            }
        },
        props: {
            schedule: {
                type: Array,
                required: false,
                default: []
            },
            teacher_id: {
                type: String,
                required: false
            },
            vacations: {
                type: Object,
                required: false,
                default: null
            }
        },
        beforeMount () {
            const reserve_dates = localStorage.getItem('reserve_dates')
            if (reserve_dates) {
                let dates = JSON.parse(reserve_dates)
                for (let index = 0; index < dates.length; index++) {
                    dates[index].end = moment(dates[index].end)
                    dates[index].start = moment(dates[index].start)
                }
                this.events = [...dates]
                this.$emit('emitDateEvents', this.events)
            }

            if (this.teacher_id) {
                this.getClassReserved({id: this.teacher_id})
                .then(resp => {
                    this.eventsReserved = resp.result
                    this.isLoading = false
                })
            }
        },
        beforeDestroy () {
        },
        mounted () {
            let calendar = document.querySelector('.calendar-component')
            if (calendar.offsetWidth < 500) {
                this.calendar.indexWeek = 7
            }
            window.addEventListener('resize', (e) => {
                if (calendar.offsetWidth < 500) {
                    this.calendar.indexWeek = 7
                } else {
                    this.calendar.indexWeek = 7
                }
            });
        },
        computed: {
            daysOfWeeks () {
                let weeks = []
                for (var i = 1; i <= this.calendar.indexWeek; i++) {
                    weeks.push(moment(this.calendar.today).add(i, 'days').isoWeekday())
                }
                return weeks
            },
            hoursOfDays () {
                return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
            },
        },
        filters: {
            formatToday (value) {
                try {
                    const moment_today = moment(String(value))
                    return moment_today.format('DD/MM') + ' - ' + moment_today.add(6, 'days').format('DD') + '/' + moment_today.add(6, 'days').format('MM. YYYY')
                } catch (e) {
                    return value
                }
            },
            formatWeek (value) {
                if (value) {
                    return moment(String(value), 'MM/DD/YY')
                }
                return value
            },
            formatWeekHr (value) {
                if (value) {
                    return moment(String(value), 'MM/DD/YY HH:00')
                }
                return value
            },
        },
        methods: {
            ...mapActions({getClassReserved: 'auth/getClassReserved'}),
            addEvent (newEvent) {
                const exist_event = this.findEvent(newEvent)
                if (this.isSchedule(newEvent) && !this.isVacationPeriod(newEvent)) {
                    if (this.isEventsReserved(newEvent) < 0) {
                        if (exist_event > -1) {
                            this.events.splice(exist_event, 1)
                        } else {
                            const event = moment(newEvent)
                            this.events.push({
                                dateDay: event.isoWeekday(),
                                start: moment(newEvent),
                                end: moment(newEvent).add(1, 'hours'),
                            })
                        }
                        this.events.sort((a, b) => a.start.format('X') - b.start.format('X'))
                        this.$emit('emitDateEvents', [...this.events])
                    }
                }
            },
            findEvent (event) {
                const new_event = moment(event)
                return this.events.findIndex((item) => {
                    let index = moment(item.start).isSame(event)
                    return index
                })
            },
            isValidDate (event) {
                return this.user.teacher.schedule.find(item => {
                    if (item.daysOfWeek.includes(event.dateDay)) {
                        return event.start >= item.startTime && event.end <= item.endTime
                    }
                    return false
                })
            },
            isSchedule (event) {
                const moment_event = moment(event)
                const hour_format = moment_event.format('HH:00')
                const findEventfind = this.schedule.find(item => {
                    if (item.daysOfWeek.includes(moment_event.isoWeekday())) {
                        return hour_format == item.startTime
                    }
                    return false
                })
                return findEventfind
            },
            getHour (hour) {
                var date = new Date();
                date.setHours(hour, 0, 0)
                return moment(String(date)).format('HH:00')
            },
            getDate (hour, index) {
                var date = new Date(this.calendar.today.valueOf());
                date.setHours(hour,0,0)
                date.setDate(date.getDate() + index)
                return date
            },
            prevDay () {
                const today = moment(this.calendar.today)
                if (today > moment()) {
                    this.calendar.today = this.calendar.today.addDay(-this.calendar.indexWeek)
                }
            },
            nextDay () {
                this.calendar.today = this.calendar.today.addDay(this.calendar.indexWeek)
            },
            eventAvailable (event) {
                return this.findEvent(event) > -1
            },
            createDateEvent (parameters) {
                const format_hour = parameters.format_hour ? parameters.format_hour : this.getHour(parameters.hourOfDay)
                parameters.format_date = parameters.hasOwnProperty('format_date') ? parameters.format_date : 'YYYY-MM-DD'
                return moment(this.calendar.today.addDay(parameters.dayOfWeek)).format(parameters.format_date + ' ' + format_hour)
            },
            isEventsReserved (event) {
                const moment_event = moment(event)
                const moment_event_end = moment_event.add(1, 'hours')
                return this.eventsReserved.findIndex((eventReserved) => {
                    return moment(eventReserved.date_start) <= moment_event && moment(eventReserved.date_end) >= moment_event_end
                })
            },
            isVacationPeriod (event) {
                if (this.vacations && this.vacations.date_start) {
                    let start = moment(moment(this.vacations.date_start).format('YYYY-MM-DD'))
                    let date_end = moment(moment(this.vacations.date_end).add(1, 'days').format('YYYY-MM-DD'))
                    return moment(event) >= moment(start) && moment(event) < moment(date_end)
                }
                return false
            },
            classesEvent (dayOfWeek, hourOfDay) {
                const event = this.createDateEvent({dayOfWeek, hourOfDay})
                const eventAvailable = this.eventAvailable(event)
                let classes = ''
                const valid = moment().add(2, 'hour') < moment(event)
                if (this.isVacationPeriod(event)) 
                    return classes + 'date-block'
                if (valid) {
                    if (this.isSchedule(event)) {
                        if (this.isEventsReserved(event) > -1) {
                            return classes + 'date-reserved'
                        } else{
                            classes = classes + ' cursor-pointer'
                            if (eventAvailable) {
                                classes = classes + ' date-select'
                            } else {
                                classes = classes + ' date-available'
                            }
                        }
                    }
                    else {
                        classes = classes + 'date-schedule'
                    }
                } else {
                    classes = classes + 'date-block'
                }
                return classes
            }
        }
    }
</script>

<style lang="scss">
    .date-select {
        background-color: $primary;

        color: $white;
        background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
        background-size: 1rem 1rem;
    }
    .date-block {
        background-color: $gray-500;
        background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
        background-size: 1rem 1rem;
    }
    .date-available {
        background-color: $success;
        color: $white;
        background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
        background-size: 1rem 1rem;
    }
    .date-schedule {
        opacity: 3
    }
    .date-reserved {
        color: $white;
        background-color: $gray-600 !important;
        background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
        background-size: 1rem 1rem;
    }
    .calendar-component {
        &__title-today {
            background: $gray-200;
            color: $gray-700;
            font-weight: bold;
            font-size: 1.5rem;
            border-radius: 4px;
            padding: 2px 6px;
        }
        .opacity-3 {
            opacity: .5
        }
        .btn-primary {
            background-color: $primary !important;
            &:focus,
            &:hover {
                background-color: $primary !important;
                box-shadow: none;
                border: none;
            }
        }
        .table-scroll {
            max-height: 60vh;
            min-height: 300px;
            overflow-y: auto;
              &::-webkit-scrollbar {
                width: 5px;
              }

              &::-webkit-scrollbar-track {
                background: lighten($gray-300, 0%);
              }

              &::-webkit-scrollbar-thumb {
                background: lighten($primary, 15%);
              }

              &::-webkit-scrollbar-thumb:hover {
                background: darken($primary, 10%);
              }
        }
        .table th, .table td {
            vertical-align: middle !important;
            text-align: center;
            padding: 0.15rem;
        }
        @media screen and (max-width: 700px) {
            table * { font-size: 15px }
            &__title-today { font-size: 1rem }
        }
        @media screen and (max-width: 500px) {
            table * { font-size: 9px }
            &__title-today { font-size: .8rem }
            .btn { padding: 0 }
        }
    }
    body.page-gig-show .tooltip,
    body.page-gig-reservation .tooltip {
        pointer-events: none;
    }
</style>
