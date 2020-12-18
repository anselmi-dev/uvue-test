<template>
	<div class="teacher-price" :class="prices.className">
        <div class="teacher-prices">
            <div class="teacher-price__item price-fare">
                <span class="label">
                    Individual
                </span>
                <span class="price" :inner-html.prop="prices.fare | currencySolHrSimple">
                </span>
            </div>
            <div class="teacher-price__item price-group" v-if="prices.fare_group">
                <span class="label">
                    Grupal
                </span>
                <span class="price" :inner-html.prop="prices.fare_group | currencySolHrSimple">
                </span>
            </div>
        </div>
        <div class="first_class_discount w-100" v-show="prices.first_class_discount">
            <b-badge variant="light" class="w-100">¡50% en tu 1ª clase!</b-badge>
        </div>
	</div>
</template>

<script>
export default {
	props: {
		prices: {
			type: Object,
			required: true
		}
    },
    computed: {
        show_simple () {
            return this.prices.show_simple
        }
    }
}
</script>

<style lang="scss">
	.teacher-prices {
		display: flex;
    }

    $rootHeader: ".teacher-price";
    #{$rootHeader} {
        // margin-bottom: map-get($spacers, 4);
        display: flex;
        flex-direction: column;
        align-items: flex-end;
		&__item {
			margin-top: .5rem;
			padding: .5rem;
			font-size: 1.2rem;
	    	display: flex;
	    	align-items: center;
            justify-content: space-between;
            &:not(:last-child) {
			    border-bottom: 1px solid $gray-300;
            }
	    	.price {
	    		color: $red;
	    		font-weight: bold;
	    	}
        }
		&__first_class_discount {
			margin-bottom: map-get($spacers, 1);
			margin-top: map-get($spacers, 1);
			padding-left: map-get($spacers, 2);
			padding-right: map-get($spacers, 2);
        }
        &:not(.simple) {
            span.label:not(.price) {
                position: relative;
                &:before {
                    content: "Clase";
                    position: absolute;
                    left: 0px;
                    font-size: .8rem;
                    top: -10px;
                }
            }
        }
        &.simple {
            #{$rootHeader}__item {
                flex-wrap: wrap;
                flex-direction: column;
                align-items: flex-end;
                border: none;
                padding-bottom: 0px;
                padding-top: 0px;
            }
            span.label {
                font-size: .7rem;
            }
        }
	}
</style>
