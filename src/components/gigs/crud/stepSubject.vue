<template>
    <div class="teacher-create__step" :id="'teacher-create-'+index" :class="{'teacher-create__step-error': isError}">
        <div class="punku__title mb-0">
            Elige hasta 5 temas de {{ materia }}
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
            <div class="teacher-create__soptions">
                <label
                    class="mb-2"
                    :for="discipline._id"
                    v-for="(discipline) in disciplines"
                    :key="'check-' + discipline._id">
                    <input type="checkbox" v-model="disciplines" :id="discipline._id" :name="discipline._id" :value="discipline">
                    <span>{{discipline.title}}</span>
                </label>

                <hr class="d-block w-100" v-show="listDisciplines.length">

                <label
                    class="mb-2 pill"
                    :for="discipline._id"
                    v-for="(discipline, index) in listDisciplines"
                    :key="index"
                    v-show="find(discipline)">
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

            <div v-if="$v.disciplines.$invalid" class="d-block text-danger text-center">
                Debes seleccionar por lo menos una disciplina para continuar.
            </div>
            <div class="teacher-create__actions" v-if="!$v.disciplines.$invalid" v-show="isVisible">
                <button @click="next">
                    Siguiente
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import teacherCreate from '@/mixins/teacherCreate'
import SubjectsService from '@/services/subjects.service';
import VueContentLoading from 'vue-content-loading';
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    mixins: [teacherCreate],
    components: {
        VueContentLoading
    },
    computed: {
        materia () {
            return this.steps[0]
        },
        isError () {
          return this.$v.disciplines.$error
        }
    },
    data () {
        return {
            isPushMateria: false,
            isPushCategory: false,
            disciplines: [],
            listDisciplines: [],
            isLoading: true,
            isFirst: true,
            max: 5
        };
    },
    watch: {
        materia (newValue, oldValue) {
            console.log(newValue, oldValue,'entro')
            if (newValue != oldValue) {
                this.getDisciplines('category', this.materia)
            }
        },
        disciplines (value) {
            if (this.disciplines.length > this.max) {
                document.getElementById(this.disciplines[this.max]._id).checked = false
                this.disciplines.splice(this.max,1)
            }
            if (!this.isFirst) {
                if (!this.$v.disciplines.$invalid) {
                    this.updateStep({subject: this.disciplines})
                } else
                    this.updateStep({error: 'teacher-create-' + this.index})
            }
        }
    },
    mounted () {
        this.getDisciplines('category', this.materia)
    },
    methods: {
        next () {
            this.$v.disciplines.$touch()
            if (!this.$v.disciplines.$invalid) {
                this.isFirst = false
                this.nextStep({subject: this.disciplines})
            }
        },
        find (discipline) {
            return this.disciplines.findIndex(item => item.title == discipline.title) < 0
        },
        getDisciplines () {
            this.isLoading = true
            this.disciplines = []
            this.isPushMateria = false
            // const field = this.materia.group ? 'group' : 'category'
            // if (!this.materia.group)
                // this.disciplines.push(this.materia)
                SubjectsService.getDisciplinesByField('category', this.materia).then(
                result => {
                    this.isLoading = false
                    this.listDisciplines = result.subjectList
                },
                error => {
                    this.isLoading= false
                    console.error(error)
                })
        }
    },
    validations: {
        disciplines: {
            required,
            minLength: minLength(1)
        }
    }
}
</script>
