<template>
    <div class="teacher-languages">
        <div class="title">
            Idiomas en que dicto la clase
            <actions @actionEdit="openModal"/>
        </div>
        <div class="teacher-information__content">
            <table class="teacher-languages__table">
                <tbody>
                    <tr v-for="(item, index) in modelInitial" :key="index">
                        <td><span>{{ item.language }}</span></td>
                        <td class="tln"><span class="d-inline-block">{{ item.level }}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <b-modal
            :hide-header="true"
            centered
            id="modal-languages">
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
                        <div class="teacher-language__row" v-for="(lang, index) in modelEdit" :key="index">
                            <span>{{ lang.language }}</span>
                            <span class="d-inline-block">{{ lang.level }}</span>
                            <button @click="remove(index)">
                                <i class="ipunku-cancel-circled"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="d-block text-danger" v-if="$v.modelEdit.$error && !$v.modelEdit.required">
                    Debe seleccionar por lo menos un idioma.
                </div>

            </vue-dropzone>
            <template v-slot:modal-footer="{ Cerrar, Guardar }">
                <b-button size="sm" variant="outline-danger" @click="cancelEdit()">
                    Cerrar
                </b-button>
                <b-button size="sm" variant="primary" @click="updateLanguages()">
                    Guardar
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import gigEdit from '@/mixins/gig.edit'
import { required, minLength } from 'vuelidate/lib/validators'


export default {
    mixins: [gigEdit],
    data () {
        return {
            isFirst: true,
            listLanguages: ['Aleman', 'Chino', 'Español', 'Ingles', 'Italiano', 'Portugués', 'Quechua'],
            newElement: {
                language: '',
                level: '',
            },
        }
    },
    mounted () {
        this.modelInitial = [...this.model]
        this.modelEdit = [...this.model]
    },
    methods: {
        getDataFormat () {
            return {
                languages: this.modelEdit
            }
        },
        updateLanguages () {
            this.$v.modelEdit.$touch()
            if (!this.$v.modelEdit.$invalid) {
                const data = Object.assign(this.getDataFormat(), { id: this.id })
                this.sendData(data)
                .then((resp) => {
                    this.modelInitial = [...this.$v.modelEdit.$model]
                    this.closeModal()
                })
            }
        },
        find (lang) {
            if (this.modelEdit)
                return this.modelEdit.findIndex(item => item.language == lang) < 0
            return false
        },
        isNativo () {
            if (this.modelEdit)
                return this.modelEdit.findIndex(item => item.level == 'nativo') < 0
            return false
        },
        addElement () {
            this.$v.newElement.$touch()
            if (!this.$v.newElement.$invalid) {
                this.modelEdit.push(this.newElement)
                this.newElement = {
                    language: '',
                    level: ''
                }
                this.$v.$reset()
            }
        },
        remove (index) {
            this.modelEdit.splice(index, 1)
        },
        openModal () {
            this.$bvModal.show('modal-languages')
        },
        closeModal () {
            this.$bvModal.hide('modal-languages')
        },
        cancelEdit () {
            this.modelEdit = this.model
            this.closeModal()
        },
        saveEdit () {

        }
    },
    validations: {
        modelEdit: {
            required
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


<style lang="scss">
    .teacher-languages {
        &__table {
            margin-bottom: map-get($spacers, 2);
            margin-top: map-get($spacers, 2);
            tr span {
                margin: map-get($spacers, 1) 0rem;
                display: block;
            }
            td:first-child {
                font-weight: 400;
                padding-right: map-get($spacers, 2);
            }
            td.tln span {
                font-weight: 600;
                border-radius: 4px;
                background-color: $gray-300;
                padding-right: map-get($spacers, 2);
                padding-left: map-get($spacers, 2);
            }
        }
        .lvl {
            display: flex;
            display: none;
            padding-left: 10px;
            padding-right: 10px;
            span {
                height: 10px;
                width: 5px;
                background-color: $primary;
                margin: 2px;
                &.off {
                    background-color: $gray-500;
                }
            }
        }
    }
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

