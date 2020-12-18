<template>
  	<div>
	  	<div class="header-xl">
	  		<Header/>
		    <div class="header-home">
		      <carousel class="header-home__carousel" :autoplay="true" :autoplayHoverPause="true" :loop="true" :nav="false" :items="1" :pagination-enabled="false">
		        <div class="header-home__carousel-img"
		          :style="{backgroundImage: 'url(' + require('@/assets/images/hero/bg-hero-abcd.jpg') + ')' }">
		        </div>
		      </carousel>

		      <div class="header-home__content">
		        <div class="container">
		          <div class="header__hero-title">
		            Aprende o refuerza lo que quieras, cuando quieras y desde donde quieras
		          </div>
		          <div class="header__hero-subtitle">
		            La plataforma peruana donde encuentras profesores, mentores, especialistas y apasionados, en un aula virtual intuitiva y segura
		          </div>
		        </div>
		      </div>
		    </div>
	  	</div>
	  	<hr>
	  	<div class="header-lg">
	  		<Header/>
		    <div class="header-home">
		      <carousel class="header-home__carousel" :autoplay="true" :autoplayHoverPause="true" :loop="true" :nav="false" :items="1" :pagination-enabled="false">
		        <div class="header-home__carousel-img"
		          :style="{backgroundImage: 'url(' + require('@/assets/images/hero/bg-hero-abcd.jpg') + ')' }">
		        </div>
		      </carousel>

		      <div class="header-home__content">
		        <div class="container">
		          <div class="header__hero-title">
		            Aprende o refuerza lo que quieras, cuando quieras y desde donde quieras
		          </div>
		          <div class="header__hero-subtitle">
		            La plataforma peruana donde encuentras profesores, mentores, especialistas y apasionados, en un aula virtual intuitiva y segura
		          </div>
		        </div>
		      </div>
		    </div>
	  	</div>
  	</div>
</template>

<script>
import Header from '@/components/Header';
import carousel from 'vue-owl-carousel'

export default {
	components: {
		carousel,
		Header
	}
}
</script>

<style lang="scss">
	.header-lg .header__logo {
		height: 40px
	}
	.header-xl .header__logo {
		height: 50px
	}
</style>
