<template>
	<div class="punku-search-tacher">
		<div class="container">
			<FilterTeacher/>

			<loading-search-teacher v-if="isLoading"></loading-search-teacher>
			<div v-else>
				<div class="punku-search-tacher__title">
					<div v-if="level == 1">
						<span class="_title">Elige tu mejor alternativa para aprender <b>{{ subject }}</b></span>
						<div class="punku-search-tacher__tcount">
							<b>{{ gigs.metadata[0] ? gigs.metadata[0].totalDocs : 0 }}</b> {{ gigs.metadata[0] ? gigs.metadata[0].totalDocs > 1 ? 'opciones' : 'opcion' : 'opciones'}}
						</div>
					</div>
					<h4 class="mb-1" v-if="level == 2">
						Lo sentimos, pero por ahora no tenemos alternativas para <b-badge variant="light"><router-link :to="{name: 'search.teacher'}" class="text-dark">{{ subject }} x</router-link></b-badge>
					</h4>
					<h4 class="mb-1" v-if="level == 3">
						No tenemos resultados para <b-badge variant="light"><router-link :to="{name: 'search.teacher'}" class="text-dark">{{ subject }} x</router-link></b-badge>
					</h4>
					<h4 class="mb-1" v-if="level == 4">
						No encontramos ningun resultados. Intente con otra busqueda
					</h4>
				</div>
				<div class="punku-search-tachers">
					<div class="row" v-if="gigs.docs.length" ref="scrolled">
						<div class="col-6 col-lg-4 col-xl-3 px-2" v-for="(gig, index) in gigs.docs" :key="index">
							<card-teacher :gig="gig"/>
						</div>
						<div class="col-12 text-center mt-3" v-show="gigs.nextPage">
							<button class="btn btn-outline-primary" @click="getMoreGigs">
								VER MÁS
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CardTeacher from '@/components/teacher/CardTeacher'
import FilterTeacher from '@/components/teacher/FilterTeacher'
import loadingSearchTeacher from '@/components/teacher/loading/loadingSearchTeacher';
import teacherSimilar from '@/components/teacher/opinions/teacherSimilar'
import Paginate from 'vuejs-paginate'
import GigsFilterService from '@/services/gigs-filter.services'

export default {
	components	: {
	CardTeacher,
	FilterTeacher,
	Paginate,
    loadingSearchTeacher,
    teacherSimilar
	},
  data () {
    return {
      	isLoading: true,
      	gigs: null,
      	subject: null,
      	level: 1,
      	filter: {
			page: 1
	  	},
    }
  },
    watch: {
		$route(to, from) {
			if (!to.params.slug) {
				this.gigs = null
				this.filter = { page: 1 }
				this.isLoading = true
				this.subject = ''
				this.getGigs(true)
			}
        }
    },
  beforeMount() {
    this.$bus.$on("gigs.filter:update", this.updateFilter)
    this.$bus.$on("gigs.filter:clean", this.cleanFilters)
    this.subject = this.$route.params.slug ? this.$route.params.slug : ''
    this.getGigs()
  },
  beforeDestroy() {
    this.$bus.$off("gigs.filter:update")
    this.$bus.$off("gigs.filter:clean")
  },
	methods: {
    cleanFilters () {
		this.gigs = null
		this.filter = { page: 1, maxPrice: this.filter.maxPrice }
      	this.isLoading = true
      	this.getGigs(true)
	},
    updateFilter (object) {
      this.gigs = null
      let newFilter = Object.assign(this.filter, object)
      this.clean(newFilter)
      this.filter = newFilter
      this.isLoading = true
      this.getGigs(true)
    },
    getGigs (refresh = false) {
		this.filter.page = this.gigs && this.gigs.nextPage ? this.gigs.nextPage : 1
      GigsFilterService.getGigsFilteredBy(this.subject, this.filter)
      .then((resp) => {
		this.level = resp.level
		const gigs = resp.data
		this.$bus.$emit('maxPrice', resp.maxPrice)
        if (!this.gigs) {
			this.gigs = gigs
			this.gigs.nextPage = resp.nextPage
		}
        else {
          this.gigs.docs = this.gigs.docs.concat(gigs.docs)
          this.gigs.nextPage = resp.nextPage
        }
        this.isLoading = false
      })
    },
    getMoreGigs () {
      this.getGigs()
    },
    clean (obj) {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
      }
    }
  }
}

</script>

<style lang="scss">
	.punku-pagination {
  	padding: 0;
  	align-items: center;
  	justify-content: center;
  	display: flex;
		margin-top: map-get($spacers, 2);
		margin-bottom: map-get($spacers, 4);
		* {
			display: inline-block;
			margin: .2rem 0.3rem;
			a {
				outline: none;
				&:active,
				&:focus {
					outline: none;
				}
				&.active {
					color: $primary;
				}
			}
		}
	}
	.punku-search-tacher {
		display: block;
		width: 100%;
		margin-bottom: map-get($spacers, 2);
		&__tcount {
			font-size: $h6-font-size;
	    background: $gray-300;
	    display: inline-block;
	    border-radius: 2px;
	    padding: 0px 10px;
	    color: $dark;
	    margin-right: .5rem;
		}
		&__title {
			font-size: $h6-font-size;
			margin-bottom: map-get($spacers, 2);
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			._title {
				padding-right: map-get($spacers, 2);
			}
		}
	}
</style>
