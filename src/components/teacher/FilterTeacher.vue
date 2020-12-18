<template>
	<div class="teacher-filter">
        <!-- Filter:price -->
        <div style="position: relative">
            <button
                class="teacher-filter__fbutton teacher-filter__fprice"
                @click.self="toggleFilter">
                <label class="teacher-filter__fbutton-label" v-if="!isApplyFilter('price')">
                    Precio
                </label>
                <label class="teacher-filter__fbutton-label apply" v-else>
                    Precio máximo <span class="font-weight-bold" :inner-html.prop="filter.price.value | currencySol"></span>
                </label>
                <span class="teacher-filter__fbutton-dropdown">
                    <div class="slider">
                        <span>Tu precio máximo: <span :inner-html.prop="filter.price.value | currencySolHr"></span></span>
                        <vue-slider
                            v-if="filter.price.values[1]"
                            :min="filter.price.values[0]"
                            :max="filter.price.values[1]"
                            :marks="filter.price.marks"
                            :process-style="{ backgroundColor: '#6f42c1' }"
                            :tooltip-style="{ backgroundColor: '#6f42c1' }"
                            :tooltip-formatter="filter.price.formater" v-model="filter.price.value"></vue-slider>
                        <div class="teacher-filter__fbutton-dropdown-actions">
                            <button @click="applyFilter('price')">Aplicar</button>
                        </div>
                    </div>
                </span>
            </button>
        </div>
        <!-- Filter:auto_reservation -->
        <button
            class="teacher-filter__fbutton teacher-filter__ftype"
            @click.self="toggleFilter">
            <label class="teacher-filter__fbutton-label" :class="{'apply': isApplyFilter('auto_reservation')}">
                <span v-if="filter.auto_reservation.value==null">
                    Tipo de reservación
                </span>
                <span v-else>
                    {{ filter.auto_reservation.value ? 'Reservación automatica' : 'Reservación por confirmar'}}
                </span>
            </label>
            <span class="teacher-filter__fbutton-dropdown">
                <b-form-group label="Modalidad de la reservación">
                  <b-form-radio-group
                    id="radio-auto_reservation"
                    v-model="filter.auto_reservation.value"
                    name="radio-auto_reservation"
                    stacked>
                    <b-form-radio :value="true">
                        <span class="font-weight-bold h6">Automático</span>
                        <p>
                            La reserva son automaticas, no se requiere la confirmación del profesor.
                        </p>
                    </b-form-radio>
                    <b-form-radio :value="false">
                        <span class="font-weight-bold h6">Por confirmar</span>
                        <p>
                            La reserva de la clase se tiene que confirmar por el profesor.
                        </p>
                    </b-form-radio>
                    <b-form-radio :value="null">
                        <span class="font-weight-bold h6">Todos</span>
                    </b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
                <div class="teacher-filter__fbutton-dropdown-actions">
                    <!-- <button @click="defaultFilter('auto_reservation')">Remover</button> -->
                    <button @click="applyFilter('auto_reservation')">Aplicar</button>
                </div>
            </span>
        </button>
        <!-- Filter:premium -->
        
        <button
            class="teacher-filter__fbutton teacher-filter__franking"
            @click.self="toggleFilter">
            <label class="teacher-filter__fbutton-label" :class="{'apply': isApplyFilter('premium')}">
                Destacado
            </label>
            <span class="teacher-filter__fbutton-dropdown">
                <b-form-group>
                  <b-form-radio-group
                    id="radio-premium"
                    v-model="filter.premium.value"
                    name="radio-premium"
                    stacked>
                    <b-form-radio :value="true">
                        <span class="font-weight-bold h6">Destacados</span>
                        <p>Solo profesores destacados</p>
                    </b-form-radio>
                    <b-form-radio :value="false">
                        <span class="font-weight-bold h6">Todos</span>
                    </b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
                <div class="teacher-filter__fbutton-dropdown-actions">
                    <!-- <button @click="defaultFilter('premium')">Remover</button> -->
                    <button @click="applyFilter('premium')">Aplicar</button>
                </div>
            </span>
        </button>
        <!-- Filter:lenguages -->
		<button
            class="teacher-filter__fbutton teacher-filter__flang"
            @click.self="toggleFilter">
			<label class="teacher-filter__fbutton-label" :class="{'apply': isApplyFilter('languages')}">
                <span v-if="!filter.lang.value.length">Idioma</span>
                <span v-else>
                    {{ filter.lang.value.length > 1 ? `Idiomas (${filter.lang.value.length})` : filter.lang.value[0] }}
                </span>
            </label>
			<span class="teacher-filter__fbutton-dropdown">
                <b-form-group  label="Idioma del profesor">
                  <b-form-checkbox-group
                    id="checkbox-group-languages"
                    v-model="filter.lang.value"
                    :options="listLanguages"
                    stacked>
                  </b-form-checkbox-group>
                </b-form-group>
                <b-form-checkbox
                    id="checkbox-lang-all"
                    v-model="filter.lang.all"
                    name="checkbox-lang-all"
                >
                    Todos
                </b-form-checkbox>
				<div class="teacher-filter__fbutton-dropdown-actions">
					<!-- <button @click="defaultFilter('languages')">Remover</button> -->
					<button @click="applyFilter('languages')">Aplicar</button>
				</div>
			</span>
		</button>
        <!-- Filtro:last_name -->
        <div class="mr-2">
            <form class="teacher-filter__flast_name" v-on:submit.prevent="applyFilter('last_name')">
                <input
                    v-model="filter.last_name.value"
                    type="text"
                    class="form-control"
                    placeholder="Busca por su apellido...">
                <button class="btn" type="submit">
                    <i class="uil uil-search-alt"></i>
                </button>
            </form>
        </div>
        <!-- clear -->
        <button
            v-show="isFiter"
            @click="clean_filters()"
            class="teacher-filter__fbutton teacher-filter__clear">
            Borrar filtros
        </button>
	</div>
