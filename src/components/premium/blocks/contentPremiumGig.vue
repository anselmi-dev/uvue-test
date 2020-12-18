<template>
    <ablockPremium :variant="'warning'">
        <div class="px-3 py-2 d-block d-md-flex align-items-center">
            <div>
                <h5 class="font-weight-bold mb-1">Aumenta tu visibilidad</h5>
                <p class="text-white mb-0">
                    Tus anuncios aparecerán entre los principales resultados de búsqueda y obtén la insignia de destacado.
                </p>
            </div>
            <router-link :to="{name: 'premium'}" class="btn btn-outline-light font-weight-bold">CONVIÉRTETE EN PREMIUM</router-link>
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