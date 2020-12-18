<template>
    <div class="gig-reservation" v-if="!isLoadingGigDetails">
        <loading :active.sync="isLoading" :is-full-page="false"></loading>
        <b-container>
            <b-row class="mx-auto justify-content-center">
                <b-col cols="12" md="10" lg="10" class="mx-auto">
                    <div class="gig-reservation__header">
                        <head-gig :gig="gigDetails" :discount="discount" class="head-gig--sm"/>
                    </div>
                </b-col>
                <b-col cols="12" md="10" lg="6">
                    <div class="teacher-reserve__calender punku-box mt-3">
                        <h4><i class="uil uil-book-reader"></i> Selecciona tu tipo de clase</h4>
                        <b-row class="align-items-center">
                            <b-col cols="12">
                                <b-form-group class="mb-2 mt-2">
                                  <b-form-radio-group
                                    v-model="model.group_class"
                                    stacked
                                    name="group_class">
                                    <b-form-radio :value="false">
                                        <p class="h5">
                                            <strong>Individual</strong> <br>
                                            <strong class="text-danger" :inner-html.prop="gigDetails.fare | currencySolHr"></strong>
                                        </p>
                                    </b-form-radio>
                                  </b-form-radio-group>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12" v-if="gigDetails.group_class">
                                <b-row>
                                    <b-col cols="auto">
                                        <b-form-group class="mb-2 mt-2">
                                            <b-form-radio-group
                                                v-model="model.group_class"
                                                stacked
                                                name="group_class">
                                                <b-form-radio :value="true" stacked>
                                                    <p class="h5">
                                                        <strong>Grupal</strong>
                                                        <br>
                                                        <strong class="text-danger" :inner-html.prop="gigDetails.fare_group | currencySolHr"></strong>
                                                        <br>
                                                        <small class="text-muted">Precio por persona</small>
                                                    </p>
                                                </b-form-radio>
                                            </b-form-radio-group>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="auto" class="align-self-center">
                                        <div class="group-control" v-if="model.group_class">
                                            <select class="form-control" v-model="model.student_qt">
                                                <option value="2">2 personas</option>
                                                <option value="3">3 personas</option>
                                                <option value="4">4 personas</option>
                                                <option value="5">5 personas</option>
                                            </select>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </div>

                    <div class="teacher-reserve__calender punku-box mt-3" :class="{'teacher-create__step-error': $v.model.subject.$error}">
                        <b-row>
                            <b-col cols="12" class="d-flex align-items-center flex-wrap">
                                <h4 class="mr-2 mb-0"><i class="uil uil-book"></i>  Selecciona tema</h4>
                                <select class="form-control" :class="{'is-invalid': $v.model.subject.$error }" style="width: auto;" v-model="model.subject">
                                    <option value="">Sin selección</option>
                                    <option v-for="(item, index) in gigDetails.subject" :key="index" :value="item">
                                        {{ item.title }}
                                    </option>
                                </select>
                            </b-col>
                            <b-col cols="12">
                                <h5>
                                    <small class="invalid-feedback d-block" v-if="$v.model.subject.$error">
                                        <i class="uil uil-exclamation-triangle"></i> <strong>Debe elegir un tema para continuar.</strong>
                                    </small>
                                </h5>
                            </b-col>
                        </b-row>
                    </div>

                    <div class="teacher-reserve__calender punku-box mt-3">
                        <b-row>
                            <b-col cols="12">
                                <h4>
                                    <i class="uil uil-notes"></i> Ingresa observaciones para tu clase <small class="text-muted">(opcional)</small>
                                </h4>
                                <span>Aquí puedes dejar mayor detalle del tema que deseas tratar</span>
                                <textarea-autosize
                                    :max-height="150"
                                    maxlength="2000"
                                    class="form-control mt-2"
                                    v-model="model.observations"
                                    placeholder="Estas observaciones son para el profesor."
                                />
                            </b-col>
                        </b-row>
                    </div>

                    <div class="teacher-reserve__calender punku-box mt-3">
                        <b-row>
                            <b-col cols="12" class="position-relative">
                                <h4>
                                    <i class="uil uil-file-share-alt"></i> Adjunta un archivo para tu clase <small class="text-muted">(opcional)</small>
                                </h4>
                                <p class="d-block text-muted"> Los archivos seran visible para el profesor </p>
                                <div class="teacher-cv__content" v-if="model.files.length">
                                    <div class="d-flex" v-for="(file, index) in model.files" :key="index">
                                        <a :href="file" target="_blank" class="teacher-cv__link text-truncate">
                                            <i class="ipunku-paperclip"></i>
                                            {{ file | nameFile }}
                                        </a>
                                        <button class="btn btn-sm text-danger p-0 ml-auto" @click="removerFile(index)">
                                            Remover
                                        </button>
                                    </div>
                                </div>
                                <div class="d-block mt-3" v-if="model.files.length < 4">
                                    <loading
                                        :active.sync="objectFile.isLoading" :is-full-page="false"></loading>
                                    {{
                                        !model.files.length ?
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
                            </b-col>
                        </b-row>
                    </div>

                    <div class="teacher-reserve__calender punku-box mt-3" :class="{'teacher-create__step-error': $v.model.date.$error}">
                        <b-row>
                            <b-col>
                                <h4>
                                    <small class="invalid-feedback d-block" v-if="$v.model.date.$error">
                                        <i class="uil uil-exclamation-triangle"></i> <strong>Debe elegir por lo menos una clase para continuar.</strong>
                                    </small>
                                    <i class="uil uil-schedule"></i>
                                    {{ showCalendar ? 'Selecciona horario para tu clase' : 'Horas seleccionadas'}}
                                </h4>
                            </b-col>
                            <!-- <b-col cols="auto">
                                <button class="btn btn-sm btn-dark" @click="toggleCalendar">
                                    <i class="uil uil-calendar-alt"></i>
                                    {{ showCalendar ? 'Resumen': 'Calendario'}}
                                </button>
                            </b-col> -->
                        </b-row>
                        <div class="pb-2 mb-2 border-bottom">
                            <h5 class="mb-0">
                                Tipo de reservación: 
                                <b-badge variant="light" pill class="font-weight-bold">
                                    {{ type_reservation.title }}
                                </b-badge>
                            </h5>
                            <span class="text-muted">
                                {{ type_reservation.text }}
                            </span>
                        </div>
                        <!-- <div v-show="showCalendar" class="gig-reservation__calendar"> -->
                        <div class="gig-reservation__calendar">
                            <calendarComponent
                                ref="gigCalendar"
                                :teacher_id="gigDetails.teacher.user._id"
                                @emitDateEvents="emitDateEvents"
                                :vacations="gigDetails.teacher.vacation"
                                :schedule="gigDetails.teacher.schedule"/>
                        </div>
                        <!-- <div v-show="!showCalendar">
                            <div class="alert alert-danger alert--app" v-if="!model.date.length">
                                <div class="icon">
                                    <i class="uil uil-exclamation-triangle"></i>
                                </div>
                                <div class="content">
                                    Debe seleccionar por lo menos un horario para su clase.
                                </div>
                            </div>
                            <b-row class="row--sm">
                                <b-col cols="auto" v-for="(item, index) in model.date" :key="index">
                                    <h5>
                                        <span class="badge badge-light m-1 d-flex">
                                            <span v-html="displayDateEvent(item.start)" class="d-flex text-left"></span>
                                                <i class="uil uil-multiply cursor-pointer" @click="removeDateEvent(index)"></i>
                                            </span>
                                        </span>
                                    </h5>
                                </b-col>
                            </b-row>
                        </div> -->
                    </div>
                </b-col>
                <b-col cols="12" md="10" lg="4">
                    <div class="gig-reservation__summary punku-box mt-3">
                        <h4>Resumen de tu reserva</h4>

                        <div class="d-flex align-items-center justify-content-space-between my-2 py-1 border-bottom">
                            <strong>Tema de la clase:</strong>
                            <span class="text-muted">{{ model.subject ? model.subject.title : 'Aun sin tema'}}</span>
                        </div>

                        <div class="my-2 py-1 border-bottom px-2">
                            <div class="d-flex align-items-center justify-content-space-between mb-1 ">
                                <span class="text-muted" v-if="!model.date.length">Sin elegir</span>
                                <strong class="d-block text-right">
                                    Horas ({{model.date.length}})
                                </strong>
                            </div>
                            <div>
                                <div
                                    class="d-flex justify-content-space-between mt-1 pt-1"
                                    v-for="(item, index) in datesd()"
                                    :key="index">
                                    <span class="d-flex">
                                        <!-- <span
                                            v-html="displayDateEvent(item.start)"
                                            class="d-flex text-left"></span> -->
                                        <!-- <i class="uil uil-multiply cursor-pointer" @click="removeDateEvent(index)"></i> -->
                                        <span>
                                            <span class="text-capitalize">{{item.start.locale('es').format('MMM D, YYYY')}}</span>
                                            <strong class="d-block">{{item.start.format('HH:00')}}-{{item.uend.format('HH:00')}}</strong>
                                        </span>
                                        <!-- <i class="uil uil-calender"></i> -->
                                    </span>
                                    <span class="d-block text-danger">{{ item.uendh > 1 ? `${item.uendh} horas` : `1 hora`}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex align-items-center justify-content-space-between my-2 py-1 border-bottom">
                            <span>
                                <span class="d-block text-muted">{{ selectPrice | currencySol }} x <strong>{{ model.date.length > 1 ? `${model.date.length} horas` : `${model.date.length} hora` }}</strong>   </span>
                            </span>
                            <strong class="text-danger font-weight-bold mb-0 text-right">
                                {{ priceHours | currencySol }}
                            </strong>
                        </div>

                        <div class="d-flex align-items-center justify-content-space-between my-2 py-1 border-bottom" v-if="model.student_qt > 1">
                            <span>
                                <span class="d-block text-muted">
                                    {{ priceHours | currencySol }} x <strong>{{ model.student_qt > 1 ? `${model.student_qt} estudiantes` : `${model.student_qt} estudiante` }}</strong>
                                </span>
                            </span>
                            <strong class="text-danger font-weight-bold mb-0 text-right">
                                {{ price | currencySol }}
                            </strong>
                        </div>

                        <div class="d-flex align-items-center justify-content-space-between my-2 py-1 border-bottom" v-if="model.date.length">
                            <span>
                                <strong>
                                    Total
                                    <i v-if="discount"
                                        v-b-tooltip.hover title="El descuento solo se aplicará al primer bloque de hora"
                                        class="uil uil-question-circle"></i>
                                </strong>
                                <span class="d-block text-muted h8">
                                    <div class="d-flex flex-wrap align-items-center justify-content-space-between" v-if="discount">
                                        Descuento 1ª clase 50%
                                    </div>
                                </span>
                            </span>
                            <strong class="text-danger font-weight-bold h4 mb-0 text-right">
                                <label class="d-block" v-if="discount && price">
                                    <span>
                                        <del>{{ price | currencySol }}</del>
                                    </span>
                                </label>
                                <span>
                                    {{ price - (priceSelect * discount) | currencySol }}
                                </span>
                            </strong>
                        </div>

                        <div class="mx-auto text-center w-100">
                            <button class="btn btn-danger btn-pill px-5 mt-2" @click="reserve">RESERVAR</button>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import headGig from '@/components/gigs/headGig'
import FileService from '@/services/file.service.js'
import GigsFilterService from '@/services/gigs-filter.services'
import calendarComponent from '@/components/calendar/calendarComponent'
import { mapActions } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
import moment from 'moment'
// moment.locale('es-ES')

export default {
    components: {
        headGig,
        calendarComponent
    },
    data () {
        return {
            gigDetails: null,
            interaction: null,
            isLoadingGigDetails: true,
            isLoading: true,
            showCalendar: true,
            model: {
                date: [],
                group_class: false,
                observations: '',
                student_qt: 1,
                subject: "",
                files: [],
                subject_label: ""
            },
            objectFile: {
                isLoading: false,
                file: null,
                // type_accept: 'image/png, image/jpeg, application/pdf, text/plain',
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
        GigsFilterService.getGigDetails(this.$route.params.slug)
        .then((gig) => {
            this.gigDetails = gig.gigDetails
            this.interaction = gig.interaction
            this.isLoadingGigDetails = false
            this.isLoading = false
        })
        .catch(err => {
            this.$bus.emit("app-error")
        })
    },
    beforeDestroy() {
        this.reset()
        localStorage.removeItem('reserve_dates');
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
    watch: {
        'model.group_class' (newValue, oldValue) {
            if (newValue == true && oldValue == false) {
                this.model.student_qt = 2
            } else {
                this.model.student_qt = 1
            }
        },
    },
    computed: {
        discount () {
            if (this.gigDetails && this.gigDetails.first_class_discount) {
                return this.interaction && this.interaction.first_class ? 0 : 0.5
            }
            return 0
        },
        is_my_gig () {
            return this.user ? this.user._id == this.gigDetails.teacher.user._id : false
        },
        visible_resumen () {
            return this.model.date.length ? true : false
        },
        selectPrice () {
            return this.model.group_class ? this.gigDetails.fare_group : this.gigDetails.fare
        },
        priceSelect () {
            return this.model.group_class ? this.gigDetails.fare_group : this.gigDetails.fare
        },
        priceHours () {
            const nprice = this.model.group_class ? this.gigDetails.fare_group : this.gigDetails.fare
            return nprice * this.model.date.length
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
        ...mapActions({ reserveClass: 'auth/reserveClass' }),
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
        reserve () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.isLoading = true
                this.reserveClass({
                    teacher: this.gigDetails.teacher.user._id,
                    gig: this.gigDetails._id,
                    gig_title: this.gigDetails.title,
                    group_class: this.model.group_class,
                    auto_reservation: this.gigDetails.auto_reservation,
                    dates: this.model.date,
                    observations: this.model.observations,
                    subject: this.model.subject._id,
                    subject_label: this.model.subject.title,
                    files: this.model.files,
                    student_qt: parseInt(this.model.student_qt)
                }).then(resp => {
                    this.$router.push({name: 'gig.reservation.complete', params: { slug: this.gigDetails.slug, id: resp[0]._id } })
                })
                .catch(err => {
                    this.$bus.emit("notifications:push", { title: 'Ups!', type: 'error', message: err })
                    this.isLoading = false
                })
            } else
                this.$bus.emit("notifications:push", { type: 'error', message: 'Complete los campos para continuar' })
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
            // if (!FileService.isTypeAccept(this.objectFile.file['type'], this.objectFile.type_accept)) {
                // this.$bus.emit("notifications:push", { type: 'error', message: 'El formato es invalido, solo se permite PDF e imagenes PNG y JPG' })
            if (!(this.objectFile.file.size <= this.objectFile.max_size)) {
                this.$bus.emit("notifications:push", { type: 'warning', message: 'El máximo es de 2MB' })
            } else {
                this.objectFile.isLoading = true
                let formData = new FormData();
                formData.append('file', this.objectFile.file);
                formData.append('fileName', this.objectFile.file.name);
                formData.append('fileType', this.objectFile.file.type);
                FileService.upload(formData)
                .then(resp => {
                    this.model.files.push(resp.data.url)
                    event.target.value = null
                })
                .catch(err => {
                    this.$bus.emit("notifications:push", { type: 'error', message: 'Ocurrio un error inesperado' })
                })
                .finally(() => {
                    this.objectFile.isLoading = false
                })
            }
        },
        removerFile (index) {
            this.$confirm({
                title: `¿Estás seguro de querer continuar?`,
                message: 'No podrá recuperar la información',
                button: { no: 'No', yes: 'Si'},
                callback: confirm => {
                    if (confirm) {
                        this.model.files.splice(index, 1)
                    }
                }
            })
        },
    },
    validations: {
    	model: {
    		date: {
    			required,
				minLength: minLength(1)
			},
    		subject: {
    			required
			},
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
