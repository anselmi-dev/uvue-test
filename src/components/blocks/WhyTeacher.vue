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
            :loop="false"
            :nav="false"
            :pagination-enabled="false"
            :responsive="{0: {items:1} ,500: {items:2}, 800: {items:3}, 1000: {items:4}}">
            <div class="card-whypunku text-center px-2" v-for="(item, index) in reasons" :key="index">
                <div class="card-whypunku__image">
                    <i class="uil uil-question-circle" style="font-size: 5rem"></i>
                </div>
                <div class="font-weight-bold h5 mb-1">{{ item.title }}</div>
                <div class="text-muted h7">
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
        reasons: [
            {
                title: 'Trasciende',
                text: 'Se parte de la transformacion en la enseñanza, compartiendo lo que te apasiona.'
            },
            {
                title: 'Trabaja para ti',
                text: 'Elige tus horarios, tarifas, descansos y el lugar desde donde quieras enseñar.'
            },
            {
                title: 'Aprovecha tu talento',
                text: 'Utiliza tus conocimientos, experiencias y habilidades para generar ingresos.'
            },
            {
                title: 'Aumenta tus posibilidades',
                text: 'Llega a más personas e incrementa tu reputación recibiendo opiniones y recomendaciones.'
            },
            {
                title: 'Todo en un solo lugar',
                text: 'Lleva el control de tus reservas, clases, alumnos, archivos, estadísticas y más, todo en una increíble aula virtual.'
            },
            {
                title: 'Enfócate sólo en enseñar',
                text: 'Nos encargamos de los cobros, te pagamos sin requerir monto minimo y te asistimos con nuestras notificaciones.'
            }
        ]
    }
  }
}
</script>