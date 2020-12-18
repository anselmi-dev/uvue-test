<template>
	<div class="teacher-opinion">
		<div class="teacher-opinion__user">
			<avatar
				:backgroundColor="'#286EB4'"
				:src="item.commend_author.pic_url"
				:size="50"
				:username="full_name" />
		</div>
		<div class="teacher-opinion__content">
			<div class="teacher-opinion__name">
				<strong class="mr-1 text-capitalize">{{full_name}}</strong>
				<small class="text-muted h9">{{moment(item.created_at).format('DD/MM/YYYY')}}</small>
			</div>
			<div class="teacher-opinion__text">
				{{item.commend_text}}
			</div>
		</div>
				{{item.status}}
		<div class="teacher-opinion__actions" v-if="isPendiente">
			<router-link :to="{name: 'recommendations.request.confirmation', params: {slug: item._id}}">
				<b-badge variant="warning">{{ item.status }}</b-badge>
			</router-link>
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
		isPendiente () {
			return this.item.status == 'PENDIENTE'
		},
		full_name () {
			return this.item.commend_author.first_name.split(' ')[0] + ' ' + this.item.commend_author.last_name.split(' ')[0]
		}
	}
}
</script>
