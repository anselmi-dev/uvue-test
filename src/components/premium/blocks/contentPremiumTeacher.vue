<template>
    <ablockPremium>
        <div class="ablock-premium__text w-100">
            <div class="p-3">
                <p>Documenta tu CV, graba un video de presentación de mayor duración y genera más confianza.</p>
                <router-link :to="{name: 'premium'}" class="btn btn-outline-light font-weight-bold">CONVIÉRTETE EN PREMIUM</router-link>
            </div>
        </div>
        <div class="ablock-premium__img">
            <img :src="require('@/assets/icons/proceso.svg')" alt="gema premium" width="80%" class="mb-2 invert-img d-none d-lg-block">
        </div>        
    </ablockPremium>
</template>

<script>
import ablockPremium from '@/components/premium/ablockPremium';

export default {
    components: {
        ablockPremium
    }
}
</script>