<template>
  <div class="parent-content">
    <Header :simple="true"/>
      <div class="content">
        <vue-page-transition name="fade-in-up">
          <!-- your content here -->
          <slot/>
        </vue-page-transition>
      </div>
    <Footer />
    <slideout-panel width="90%"></slideout-panel>
  </div>
</template>

<script>
import Header from '../components/Header';
import Footer from '../components/Footer';

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      panelResult: null
    }
  },
  beforeMount() {
    this.$bus.$on("open-panel-layout", this.showPanel);
    this.$bus.$on("close-panel-layout", this.hidePanel);
  },
  beforeDestroy() {
    this.$bus.$off("open-panel-layout", this.hidePanel);
    this.$bus.$off("close-panel-layout", () => {});
  },
  methods: {
    showPanel () {
      this.panelResult = this.$showPanel({
        component : () => import(/* webpackChunkName: "panelMobile" */ '../components/PanelMobile.vue')
      })
    },
    hidePanel () {
      this.panelResult.hide();
    }
  }
}  
</script>
