<template>
  <b-modal
    id="modal-premium"
    centered
    size="lg"
    class="p-0"
    :hide-footer="true"
    :hide-header="true">
    <b-button size="sm" variant="outline-primary" @click="$bvModal.hide('modal-premium')" class="modal-body__close">
      <i class="uil uil-times"></i>
    </b-button>
    <ablockPremium>
      <b-container class="px-5 pb-5 pt-2">
        <b-row class="my-2 align-items-center">
          <h2 class="mb-0">Disfruta de los beneficios de ser Premium en Punku!</h2>
          <!-- <p class="text-white">Disfruta de los beneficios de una membresía Premium </p> -->
          <router-link :to="{name: 'premium'}" class="btn btn-outline-light font-weight-bold">CONVIÉRTETE EN PREMIUM</router-link>
        </b-row>
        <b-row class="row--sm my-3 py-1 align-items-center">
          <div class="col-auto">
            <img :src="require('@/assets/icons/eficiencia.svg')" alt="gema premium" width="100" class="mb-2 invert-img">
          </div>
          <div class="col">
            <h5 class="font-weight-bold mb-1">Aumenta tu visibilidad</h5>
            Tus anuncios aparecerán entre los principales resultados de búsqueda y obtén la insignia de destacado.
          </div>
        </b-row>
        <b-row class="row--sm my-3 py-1 align-items-center">
          <div class="col">
            <h5 class="font-weight-bold mb-1">Agrega más anuncios</h5>
            Crea hasta 3 anuncios y aprovecha todo tu talento.
          </div>
          <div class="col-auto">
            <img :src="require('@/assets/icons/anuncio.svg')" alt="gema premium" width="100" class="mb-2 invert-img">
          </div>
        </b-row>
        <b-row class="row--sm my-3 py-1 align-items-center">
          <div class="col-auto">
            <img :src="require('@/assets/icons/proceso.svg')" alt="gema premium" width="100" class="mb-2 invert-img">
          </div>
          <div class="col">
            <h5 class="font-weight-bold mb-1">Mejora tu perfil</h5>
            Documenta tu CV, graba un video de presentación de mayor duración y genera más confianza.
          </div>
        </b-row>
        <b-row class="row--sm my-3 py-1 align-items-center">
          <div class="col">
            <h5 class="font-weight-bold mb-1">Visualiza más estadísticas</h5>
            Accede a estadísticas más detalladas y desarrolla estrategias para lograr tus objetivos.
          </div>
          <div class="col-auto">
            <img :src="require('@/assets/icons/habilidades.svg')" alt="gema premium" width="100" class="mb-2 invert-img">
          </div>
        </b-row>
      </b-container>
    </ablockPremium>
  </b-modal>
</template>

<script>
import ablockPremium from '@/components/premium/ablockPremium?inline';

export default {
  components: {
    ablockPremium,
  },
  mounted () {
    setTimeout(() => {
      this.$bvModal.show('modal-premium')
    }, 1000)
  }
}
</script>


<style lang="scss">
  #modal-premium .modal-content {
    background: transparent;
    border: none;
  }
  #modal-premium .modal-body {
    padding-top: 30px;
  }
  #modal-premium .modal-body .modal-body__close {
    position: absolute;
    top: 0;
    right: 10px;
    border: none;
    font-weight: bold;
    font-size: 2rem;
    padding: 0;
    margin: 0;
    line-height: 1;
    color: $white;
    outline: none;
    &,
    &:focus,
    &:hover {
      background: transparent;
      outline: none;
    }
    i:before {
      margin: 0;
    }
  }
</style>