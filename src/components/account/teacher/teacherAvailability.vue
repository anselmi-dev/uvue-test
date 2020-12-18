<template>
	<div class="teacher-availability">
        <div class="row">
            <div class="col-12 col-lg-10 mx-auto">
                <div class="row mb-2 align-items-center">
                    <div class="col-auto">
                        <h5>Disponiblidad de mis clases.</h5>
                    </div>
                    <div class="col text-right">
                        <button
                            class="btn btn-sm btn-outline-primary"
                            v-if="!disabled"
                            @click="toggleDisabled">
                            <i class="uil uil-edit-alt"></i> Editar
                        </button>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-12">
                        <gigCalendar
                            ref="gigCalendar"
                            v-if="schedule"
                            :isEdit="disabled"
                            :schedule="schedule"/>
                        <div class="row row--sm mt-2" v-if="disabled">
                            <div class="col-auto">
                                <button class="btn btn-sm btn-outline-danger" @click="cancel">Cancelar</button>
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-sm btn-danger" @click="submit">GUARDAR</button>
                            </div>
                        </div>
                        <hr>
                        <b-row>
                            <b-col cols="12">
                                <span>
                                    <small class="text-muted">
                                        ¿Vas a estar ausente unos dias? Indica cuando y durante ese periodo de tiempo no aparecerás en los resultados de busqueda.
                                        No debes tener clases confirmadas durante el periodo seleccionado.
                                    </small>
                                </span>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="5">
                                <datetime
                                    placeholder="Desde"
                                    :input-class="{'form-control': true }"
                                    v-model="dateFrom">
                                </datetime>
                            </b-col>
                            <b-col cols="5">
                                <datetime
                                    placeholder="Hasta"
                                    :input-class="{'form-control': true }"
                                    v-model="dateTo">
                                </datetime>
                            </b-col>
                            <b-col cols="2">
                                <button class="btn btn-sm btn-info" @click="takeAbreak">GUARDAR</button>
                            </b-col>
                        </b-row>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import gigCalendar from '@/components/gigs/gigCalendar'
import TeacherServices from '@/services/teacher.service';
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'

export default {
    components: {
        gigCalendar,
        Datetime
    },
    data () {
        return  {
            isLoading: false,
            disabled: false,
            schedule: null,
            dateFrom: null,
            dateTo: null,
            dates: []
        }
    },
    mounted () {
        this.schedule = this.user.teacher.schedule.slice()
        this.dateFrom = this.user.teacher.vacation.date_start
        this.dateTo = this.user.teacher.vacation.date_end
    },
    watch: {
        date (val, oldVal) {
            if (val)
                this.dates.push(val)
            this.date = null
        }
    },
    methods: {
        toggleDisabled () {
            this.disabled = !this.disabled
            this.isLoading = false
        },
        cancel () {
            this.toggleDisabled()
            this.$refs.gigCalendar.scheduleEdit = this.schedule
        },
        submit () {
            this.isLoading = true
            TeacherServices.updateTeacher({
                schedule: this.$refs.gigCalendar.scheduleEdit
            })
            .then((resp) => {
                this.isLoading = false
                this.$bus.emit("notifications:push", {
                  type: 'dark',
                  message: 'Tus cambios fueron guardados exitosamente.'
                })
                this.toggleDisabled()
            })
            .catch((err) => {
                this.isLoading = false
            })
        },
        takeAbreak () {
            TeacherServices.updateTeacher({
                vacation: {
                    date_start: this.dateFrom,
                    date_end: this.dateTo
                }
            })
            .then((resp) => {
                this.$bus.emit("notifications:push", {
                  type: 'dark',
                  message: 'Tus cambios fueron guardados exitosamente.'
                })
            })
            .catch((err) => {
                this.isLoading = false
            })
        }
    }
}
</script>

<style lang="scss">
    .teacher-availability .gig-table-calendar {
        line-height: 1;
        & > table {
            width: calc(100% - .5rem)
        }
        .table-scroll {
            max-height: 350px;
            overflow: auto;
            font-size: .8rem;
            table {
                margin-bottom: 0;
            }
            &::-webkit-scrollbar {
                width: .5rem;               /* width of the entire scrollbar */
            }
            &::-webkit-scrollbar-track {
                background: transparent;        /* color of the tracking area */
            }
            &::-webkit-scrollbar-thumb {
                background-color: darken($primary, 10%);    /* color of the scroll thumb */
                border-radius: 20px;       /* roundness of the scroll thumb */
                border: 3px solid #FFF;  /* creates padding around scroll thumb */
            }
            &--edit tbody tr td {
              cursor: pointer;
            }
        }
    }
</style>
