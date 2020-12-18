<template>
    <div class="teacher-recomendations">
        <div class="d-flex flex-wrap align-items-center justify-content-space-between" :class="{'alert alert-light': !data.totalDocs}">
            <span class="text-dark font-weight-bold" v-if="!data.totalDocs">Solicita recomendaciones para que te conozcan mejor</span>
        </div>
		<div class="teacher-list-recommendations__list" >
			<div
				class="teacher-list-recommendations__row"
				v-for="(item, index) in data.docs"
				:key="index">
				<cardRecomendation class="teacher-opinion--recomendation" :item="item"/>
			</div>
            <div class="teacher-list-recommendations__actions" v-if="data.page">
                <button class="teacher-list-recommendations__action" @click="getRows" :disabled="data.isLoading">VER MÁS</button>
            </div>
		</div>
        <b-modal id="modal-request-recomendations"
            :hide-footer="true"
            :hide-header="true"
            size="lg"
            centered>
            <blockRequestRecomendations/>
        </b-modal>
    </div>
</template>

<script>
    import cardRecomendation from '@/components/teacher/opinions/cardRecomendation'
    import blockRequestRecomendations from '@/components/blocks/blockRequestRecomendations'
    import RecommendationService from '@/services/recommendation.service'

    export default {
        components: {
            cardRecomendation,
            blockRequestRecomendations
        },
        data () {
            return {
                data: {
                    id: null,
                    page: 1,
                    limit: 6,
                    totalDocs: 0,
                    docs: [],
                    isLoading: true
                }
            }
        },
        beforeMount () {
            this.data.id = this.user.teacher._id
		    this.getRows()
        },
        methods: {
            getRows () {
                this.data.isLoading = true
                RecommendationService.getAllCommends(this.data)
                .then((resp) => {
                    this.data.docs = [
                        ...this.data.docs,
                        ...resp.docs,
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