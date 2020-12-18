<template>
	<div class="teacher-create__step" :id="'teacher-create-'+index" :class="{'teacher-create__step-error': isError}">
        <div class="punku__title">
            Datos personales
        </div>
        <div class="punku-alert punku-alert--warning">
            Recuerda que estos datos son confidenciales y no serán publicados, sólo serán usados por Punku para contactarte.
        </div>

        <div class="row">
            <div class="col-12 col-md-6">
                <div class="teacher-create__form-control">
                    <label class="mb-0 mt-4">Correo electrónico</label>
                    <input
                        class="form-control"
                        :class="{'is-invalid': $v.model.email.$error}"
                        v-model.trim.lazy="$v.model.email.$model"
                        type="email"
                        placeholder="mi-email@corre.com">
                    <small class="invalid-feedback" v-if="!$v.model.email.required">
                        Su <strong>Correo electrónico</strong> es requerido.
                    </small>
                    <small class="invalid-feedback" v-if="!$v.model.email.email">
                        Su <strong>Correo electrónico</strong> no es un formato válido.
                    </small>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="teacher-create__form-control">
                    <label class="mb-0 mt-4">Celular</label>
                    <vue-tel-input
                        placeholder="+00 0000000000"
                        v-model.trim.lazy="$v.model.phone.$model"
                        :class="{'form-control': true, 'is-invalid': $v.model.phone.$error }"
                        autocomplete="false"
                        :disabledFetchingCountry="user.phone ? true : false"
                        @input="onInput">
                    </vue-tel-input>
                    <small class="invalid-feedback" v-if="$v.model.phone.$error && !$v.model.phone.required">
                        Su <strong>Celular</strong> es requerido
                    </small>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="teacher-create__form-control">
                    <label class="mb-0 mt-4">Tipo de documento</label>
                    <select
                        :class="{'is-invalid': $v.model.payment_info.type_doc_ide.$error}"
                        v-model.trim.lazy="$v.model.payment_info.type_doc_ide.$model"
                        class="form-control">
                        <option value="">Tipo de documento</option>
                        <option value="dni">DNI</option>
                        <option value="pasaport">Pasaporte</option>
                        <option value="immigration_card">Carnet de extranjeria</option>
                    </select>
                    <small class="invalid-feedback" v-if="!$v.model.payment_info.type_doc_ide.required">
                        Debe seleccionar el tipo de documento.
                    </small>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="teacher-create__form-control">
                    <label class="mb-0 mt-4">Número del documento</label>
                    <input
                        class="form-control"
                        :class="{'is-invalid': $v.model.payment_info.num_doc_ide.$error }"
                        v-model.trim.lazy="$v.model.payment_info.num_doc_ide.$model"
                        :disabled="!$v.model.payment_info.type_doc_ide.required"
                        type="text"
                        maxlength="8"
                        placeholder="00000000">
                    <small class="invalid-feedback" v-if="!$v.model.payment_info.num_doc_ide.required">
                        Su <strong>Número de documento</strong> es requerido.
                    </small>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="teacher-create__form-control">
                    <label class="mb-0 mt-4">Banco</label>
                    <select
                        :class="{'is-invalid': $v.model.payment_info.bank.$error}"
                        v-model.trim.lazy="$v.model.payment_info.bank.$model"
                        class="form-control">
                        <option value="">Banco</option>
                        <option value="bcp">BCP</option>
                        <option value="banco_2">BBVA</option>
                        <option value="banco_3">INTERBANK</option>
                        <option value="banco_2">SCOTIABANK</option>
                    </select>
                    <small class="invalid-feedback" v-if="!$v.model.payment_info.bank.required">
                        Debe seleccionar un <strong>banco</strong>.
                    </small>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="teacher-create__form-control">
                    <!-- MAX:20 -->
                    <label class="mb-0 mt-4">Número de cuenta</label>
                    <input
                        class="form-control"
                        :class="{'is-invalid': $v.model.payment_info.account_number.$error }"
                        v-model.trim.lazy="$v.model.payment_info.account_number.$model"
                        type="text"
                        maxlength="20"
                        placeholder="00000.00000.00000">
                    <small
                        class="invalid-feedback"
                        v-if="!$v.model.payment_info.account_number.required">
                        El <strong>número de cuenta</strong> es obligatorio.
                    </small>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="teacher-create__form-control">
                    <!-- MAX:20 -->
                    <label class="mb-0 mt-4">Número de cuenta interbancaria</label>
                    <input class="form-control"
                        maxlength="20"
                        :class="{'is-invalid': $v.model.payment_info.account_number2.$error }"
                        v-model.trim.lazy="$v.model.payment_info.account_number2.$model" type="text" placeholder="00000.00000.00000">
                    <small class="invalid-feedback" v-if="!$v.model.payment_info.account_number2.required">
                        El <strong>número interbancario</strong> es obligatorio.
                    </small>
                </div>
            </div>
        </div>

        <hr>

        <div class="teacher-create__actions">
            <button @click="next" v-if="isFirst">
                Siguiente
            </button>
        </div>
    </div>
</template>

<script>
import teacherCreate from '@/mixins/teacherCreate'
import SubjectsService from '@/services/subjects.service';
import { required, minLength, email } from 'vuelidate/lib/validators'
import { VueTelInput } from 'vue-tel-input'

export default {
    mixins: [teacherCreate],
    components: {
        VueTelInput
    },
    data () {
        return {
            isFirst: true,
            model: {
                email: '',
                phone: null,
                payment_info: {
                    type_doc_ide: '',
                    num_doc_ide: '',
                    bank: '',
                    account_number: '',
                    account_number2: '',
                    balance: '',
                }
            }
        };
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
        },
    },
    computed: {
        isError () {
            return !this.isFirst && this.$v.model.$invalid
        }
    },
    beforeMount () {
        this.model.email = this.user.email
        this.model.phone = this.user.phone
    },
    methods: {
        next () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.isFirst = false
                this.nextStep(this.model)
            }
        },
        onInput(formattedNumber, { number, valid, country }) {
            if (number.international)
                this.model.phone = number.international
        },
    },
    validations: {
        model: {
            email: {
                email,
                required
            },
            phone: { required },
            payment_info: {
                type_doc_ide: { required },
                num_doc_ide: { required },
                bank: {  },
                account_number: {  },
                account_number2: {  },
            }
        }
    }
}
</script>
