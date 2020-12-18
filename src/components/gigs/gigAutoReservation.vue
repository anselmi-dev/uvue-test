<template>
    <div
        class="teacher-reserve__type">
        <span class="mb-2">Tipo reserva: </span>
        <span class="text-letf font-weight-bold">
            {{ auto_reservation | auto_reservation_split }}
        </span>
        <span class="d-block my-1 pt-1 border-top h7 text-muted">
            {{
                auto_reservation ?
                'La reserva son automaticas, no se requiere la confirmación del profesor.' :
                'La reserva de la clase se tiene que confirmar por el profesor.' 
            }}
        </span>

        <span
            class="d-none"
            v-b-tooltip.hover
            :title="
            auto_reservation ?
            'La reserva son automaticas, no se requiere la confirmación del profesor.' :
            'La reserva de la clase se tiene que confirmar por el profesor.'
            "
        >
            <i class="uil uil-question-circle"></i>
        </span>
    </div>
</template>

<script>
export default {
    props:  {
        auto_reservation: {
            requiere: false,
            value: true
        }
    }
}
</script>