<template>
    <div class="teacher-languages">
        <loading :active.sync="isLoading" :is-full-page="false"></loading>

        <div class="title">
            Tipo de Reserva
            <actions @actionEdit="edit"/>
        </div>

        <div v-if="!disabled">
            <span class="d-block">
                {{ selected.title }}
            </span>
            <small class="text-muted">
                {{ selected.text }}
            </small>
        </div>

        <div v-else>
            <div class="row">
                <div class="col-12 col-md-6" v-for="(m, index) in modalidades">
                    <label :for="'reservation-'+index" class="d-flex flex-wrap align-items-center">
                        <input
                            type="radio"
                            :name="'reservation-'+index"
                            :id="'reservation-'+index"
                            v-model="modelEdit"
                            class="mr-1"
                            :value="m.value">
                        <span class="h6 mb-0">{{ m.title }}</span>
                        <hr>
                        <p>{{ m.text }} </p>
                    </label>
                </div>
            </div>

            <actions
                v-if="disabled"
                @actionCancel="cancel"
                @actionUpdate="update"
                :isEdit="disabled"
            />
        </div>
	</div>
</template>

<script>
import gigEdit from '@/mixins/gig.edit'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    mixins: [gigEdit],
    data () {
        return {
            modalidades: [
                {
                    value: true,
                    title: 'Automatica',
                    text: 'Al elegir esta opción, aceptas automáticamente la reserva de clase. Al alumno le llega confirmación inmediata, por lo que te recomendamos estar seguro de tus horarios disponibles.'
                },
                {
                    value: false,
                    title: 'Por confirmar',
                    text: 'Al elegir esta opción, cada vez que un alumno reserve clase, te enviaremos una alerta para que confirmes la aceptación de la reserva de clase.'
                }
            ]
        }
    },
    computed: {
        selected () {
            return this.modelInitial ? this.modalidades[0] : this.modalidades[1]
        }
    },
    methods: {
        getDataFormat () {
            return {
                auto_reservation: this.modelEdit
            }
        }
    },
    validations: {
        modelEdit: { required }
    }
}
</script>
