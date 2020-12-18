<template>
  <div class="gig-reserve">
    <div class="title">
      Disponibilidad
      <actions @actionEdit="editSchedule"/>
    </div>
    <gigCalendar
      v-if="modelInitial"
      ref="gigCalendar"
      :schedule="modelInitial"/>
    <small
        class="invalid-feedback error py-2" v-if="$v.modelEdit.$error">
        Debe seleccionar por lo menos un horario
    </small>
    <actions
      @actionCancel="calcelSchedule"
      @actionUpdate="editSchedule"
      :isEdit="true"
    />
  </div>
</template>


<script>
import gigEdit from '@/mixins/gig.edit'
import gigCalendar from '@/components/gigs/gigCalendar'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [gigEdit],
  components: {
    gigCalendar
  },
  mounted () {
    this.model.forEach(element => {})
  },
  methods: {
    calcelSchedule () {
      this.$refs.gigCalendar.initial()
    },
    editSchedule () {
      this.modelEdit = this.$refs.gigCalendar.scheduleEdit
      this.update()
    },
    getDataFormat () {
      return {
        schedule: this.modelEdit
      }
    }
  },
  validations: {
    modelEdit: { required }
  }
}
</script>

<style>
  .gig-table-calendar {
    max-height: 300px;
    overflow: auto;
  }
</style>
