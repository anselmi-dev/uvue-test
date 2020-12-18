<template>
	<div class="teacher-create__step" :id="'teacher-create-'+index" :class="{'teacher-create__step-error': isError}">
    <div class="punku__title mb-0">
      Elije tus horarios disponibles <br> en que te gustaría enseñar
    </div>
    <div class="teacher-create__subtitle--muted mb-4 center">
      Asegúrate de estar disponible en las horas que eliges y mantén esta información siempre actualizada
    </div>
    <small class="invalid-feedback error" v-if="$v.model.schedule.$error">
      Debes seleccionar por lo menos un bloque
    </small>

    <gigCalendar
      :schedule="model.schedule"
      @update="onUpdateModel"
      ref="gigCalendar"/>

    <div class="teacher-create__subtitle--muted mb-4 center">
      ¿Estarás ausente unos días? Siempre podrás bloquear el rango de fechas que necesites en la opcion de "PunkuProfe / Mi disponibilidad
    </div>

    <small class="invalid-feedback error" v-if="$v.model.schedule.$error">
      Debes seleccionar por lo menos un bloque
    </small>

    <hr>

    <div class="punku__title">
      Tipo de reservación
    </div>

    <div class="teacher-create__moptions moptions--reservation">
        <div class="row">
            <div class="col-12 col-md-12">
                <label for="reservation-auto" style="max-width: 100%">
                    <input
                        type="radio"
                        name="reservation"
                        id="reservation-auto"
                        v-model="model.auto_reservation"
                        :value="true">
                    <div class="content">
                        <div class="content-img">
                            <img :src="require('@/assets/icons/pautomatica.svg')" alt="automatica.svg">
                        </div>
                        <div class="text">
                            <span>Automatica</span>
                            <p>
                                Al elegir esta opción, aceptas automáticamente la reserva de clase. Al alumno le llega confirmación inmediata, por lo que te recomendamos estar seguro de tus horarios disponibles
                            </p>
                        </div>
                    </div>
                </label>
            </div>
            <div class="col-12 col-md-12 flex-column-reverse">
                <label for="reservation-manual" style="max-width: 100%">
                    <input
                        type="radio"
                        name="reservation"
                        id="reservation-manual"
                        v-model="model.auto_reservation"
                        :value="false">
                    <div class="content flex-row-reverse flex-md-row">
                        <div class="content-img">
                            <img :src="require('@/assets/icons/pmanual.svg')" alt="manual.svg">
                        </div>
                        <div class="text">
                            <span>Reserva por Confirmar</span>
                            <p>
                                Al elegir esta opción, cada vez que un alumno reserve clase, te enviaremos una alerta para que confirmes la aceptación de la reserva de clase. Al alumno no le llega ninguna confirmación, hasta que tú realices este proceso, por lo que te recomendamos estar atento a las notificaciones y a tu tablero de Mis Clases para que no pierdas ninguna reserva.
                            </p>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    </div>


    <div class="teacher-create__actions" v-if="!$v.model.$invalid" v-show="isVisible">
      <button @click="next">
        Siguiente
      </button>
    </div>
  </div>
</template>

<script>
import teacherCreate from '@/mixins/teacherCreate'
import gigCalendar from '@/components/gigs/gigCalendar'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [teacherCreate],
  components: {
    gigCalendar
  },
  data() {
    return {
      model: {
        schedule: [],
        auto_reservation: true,
      },
      isFirst: true,
    };
  },
  computed: {
    isError () {
      return this.$v.model.$error
    }
  },
  watch: {
    model: {
      deep: true,
      handler () {
        if (!this.isFirst) {
          if (!this.$v.model.$invalid) {
            this.updateStep(this.model)
          } else {
            this.updateStep({error: 'teacher-create-' + this.index})
          }
        }
      }
    },
  },
  methods: {
    onUpdateModel (newData) {
      this.model.schedule = newData
    },
    next () {
      this.$v.model.$touch()
      if (!this.$v.model.$invalid) {
        this.isFirst = false
        this.nextStep(this.model)
      }
    }
  },
  validations: {
    model: {
      auto_reservation: { required },
      schedule: {
        required,
        minLength: minLength(1)
      }
    }
  }
};
</script>
