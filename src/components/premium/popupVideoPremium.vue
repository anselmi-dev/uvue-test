<template>
  <b-modal
    id="modal-video-premium"
    centered
    size="lg"
    class="p-0"
    :hide-footer="true"
    :hide-header="true">
    <b-button size="sm" variant="outline-primary" @click="$bvModal.hide('modal-video-premium')" class="modal-body__close">
      <i class="uil uil-times"></i>
    </b-button>
    <ablockPremium variant="primary">
      <b-container class="px-5 py-2">
        <b-row class="my-2 align-items-center">
          <h4 class="text-white">
            Tu video no cumple con los requisitos.
          </h4>
          <p>
            ¿Necesitas subir un video de mayor duración? Hazte premium y preséntate de una mejor forma para diferenciarte de los demás
          </p>
          <router-link :to="{name: 'premium'}" class="btn btn-outline-light font-weight-bold">CONVIÉRTETE EN PREMIUM</router-link>
        </b-row>
      </b-container>
    </ablockPremium>
  </b-modal>
</template>

<script>
import ablockPremium from '@/components/premium/ablockPremium?inline';
import svgVisibilidad from '@/assets/icons/eficiencia.svg?inline';
import svgAnuncios from '@/assets/icons/anuncio.svg?inline';
import svgEstadisticas from '@/assets/icons/analitica.svg?inline';

export default {
  components: {
    ablockPremium,
    svgVisibilidad,
    svgAnuncios,
    svgEstadisticas
  },
}
</script>


<style lang="scss">
  #modal-video-premium .modal-content {
    background: transparent;
    border: none;
  }
  #modal-video-premium .modal-body {
    padding-top: 30px;
  }
  #modal-video-premium .modal-body .modal-body__close {
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