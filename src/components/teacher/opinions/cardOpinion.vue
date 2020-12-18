<template>
	<div class="teacher-opinion">
		<div class="teacher-opinion__user">
			<avatar
				:backgroundColor="'#286EB4'"
				:src="item.review_author.pic_url"
				:size="50"
				:username="full_name" />
		</div>
		<div class="teacher-opinion__content">
			<div class="teacher-opinion__name">
				<strong class="mr-1 d-flex align-items-center">
					<span class="mr-1 text-capitalize">{{full_name}}</span>
					<star-rating v-model="item.stars" :star-size="16" :read-only="true" :show-rating="false"></star-rating>
				</strong>
				<!-- <small class="text-muted h9">{{moment(item.review_author.created_at).format('DD/MM/YYYY')}}</small> -->
			</div>
			<div class="teacher-opinion__text">
				{{item.review_text}}
			</div>
		</div>
	</div>
</template>

<script>
import StarRating from 'vue-star-rating'
import Avatar from 'vue-avatar'

export default {
	components: {
		StarRating,
		Avatar
	},
	props: {
		item: {
			required: true,
			type: Object
		}
	},
	computed: {
		full_name () {
			return this.item.review_author.first_name.split(' ')[0] + ' ' + this.item.review_author.last_name.split(' ')[0]
		}
	}
}
</script>
