<template>
	<div class="teacher-statistics">
        <div class="row">
            <div class="col">
                <div class="d-statistics">
                    <div class="d-statistics__icon"></div>
                    <div class="d-statistics__content">
                        <div class="label">$1512</div>
                        <div class="muted">Publicaciones activas</div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="d-statistics">
                    <div class="d-statistics__icon"></div>
                    <div class="d-statistics__content">
                        <div class="label">$1512</div>
                        <div class="muted">121</div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="d-statistics">
                    <div class="d-statistics__icon"></div>
                    <div class="d-statistics__content">
                        <div class="label">$1512</div>
                        <div class="muted">121</div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
		<div class="teacher-statistics__container">
			<div class="teacher-statistics__block">
				<div class="teacher-statistics__block-top">
					<span>18</span>
					<label>Clases completadas</label>
				</div>
				<div class="teacher-statistics__block-bottom">
					<teacherGrafic />
				</div>
			</div>
			<div class="teacher-statistics__block">
				<div class="teacher-statistics__block-top">
					<span>100%</span>
					<label>Porcentaje de respuesta</label>
				</div>
				<div class="teacher-statistics__block-bottom">
					<teacherGrafic />
				</div>
			</div>
			<div class="teacher-statistics__block">
				<div class="teacher-statistics__block-top">
					<span>100%</span>
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
import teacherGrafic from '@/components/teacher/statistics/teacherGrafic'

export default {
	components: {
		teacherGrafic
	}
}
</script>


<style lang="scss">
    .d-statistics {
        display: flex;
        align-items: center;
        justify-content: space-around;
        &__icon {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            background: $gray-200;
        }
        &__content {
            text-align: right;
            .label {
                font-size: 2rem;
            }
            .muted {
                color: $gray-600;
                font-size: 1rem;
            }
        }
    }
</style>
