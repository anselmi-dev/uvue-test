<template>
	<div class="profile-simple-card">
		<div class="profile-simple-card__img">
			<avatar
				v-if="!user.pic_url"
				:backgroundColor="'#286EB4'"
			 	:src="user.pic_url"
				:username="split_name"></avatar>
			<img v-else :src="user.pic_url" :alt="name">
		</div>
		<div class="profile-simple-card__name">
			{{ name.split(" ")[0] }}
		</div>
	</div>
</template>

<script>
import auth from '@/mixins/auth'
import Avatar from 'vue-avatar'

export default {
	mixins: [auth],
	components: {
    	Avatar,
	},
    computed: {
        split_name () {
            return this.user.first_name.split(" ")[0] + ' ' +  this.user.last_name.split(" ")[0];
        }
    },
	props: {
		name: {
			type: String,
			default: null
		},
		img: {
			type: String,
			default: 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'
		}
	}
}
</script>

<style lang="scss">
    .punku__dropdown-toggle.show .vue-avatar--wrapper,
    .punku__dropdown-toggle:active .vue-avatar--wrapper,
    .punku__dropdown-toggle:focus .vue-avatar--wrapper,
    .punku__dropdown-toggle:hover .vue-avatar--wrapper {
        background: $white !important;
        color: darken($primary, 10%) !important;
    }
</style>
<style lang="scss" scoped>
	.vue-avatar--wrapper {
	    width: 100% !important;
	    height: 100% !important;
	    font-size: .7rem !important;
	    font-weight: bold !important;
        color: $white !important;
        transition: all .5s;
        background-color: $primary !important;

	}
	.profile-simple-card {
		display: flex;
		align-items: center;
        &__name {
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
		&__img {
		    width: 20px;
		    border-radius: 50%;
		    overflow: hidden;
		    margin-right: 6px;
		    // background: #c4ccdf;
		    height: 20px;
			img {
				object-fit: cover;
			}
		}
	}
</style>
