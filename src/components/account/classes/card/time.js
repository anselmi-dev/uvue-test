export default {
    methods: {
    },
    filters: {
        showCountDown (value) {
            if (value) {
                if (value.days) {
                    return `Comienza en ${value.days} días`
                } else {
                    if (value.hours) {
                        return `Comienza en ${value.hours} horas`
                    } else {
                        if (value.minutes) {
                            return `Comienza en ${value.minutes} minutos`
                        }
                    }
                }
            }
            return value
        },
    }
}