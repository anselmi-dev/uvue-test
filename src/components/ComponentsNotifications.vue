<template>
	<div>
  		<b-modal id="modal-backend-user" hide-backdrop content-class="shadow" title="Datos de user" ok-only>
  			<pre style="white-space: break-spaces;">{{ user }}</pre>
  		</b-modal>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	data () {
		return {
 			optionsNotifications: {
	    		title: null,
	    		timer: 5,
	    		position: 'bottomRight',
	    		showLeftIcn: true,
	    		type: 'new',
      			showCloseIcn: true
      		}
		}
	},
    beforeMount () {
    	if (this.isAuth) {
			window.addEventListener("keydown", (event) => {
				if (event.key == 'F4')
					this.$bvModal.show('modal-backend-user')
			}, false);
    	}

		this.$bus.$on("notifications:push", this.push)
    },
    beforeDestroy () {
		this.$bus.$off("notifications:push", ()=> {})
    },
  	methods: {
	    ...mapActions({ push: 'notifications/push' }),
  	},
  	watch: {
  		options (opsNew) {
  			const ops = Object.assign({}, this.optionsNotifications, opsNew)
	    	this.$notification.[ops.type](ops.message ? ops.message : null, ops )
  		}
  	},
  	computed: {
    	...mapGetters({
    		options: 'notifications/options',
    		show: 'notifications/show'
    	}),
  	}
}
</script>
