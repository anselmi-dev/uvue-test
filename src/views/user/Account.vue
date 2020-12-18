<template>
  	<div>
  		<div class="account-content__title">
  			<span>Mi perfil</span>
  		</div>
		<div class="accout-tabs nav-tabs--overflow">
		  	<b-tabs content-class="mt-3" v-model="tabsIndex">
			    <b-tab title="Mis datos">
					<accountData/>
					<div class="border-top pt-2 mt-2" v-if="user && user.password">
						<accountPassword/>
					</div>
			    </b-tab>
		    	<b-tab title="Método de pago">
                    <accountPayment />
		    	</b-tab>
                <b-tab title="Cupones">
                    <cupons />
                </b-tab>
                <b-tab title="Configuraciones">
                    <accountConfigurations />
                </b-tab>
		  	</b-tabs>
		</div>
	</div>
</template>


<script>
import accountDashboard from '@/components/account/accountDashboard'
import accountPassword from '@/components/account/accountPassword'
import accountData from '@/components/account/accountData'
import accountPayment from '@/components/account/accountPayment'
import accountConfigurations from '@/components/account/accountConfigurations'
import Cupons from './Cupons.vue'

export default {
	components: {
		accountData,
		accountPassword,
		accountDashboard,
        accountConfigurations,
        accountPayment,
		Cupons
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
