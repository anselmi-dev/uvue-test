<template>
  	<div>
  		<div class="account-content__title">
  			<span>Mis favoritos</span>
  		</div>
		<div v-for="(doc, index) in interactions.docs" :key="index">
			<head-gig
				class="mb-2"
				:gig="doc.gig"/>
		</div>
        <div class="d-flex flex-wrap align-items-center justify-content-space-between alert alert-light"  v-if="!interactions.docs.length">
            <span class="text-dark font-weight-bold">Aun no tiene favoritos</span>
        </div>
	</div>
</template>

<script>
import InteractionsService from '@/services/interactions.service'
// import headGig from '@/components/gigs/headGigSimple'
import headGig from '@/components/gigs/headGigLike'

export default {
	components: {
		headGig
	},
	data () {
		return {
            tabsIndex: 0,
            interactions: {
                isLoading: true,
                docs: []
            }
		}
    },
    beforeMount () {
        InteractionsService.getInteractions({type: 'like'}).then((resp) => {
            this.interactions.docs = resp.docs
        })
    },
	mounted () {
		this.tabsIndex = 0
	}
}
</script>
