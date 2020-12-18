<template>
  	<div>
  		<div class="account-content__title">
  			<span>PunkuProfe</span>
  		</div>
		<div class="accout-tabs">
		  	<b-tabs content-class="mt-3" v-model="tabsIndex">
			    <b-tab title="Mis anuncios">
			    	<teacherGigs />
			    </b-tab>
		    	<b-tab title="Mi disponibilidad">
			    	<teacherAvailability />
		    	</b-tab>
		    	<b-tab title="Mi preferencia de Cobro">
			    	<teacherPaymentMethod />
		    	</b-tab>
		    	<b-tab title="Mis estadisticas">
			    	<teacherStatistics />
		    	</b-tab>
		    	<b-tab title="Mis recomendaciones">
			    	<teacherRecomendations />
		    	</b-tab>
		  	</b-tabs>
		</div>
	</div>
</template>

<script>
import teacherDashboard from '@/components/account/teacher/teacherDashboard'
import teacherGigs from '@/components/account/teacher/teacherGigs'
import teacherAvailability from '@/components/account/teacher/teacherAvailability'
import teacherPaymentMethod from '@/components/account/teacher/teacherPaymentMethod'
import teacherStatistics from '@/components/account/teacher/teacherStatistics'
import teacherRecomendations from '@/components/account/teacher/teacherRecomendations'

export default {
	components: {
		teacherDashboard,
		teacherGigs,
		teacherAvailability,
		teacherPaymentMethod,
		teacherStatistics,
		teacherRecomendations
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
