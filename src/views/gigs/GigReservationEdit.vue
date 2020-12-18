<template>
    <div class="gig-reservation" v-if="!isLoadingGigDetails">
        <loading :active.sync="isLoading" :is-full-page="true"></loading>
        <b-container>
            <b-row class="mx-auto justify-content-center" v-if="!isRechazada">
                <b-col cols="12" md="6" lg="6" class="mt-4 mb-2 d-flex flex-wrap align-items-center justify-content-space-between">
                    <router-link :to="{name: 'account.classes'}" class="font-weight-bold">
                        <i class="uil uil-angle-left-b"></i>
                        <span>Volver a mis clases</span>
                    </router-link>
                    <button class="btn btn-outline-dark btn-sm" @click="removeClass">
                        <span>Cancelar reservación</span>
                    </button>
                </b-col>
            </b-row>
            <b-row class="mx-auto justify-content-center" v-if="!isRechazada">
                <b-col cols="12" md="6" lg="6" id="form-reservation-edit" v-if="!classDetails.modified">
                    <div class="teacher-reserve__calender punku-box mt-3 p-0">
                        <ablockPremium :variant="'warning'">
                            <div class="d-flex align-items-center">
                                <h2 class="mb-0"><i class="uil uil-info-circle"></i></h2>
                                <span>Recuerda que sólo podrás modificar tu reserva una sola vez</span>
                            </div>
                        </ablockPremium>
                    </div>

                    <div class="teacher-reserve__calender punku-box mt-3" :class="{'teacher-create__step-error': $v.model.subject.$error}">
                        <b-row>
                            <b-col cols="12" class="d-flex align-items-center">
                                <h4 class="mr-2 mb-0"><i class="uil uil-book"></i> Tema </h4>
                                <select class="form-control" :class="{'is-invalid': $v.model.subject.$error }" style="width: auto;" v-model="model.subject" :disabled="!isFirst">
                                    <option value="">Sin selección</option>
                                    <option v-for="(item, index) in classDetails.gig.subject" :key="index" :value="item">
                                        {{ item.title }}
                                    </option>
                                </select>
                            </b-col>
                            <b-col cols="12">
                                <small class="invalid-feedback d-block" v-if="$v.model.subject.$error">
                                    <strong>Debe elegir un tema para continuar.</strong>
                                </small>
                            </b-col>
                        </b-row>
                    </div>

                    <div class="teacher-reserve__calender punku-box mt-3" :class="{'teacher-create__step-error': $v.model.observations.$error}">
                        <b-row>
                            <b-col cols="12">
                                <h4>
                                    <i class="uil uil-notes"></i> Observaciones <small class="text-muted">(opcional)</small>
                                </h4>
                                <span>Aquí puedes dejar mayor detalle del tema que deseas tratar</span>
                                <div class="textarea-autosize-count mt-3">
                                    <textarea-autosize
                                        class="form-control"
                                        placeholder="Estas observaciones son para el profesor."
                                        v-model.trim.lazy="model.observations"
                                        :disabled="!isFirst"
                                        :maxlength="$v.model.observations.$params.maxLength.max"
                                        :minlength="$v.model.observations.$params.minLength.min"
                                    />
                                    <small>{{ model.observations.length }} / {{ $v.model.observations.$params.maxLength.max }}</small>
                                </div>
                                <small :class="{'text-danger': $v.model.observations.$invalid }">
                                    Debe contener al menos {{ $v.model.observations.$params.minLength.min }} caracteres.
                                </small>
                            </b-col>
                        </b-row>
                    </div>

                    <div class="teacher-reserve__calender punku-box mt-3">
                        <b-row>
                            <b-col cols="12" class="position-relative">
                                <h4>
                                    <i class="uil uil-file-share-alt"></i> Documentos <small class="text-muted">(opcional)</small>
                                </h4>
                                <p class="d-block text-muted"> Los archivos seran visible para el profesor </p>
                                <div class="teacher-cv__content" v-if="model.files_url.length">
                                    <div class="d-flex" v-for="(file, index) in model.files_url" :key="index">
                                        <a :href="file" target="_blank" class="teacher-cv__link text-truncate">
                                            <i class="ipunku-paperclip"></i>
                                            {{ file | nameFile }}
                                            <!-- {{ decodeURI(file.split("classes-media-docs/")[1]) }} -->
                                        </a>
                                        <button class="btn btn-sm text-danger p-0 ml-auto" @click="removerFile(index)" :disabled="!isFirst">
                                            Remover
                                        </button>
                                    </div>
                                </div>
                                <div v-if="isFirst">
                                    <div class="d-block mt-3" v-if="!maxFiles">
                                        <loading
                                            :active.sync="objectFile.isLoading" :is-full-page="false"></loading>
                                        {{
                                            !model.files_url.length ?
                                            'Sin documentos. Puede subirlos ' :
                                            'Subir otro documento '
                                        }}
                                        <label class="font-weight-bold text-primary cursor-pointer h6" name="video-file-cv">
                                            Aqui
                                            <input
                                                name="gig-file-cv"
                                                id="gig-file-cv"
                                                type="file"
                                                class="d-none"
                                                :accept="objectFile.type_accept"
                                                @change="onFileSelected"
                                                :disabled="isLoading"/>
                                        </label>
                                    </div>

                                    <div class="d-block mt-3 p-1 alert alert-warning" v-else>
                                        <small class="text-dark line-height">
                                            <i class="uil uil-exclamation-circle"></i>
                                            Solo se permite un máximo de <strong>3 archivos</strong>
                                        </small>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                    </div>

                    <div class="w-100 mt-3 text-center">
                        <b-button variant="primary" pill @click="update" v-if="isFirst">GUARDAR CAMBIOS</b-button>
                    </div>
                </b-col>
                <b-col cols="12" md="6" v-else>
                    <div class="punku-box">
                        <h3>Ya usaste tu opción de modificación de reserva</h3>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mx-auto justify-content-center" v-else>
                 <b-col cols="12" md="6" lg="6">
                    <b-jumbotron>
                        <h4>
                            La reservación de la clase <strong>{{classDetails.subject.title}}</strong>
                            el <strong>{{ moment(classDetails.date_start).lang("es").format('LLLL') }}</strong>
                            con el profesor <br> <span class="font-weight-bold text-capitalize">{{ classDetails.teacher.first_name }} {{ classDetails.teacher.last_name }}</span>
                            fue anulada exitosamente.
                        </h4>
                        
                        <router-link :to="{name: 'account.classes'}" class="btn btn-primary btn-sm">
                            <span>Volver a mis clases</span>
                        </router-link>
                    </b-jumbotron>
                 </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import headGig from '@/components/gigs/headGig'