</template>

<script>
import VueSlider from 'vue-slider-component'

export default {
	components: {
		VueSlider
	},
    data: function () {
      	return {
            listLanguages: [
                'Aleman',
                'Chino',
                'Español',
                'Ingles',
                'Italiano',
                'Portugués',
                'Quechua',
            ],
      		filter: {
                premium: {
                    default: false,
                    value: false
                },
      			lang: {
                    value: [],
                    all: true
      			},
      			auto_reservation: {
      				default: null,
                    value: null,
      			},
      			price: {
                    marks: {},
      				show: false,
        			default: null,
                    value: null,
        			values: [25, null],
                    formater: 'S/ {value}.00',
      			},
                last_name: {
                    value: '',
                    default: ''
                }
      		}
		}
    },
    watch: {
        'filter.lang.value' (value) {
            this.filter.lang.all = value.length ? false : true
        },
        'filter.lang.all' (value) {
            if (value)
                this.filter.lang.value = []
        }
    },
    beforeMount() {
        this.$bus.on('maxPrice', (value) => {
            if (!this.filter.price.default) {
                this.filter.price.default = value
                this.filter.price.value = value
                this.filter.price.values = [25, value]
            }
        })
    },
    beforeDestroy () {
        this.$bus.off('maxPrice', () => {})
    },
    created () {
    	document.body.addEventListener('click', function (e) {
        	if (!e.target.closest(".teacher-filter__fbutton")) {
        		if (document.querySelector('.teacher-filter .active')) {
        			document.querySelector('.teacher-filter .active').classList.remove('active')
        		}
        	}
        });
    },
    computed: {
        isFiter () {
            return  this.isApplyFilter('price') || this.isApplyFilter('premium') || this.isApplyFilter('languages') || this.isApplyFilter('last_name') || this.isApplyFilter('ranking') || this.isApplyFilter('auto_reservation')
        }
    },
    methods: {
        applyFilter (filter) {
            let update_filter = {}
            switch (filter) {
              case 'price':
                    update_filter = {fare: this.filter.price.value}
                break;
              case 'auto_reservation':
                    const value = this.filter.auto_reservation.value
                    update_filter = {auto_reservation: value == 'all' ? null : value}
                break;
              case 'languages':
                    const isAll = this.filter.lang.value.length == this.listLanguages.length
                    update_filter = {lang: isAll ? null : this.filter.lang}
                break;
              case 'premium':
                    update_filter = {is_premium: this.filter.premium.value ? true : null}
                break;
              case 'last_name':
                    update_filter = {last_name: this.filter.last_name.value}
                break;
              case 'ranking':
                break;
              default:
                // code block
            }
            this.$bus.emit('gigs.filter:update', update_filter)
    		this.closeAllFilter();
    	},
        defaultFilter (filter, update = true) {
            let update_filter = {}
            switch (filter) {
              case 'price':
                    this.filter.price.value = this.filter.price.default
                    update_filter = {fare: this.filter.price.value}
                break;
              case 'auto_reservation':
                    this.filter.auto_reservation.value = this.filter.auto_reservation.default
                    const value = this.filter.auto_reservation.value
                    update_filter = {auto_reservation: value == 'all' ? null : value}
                break;
              case 'languages':
                    this.filter.lang.value = []
                    update_filter = {lang: this.filter.lang}
                break;
              case 'premium':
                    this.filter.premium.value = this.filter.premium.default
                    update_filter = {is_premium: this.filter.premium.value ? true : null}
                break;
              case 'last_name':
                    this.filter.last_name.value = ''
                    update_filter = {last_name: this.filter.last_name.value}
                break;
              case 'ranking':
                break;
              default:
                // code block
            }
            if (update)
                this.$bus.emit('gigs.filter:update', update_filter)
            this.closeAllFilter();
        },
        isApplyFilter (filter) {
            let isActive = false
            switch (filter) {
              case 'price':
                    return this.filter.price.value != this.filter.price.default
                break;
              case 'auto_reservation':
                    return this.filter.auto_reservation.value != this.filter.auto_reservation.default
                break;
              case 'languages':
                    return this.filter.lang.value.length
                break;
              case 'premium':
                    return this.filter.premium.value != this.filter.premium.default
                break;
              case 'last_name':
                    return this.filter.last_name.value != this.filter.last_name.default
                break;
              case 'ranking':
                    return false
                break;
              default:
                // code block
                return isActive
            }
        },
    	closeAllFilter () {
        	if (document.querySelector('.teacher-filter .active'))
        		document.querySelector('.teacher-filter .active').classList.remove('active')
    	},
    	toggleFilter () {
    		this.closeAllFilter();
        	event.target.classList.toggle('active')
		},
        clean_filters () {
            this.defaultFilter('price', false)
            this.defaultFilter('premium', false)
            this.defaultFilter('languages', false)
            this.defaultFilter('last_name', false)
            this.defaultFilter('ranking', false)
            this.defaultFilter('auto_reservation', false)
            this.$bus.emit('gigs.filter:clean')
        },
    }
}
</script>

