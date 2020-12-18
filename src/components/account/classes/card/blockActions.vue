<template>
    <div class="ablock-event__iactions" style="display: flex; height: fit-content;">
        <!-- <button class="btn"><i class="uil uil-ellipsis-v"></i></button> -->
        <b-dropdown variant="'none'" right>
            <template #button-content >
                <i class="uil uil-ellipsis-v"></i>
            </template>
            <!-- Todos pueden ver el anuncio si existe. -->
            <b-dropdown-item
                v-if="actionGoGig"
                :to="{name: 'gig.show', params: { slug: data.gig.slug }}">
                <i class="uil uil-external-link-alt"></i> Ver anuncio
            </b-dropdown-item>
            <!-- Solo el profesor puede confirmar la reserva y, además la reserva no debe pasar el tiempo de inicio. -->
            <b-dropdown-item
                v-if="actionSetConfirmation"
                @click="changeStatus('CONFIRMADA')">
                <i class="uil uil-check-square"></i> Confirmar
            </b-dropdown-item>
            <!-- Todos pueden ver los detalles. -->
            <b-dropdown-item
                v-if="actionGetObservations"
                @click="showObservations">
                <i class="uil uil-check-circle"></i> Observaciones
            </b-dropdown-item>
            
            <b-dropdown-item
                v-if="actionGetDetails"
                :to="{name: 'class.reservation.show', params: {id}}">
                <i class="uil uil-edit-alt"></i> Detalles
            </b-dropdown-item>
            <!-- Enlace se muestra si no es profesor, no está finalizada y debe estar 10min antes de la clase. -->
            <b-dropdown-item
                v-if="actionEdit"
                :to="{name: 'gig.reservation.edit', params: {id}}">
                <i class="uil uil-edit-alt"></i> Editar
            </b-dropdown-item>
            <!-- Solo el estudiante puede anular la reserva. -->

            <!-- Solo el profesor podrá verlo -->
            <b-dropdown-item
                v-if="actionRemove"
                @click="remove"
                >
                <i class="uil uil-times-circle"></i> Rechazar
            </b-dropdown-item>

            <!-- Solo el alumno puede verlo -->
            <b-dropdown-item
                v-if="actionReview"
                @click="requestReview">
                <i class="uil uil-check-square"></i> Calificar
            </b-dropdown-item>
        </b-dropdown>
        
        <b-dropdown variant="danger" right>
            <template #button-content >
                <i class="uil uil-setting"></i>
            </template>
            <b-dropdown-item @click="changeStatus('PENDIENTE')">
                <i class="uil uil-check-square"></i> Pendiente
            </b-dropdown-item>
            <b-dropdown-item @click="changeStatus('CONFIRMADA')">
                <i class="uil uil-check-square"></i> Confirmar
            </b-dropdown-item>
            <b-dropdown-item @click="changeStatus('FINALIZADA')">
                <i class="uil uil-check-square"></i> Recibida
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import time from './time'
import moment from 'moment'

export default {
    data () {
        return {
            countdown: null
        }
    },
    mixins: {
        time
    },
    props: {
        data: {
            required: true,
            type: Object
        }
    },
    computed: {
        id () {
            return this.data._id
        },
        isTeacher () {
            return this.user.teacher && (this.user.teacher._id == this.data.gig.teacher)
        },
        isNotStarted () {
            return  !(moment().format('DD/MM/YYYY HH:mm') > moment(this.data.date_end).format('DD/MM/YYYY HH:mm'))
        },
        actionGoGig () {
            return !this.isStatus('CONFIRMADA') && !this.isTeacher
        },
        actionGetObservations () {
            return !this.isStatus('FINALIZADA')
        },
        actionSetConfirmation () {
            return this.isStatus('PENDIENTE') && this.isTeacher
        },
        actionGetDetails () {
            return this.isStatus('FINALIZADA')
        },
        actionEdit () {
            return this.data.student[0]._id == this.user._id && !this.isStatus('FINALIZADA') && !this.isTeacher
        },
        actionRemove () {
            return this.isTeacher && this.isStatus('PENDIENTE')
        },
        actionReview () {
            return !this.isTeacher && this.isStatus('FINALIZADA')
        }
    },
    methods: {
        changeStatus (status) {
            this.$emit('changeStatus', status)
        },
        /**
         * Rechazar la clase. Solo el profesor puede hacer esta solicitud
         * @return  {Void}
         */
        remove () {
            this.$confirm({
                title: `¿Estás seguro de querer continuar?`,
                message: 'Al cancelar la reserva no podrá recuperarla.',
                button: { no: 'No', yes: 'Si'},
                callback: confirm => {
                    if (confirm) {
                        this.$emit('changeStatus', 'RECHAZADA')
                    }
                }
            })
        },
        showObservations () {
            this.$bus.$emit('classes:observaciones', this.data)
        },
        requestReview () {
            this.$bus.emit('classes:modal_request_review', this.data)
        },
        /**
         * Compara el estado con el actual de la clase
         *
         * @param   {String}  status  [status description]
         * @return  {Boolean}
         */
        isStatus (status) {
            return this.data.status == status
        }
    }
}
</script>