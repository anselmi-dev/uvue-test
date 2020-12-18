<template>
  	<div>
  		<div class="account-content__title">
  			<span>Método de pago</span>
  		</div>
        <div class="alert bg-danger text-white py-1">
            <i class="ipunku-exclamation-circle"></i> No posee metodo de pago.
        </div>
        <CreditCardForm />
	</div>
</template>

<script>
import CreditCardForm from "@/components/creditCard/CreditCardForm.vue";

export default {
    components: {
        CreditCardForm
    }
};
</script>
