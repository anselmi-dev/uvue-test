<template>
	<div class="punku-search">
    {{value}}
    <multiselect
      class="punku-search-tacher__input-search"
      v-model="value"
      @select="handleSubmit"
      :searchable="true"
      :loading="isLoading"
      :internal-search="false"
      :clear-on-select="false"
      :max-height="600"
      :show-no-results="true"
      :show-no-options="false"
      :hide-selected="false"
      :preserveSearch="true"
      @search-change="getDisciplines"
      :options="disciplines"
      group-values="titles"
      group-label="category"
      label="title"
      placeholder="Busca aquí lo que quieres aprender"
      selectLabel=""
      >
        <span slot="noResults">
          listado
        </span>
      </multiselect>
	</div>
</template>

<script>
import SubjectsService from '@/services/subjects.service';
import Multiselect from 'vue-multiselect'

export default {
	components: {
    Multiselect
	},
  data () {
      return {
          value: '',
          isLoading: false,
          disciplines: []
      }
  },
  methods: {
    getResultValue (value) {
      return value.title
    },
    handleSubmit(value) {
      if (this.$router.currentRoute.name == 'search.teacher') {
        window.location.href = this.$router.resolve({name: 'search.teacher', params: {slug: value.title} }).href
        console.log({value: this.value})
      } else {
        console.log({value: this.value})
        this.$router.push({name: 'search.teacher', params: {slug: value.title} })
      }
    },
    getDisciplines (input) {
        this.isLoading = true
        SubjectsService.getDisciplinesByField('title', input).then(
            result => {
                this.isLoading= false
                this.disciplines = [...result.subjectList.reduce((r, { category, title }) => {
                  r.has(category) || r.set(category, {
                    category,
                    titles: []
                  });

                  r.get(category).titles.push({ title });

                  return r;
                }, new Map).values()];
            },
            error => {
                this.isLoading= false
                console.error(error)
            }
        )
    }
	}
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
  @media screen and (max-width: 767px)
  {
    header .punku-search {
      display: none !important;
    }
  }
  .punku-search {
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    // @extend %col;
    flex: 0 0 50%;
    max-width: 50%;
  }
  .autocomplete-input {
    padding: 9px 9px 9px 48px !important;
    font-size: 13px;
    line-height: 1;
    background-size: 20px;
  }

  .punku-search-tacher__input-search .multiselect__placeholder:before {
    content: '\eb72';
    font-family: unicons;
    font-style: normal;
    font-weight: 400;
    speak: none;
    display: inline-block;
    text-decoration: inherit;
    width: 1em;
    margin-right: .2em;
    text-align: center;
    font-variant: normal;
    text-transform: none;
    line-height: 1em;
    margin-left: .2em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .punku-search-tacher__input-search .multiselect__placeholder {
    font-size: 16px;
  }
  .punku-search-tacher__input-search .multiselect__select:before {
    display: none;
  }
  span.multiselect__option:not(.multiselect__option--disabled) {
    padding-left: 25px;
  }
.multiselect__option--highlight {
    background: $primary;
    outline: none;
    color: #fff;
}
</style>