import FileService from '@/services/file.service.js'
import calendarComponent from '@/components/calendar/calendarComponent'
import { mapActions } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import moment from 'moment'

import ClassesService from '@/services/classes.service';
import ablockPremium from '@/components/premium/ablockPremium';

export default {
    components: {
        ablockPremium,
        headGig,
        calendarComponent
    },
    data () {
        return {
            gigDetails: null,
            interaction: null,
            isLoadingGigDetails: true,
            classDetails: null,
            isLoading: true,
            showCalendar: true,
            isFirst: true,
            model: {
                date: [],
                group_class: false,
                observations: '',
                student_qt: 2,
                subject: "",
                files: []
            },
            objectFile: {
                isLoading: false,
                file: null,
                type_accept: '*',
                max_size: 2100581, //2MB
            },
            calendar: {
                weeks: ['Don','Lun','Mar','Min','Jue','Vie','Sab',],
                Months: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dev'],
            },
            type_reservations: [
                {
                    value: true,
                    title: 'Automatica',
                    text: 'La reserva son automaticas, no se requiere la confirmación del profesor.'
                },
                {
                    value: false,
                    title: 'Por confirmar',
                    text: 'La reserva de la clase se tiene que confirmar por el profesor.'
                }
            ]
        }
    },
    beforeMount () {
        ClassesService.getClassDetails(this.$route.params.id)
        .then((resp) => {
            this.classDetails = resp.classDetails
            this.model= {
                date: [],
                group_class: resp.classDetails.student_qt > 1,
                observations: resp.classDetails.observations,
                student_qt: resp.classDetails.student_qt,
                subject: resp.classDetails.subject,
                files_url: resp.classDetails.files_url,
                _id: resp.classDetails._id
            },
            this.isLoadingGigDetails = false
            this.isLoading = false
        })
        .catch(err => {
            this.$bus.emit("app-error")
        })
    },
    beforeDestroy() {
        this.reset()
    },
    filters: {
        nameFile (file) {
            try {
                const split = file.split('/')
                return decodeURI(split[split.length-1])
            } catch (e) {
                return 'SIN NOMBRE'
            }
        },
        datesEvents (value) {
            const count_events = value.length
            if (count_events)
                if (count_events == 1)
                    return `<small>${moment(value[0].start).format('MMM D, YYYY')}</small>
                            <small class="d-block">${moment(value[0].start).format('HH:00')}-${moment(value[0].start).add(1, 'hours').format('HH:00')}</small>`
                else
                    return `${count_events} clases`
            else
                return 'Sin definir'
        }
    },
    computed: {
        isRechazada () {
            if (!this.isLoadingGigDetails) 
                return this.classDetails.status == 'RECHAZADA'
            return false
        },
        maxFiles () {
            return this.model.files_url.length == 3
        },
        discount () {
            if (this.gigDetails && this.gigDetails.first_class_discount) {
                return this.interaction && this.interaction.first_class ? 0 : 0.5
            }
            return 0
        },
        is_my_gig () {
            return false
            // return this.user ? this.user._id == this.gigDetails.teacher.user._id : false
        },
        visible_resumen () {
            return this.model.date.length ? true : false
        },
        selectPrice () {
            return this.model.group_class ? this.gigDetails.fare_group : this.gigDetails.fare
        },
        price () {
            const nprice = this.model.group_class ? this.gigDetails.fare_group * this.model.student_qt : this.gigDetails.fare
            return nprice * this.model.date.length
        },
        type_reservation () {
            if (this.gigDetails)
                return this.gigDetails.auto_reservation ? this.type_reservations[0] : this.type_reservations[1]
            return null
        }
    },
    methods: {
        ...mapActions({
            switchClassState: 'auth/switchClassState',
            reserveClass: 'auth/reserveClass'
        }),
        emitDateEvents (date) {
            this.model.date = [...date]
        },
        removeDateEvent (index) {
            this.$refs.gigCalendar.events.splice(index, 1)
        },
        toggleCalendar () {
            this.showCalendar = !this.showCalendar
        },
        reset () {
            this.model= {
                date: null,
                group_class: false,
                student_qt: 2,
                observations: '',
                subject: ''
            }
        },
        datesd () {
            let length = this.model.date.length
            let dates = []
            for (let i = 0; i < length; i++) {
                delete this.model.date[i].remove
                delete this.model.date[i].uend
                delete this.model.date[i].uendh
                dates.push(this.model.date[i]);
            }
            return dates.filter((obj, index) => {
                if (dates[index].remove) {
                    return false
                }
                dates[index].uend = moment(dates[index].end.format('YYYY-MM-DD HH:mm'))
                dates[index].uendh = 1
                for (let i = index + 1; i < length; i++) {
                    if (dates[i].start.format('X') == dates[index].uend.format('X')) {
                        dates[index].uend = moment(dates[i].end.format('YYYY-MM-DD HH:mm'))
                        dates[index].uendh = dates[index].uendh + 1
                        dates[i].remove = true
                    }
                }
                return true
            });
        },
        displayDateEvent (date) {
            const moment_date = moment(date)
            return `
                <i class="uil uil-calender"></i>
                <span>${moment_date.format('MMM D, YYYY')}<strong class="d-block">${moment_date.format('HH:00')} - ${moment_date.add(1, 'hours').format('HH:00')}</strong>
                </span>
            `
        },
        onFileSelected (event) {
            this.objectFile.file = event.target.files[0];
            if (!FileService.isTypeAccept(this.objectFile.file['type'], this.objectFile.type_accept) && this.objectFile.type_accept != '*') {
                this.$bus.emit("notifications:push", { type: 'error', message: 'El formato es invalido, solo se permite PDF e imagenes PNG y JPG' })
            } else if (!(this.objectFile.file.size <= this.objectFile.max_size)) {
                this.$bus.emit("notifications:push", { type: 'warning', message: 'El máximo es de 2MB' })
            } else {
                this.objectFile.isLoading = true
                let formData = new FormData();
                formData.append('file', this.objectFile.file);
                formData.append('fileName', this.objectFile.file.name);
                formData.append('fileType', this.objectFile.file.type);
                FileService.upload(formData)
                .then(resp => {
                    this.model.files_url.push(resp.data.url)
                    event.target.value = null
                })
                .catch(err => {
                    this.$bus.emit("notifications:push", { type: 'error', message: 'Ocurrio un error inesperado' })
                })
                .finally(() => {
                    this.objectFile.isLoading = false
                })
            }
            event.target.value = null
        },
        removerFile (index) {
            this.$confirm({
                title: `¿Estás seguro de querer continuar?`,
                message: 'No podrá recuperar la información',
                button: { no: 'No', yes: 'Si'},
                callback: confirm => {
                    if (confirm) {
                        this.model.files_url.splice(index, 1)
                    }
                }
            })
        },
        update () {
            this.$v.model.$touch()
            if (!this.$v.model.$invalid) {
                this.isLoading = true
                ClassesService.updateReservation(this.model).then((resp) => {
                    this.$router.push({name: 'account.classes'})
                    this.$bus.emit("notifications:push", { type: 'dark', message: 'Se actualizo la reservación correctamente' })
                })
                .catch(err => {
                    this.$bus.emit("notifications:push", { type: 'error', message: 'Ocurrio un error al tratar de actualizar la reservación' })
                    this.isLoading = false
                })
            } else {
                this.$func.buzzing('#form-reservation-edit')
            }
        },
        removeClass () {
            this.$confirm({
                title: `¿Estás seguro de querer continuar?`,
                message: 'Al cancelar la reserva no podrá recuperarla.',
                button: { no: 'No', yes: 'Si'},
                callback: confirm => {
                    if (confirm) {
                        this.isLoading = true
                        this.switchClassState({status: 'RECHAZADA',id: this.classDetails._id, type: this.classDetails.status})
                        .then((resp) => {
                            this.classDetails.status = 'RECHAZADA'
                            this.isLoading = false
                            this.$bus.emit('refresh:diary')
                        })
                        .catch(message => {
                            this.$bus.emit("notifications:push", { type: 'error', message })
                        })
                    }
                }
            })
        },
    },
    validations: {
    	model: {
    		// date: {
    		// 	required,
			// 	minLength: minLength(1)
			// },
    		subject: {
    			required
            },
            observations: {
                minLength: minLength(20),
                maxLength: maxLength(500)
            }
    	}
    }
}
</script>


<style lang="scss">
    .gig-reservation__summary {
        position: -webkit-sticky;
        position: sticky;
        top: 15px;
    }
    .page-gig-show {
        position: relative;
        .calendar-component__info {
            display: none !important
        }
    }
    .gig-reservation__absolute {
        // transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        transition: all .3s;
        position: relative;
        width: 100%;
        z-index: 99;
        padding: 1rem;
    }
    @media screen and (min-width: 768px) {
        .gig-reservation__absolute {
            left: 0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 -1px 2px rgba(0, 0, 0, 0.24);
            position: fixed;
            bottom: -100;
            background: #FFF;
        }
    }
    .gig-reservation__absolute.show {
        bottom: 0;
    }
    .head-gig--sm .go-to-calendar,
    .head-gig--sm .teacher-price {
        display: none;
    }
</style>
