import Vue from 'vue'
import moment from 'moment'

Vue.filter('review_qt', (value) => {
    if (value > 1) {
        return value + ' clases dictadas'
    } else if (value == 1 ) {
        return value + ' clase dictada'
    } else {
        return 'Nuevo'
    }
})

Vue.filter('isVerific', (value) => {
    if (value && value.length) 
        return 'Documentado'
    return null
})

Vue.filter('auto_reservation', (value) => {
    return value ? 'Reserva Automática' : 'Reserva por confirmar'
})

Vue.filter('auto_reservation_split', (value) => {
    return value ? 'Automática' : 'Por confirmar'
})

Vue.filter('splitFullName', (value) => {
    return value.first_name.split(' ')[0] + ' ' + value.last_name.split(' ')[0]
})

Vue.filter('rangeDateClass', (value) => {
    let dates = value.split(',')
    const date_start = moment(dates[0])
    const date_end = moment(dates[1])
    if (date_end.format('LL') == date_start.format('LL')) {
        return `${date_start.locale('es').format('LL')}  ${date_start.locale('es').format('HH:00')}-${date_end.format('HH:00')}`
    }
    return `${date_start.format('DD/MM/YYYY HH:00')} - ${date_end.format('DD/MM/YYYY HH:00')}`
})