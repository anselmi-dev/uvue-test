<template>
	<div class="account-data">
    	<form id="form-account-data" class="row position-relative" novalidate>
			<loading :active.sync="isLoading" :is-full-page="false"></loading>
    		<!-- col:first_name -->
    		<div class="col-12 col-md-6 col-lg-4">
    			<!-- form-group:first_name -->
		        <div class="form-group">
		        	<label for="first_name">Nombre</label>
		            <input
		                type="text"
		                v-model="model.first_name"
		                :class="{'form-control': true, 'is-invalid': $v.model.first_name.$error }"
		                placeholder="Nombre"
                        maxlength="20"/>
		            <small class="invalid-feedback" v-if="$v.model.first_name.$error && !$v.model.first_name.required">
		                Su <strong>Nombre</strong> es requerido.
		            </small>
	                <small class="invalid-feedback" v-if="$v.model.first_name.$error && !$v.model.first_name.minLength">
	                    El <strong>Nombre</strong> debe tener al menos <strong>{{ $v.model.first_name.$params.minLength.min }} caracteres.</strong>
	                </small>
		        </div>
    		</div>

    		<!-- col:last_name -->
    		<div class="col-12 col-md-6 col-lg-4">
    			<!-- form-group:last_name -->
		        <div class="form-group">
		        	<label for="last_name">Apellido</label>
		            <input
		                type="text"
		                :class="{'form-control': true, 'is-invalid': $v.model.last_name.$error }"
		                v-model="model.last_name"
		                placeholder="Apellido"
                        maxlength="20"/>
	                <small class="invalid-feedback" v-if="$v.model.last_name.$error && !$v.model.last_name.required">
	                    Su <strong>Apellido</strong> es requerido.
	                </small>
	                <small class="invalid-feedback" v-if="$v.model.last_name.$error && !$v.model.last_name.minLength">
	                    Su <strong>Apellido</strong> debe tener al menos <strong>{{ $v.model.last_name.$params.minLength.min }} caracteres.</strong>
	                </small>
		        </div>
    		</div>

    		<!-- col:gender -->
    		<div class="col-12 col-md-6 col-lg-4 d-none">
    			<!-- form-group:gender -->
		        <div class="form-group">
		        	<label for="gender">Género</label>
		        	<select class="form-control">
		        		<option value="hombre">Hombre</option>
		        		<option value="mujer">Mujer</option>
		        	</select>
		        </div>
    		</div>

    		<!-- col:phone -->
    		<div class="col-12 col-md-6 col-lg-4">
    			<!-- form-group:phone -->
		        <div class="form-group">
		        	<label for="phone">Celular</label>
	                <vue-tel-input
	                    v-model="$v.model.phone.$model"
                        placeholder="+00 0000000000"
	                    :class="{'form-control': true, 'is-invalid': $v.model.phone.$error }"
	                    autocomplete="false"
	                    @input="onInput">
	                </vue-tel-input>

	                <small class="invalid-feedback" v-if="!$v.model.phone.required">
	                    Su <strong>Celular</strong> es requerido
	                </small>
		        </div>
    		</div>

    		<!-- col:birthdate -->
    		<div class="col-12 col-md-6 col-lg-4">
    			<!-- form-group:birthdate -->
		        <div class="form-group">
		        	<label for="birthdate">Fecha de nacimiento</label>
					<v-date-picker v-model="model.birthdate" class="flex-grow">
						<template v-slot="{ inputValue, inputEvents }">
						<input
							placeholder="DD/MM/YYYY"
							class="form-control"
							:value="inputValue"
							v-on="inputEvents"
						/>
						</template>
					</v-date-picker>
		        </div>
    		</div>

            <!-- COL:EMAIL -->
            <div class="col-12 col-md-6 col-lg-4">
                <!-- FORM-GROUP:EMAIL -->
                <div class="form-group">
                    <label for="email">
                        Correo electrónico <span class="badge badge-danger badge-pill" v-if="!model.is_verified">SIN VERIFICAR</span>
                    </label>
                    <input
                        type="email"
                        :class="{'form-control': true, 'is-invalid': $v.model.email.$error }"
                        v-model="model.email"
                        placeholder="mi-correo@email.com"
                        v-if="!model.is_verified"
                        />
                    <input
                        type="email"
                        class="form-control"
                        :value="model.email"
                        placeholder="mi-correo@email.com"
                        readonly
                        disabled
                        v-else
                    />

                    <small class="invalid-feedback" v-if="$v.model.email.$error && !$v.model.email.required">
                        Su <strong>Correo electrónico</strong> es requerido.
                    </small>
                    <small class="invalid-feedback" v-if="$v.model.email.$error && !$v.model.email.email">
                        Su <strong>Correo electrónico</strong> no es un formato válido.
                    </small>
                </div>
            </div>

            <div class="col-12" v-if="!model.is_verified">
                <account-send-verification />
            </div>
    		<hr>
    		<div class="col-12 d-flex flex-row-reverse">
  				<b-button type="button" variant="primary" class="ml-2" @click="submit" :disabled="!isEdit">Guardar</b-button>
  				<b-button type="button" variant="outline-danger" @click="cancel" v-show="isEdit">Cancelar</b-button>
    		</div>
		</form>
	</div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { VueTelInput } from 'vue-tel-input'
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'
import accountSendVerification from '@/components/account/accountSendVerification'

import { mapActions } from 'vuex'

export default {
  	components: {
  		VueTelInput,
        datetime: Datetime,
        accountSendVerification
  	},
	data () {
		return {
			isLoading: false,
			isEdit: false,
			restore: true,
			model: null
		}
	},
	watch: {
  		model: {
     		handler (newVal, oldVal) {
				if (!this.restore)
					this.isEdit = true
				else {
					this.isEdit = false
					this.restore = false
				}
			},
    		deep: true
  		}
	},
    computed: {
        max_birthdate () {
            return new Date()
        }
    },
	created ()  {
		this.model = Object.assign({}, this.user)
	},
	methods: {
        ...mapActions({
            userUpdate: 'auth/userUpdate',
        }),
        onInput(formattedNumber, { number, valid, country }) {
            if (number.international)
                this.model.phone = number.international
        },
        resetForm () {
        	this.$v.model.$reset()
        },
        cancel () {
			this.restore = true;
			this.isEdit = false;
            this.model = Object.assign({}, this.user)
        	this.resetForm()
        },
        submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
            	this.isLoading = true
                this.userUpdate(this.model)
                .then((resp) => {
                    this.$bus.emit("notifications:push", { type: 'dark', message: 'Su perfil fue actualizado correctamente!' })
					this.cancel ()
                })
                .catch(err => {
                    this.$func.buzzing('#form-account-data')
                    this.$bus.emit("notifications:push", { title: 'Ups!', type: 'error', message: err })
                })
                .finally(() => {
                    this.isLoading = false
                })
            } else {
                this.$func.buzzing('#form-account-data')
            }
		}
	},
    validations: {
    	model: {
    		email: {
                required,
                email
    		},
    		first_name: {
    			required,
				minLength: minLength(2)
			},
    		last_name: {
    			required,
				minLength: minLength(2)
			},
    		gender: { },
            birthdate: { },
    		phone: { },
    	}
    }
}
</script>
