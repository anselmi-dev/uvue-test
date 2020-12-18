<template>
	<div class="teacher-profile">
		<teacher-information />
	</div>
</template>

<script>
import GigsFilterService from '@/services/gigs-filter.services'
import teacherInformation from '@/components/teacher/teacherInformation';

export default {
	components: {
		teacherInformation
	},
	data () {
		return {
			isLoading: true,
			gig: null
		}
	},
    beforeMount() {
		if (this.$route.params.slug) {
			GigsFilterService.getGigDetails(this.$route.params.slug)
            .then((resp) => {
            	console.log(resp)
                this.isLoading = false
            })
            .catch(err => {
				this.$route.push({name: 'notFound'})
            })
		} else {
			this.$route.push({name: 'notFound'})
		}
	}
}
</script>
