<template>
	<div class="loading-card-teacher punku-tacher-card">
		<div class="punku-tacher-card__blockl">
			<div class="punku-tacher-card__detail">
				<div class="punku-tacher-card__avatar"></div>
                <div class="punku-tacher-card__information">
                    <div class="punku-tacher-card__profession">
                        <label v-line-clamp:20="2" class="loading__text">Lorem, ipsum dolor</label>
                    </div>
                    <div class="punku-tacher-card__pricehour">
                        <span class="loading__text">Lorem, ipsum dolor</span>
                    </div>
                </div>
			</div>
		</div>
		<div class="punku-tacher-card__blockr">
			<div class="punku-tacher-card__bio">
				<span v-line-clamp:20="3" class="loading__text">
					Lorem, ipsum dolor sit amet, consectetur adipisicing elit. Possimus sapiente asperiores autem?
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss">
	.loading__text {
		background: #dee2e6;
		color: transparent !important;
	}
	.loading-card-teacher {
		.punku-tacher-card__avatar {
			background-image: none;
		}
	}
</style>