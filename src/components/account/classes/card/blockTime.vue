<template>
    <div class="ablock-event__itop">
        <b-row class="row--xs">
            <b-col cols="auto" class="my-1" v-if="!isShowLinkClass">
                <b-badge variant="light" pill class="break-spaces date">
                    <span>
                        <i class="uil uil-clock"></i>
                        {{ `${data.date_start},${data.date_end}` | rangeDateClass }}
                    </span>
                </b-badge>
            </b-col>
            <b-col cols="auto" class="my-1" v-else>
                <a  name="joinclass"
                    @click="joinClass()"
                    class="btn btn-success btn-xs btn-pill">
                    <i class="uil uil-external-link-alt"></i>
                    <span>ENTRAR A LA CLASE</span>
                </a>
            </b-col>
            <slot name="countdown">
                <b-col cols="auto" class="my-1" v-if="showCountDown">
                    <small class="text-muted ml-1">{{ countdown | labelCountDown }}</small>
                </b-col>
            </slot>
        </b-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
        data: {
            required: true,
            type: Object
        },
        countdown: {
            required: false,
            default: null
        }
    },
    data () {
        return {
            isFirst: true
        }
    },
    // watch: {
    //     countdown (newValue) {
    //         if (newValue && this.isFirst) {
    //             if ((newValue.seconds < 30 && newValue.hours == 0 && newValue.days == 0) && this.isStatus('PENDIENTE')) {
    //                 this.$emit('changeStatus', 'RECHAZADA')
    //                 this.isFirst = false
    //             }
    //         }
    //     }
    // },
    beforeMount() {
    },
    computed: {
        showCountDown () {
            if (this.countdown)
                return (this.countdown.days > 0 || this.countdown.hours > 0 || this.countdown.minutes > 10) && this.isStatus('CONFIRMADA') && !this.isShowLinkClass
            return false
        },
        isShowLinkClass () {
            if (this.countdown)
                if ((this.countdown.days == 0 && this.countdown.hours == 0 && this.countdown.minutes <= 10) && this.isStatus('CONFIRMADA'))
                    return true
                else if ((this.countdown.days < 0 && this.countdown.hours < 0) && this.isStatus('CONFIRMADA'))
                    return true
            return false
        }
    },
    filters: {
        labelCountDown (value) {
            if (value) {
                if (value.days > 0) {
                    return `Faltan ${value.hours > 6 ? value.days + 1 : value.days} días para que inicie` 
                } else {
                    if (value.hours > 0) {
                        return `Faltan ${value.hours} ${value.hours > 1 ? 'horas' : 'hora'} y ${value.minutes} minutos para que inicie`
                    } else {
                        if (value.minutes) {
                            return `Falta ${value.minutes} minutos para que inicie`
                        }
                    }
                }
            }
            return value
        }
    },
    methods: {
        joinClass () {
            this.$bus.emit('class:join:'+this.data._id)
        },
        /**
         * Compara el estado con el actual de la clase
         *
         * @param   {String}  status  [status description]
         * @return  {Boolean}
         */
        isStatus (status) {
            return this.data.status == status
        },
    }
}
</script>