<template>
	<div class="loading-search-teacher">
      <div class="punku-search-tacher__title">
        <span class="punku_title loading__text">Encuentra al mejor profesor de XXXX para ti.</span>
        	<div class="punku-search-tacher__tcount loading__text ml-2">
          		4666 profesores
        	</div>
      	</div>
        <div class="punku-search-tachers">
	      <div class="row">
	        <div class="col-6 col-lg-4 col-xl-3 px-2" v-for="i in [1, 2, 3, 4]">
	          <loadingCardTeacher />
	        </div>
	      </div>
      	</div>
	</div>
</template>

<script>
import loadingCardTeacher from './loadingCardTeacher';

export default {
	components: {
		loadingCardTeacher
	}
}
</script>
