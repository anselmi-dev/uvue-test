<template>
    <div class="create-teacher-page">
		<div class="py-10">
			<div class="container m-auto py-4">
				<b-row class="align-items-center">
					<b-col sm="12" md="8" lg="6">
						<div class="">
							<h1 class="mb-1 text-uppercase">
								<strong>Enseña en Punku</strong>
							</h1>
							<h3>
								Se parte de la transformacion en la enseñanza, compartiendo lo que te apasiona.
							</h3>
							
							<b-row class="py-3 row--xs">
								<b-col cols="auto">
									<router-link :to="{ name: 'teacher.create'}" class="btn btn-primary mx-2">
										INICIAR SOLICITUD
									</router-link>
								</b-col>
								<b-col cols="auto">
									<a href="javascript:document.getElementById('section-why-punku').scrollIntoView()"  class="btn btn-outline-primary mx-2">
										SABER MÁS
									</a>
								</b-col>
							</b-row>
						</div>
					</b-col>
					<b-col md="4" lg="6" class="d-none d-md-flex">
						<img src="http://via.placeholder.com/640x360&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
							style="transform: scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg);" alt="" class="rounded">
					</b-col>
				</b-row>
			</div>
		</div>
		<div class="py-2 py-lg-5">
			<div class="container py-3">
				<b-row>
					<b-col cols="12" md="10" lg="8" class="mx-auto">
						<b-row class="py-2 py-lg-5">
							<b-col cols="12" class="mx-auto text-center">
								<h1 class="text-uppercase"  id="section-why-punku"><strong>¿Por qué enseñar en Punku?</strong></h1>
							</b-col>
						</b-row>
						<b-row class="align-items-center mb-4">
							<b-col cols="8" md="9">
								<h3 style="font-weight: 600">Trabaja para ti</h3>
								<h4>Elige tus horarios, tarifas, descansos y el lugar desde donde quieras enseñar.</h4>
							</b-col>
							<b-col cols="4" md="3">
								<!-- <img src="http://via.placeholder.com/640x360" class="mx-100"> -->
							</b-col>
						</b-row>
						<b-row class="align-items-center text-right mb-4">
							<b-col cols="4" md="3">
								<!-- <img src="http://via.placeholder.com/640x360" class="mx-100"> -->
							</b-col>
							<b-col cols="8" md="9">
								<h3 style="font-weight: 600">Aprovecha tu talento</h3>
								<h4>Utiliza tus conocimientos, experiencias y habilidades para generar ingresos.</h4>
							</b-col>
						</b-row>
						<b-row class="align-items-center mb-4">
							<b-col cols="8" md="9">
								<h3 style="font-weight: 600">Aumenta tus posibilidades</h3>
								<h4>Llega a más personas e incrementa tu reputación recibiendo opiniones y recomendaciones.</h4>
							</b-col>
							<b-col cols="4" md="3">
								<!-- <img src="http://via.placeholder.com/640x360" class="mx-100"> -->
							</b-col>
						</b-row>
						<b-row class="align-items-center text-right mb-4">
							<b-col cols="4" md="3">
								<!-- <img src="http://via.placeholder.com/640x360" class="mx-100"> -->
							</b-col>
							<b-col cols="8" md="9">
								<h3 style="font-weight: 600">Todo en un solo lugar</h3>
								<h4>Lleva el control de tus reservas, clases, alumnos, archivos, estadísticas y más, todo en una increíble aula virtual.</h4>
							</b-col>
						</b-row>
						<b-row class="align-items-center">
							<b-col cols="8" md="9">
								<h3 style="font-weight: 600">Enfócate sólo en enseñar</h3>
								<h4>Nos encargamos de los cobros, te pagamos sin requerir monto minimo y te asistimos con nuestras notificaciones.</h4>
							</b-col>
							<b-col cols="4" md="3">
								<!-- <img src="http://via.placeholder.com/640x360" class="mx-100"> -->
							</b-col>
						</b-row>
						<b-row>
							<b-col cols="12" class="text-center pt-5">
								<router-link :to="{ name: 'teacher.create'}" class="btn btn-primary mx-2 btn-lg">
									INICIAR SOLICITUD
								</router-link>
							</b-col>
						</b-row>
					</b-col>
				</b-row>
			</div>
		</div>
    </div>
</template>

<script>
import WhyTeacher from '@/components/blocks/WhyTeacher.vue'

export default {
  components: {
    WhyTeacher,
  }
}
</script>

<style lang="scss" scoped>
	.page-head {
		margin-top: map-get($spacers, 3);
		margin-bottom: map-get($spacers, 5);
		&__title {
			font-size: $h3-font-size;
		}
		&__subtitle {
			font-size: $h6-font-size;
			color: $gray-600;
		}
		&--center {
			text-align: center;
		}
	}
	$rootHeader: ".block-slide-information";
	#{$rootHeader} {
		background-color: $white;
		@extend %box-shadow-2;
		padding: map-get($spacers, 2);
		margin-bottom: map-get($spacers, 3);
		position: relative;
		overflow: hidden;
		display: flex;
		&__slide {
			position: relative;
			// background-color: lighten($secondary, 30%);
			width: 100%;
			&:before {
			    -webkit-transform: skewX(-3deg);
			    transform: skewX(-3deg);
			    content: "";
				// background-color: lighten($secondary, 30%);
				border-left: 2px solid $primary;
			    width: 30px;
			    position: absolute;
			    left: -10px;
			    top: 0;
			    bottom: 0;
			    z-index: 1;
			}
			svg {
			    position: absolute;
			    top: 0;
			    height: 80%;
			    left: 0;
			    margin: auto;
			    right: 0;
			    bottom: 0;
			}
		}
		&__content {
			padding: 15px 25px 15px 15px;
		}
		&__title {
			font-size: $h5-font-size;
			font-weight: 500;
			margin-bottom: 10px;
			position: relative;
			&:after {
				content: "";
				width: 35px;
				max-width: 100%;
				height: 2px;
				background-color: $primary;
				display: block;
			}
		}
		&__text {
			color: $gray-600;
		}
		&__action {
			text-align: right;
			margin-right: 10px;
			button {
				border: none;
				background-color: $primary;
				color: $white;
				box-shadow: none;
				margin-top: map-get($spacers, 2);
				position: relative;
				@extend %slider-button;
				&:after,
				&:before {
					background-color: $primary;
				}
			}
		}

		&--right {
			#{$rootHeader}__content { order: 1; padding: 15px 15px 15px 25px; }
			#{$rootHeader}__slide {
				&:before {
					left: initial;
					right: -10px;
					border-left: none !important;
					border-right: 2px solid $primary;
				}
			}
		}
		@media screen and (max-width: 768px) {
			&__slide {
				width: 70%;
			}
		}
		@media screen and (max-width: 600px) {
			&__content {
				padding: 15px;
			}
			&__action {
				margin: auto;
				text-align: center;
			}
			&__slide {
				display: none;
				&:before {
					display: none;
				}
			}
		}
	}
</style>
