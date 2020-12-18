<template>
	<div class="page-premium">
		<div class="container">
			<div class="row">
				<div class="col-12 col-md-8 col-lg-6 mx-auto">

					<div class="punku-box">
						<div class="row row--sm text-center">
							<div class="col">
								<img :src="require('@/assets/icons/gemas.svg')" alt="gema premium" width="100" class="mb-2">
							</div>
							<div class="col-12">
								<h2 class="text-center my-2">
									Hazte Premium. Sé feliz.
								</h2>
							</div>
						</div>
						<hr>
						<div class="row row--sm my-3 py-1 align-items-center">
							<div class="col-auto">
								<img :src="require('@/assets/icons/eficiencia.svg')" alt="gema premium" width="100" class="mb-2">
							</div>
							<div class="col">
								<h5 class="font-weight-bold mb-1">Aumenta tu visibilidad</h5>
								Tus anuncios aparecerán entre los principales resultados de búsqueda y obtén la insignia de destacado.
							</div>
						</div>
						<div class="row row--sm my-3 py-1 align-items-center">
							<div class="col">
								<h5 class="font-weight-bold mb-1">Agrega más anuncios</h5>
								Crea hasta 3 anuncios y aprovecha todo tu talento.
							</div>
							<div class="col-auto">
								<img :src="require('@/assets/icons/anuncio.svg')" alt="gema premium" width="100" class="mb-2">
							</div>
						</div>
						<div class="row row--sm my-3 py-1 align-items-center">
							<div class="col-auto">
								<img :src="require('@/assets/icons/proceso.svg')" alt="gema premium" width="100" class="mb-2">
							</div>
							<div class="col">
								<h5 class="font-weight-bold mb-1">Mejora tu perfil</h5>
								Documenta tu CV, graba un video de presentación de mayor duración y genera más confianza.
							</div>
						</div>
						<div class="row row--sm my-3 py-1 align-items-center">
							<div class="col">
								<h5 class="font-weight-bold mb-1">Visualiza más estadísticas</h5>
								Accede a estadísticas más detalladas y desarrolla estrategias para lograr tus objetivos.
							</div>
							<div class="col-auto">
								<img :src="require('@/assets/icons/habilidades.svg')" alt="gema premium" width="100" class="mb-2">
							</div>
						</div>
						<hr>
						<div class="row row--sm my-3 py-1 align-items-center">
							<div class="col">
								<button class="btn btn-primary w-100"  @click="setPremium" >
									<strong>
										{{ isPremium ? 'CANCELAR' : 'SE PREMIUM' }}
									</strong>
								</button>
							</div>
							<div class="col-12 text-center mt-2">
								<router-link :to="{name: 'contact'}">Contáctanos para más información</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TeacherServices from '@/services/teacher.service';

export default {
	methods: {
        setPremium () {
            TeacherServices.updateTeacher({is_premium: !this.isPremium}).then(resp => {
                this.user.teacher.is_premium = !this.isPremium
                this.$bus.emit("notifications:push", {
                    type: 'dark',
                    message: 'Sus preferencias de cobro fue actualizada correctamente!'
                })
            })
            .catch(err => {
                let responseError = 'Ocurrio un error! Intente nuevamente o más tarde.'
                try { responseError = err.response.data.err } catch (e) {}

                this.$bus.emit("notifications:push", { title: 'Ups!', type: 'error', message: responseError })
            })
        }
	}
}
</script>
