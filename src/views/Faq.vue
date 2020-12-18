<template>
    <FAQ class="container" :all="all"/>
</template>

<script>
import FAQ from '@/components/FAQ.vue'

export default {
  props: {
    all: {
      default: false
    }
  },
  components: { FAQ }
}
</script>

