<template>
	<div class="teacher-information__head">
		<div class="teacher-information__head-actions">
			<button type="button" class="action">
				<!-- <img :src="require('@/assets/icons/like.svg')" alt="icon like" width="20px"> -->
                <i class="ipunku-heart"></i>
			</button>
            <b-dropdown
                variant="link"
                text="Right align"
                right
                no-caret
                id="dropdown-right">
                <template #button-content>
                    <i class="ipunku-share"></i>
                </template>
                <b-dropdown-item href="#">
                    <i class="uil uil-facebook"></i> <span>Facebook</span>
                </b-dropdown-item>
                <b-dropdown-item href="#">
                    <i class="uil uil-twitter"></i> <span>Twitter</span>
                </b-dropdown-item>
                <b-dropdown-item href="#">
                    <i class="uil uil-instagram"></i> <span>Instagram</span>
                </b-dropdown-item>
                <b-dropdown-item href="#">
                    <i class="uil uil-whatsapp"></i> <span>Whatsapp</span>
                </b-dropdown-item>
            </b-dropdown>
		</div>
		<div class="teacher-information__profile">
			<div class="teacher-information__photo">
				<avatar
					:backgroundColor="'#286EB4'"
			 		:src="gig.teacher.user.pic_url"
			 		:size="133"
					:username="gig.teacher.user.first_name.split(' ')[0] + ' ' + gig.teacher.user.last_name.split(' ')[0]" />
			</div>
			<div class="teacher-information__mpremiun" v-show="gig.teacher.is_premium"></div>
		</div>
		<div class="teacher-head__data">
			<div class="teacher-head__contentl">
				<div class="teacher-information__ad">
					{{ gig.title }}
				</div>
			</div>
			<!-- <div class="teacher-head__contentr"> -->
			<div class="row w-100">
				<div class="col">
					<div class="teacher-information__name">
                        <div>
                            <div class="teacher-information__activity-start-date">
                                Profesor de Punku desde {{ gig.teacher.created_at | formatDate }}
                            </div>
    						<span>
                                <span class="name">
                                    {{ gig.teacher.user.first_name.split(' ')[0] + ' ' + gig.teacher.user.last_name.split(' ')[0] }}
                                </span>
                                <b-badge variant="light" pill>{{ gig.education_level }}</b-badge>
                            </span>
                        </div>
					</div>
					<div class="teacher-information__data-additional">

                        <b-form-rating v-model="value" variant="warning" readonly show-value precision="1"></b-form-rating>

					    <div class="teacher-information__count-class">
					        <b-badge variant="light" pill>{{ gig.review_qt | review_qt }}</b-badge>
					    </div>
					</div>
                    <div>
                        <b-badge variant="primary" class="mx-1" pill v-for="(subject, index) in gig.subject" :key="index">
                            {{ subject.title }}
                        </b-badge>
                    </div>
				</div>
				<div class="col-auto align-items-end d-flex">
					<div class="row text-right">
						<span
                            :inner-html.prop="gig.fare | currencySolHr"
                            class="teacher-head__price col-12">
						</span>
						<span
							v-show="gig.first_class_discount"
							class="class-free col-12">
							¡1 clase 50% de descuento!
						</span>
					</div>
				</div>
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
    data () {
        return {
            value: 4
        }
    },
	props: {
		gig: {
	    	type: Object,
	    	required: true,
	    	default: {}
	  	}
	},
}
</script>

<style lang="scss">
	.teacher-head {
		&__data {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			justify-content: space-between;
		}
		&__contentr {
			@extend %col-auto;
			align-items: flex-end;
			text-align: right;
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.class-free {
				color: $dark;
				font-size: $h7-font-size;
				font-weight: 400;
				display: block;
				text-align: left;
			}
		}
		&__price {
			color: $red;
			font-size: $h2-font-size;
			font-weight: bold;
			.sm {
				font-size: $h5-font-size;
			}
		}
	}
    .b-rating {
        box-shadow: none;
        padding: 0;
        margin: 0;
        width: auto;
    }
</style>
