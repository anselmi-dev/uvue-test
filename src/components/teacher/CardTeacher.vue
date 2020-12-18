<template>
	<router-link
        :to="{name: 'gig.show', params: { slug: gig.slug }}"
        class="teacher-card">
        <div class="teacher-card__content">
            <div class="content">
                <div class="teacher-card__top">
                    <div
                        class="teacher-card__avatar"
                        v-bind:style="{ backgroundImage: 'url(' + gig.teacher.user.pic_url + ')' }">
                    </div>
                    <div class="punku-tacher-card__premiun" v-if="gig.teacher.is_premium">
                        <span></span>
                    </div>
                    <div class="teacher-card__acontent">
                        <div class="teacher-card__name" v-line-clamp:20="1">
                            {{ gig.teacher.user.first_name.split(' ')[0] + ' ' + gig.teacher.user.last_name.split(' ')[0] }}
                        </div>
                        <div class="w-100 d-flex align-items-center justify-content-between flex-wrap">
                            <div class="teacher-card__rating">
                                <star-rating
                                    :rating="gig.stars_rating"
                                    :read-only="true"
                                    :star-size="15"
                                    :show-rating="false"
                                    border-color="#333"
                                    :increment="0.1"/>
                            </div>
                            <div class="teacher-card__review_qt">
                                {{ gig.review_qt | review_qt }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="teacher-card__bottom">
                    <div class="teacher-card__price">
                        <div class="teacher-card__fare">
                            <span :inner-html.prop="gig.fare | currencySolHr"></span>
                        </div>
                        <b-badge variant="danger" pill class="h8 badge-danger--shadow" v-show="gig.first_class_discount">
                            ¡1ª clase 50%!
                        </b-badge>
                    </div>
                    <div class="teacher-card__subjects">
                        <span v-for="(subject, index) in gig.subject" :key="index">
                            <b-badge
                                class="text-truncate mw-100"
                                variant="primary"
                                pill>
                                {{ subject.title }}
                            </b-badge>
                        </span>
                    </div>
                    <div class="punku-tacher-card__bio">
                        <span v-line-clamp:20="3">
                        </span>
                        <v-clamp
                            autoresize
                            :max-height="60"
                        >
                            {{ gig.title }}
                        </v-clamp>
                        <hr class="my-1">
                        <b-row class="row--xs">
                            <b-col cols="auto" v-if="gig.files_url && gig.files_url.length && gig.teacher.is_premium">
                                <span
                                    v-b-tooltip.hover title="Anuncio documentado"
                                    class="badge badge-warning badge-warning--shadow badge-pill card-teacher__verific">
                                    <i class="ipunku-verific"></i>
                                    <span>{{ gig.files_url | isVerific }}</span>
                                </span>
                            </b-col>
                            <b-col cols="auto">
                                <span
                                    v-b-tooltip.hover
                                    :title="
                                        gig.auto_reservation ?
                                        'La reserva son automaticas, no se requiere la confirmación del profesor.' :
                                        'La reserva de la clase se tiene que confirmar por el profesor.'
                                    "
                                    class="badge badge-light badge-light--shadow badge-pill">
                                    {{ gig.auto_reservation | auto_reservation }}
                                </span>
                            </b-col>
                        </b-row>
                    </div>
                </div>
            </div>
        </div>
	</router-link>
</template>

<script>
import StarRating from 'vue-star-rating'
import VClamp from 'vue-clamp'
export default {
	components: {
		StarRating,
        VClamp
	},
    props: {
        gig: {
            type: Object,
            default: null
        }
    },
    methods: {
        isScrolledIntoView (el) {
            var rect = el.getBoundingClientRect();
            var elemTop = rect.top;
            var elemBottom = rect.bottom;

            // Only completely visible elements return true:
            var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
            // Partially visible elements return true:
            //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
            return isVisible;
        }
    },
}
</script>

<style lang="scss">
    .vue-star-rating {
        line-height: 0;
    }
    .teacher-card {
        text-decoration: none;
        box-shadow: 0px 4px 5px 2px #dee2e6;
        padding: 0.5rem;
        display: block;
        overflow: hidden;
        // display: flex;
        // flex-wrap: wrap;
        box-shadow: 0px 2px 5px 2px #dee2e6;
        border-radius: 0.25rem;
        margin-bottom: 1.5rem;
        color: initial;
        text-decoration: none;
        background-color: #fff;
        word-break: break-word !important;
        &__content {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            // padding-bottom: 100%;
            // margin-bottom: 145px;
            &:before {
                content: "";
                position: relative;
                margin-bottom: 145px;
                padding-bottom: 100%;
                z-index: -2;
                display: block;
                width: 100%;
            }
            & > .content {
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                // flex-wrap: wrap;
                flex-direction: column;
                width: 100%;
                height: 100%;
                & > * {
                    flex-basis: 0;
                    max-width: 100%;
                }
            }
        }
        &__top {
            display: block;
            width: 100%;
            position: relative;
            flex-grow: 2;
            &:before {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background: linear-gradient(180deg,transparent,#4e4460);
                opacity: .8;
                pointer-events: none;
                z-index: 1;
            }
        }
        &__avatar {
            width: 100%;
            height: 100%;
            // padding-bottom: 100%;
            border-radius: 4px;
            overflow: hidden;
            margin-left: auto;
            margin-right: auto;
            // margin-top: .5rem;
            background: #dee2e6;
            position: relative;
            background-position: center;
            background-size: cover;
            transition: all .3s;
        }
        &__acontent {
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;
            text-align: left;
            padding: .5rem 1rem;
            z-index: 2;
        }
        &__name {
            font-size: 1.5rem;
            position: relative;
            color: #fff;
            z-index: 2;
            line-height: 1;
        }
        &__review_qt {
            font-size: 1rem;
            color: #fff;
            text-align: right;
            // margin-bottom: .25rem;
            // margin-top: .25rem;
        }
        &__rating {}
        &__bottom > * {
            padding: .25rem .25rem .0rem .25rem;
        }
        &__subjects {
            display: flex;
            flex-wrap: wrap;
            margin-right: -2px;
            margin-left: -2px;
            font-size: .9rem;
            min-height: 38px;
            max-height: 38px;
            overflow: hidden;
            & > * {
                padding-right: 2px;
                padding-left: 2px;
                line-height: 1;
                flex: 0 0 auto;
                width: auto;
                max-width: 100%;
            }
        }
        &__price {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
        }
        &__fare {
            font-weight: 600;
            color: #dc3545;
            white-space: pre;
            display: block;
            margin-bottom: 0;
            font-size: 1.25rem;
            line-height: 1;
            letter-spacing: -.8px;
        }
        &__pricehour {
        }
        &:hover &__subjects {
            max-height: initial;
            // padding-bottom: 80%;
        }
    }
</style>
