<template>
	<div class="teacher-list-recommendations">
		<div class="teacher-list-recommendations__title">
			<span class="teacher-list-recommendations__count">
				<b>{{ data.totalDocs }} - Recomendaciones sobre <span class="text-capitalize">{{ name }}</span></b>
			</span>
		</div>
		<div class="teacher-list-recommendations__list" v-if="data.totalDocs">
			<div
				class="teacher-list-recommendations__row"
				v-for="(item, index) in data.docs"
				:key="index">
				<card-recomendation class="teacher-opinion--recomendation" :item="item"/>
			</div>
		</div>
		<div v-else class="alert alert-gray text-dark">
			Él profesor aun no posee recomendaciones.
		</div>
		<div class="teacher-list-recommendations__actions" v-if="data.page">
			<button class="teacher-list-recommendations__action" @click="getRows" :disabled="data.isLoading">VER MÁS</button>
		</div>
	</div>
</template>

<script>
import cardRecomendation from './cardRecomendation'
import RecommendationService from '@/services/recommendation.service'

export default {
	components: {
		cardRecomendation
	},
	data () {
		return {
			data: {
				id: null,
				page: 1,
				totalDocs: 0,
				docs: [],
				limit: 3,
				isLoading: true
			}
		}
	},
	props: {
		id: {
		    type: String,
		    required: true
		},
		name: {
			type: String,
			required: true
		},
	},
	computed: {
		lengthCommends () {
			return this.data.totalDocs
		}
	},
	beforeMount () {
		this.data.id = this.id
		this.getRows()
	},
	methods: {
		getRows () {
			this.data.isLoading = true
			RecommendationService.getMoreCommends(this.data)
				.then((resp) => {
					this.data.docs = [
						...this.data.docs,
						...resp.docs
					]
					this.data.totalDocs = resp.totalDocs
					this.data.page = resp.nextPage
				}).finally(()=>{
					this.data.isLoading = false
				})
		}
	}
}
</script>
