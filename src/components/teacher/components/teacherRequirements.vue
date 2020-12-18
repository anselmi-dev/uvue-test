<template>
	<div class="teacher-requirements" v-if="requirements">
		<div class="teacher-information__title">
			Requisitos previos para la clase
		</div>
		<div class="teacher-information__content break-all">
			{{ requirements }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		requirements: {
			type: String,
			default: null,
		}
	}
}
</script>