<style lang="scss">
    .vue-slider-dot-tooltip-inner,
    .vue-slider-process {
        background-color: $primary !important;
    }
    .vue-slider-dot-tooltip-inner {
        border-color: $primary !important
    }
	@import "~vue-slider-component/theme/default.css";
    .vue-slider-mark-label {
        font-size: 10px !important;
    }
	.teacher-filter {
		display: flex;
		flex-wrap: wrap;
		padding-top:  map-get($spacers, 2);
		padding-bottom:  map-get($spacers, 2);
		margin-top: map-get($spacers, 2);
		margin-bottom: map-get($spacers, 2);
		&__fbutton {
			border: none;
			background-color: $white;
			color: $dark;
            line-height: $input-btn-line-height;
			padding: $input-btn-padding-y $input-btn-padding-x;
			margin-right: map-get($spacers, 2);
			// margin-top: map-get($spacers, 1);
            margin-bottom: map-get($spacers, 1);
			border-radius: 5px;
			outline: none;
			position: relative;
			white-space: pre;
            box-shadow: $box-shadow;
            &.apply {
                background-color: lighten($primary, 40);
                label {
                    color: $dark;
                }
            }
			label {
				cursor: pointer;
				font-size: $h6-font-size;
				line-height: 1;
				margin: auto;
                white-space: initial;
                z-index: 3;
                &.apply:before {
                    content: "";
                    width: 5px;
                    height: 5px;
                    position: absolute;
                    border-radius: 50%;
                    right: 3px;
                    top: 3px;
                    background-color: $primary;
                    z-index: 0;
                }
			}
            &-label {
				pointer-events: none;
            }
			&-dropdown {
				position: absolute;
				top: 130%;
				display: none;
				left: 0px;
				width: 300px;
				// max-width: 100%;
				padding: map-get($spacers, 3) map-get($spacers, 4);
				margin-top: map-get($spacers, 2);
				margin-bottom: map-get($spacers, 2);
				background-color: $white;
				z-index: 9;
				border-radius: 4px;
                text-align: initial;
				@extend %box-shadow-2;
				& > span {
					font-size: $h6-font-size;
					margin-bottom: 1rem;
					display: block;
					text-align: left;
				}
				.vue-slider {
					margin-bottom: 30px;
				}
				&-actions {
					position: relative;
					display: flex;
					align-items: center;
					justify-content: flex-end;
                    border-top: 1px solid $gray-300;
                    padding-top: 8px;
					* {
						border: none;
						padding: 0;
						outline: none;
						box-shadow: none;
						background-color: transparent;
						font-size: $h6-font-size;
						color: $dark;
						&:last-child {
							font-weight: 600;
							margin-right: 0;
							color: $primary;
                            margin-left: auto;
						}
					}
				}
			}
			&.active ~ &-dropdown,
			&.active &-dropdown {
				display: block;
			}
		}
        &__flast_name {
            display: flex;
            position: relative;
            input {
                padding-right: 30px;
            }
            button {
                position: absolute;
                top: 0;
                right: 0;
                padding-left: .25rem;
                padding-right: .25rem;
            }
        }
        &__clear {
            background-color: $danger;
            color: $white;
        }
	}
    // #checkbox-group-languages {
        .custom-control.custom-checkbox {
            display: flex;
            text-align: left;
            align-items: center;
            width: 100%;
            margin-bottom: .5rem;
            label {
                margin-left: initial;
                &::after,
                &::before {
                    top: -3px;
                }
            }
        }
    // }
    .custom-control-label::before,
    .custom-control-label::after {
        top: 0
    }
</style>
