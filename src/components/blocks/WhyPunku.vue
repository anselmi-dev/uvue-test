<template>
  <section class="section block-whypunku">

    <div class="container">

      <div class="section__title block-whypunku__title">
        <span>
          <span class="block-whypunku__sign">¿</span> Por qué Punku es tu mejor opción <span class="block-whypunku__sign">?</span>
        </span>
      </div>


      <carousel
        :autoplay="true"
        :loop="true"
        :nav="false"
        :pagination-enabled="false"
        :responsive="{0: {items:1} ,500: {items:2}, 800: {items:3}, 1000: {items:4}}">
          <div class="card-whypunku" v-for="(item, index) in reason" :key="index">
            <div class="card-whypunku__image">
              <i class="uil uil-question-circle" style="font-size: 5rem"></i>
            </div>
            <div class="card-whypunku__title">{{ item.title }}</div>
            <div class="card-whypunku__subtitle">
              {{ item.text }}
            </div>
          </div>
      </carousel>
    </div>
  </section>
</template>


<script>

import carousel from 'vue-owl-carousel'

export default {
  components: {
    carousel
  },
  data () {
    return {
      reason: [
        {
          title: 'Se adapta a ti',
          text: 'Busca lo que quieres aprender y elige a tu profe ideal en el horario y presupuesto que más te convenga.',
          icon: '',
        },
        {
          title: 'Desde donde quieras',
          text: 'Haz tu reserva, revisa tu agenda, lleva tu clase, accede a tus archivos y más, desde donde estés.',
          icon: '',
        },
        {
          title: 'Paga lo justo',
          text: 'Paga por el tiempo efectivo de tu clase usando el medio de pago de tu preferencia, sin matrículas, membresías, ni suscripciones.',
          icon: '',
        },
        {
          title: 'Clases en vivo',
          text: 'Interactúa con tu profe aprovechando las herramientas colaborativas de nuestra aula virtual y potencia tu aprendizaje.',
          icon: '',
        }
      ]
    }
  }
}
</script>


<style lang="scss" scoped>
  .block-whypunku__sign {
    font-size: 4rem;
    line-height: 0;
    display: inline;
    &:before,
    &:after {
      display: none;
    }
  }
  .card-whypunku {
    padding: map-get($spacers, 4);
    &__image {
      width: 50%;
      margin: auto;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: map-get($spacers, 3);
    }
    &__title {
      font-size: $h5-font-size;
      position: relative;
      margin-bottom: map-get($spacers, 3);
      &:before {
        content: "";
        width: 35px;
        max-width: 100%;
        left: 0;
        right: 0;
        margin: auto;
        height: 2px;
        background-color: $primary;
        bottom: 0;
        position: absolute;
      }
    }
    &__title,
    &__subtitle {
      text-align: center;
    }
    &__subtitle {
      font-size: $h6-font-size;
    }
  }
</style>
