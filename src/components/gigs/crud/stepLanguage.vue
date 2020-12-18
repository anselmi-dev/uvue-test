<template>
	<div class="teacher-create__step" :id="'teacher-create-'+index" :class="{'teacher-create__step-error': isError}">
        <div class="punku__title">
            Elige el idioma en el que te gustaría enseñar.
        </div>
        <div class="teacher-create__subtitle--muted">
            Debes seleccionar por lo menos un lenguaje nativo.
        </div>
        <div class="teacher-language">
        	<div class="teacher-language__form">
        		<select class="form-control"
        			:class="{'is-invalid': $v.newElement.language.$error}"
        			v-model="newElement.language">
	        			<option value="">Idioma</option>
	        			<option v-for="(lang, key) in listLanguages" :key="key" :value="lang" v-if="find(lang)" class="text-capitalize">
	        				{{ lang }}
	        			</option>
        		</select>
        		<select class="form-control"
        			:class="{'is-invalid': $v.newElement.level.$error}"
        			v-model="newElement.level">
	        			<option value="">Nivel</option>
                        <option value="nativo" v-show="isNativo()">Nativo</option>
	        			<option value="fluido">Fluido</option>
	        			<option value="intermedio">Intermedio</option>
	        			<option value="basico">Básico</option>
        		</select>
        		<button @click="addElement()">
        			<i class="ipunku-plus-circled"></i>
        		</button>
        	</div>
        	<hr>
        	<div class="teacher-language__rows">
         		<div class="teacher-language__row" v-for="(lang, index) in model.languages" :key="index">
        			<span>{{ lang.language }}</span>
        			<span class="d-inline-block">{{ lang.level }}</span>
        			<button @click="remove(index)">
        				<i class="ipunku-cancel-circled"></i>
        			</button>
        		</div>
        	</div>
        </div>

        <div class="d-block text-danger" v-if="$v.model.languages.$error && !$v.model.languages.required">
        	Debe seleccionar por lo menos un idioma.
        </div>

        <div class="teacher-create__actions" v-show="isVisible">
            <button @click="next">
                Siguiente
            </button>
        </div>
	</div>
</template>

<script>
import teacherCreate from '@/mixins/teacherCreate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    mixins: [teacherCreate],
    data () {
        return {
            isFirst: true,
        	listLanguages: ['Aleman', 'Chino', 'Español', 'Ingles', 'Italiano', 'Portugués', 'Quechua'],
        	newElement: {
        		language: '',
        		level: '',
        	},
        	model: {
            	languages: [{ language: 'Español', level: 'nativo' }]
        	}
        };
    },
    computed: {
        isError () {
            return !this.isFirst && this.$v.model.$invalid
        }
    },
    watch: {
        model: {
            deep: true,
            handler () {
                if (!this.isFirst) {
                    if (!this.$v.model.$invalid) {
                        this.updateStep(this.model)
                    } else {
                        this.updateStep({error: 'teacher-create-' + this.index})
                    }
                }
            }
        }
    },
    methods: {
    	find (lang) {
    		return this.model.languages.findIndex(item => item.language == lang) < 0
    	},
        isNativo () {
            return this.model.languages.findIndex(item => item.level == 'nativo') < 0
        },
    	addElement () {
            this.$v.newElement.$touch()
    		if (!this.$v.newElement.$invalid) {
	    		this.model.languages.push(this.newElement)
	    		this.newElement = {
	    			language: '',
	    			level: ''
	    		}
            	this.$v.$reset()
    		}
    	},
    	remove (index) {
    		this.model.languages.splice(index, 1)
    	},
    	next () {
            this.$v.model.$touch()
            if (!this.$v.model.$invalid) {
                this.isFirst = false
    			this.nextStep(this.model)
    		}
    	}
    },
    validations: {
    	model: {
    		languages: {
    			required
    		}
    	},
    	newElement: {
			language: {
				required
			},
			level: {
				required
			}
    	}
    }
}
</script>

<style lang="scss" scoped>
	.teacher-language {
		display: block;
		margin-bottom: 1rem;
		margin-top: 1rem;
		&__row,
		&__form {
			display: flex;
			align-items: center;
			button {
				border: none;
				background-color: transparent;
				box-shadow: none;
				outline: none;
				font-size: 1.5rem;
				line-height: 1;
				padding: 0;
				margin: 0;
				color: $primary;
			}
		}
		&__form {
			margin-left: -10px;
			margin-right: -10px;
			max-width: 100%;
			width: 400px;
			& > * {
				margin-left: 10px;
				margin-right: 10px;
			}
		}
		&__rows {
			margin-bottom: 1px solid $gray-200
		}
		&__row {
			display: flex;
			align-items: center;
			margin-top: .5rem;
			button {
				color: $danger;
			}
			span {
				border-radius: 4px;
				background-color: $gray-200;
				padding:  2px 5px;
				text-transform: capitalize;
				margin-right: 5px;
				margin-left: 5px;
			}
		}
	}
</style>
