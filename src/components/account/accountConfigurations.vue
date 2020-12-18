<template>
    <div>
        <!-- <b-row class="align-items-center mb-4">
            <b-col cols="auto">
                Desactivar cuenta en Punku
            </b-col>
            <b-col>
                <accountDeactivate/>
            </b-col>
        </b-row> -->
        <b-row class="align-items-center mb-4">
            <b-col cols="auto">
                ¿Quieres darte de baja en Punku?
            </b-col>
            <b-col>
                <unsubscribePunku/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import unsubscribePunku from '@/components/auth/unsubscribePunku'

export default {
    components: {
        unsubscribePunku
    },
    methods: {}
}
</script>
