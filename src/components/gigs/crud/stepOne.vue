<template>
	<div class="teacher-create__step" :id="'teacher-create-'+index">
		<!-- Materia -->
        <div class="punku__title">
            ¿Qué especialidad quieres enseñar?
        </div>
        <div class="teacher-create__subtitle--muted mt-1 font-weight-normal" style="font-size:24px">
        	<small>Escoge el tema que quieres enseñar, usando nuestra barra de búsqueda:</small>
    	</div>
        <multiselect
            class="punku-search-tacher__input-search"
            v-model="value"
            @select="handleSubmit"
            :searchable="true"
            :loading="isLoading"
            :internal-search="false"
            :clear-on-select="false"
            :max-height="600"
            :show-no-results="false"
            :hide-selected="true"
            :preserveSearch="true"
            @search-change="getDisciplines"
            :options="disciplines"
            group-values="titles"
            group-label="category"
            label="title"
            placeholder="Busca tu especialidad..."
            selectLabel=""
        >
            <span slot="noOptions">
                Ingrese un termino de busqueda
            </span>
        </multiselect>
        <div class="teacher-create__subtitle--muted mt-1 font-weight-normal">
        	<small>Ejemplo: Matemáticas, Física, Quimica, etc</small>
    	</div>
        <div class="teacher-create__subtitle--muted mt-1 font-weight-normal" style="font-size:24px">
        	<small>O búscalo a través de nuestras categorías:</small>
    	</div>
        <b-row class="row-categories-disciplines justify-content-center">
            <div v-for="(itemGroups, index) in groups" :key="index" style="width: 90px" @click="handleGroup(itemGroups)" class="cursor-pointer">
                <div>
                    <!-- <img :src="require('@/assets/images/categories/matematicas.jpg')" alt="matematicas"> -->
                    <i class="uil uil-question-circle h2 mb-0"></i>
                </div>
                <span>{{ itemGroups.category }}</span>
            </div>
        </b-row>
        <hr class="d-block w-100">
        <div v-if="showFamilies">
                <div class="punku__title mb-2">
                    Estas son las subcategorías de {{ selectedGroup }}
                </div>
                <div class="teacher-create__soptions">
                    <label
                        class="mb-2 pill"
                        v-for="(category, index) in categories"
                        :key="index">
                        <span @click="handleCategory(category.category)">{{ category.category }}</span>
                    </label>
                </div>
            </div>
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {VueAvatar} from 'vue-avatar-editor-improved'

import teacherCreate from '@/mixins/teacherCreate'
import SubjectsService from '@/services/subjects.service';

export default {
    mixins: [teacherCreate],
    components: {
        Multiselect
    },
    data () {
        return {
            value: '',
            isLoading: false,
            disciplines: [],
            showFamilies: false,
            groups: [],
            categories: [],
            selectedGroup: ''
        }
    },
    mounted (){
        SubjectsService.getAllSubjectsGroups().then(
            result => {
                this.groups = result;
            },
            error => {
                this.isLoading= false
                console.error(error)
            }
        )
    },
    methods: {
        getDisciplines (input) {
            this.showFamilies = false
            this.isLoading = true
            SubjectsService.getDisciplinesByField('title', input).then(
                result => {
                    this.isLoading= false
                    this.disciplines = [...result.subjectList.reduce((r, { category, title, _id }) => {
                    r.has(category) || r.set(category, {
                        category,
                        titles: [],
                        _id
                    });

                    r.get(category).titles.push({ category, title, _id });

                    return r;
                    }, new Map).values()];
                },
                error => {
                    this.isLoading= false
                    console.error(error)
                }
            )
        },
        getResultValue (value) {
            return value.title
        },
        handleGroup (group) {
            SubjectsService.getDisciplinesByField('group', group.category).then(
                result => {
                    this.isLoading= false
                    this.categories = [...new Map(result.subjectList.map(item => [item['category'], item])).values()];
                    this.showFamilies = true;
                    this.selectedGroup = group.category;
                },
                error => {
                    this.isLoading= false
                    console.error(error)
                }
            )
        },
        handleCategory (input) {
            this.nextStep(input);
        },
        handleSubmit (result) {
            if (result) {
                if (result.target) {
                    this.nextStep(result.target.value)
                } else
                    this.nextStep(result.category)
            }
        },
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
    .row-categories-disciplines > div {
        text-align: center;
        margin: .5rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        div {
            display: flex;
            width: 50px;
            height: 50px;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            box-shadow: 0 3px 3px #a8a8a8;
            padding: .25rem;
            margin-bottom: .25rem;
            cursor: pointer;
        }
        img {
            max-height: 80%;
            max-width: 80%;
        }
        span  {
            width: 100%;
            font-size: .8rem;
        }
        // margin: auto;
    }
</style>
