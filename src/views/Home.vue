<template>
  <div>
    <div class="header-home">
      <carousel class="header-home__carousel" :autoplay="true" :autoplayHoverPause="true" :loop="true" :nav="false" :items="1" :pagination-enabled="false">
        <div class="header-home__carousel-img"
          :style="{backgroundImage: 'url(' + require('@/assets/images/hero/bg-hero-abcd.jpg') + ')' }">
        </div>
      </carousel>
      <div class="header-home__content">
        <div class="container">
          <div class="header__hero-title">
            Aprende o refuerza lo que quieras, cuando quieras y desde donde quieras
          </div>
          <div class="header__hero-subtitle">
            La plataforma peruana donde encuentras profesores, mentores, especialistas y apasionados, en un aula virtual intuitiva y segura
          </div>

          <PunkuSearchStudents class="mx-auto" id="hero-punku-search" v-observe-visibility="visibilityChanged"/>

        </div>
      </div>
      <div class="svg-border-waves text-white">
          <svg class="wave" style="pointer-events: none" fill="currentColor" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 75">
              <defs>
                  <clipPath id="a"><rect class="a" width="1920" height="75"></rect></clipPath>
              </defs>
              <title>wave</title>
              <g class="b"><path class="c" d="M1963,327H-105V65A2647.49,2647.49,0,0,1,431,19c217.7,3.5,239.6,30.8,470,36,297.3,6.7,367.5-36.2,642-28a2511.41,2511.41,0,0,1,420,48"></path></g>
              <g class="b"><path class="d" d="M-127,404H1963V44c-140.1-28-343.3-46.7-566,22-75.5,23.3-118.5,45.9-162,64-48.6,20.2-404.7,128-784,0C355.2,97.7,341.6,78.3,235,50,86.6,10.6-41.8,6.9-127,10"></path></g>
              <g class="b"><path class="d" d="M1979,462-155,446V106C251.8,20.2,576.6,15.9,805,30c167.4,10.3,322.3,32.9,680,56,207,13.4,378,20.3,494,24"></path></g>
              <g class="b"><path class="d" d="M1998,484H-243V100c445.8,26.8,794.2-4.1,1035-39,141-20.4,231.1-40.1,378-45,349.6-11.6,636.7,73.8,828,150"></path></g>
          </svg>
      </div>
    </div>

    <WhyPunku/>

    <section class="punku-shero">
      <div class="punku-shero__container">
        <div class="punku-shero__title">
          ENSEÑA EN PUNKU
        </div>
        <div class="punku-shero__content">
          Se parte de la transformacion en la enseñanza, compartiendo lo que te apasiona.
        </div>
        <div class="punku-shero__actions">
          <router-link :to="{name: 'teacher.landing'}" class="punku-shero__action">Empezar ahora</router-link>
        </div>
      </div>
    </section>

    <HowWork/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import HowWork from '@/components/HowWork.vue'
import WhyPunku from '@/components/blocks/WhyPunku.vue'

import PunkuSearchStudents from '@/components/blocks/punkuSearchStudents'
import FAQ from '@/components/FAQ.vue'
import sal from 'sal.js'

import carousel from 'vue-owl-carousel'

export default {
  components: {
    PunkuSearchStudents,
    HelloWorld,
    WhyPunku,
    HowWork,
    sal,
    FAQ,
    carousel,
  },
  beforeDestroy () {
    let punkuSearchStudents = document.getElementById('header-punku-search')
    if (punkuSearchStudents) {
      punkuSearchStudents.style.display = "block"
      document.getElementById('header').style.position = "relative"
    }
  },
  methods: {
    visibilityChanged (isVisible, entry) {
      if (window.innerHeight > 360) {
        let punkuSearchStudents = document.getElementById('header-punku-search')
        if (punkuSearchStudents) {
          if (isVisible) {
            document.getElementById('header-punku-search').style.display = "none"
            document.getElementById('header').style.position = "relative"
          } else {
            document.getElementById('header-punku-search').style.display = "block"
            document.getElementById('header').style.position = "fixed"
          }
        }
      }
    }
  }
}
</script>


<style lang="scss">
.svg-border-waves {
  svg {
    pointer-events: none;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3rem;
    z-index: 11;
    width: 100%;
  }
  .a {
    fill: none;
  }
  .b {
    clip-path: url(#a);
  }
  .d {
    opacity: 0.5;
    isolation: isolate;
  }
}
</style>
