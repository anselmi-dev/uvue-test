<template>
    <div class="class-card">
        <div class="ablock-event" v-if="load">
            <loading :active.sync="isLoading" :is-full-page="false"></loading>
            <slot name="eventDate">
                <blockDate
                    @changeStatus="changeStatus"
                    :data="item"
                    :class="'bg-'+variant"/>
            </slot>
            
            <div class="ablock-event__info">
                <blockTime
                    @changeStatus="changeStatus"
                    :data="item"
                    :countdown="countdown"/>
                <slot name="ibottom">
                    <blockInfo :data="item"/>
                </slot>
            </div>

            <slot name="actions">
                <blockActions
                    @changeStatus="changeStatus"
                    :data="item"/>
            </slot>
        </div>
        <blockLoading v-else />
    </div>
</template>

<script>
import ClassesService from '@/services/classes.service'
import blockDate from './card/blockDate'
import blockActions from './card/blockActions'
import blockInfo from './card/blockInfo'
import blockTime from './card/blockTime'
import blockLoading from './card/blockLoading'

import { mapActions } from 'vuex'
import time from './card/time'
import moment from 'moment'

const getTime = dateTo => {
    let now = new Date(),
        time = (new Date(dateTo) - now + 1000) / 1000,
        seconds = ('0' + Math.floor(time % 60)).slice(-2),
        minutes = ('0' + Math.floor(time / 60 % 60)).slice(-2),
        hours = ('0' + Math.floor(time / 3600 % 24)).slice(-2),
        days = Math.floor(time / (3600 * 24));

    return {
        seconds,
        minutes,
        hours,
        days,
        time
    }
};


export default {
    components: {
        blockDate,
        blockTime,
        blockInfo,
        blockActions,
        blockLoading
    },
    mixins: {
        time
    },
    props: {
        item: {
            required: true,
            type: Object
        }
    },
    computed: {
        variant () {
            if (this.isStatus('CONFIRMADA'))
                return 'primary'
            else if (this.isStatus('PENDIENTE'))
                return 'warning'
            else if (this.isStatus('FINALIZADA'))
                return 'success'
            else
                return 'dark'
        }
    },
    data () {
        return {
            load: false,
            isLoading: false,
            countdown: null
        }
    },
    beforeMount () {
        this.$bus.on('class:change-status:'+this.item._id, (status) => {
            this.changeStatus(status)
        })

        this.$bus.on('class:loanding:'+this.item._id, (status) => {
            this.isLoading = status
        })

        this.$bus.on('class:join:'+this.item._id, () => {
            this.joinClass()
        })

        const date_start = this.item.date_start
        const date_end = this.item.date_end

        // Si es pendiente y si la hora de inicio es mayor o igual a la hora actual + 30min.
        const timerUpdate = setInterval( () => {
            this.validation()
            const newtime = getTime(date_start);
            this.countdown = newtime
            this.load = true
            if (newtime.time <= 1) {
                clearInterval(timerUpdate);
            }
        }, 1000);
    },
    beforeDestroy () {
        this.$bus.off('class:join:'+this.item._id, () => {})
        this.$bus.off('class:change-status:'+this.item._id, () => {})
        this.$bus.off('class:loanding:'+this.item._id, () => {
            this.isLoading = false
        })
    },
    methods: {
        ...mapActions({
            switchClassState: 'auth/switchClassState',
            switchClassTeacherState: 'auth/switchClassTeacherState'
        }),
        /**
         * Enlace para entrar a la clase
         *
         * @return  {Void}
         */
        joinClass () {
            this.$confirm({
                title: 'Seras dirigido al Aula Virtual en breve.',
                message: 'Por favor espere...',
                button: { yes: 'Entendido'},
                callback: confirm => {}
            })

            ClassesService.joinClassroom(this.item._id)
                .then(resp => {
                    console.log(resp.data)
                    if(resp.data.ok == true){
                        window.open(resp.data.urlClassroom, "_blank");
                    } else {
                        this.$confirm({
                            title: 'Ups!',
                            message: resp.data.err,
                            button: { yes: 'Entendido'},
                            callback: confirm => {
                            }
                        })
                    }
                },
                error => {
                    console.log(error)
                })
        },

        validation () {
            // Si es pendiente y si la hora de inicio es mayor o igual a la hora actual + 30min.
            // if (this.isStatus('PENDIENTE') && (moment().add(0,'minutes').format('DD/MM/YYYY HH:mm') > moment(this.item.date_start).format('DD/MM/YYYY HH:mm')))
            //     this.changeStatus('RECHAZADA')
            // else if (this.isStatus('CONFIRMADA') && (moment().format('DD/MM/YYYY HH:mm') > moment(this.item.date_end).format('DD/MM/YYYY HH:mm'))) {
            //     this.changeStatus('FINALIZADA')
            // }
        },
        /**
         * Compara el estado con el actual de la clase
         *
         * @param   {String}  status
         * @return  {Boolean}
         */
        isStatus (status) {
            return this.item.status == status
        },
        /**
         * Cambia el estado
         *
         * @param   {String}  status 
         */
        changeStatus (status) {
            this.isLoading = true
            if (this.isTeacher) {
                this.switchClassTeacherState({status, id: this.item._id, type: this.item.status})
                .then((resp) => {})
                .catch(message => {
                    // this.$bus.emit("notifications:push", { type: 'error', message })
                })
                .finally(() => {
                    this.$bus.emit('refresh:diary')
                    resetAllClass: 'auth/resetAllClass',
                    this.isLoading = false
                })
            } else {
                this.switchClassState({status, id: this.item._id, type: this.item.status})
                .then((resp) => {})
                .catch(message => {
                    // this.$bus.emit("notifications:push", { type: 'error', message })
                })
                .finally(() => {
                    this.$bus.emit('refresh:diary')
                    resetAllClass: 'auth/resetAllClass',
                    this.isLoading = false
                })
            }
        }    
    }
}
</script>