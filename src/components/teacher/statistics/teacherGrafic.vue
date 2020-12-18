<template>
	<div class="teacher-grafic">
		<div class="teacher-grafic__block">
			<div class="teacher-grafic__data teacher-grafic__data1">
				<div class="label">
					Enero
					<span>0%</span>
				</div>
				<span class="data">
					<span></span>
				</span>
			</div>
			<div class="teacher-grafic__data teacher-grafic__data2">
				<div class="label">
					Febrero
					<span>0%</span>
				</div>
				<span class="data">
					<span></span>
				</span>
			</div>
			<div class="teacher-grafic__data teacher-grafic__data3">
				<div class="label">
					Marzo
					<span>0%</span>
				</div>
				<span class="data">
					<span></span>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			default: null
		}
	}
}
</script>

<style lang="scss">
	.teacher-grafic {
		margin-top: .5rem;
		@extend %row;
		padding-right: 0px;
		padding-left: 0px;
		width: 100%;
		&__block {
			@extend %col;
			padding-right: 0px;
			padding-left: 0px;
			width: 100%;
		}
		&__data {
			margin-bottom: map-get($spacers, 1);
			display: block;
			.label,
			.data {
				display: block;
				display: flex;
				justify-content: space-between;
				margin: 0;
			}
			.data {
				background-color: $gray-200;
				span {
					width: 0%;
					height: 20px;
					background-color: $primary;
					display: inline-block;
					margin-right: 2px;
				}
			}
		}
	}
</style>