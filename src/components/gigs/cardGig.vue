<template>
	<div class="card-gig">
		<div class="card-gig__container">
			<div class="card-gig__photo">
				<profile-avatar :isEdit="isEdit"/>
			</div>
			<div class="card-gig__content">
				<div class="card-gig__head">
					<router-link
        				:to="{name: 'gig.show', params: { slug: gig.slug }}"
						class="card-gig__title">
						{{ gig.title }}
					</router-link>
				</div>
				<div class="card-gig__body">
					<div class="row row--sm h-100">
						<div class="col">
							<div class="card-gig__name">
								{{ teacher.first_name.split(' ')[0] + ' ' + teacher.last_name.split(' ')[0] }}
								<b-badge variant="light" pill>
									{{ gig.education_level }}
								</b-badge>
							</div>
							<div class="row row--sm">
								<div class="col-auto" v-for="(subject, index) in gig.subject" :key="index">
									<b-badge variant="primary">
										{{ subject.title }}
									</b-badge>
								</div>
							</div>
							<div class="row row--sm">
								<div
									class="col-auto"
									v-for="(lang, index) in gig.languages" :key="index">
									<b-badge pill>
										{{ lang.language }}
									</b-badge>
								</div>
							</div>
						</div>
						<div class="col-auto d-flex flex-column-reverse text-right">
							<router-link
                                v-if="!isPremium"
								:to="{name: 'premium'}"
								class="btn btn-danger btn-sm text-uppercase mt-2">
								Se premium
							</router-link>
							<div class="card-gig__price" :inner-html.prop="gig.fare | currencySolHr"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="card-gig__actions">
			<router-link
        		:to="{name: 'gig.show', params: { slug: gig.slug }}"
				class="btn btn-outline-primary mx-1">
				Ver mi anuncio
			</router-link>
			<router-link
        		:to="{name: 'account.dashboard'}"
				class="btn btn-outline-dark mx-1">
				Ver mi perfil
			</router-link>
		</div>
	</div>
</template>

<script>
import profileAvatar from '@/components/profile/profileAvatar'
export default {
	components: {
		profileAvatar,
	},
	props: {
		gig: {
			type: Object,
			default: {},
			required: true
		},
		teacher: {
			type: Object,
			default: {},
			required: true
		},
		isEdit: {
			type: Boolean,
			default: false,
			required: false
		}
	}
}
</script>

<style lang="scss">
	.card-gig {
		&__container {
			@extend %row;
			& > * {
				@extend %col;
	    		display: flex;
	    		flex-direction: column;
			}
		}
		&__body {
			@extend %col;
			padding: 0px;
		}
		&__photo {
			min-width: 150px;
			max-width: 150px;
			border-radius: 50%;
			overflow: hidden;
			display: block;
		}
		&__title {
			font-size: 1.4rem;
			font-weight: 400;
			margin-bottom: 1rem;
			display: block;
			color: $dark;
			text-decoration: none;
            word-break: break-all;
		}
		&__name {
			font-size: 1.3rem;
			text-transform: capitalize;
			line-height: 1;
		}
		&__price {
			font-size: 2rem;
			font-weight: bold;
			color: $red;
		}
		&__actions {
			display: block;
			width: 100%;
			margin-top: 1rem;
			padding-top: 1rem;
			border-top: 1px solid #d0cfcf;
			text-align: center;
		}
	}
</style>
