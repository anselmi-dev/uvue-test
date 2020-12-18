<template>
    <div class="text-center py-2">
        <h4 class="mb-0">Solicita recomendaciones</h4>
        <p class="mb-2">
            Puede usar lo siguientes enlaces
        </p>
        
        <hr>
        
        <links-recomendations :data="{url}"/>
    </div>
</template>

<script>
import linksRecomendations from '@/components/blocks/linksRecomendations'

export default {
    components: {
        linksRecomendations,
    },
    computed: {
        url () {
            return `${window.location.origin}${this.$router.resolve({name: 'recommendations.request', params: {slug: this.user.slug}}).href} `
        }
    }
}
</script>