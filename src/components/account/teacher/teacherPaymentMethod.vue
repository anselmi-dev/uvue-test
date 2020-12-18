<template>
	<div class="teacher-payment-method">

        <form class="row position-relative" :class="{'zumbido': zumbido}" @submit.prevent="submit" novalidate>
			<loading :active.sync="isLoading" :is-full-page="false"></loading>
            <div class="col-12 col-md-6">
                <div class="teacher-create__form-control">
                    <label class="mb-0 mt-4">Nombre completo del titular</label>
                    <input
                        class="form-control"
		                :readonly="!isEdit"
                        :class="{'is-invalid': $v.payment_info.full_name.$error }"
                        v-model.trim.lazy="payment_info.full_name"
                        :disabled="!isEdit"
                        type="text"
                        maxlength="20"
                        placeholder="Nombre completo">
                    <small
                    	class="invalid-feedback"
                    	v-if="!$v.payment_info.num_doc_ide.required">
                        Su <strong>nombre</strong> es requerido.
                    </small>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="teacher-create__form-control">
                    <label class="mb-0 mt-4">Tipo de documento</label>
                    <select
		                :readonly="!isEdit"
                    :disabled="!isEdit"
                        :class="{'is-invalid': $v.payment_info.type_doc_ide.$error}"
                        v-model.trim.lazy="payment_info.type_doc_ide"
                        class="form-control">
                        <option value="">Tipo de documento</option>
                        <option value="dni">DNI</option>
                        <option value="pasaport">Pasaporte</option>
                        <option value="immigration_card">Carnet de extranjeria</option>
                    </select>
                    <small
                    	class="invalid-feedback"
                    	v-if="!$v.payment_info.type_doc_ide.required">
                        Debe seleccionar el tipo de documento.
                    </small>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="teacher-create__form-control">
                    <label class="mb-0 mt-4">Número del documento</label>
                    <input
                        class="form-control"
		                :readonly="!isEdit"
                        :class="{'is-invalid': $v.payment_info.num_doc_ide.$error }"
                        v-model.trim.lazy="payment_info.num_doc_ide"
                        :disabled="!$v.payment_info.type_doc_ide.required || !isEdit"
                        type="text"
                        maxlength="20"
                        placeholder="00000.00000.00000">
                    <small
                    	class="invalid-feedback"
                    	v-if="!$v.payment_info.num_doc_ide.required">
                        Su <strong>Número de documento</strong> es requerido.
                    </small>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="teacher-create__form-control">
                    <label class="mb-0 mt-4">Banco</label>
                    <select
		                :readonly="!isEdit"
		                :disabled="!isEdit"
                        :class="{'is-invalid': $v.payment_info.bank.$error}"
                        v-model.trim.lazy="payment_info.bank"
                        class="form-control">
                        <option value="">Banco</option>
                        <option value="bcp">BCP</option>
                        <option value="banco_2">BBVA</option>
                        <option value="banco_3">INTERBANK</option>
                        <option value="banco_2">SCOTIABANK</option>
                    </select>
                    <small
                    	class="invalid-feedback"
                    	v-if="!$v.payment_info.bank.required">
                        Debe seleccionar un <strong>banco</strong>.
                    </small>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="teacher-create__form-control">
                    <!-- MAX:20 -->
                    <label class="mb-0 mt-4">Número de cuenta</label>
                    <input
		                :readonly="!isEdit"
		                :disabled="!isEdit"
                        class="form-control"
                        :class="{'is-invalid': $v.payment_info.account_number.$error }"
                        v-model.trim.lazy="payment_info.account_number"
                        type="text"
                        maxlength="20"
                        placeholder="00000.00000.00000">
                    <small
                    	class="invalid-feedback"
                    	v-if="!$v.payment_info.account_number.required">
                        El <strong>número de cuenta</strong> es obligatorio.
                    </small>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="teacher-create__form-control">
                    <!-- MAX:20 -->
                    <label class="mb-0 mt-4">Número de cuenta interbancaria</label>
                    <input
		                :readonly="!isEdit"
		                :disabled="!isEdit"
                    	class="form-control"
                        maxlength="20"
                        :class="{'is-invalid': $v.payment_info.account_number2.$error }"
                        v-model.trim.lazy="payment_info.account_number2" type="text" placeholder="00000.00000.00000">
                    <small
                    	class="invalid-feedback"
                    	v-if="!$v.payment_info.account_number2.required">
                        El <strong>número interbancario</strong> es obligatorio.
                    </small>
                </div>
            </div>
    		<hr class="col-12 px-0">

    		<div class="col-12 d-flex flex-row-reverse" v-if="isEdit">
  				<b-button type="submit" variant="primary" class="ml-2">Guardar</b-button>
  				<b-button type="button" variant="outline-danger" @click.prevent="cancel()">Cancelar</b-button>
    		</div>
    		<div class="col-12" v-else>
  				<button type="button" class="btn" @click.prevent="toggleEdit()">
  					<i class="uil uil-edit-alt"></i> Editar
  				</button>
    		</div>
		</form>
	</div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { VueTelInput } from 'vue-tel-input'
import TeacherServices from '@/services/teacher.service';

export default {
  	components: {
  		VueTelInput
  	},
	data () {
		return {
			isLoading: false,
			zumbido: false,
			payment_info: {
                full_name: '',
                bank: '',
                type_doc_ide: '',
                num_doc_ide: null,
                account_number: null,
                account_number2: null
            },
			isEdit: false
		}
	},
	created ()  {
		this.initial()
	},
	methods: {
		initial () {
			this.payment_info = Object.assign(this.payment_info, this.user.teacher.payment_info)
		},
        onInput(formattedNumber, { number, valid, country }) {
            if (number.international)
                this.account.phone = number.international
        },
        toggleEdit () {
			this.isEdit = !this.isEdit;
        },
        resetForm () {
        	this.$v.payment_info.$reset()
            this.isLoading = false
            this.toggleEdit()
        },
        cancel () {
        	this.initial()
        	this.resetForm()
        },
        submit () {
            this.$v.payment_info.$touch()
            if (!this.$v.payment_info.$invalid) {
            	this.isLoading = true
	            TeacherServices.updateTeacher(this.payment_info).then(resp => {
            		this.isLoading = false
                    this.$bus.emit("notifications:push", {
                        type: 'dark',
                        message: 'Sus preferencias de cobro fue actualizada correctamente!'
                    })
            		this.resetForm()
	            })
	            .catch(err => {
            		this.isLoading = false
                    let responseError = 'Ocurrio un error! Intente nuevamente o más tarde.'
                    try { responseError = err.response.data.err } catch (e) {}

                    this.$bus.emit("notifications:push", { title: 'Ups!', type: 'error', message: responseError })
	            })
            } else {
                this.zumbido = true
                setTimeout(() => {
                    this.zumbido = false
                }, 250)
            }
		}
	},
    validations: {
        payment_info: {
            type_doc_ide: { required },
            num_doc_ide: { required },
            bank: { required },
            account_number: { required },
            account_number2: { required },
            full_name: { required },
        }
    }
}
</script>
