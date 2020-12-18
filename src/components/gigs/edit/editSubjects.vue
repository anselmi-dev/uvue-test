<template>
    <div class="teacher-create__step">
        <div class="punku__title mb-0">
            Has escogido dar clases de {{ category }}
        </div>

        <div class="teacher-create__subtitle--muted center">
            Incorpora otras disciplinas relacionadas. Máximo {{max - 1}} por especialidad.
        </div>

        <vue-content-loading v-if="isLoading" :width="340" :height="84" :primary="'#c7c7c7'" :secondary="'#4b8dd2'">
            <rect x="71" y="3" rx="3" ry="3" width="67" height="11" />
            <rect x="155" y="3" rx="3" ry="3" width="140" height="11" />
            <rect x="139" y="43" rx="3" ry="3" width="53" height="11" />
            <rect x="202" y="43" rx="3" ry="3" width="72" height="11" />
            <rect x="27" y="43" rx="3" ry="3" width="100" height="11" />
            <rect x="283" y="43" rx="3" ry="3" width="37" height="11" />
            <rect x="17" y="23" rx="3" ry="3" width="140" height="11" />
            <rect x="166" y="23" rx="3" ry="3" width="173" height="11" />
            <rect x="140" y="64" rx="3" ry="3" width="60" height="15" />
        </vue-content-loading>

        <div v-else>
            <autocomplete
                class="punku-search-tacher__input-search"
                :search="search"
                @submit="handleSubmit"
                v-on:keyup.enter="handleSubmit"
                :get-result-value="getResultValue"
                :placeholder="'Busca tu especialidad...'">
            </autocomplete>
            <div class="teacher-create__subtitle--muted mt-1 mb-4 font-weight-normal">
                <small>Ejemplo: Matemáticas, Física, Quimica, etc</small>
            </div>

            <div class="teacher-create__soptions">
                <label
                    class="mb-2 pill"
                    v-for="(discipline, index) in listDisciplines"
                    :for="discipline._id"
                    :key="index">
                    <input
                        type="checkbox"
                        v-model="disciplines"
                        :id="discipline._id"
                        :name="discipline._id"
                        :value="discipline">
                    <span>{{discipline.title}}</span>
                </label>

                <div v-show="!listDisciplines.length" class="alert alert-warning">
                    Su especialidad no posee disciplina relacionada. Puede continuar.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SubjectsService from '@/services/subjects.service';
import VueContentLoading from 'vue-content-loading';
import '@trevoreyre/autocomplete-vue/dist/style.css'
import Autocomplete from '@trevoreyre/autocomplete-vue'

export default {
    components: {
        Autocomplete,
        VueContentLoading
    },
    props: {
        subjects: {
            type: Array,
            required: false,
            default: []
        }
    },
    data () {
        return {
            category: '',
            isPushMateria: false,
            disciplines: [],
            listDisciplines: [],
            isLoading: true,
            max: 5
        };
    },
    watch: {
        disciplines (value) {
            if (this.disciplines.length > this.max) {
                document.getElementById(this.disciplines[this.max]._id).checked = false
                this.disciplines.splice(this.max,1)
            }
        }
    },
    mounted () {
        this.disciplines = [... this.subjects]
        this.category = this.subjects[0].category
        this.isLoading = false
        this.getDisciplines(true)
    },
    methods: {
        isMateria (discipline) {
            if (this.category == discipline.title && !this.isPushMateria) {
                this.isPushMateria = true
                this.disciplines.push(discipline)
                return false
            }
            return true
        },
        find (discipline) {
            return this.disciplines.findIndex(item => item == discipline) < 0
        },
        getDisciplines () {
            this.isLoading = true
            this.isPushMateria = false
            SubjectsService.getDisciplinesByField('category', this.category).then(
                result => {
                    this.isLoading = false
                    this.listDisciplines = result.subjectList
                },
                error => {
                    this.isLoading= false
                    console.error(error)
                }
            )
        },
        search(input) {
            if (input.length < 3) { return [] }

            return SubjectsService.getDisciplinesByField('category', input).then(
                result => {
                    return [...new Set(result.subjectList.map(discipline => {
                        return discipline.category
                    }))]
                },
                error => {
                    this.isLoading= false
                    console.error(error)
                    return []
                }
            )
        },
        getResultValue (value) {
            return value
        },
        handleSubmit(result)  {
            if (result) {
                if (result.target) {
                    this.category = result.target.value
                } else
                    this.category = result
                this.disciplines = []
                this.getDisciplines()
            }
        },
    }
}
</script>
