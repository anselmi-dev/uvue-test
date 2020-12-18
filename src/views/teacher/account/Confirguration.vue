<template>
  	<div>
  		<div class="account-content__title">
  			<span>Mis preferencias</span>
  		</div>
		<div class="accout-tabs">
		  	<b-tabs content-class="mt-3">
		    	<b-tab title="Mi preferencia de Cobro">
			    	<teacherPaymentMethod />
		    	</b-tab>
		  	</b-tabs>
		</div>
	</div>
</template>

<script>
import teacherPaymentMethod from '@/components/account/teacher/teacherPaymentMethod'

export default {
    components: {
        teacherPaymentMethod
    },
	data () {
		return {
			tabsIndex: 0
		}
	},
	mounted () {
		this.tabsIndex = 0
	}
}
</script>