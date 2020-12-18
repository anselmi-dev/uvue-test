<template>
    <ablockPremium>
        <div class="ablock-premium__text">
            <div class="p-3">
                <h3>{{ user ? `Hola,  ${user.split_name}` : 'null' }}</h3>
                <h5 class="mb-3">Disfruta de los beneficios de ser Premium en Punku!</h5>
                <p class="text-sm text-indigo-200">Disfruta de los beneficios de una membresía Premium  perferendis odit enim natus ipsum reprehenderit eos eum impedit tenetur nemo corporis laboriosam veniam dolores quos necessitatibus, quaerat debitis.</p>
                <router-link :to="{name: 'premium'}" class="btn btn-outline-light font-weight-bold">CONVIÉRTETE EN PREMIUM</router-link>
            </div>
        </div>
        <div class="ablock-premium__img">
            <i class="uil uil-question-circle"></i>
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