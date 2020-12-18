<template>
    <div>
        <div class="account-content__title">
            <span>Configuraciones</span>
        </div>
        <div class="accout-tabs">
            <b-tabs content-class="mt-3">
                <b-tab title="Seguridad">
                    <b-row class="align-items-center">
                        <b-col cols="auto">
                            Desactivar cuenta en Punku
                        </b-col>
                        <b-col>
                            <unsubscribePunku/>
                        </b-col>
                    </b-row>
                </b-tab>
            </b-tabs>
        </div>
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
