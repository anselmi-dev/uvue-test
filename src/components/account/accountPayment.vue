<template>
    <div>
        <listPayment :paymentMethods="paymentMethods" v-show="isList"/>
        <div v-show="!isList">
            <CreditCardForm/>
        </div>
    </div>
</template>

<script>
import CreditCardForm from "@/components/creditCard/CreditCardForm.vue";
import listPayment from "@/components/account/payment/listPayment.vue";

export default {
    data () {
        return {
            isList: true
        }
    },
    components: {
        CreditCardForm,
        listPayment,
    },
    beforeMount() {
        this.$bus.$on("account:update:payment-methods", (currentPayment) => {
            this.$bus.emit('account:update:credit-card', currentPayment)
            this.toggleForm()
        })
        this.$bus.$on("account:toggleForm:payment-methods", this.toggleForm);
    },
    beforeDestroy() {
        this.isList = true
        this.$bus.$off("account:create:payment-methods");
    },
    methods: {
        toggleForm () {
            this.isList = !this.isList
        },
    },
    computed: {
        paymentMethods () {
            return this.user ? this.user.user_cards : []
        }
    }
};
</script>
