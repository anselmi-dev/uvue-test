<template>
	<div class="teacher-statistics">
		<div class="teacher-statistics__title">
			Estadísticas
		</div>
		<div class="teacher-statistics__container">
			<div class="teacher-statistics__block">
				<div class="teacher-statistics__block-top">
					<span>0</span>
					<label>Clases completadas</label>
				</div>
				<div class="teacher-statistics__block-bottom">
					<teacherGrafic />
				</div>
			</div>
			<div class="teacher-statistics__block">
				<div class="teacher-statistics__block-top">
					<span>0%</span>
					<label>Porcentaje de respuesta</label>
				</div>
				<div class="teacher-statistics__block-bottom">
					<teacherGrafic />
				</div>
			</div>
			<div class="teacher-statistics__block">
				<div class="teacher-statistics__block-top">
					<span>0%</span>
					<label>Porcentaje de asistencia</label>
				</div>
				<div class="teacher-statistics__block-bottom">
					<teacherGrafic />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import teacherGrafic from './teacherGrafic'

export default {
	components: {
		teacherGrafic
	}
}
</script>
