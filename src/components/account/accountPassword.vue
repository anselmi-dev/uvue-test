<template>
	<div class="account-password">
    	<form id="form-password" @submit.prevent="submit"  novalidate>
    		<!-- col:current_password -->
    		<div class="row">
     			<div class="col-12 col-md-6 col-lg-4">
    				<!-- form-group:current_password -->
                    <div class="form-group">
		        		<label for="current_password">Contraseña actual</label>
                        <div class="input-group input-group--password">
                            <input
                                :type="!showCurrentPass ? 'password' : 'text'"
                                :class="{
                                    'form-control': true,
                                    'is-invalid': $v.model.current_password.$error
                                }"
                                maxlength="18"
                                v-model.trim.lazy="model.current_password"
                                placeholder="Contraseña actual"
                                :disabled="isLoading" />
                            <span class="input-group-btn">
                                <button
                                    @click="showCurrentPass = !showCurrentPass"
                                    class="btn btn-default reveal"
                                    :disabled="isLoading"
                                    tabindex="-1" 
                                    type="button">
                                    <i :class="showCurrentPass ? 'uil uil-eye' : 'uil uil-eye-slash'"></i>
                                </button>
                            </span>
    		                <small class="invalid-feedback" v-if="$v.model.current_password.$error">
    		                    Tu <strong>contraseña anterior</strong> no es válida. Debe tener <strong>minimó 8 caracteres</strong> y al <strong>una mayusula, una minuscula y un número</strong>.
    		                </small>
    		        	</div>
                    </div>
    			</div>

    			<!-- col:new_password -->
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="form-group">
                        <label for="current_password">Nueva Contraseña</label>
                        <div class="input-group input-group--password">
                            <input
                                :type="!showNewPass ? 'password' : 'text'"
                                :class="{
                                    'form-control': true,
                                    'is-invalid': $v.model.new_password.$error
                                }"
                                v-model.trim.lazy="model.new_password"
		                	    placeholder="Nueva Contraseña"
                                maxlength="18"
                                :disabled="isLoading" />
                            <span class="input-group-btn">
                                <button
                                    @click="showNewPass = !showNewPass"
                                    class="btn btn-default reveal"
                                    :disabled="isLoading"
                                    tabindex="-1" 
                                    type="button">
                                    <i :class="showNewPass ? 'uil uil-eye' : 'uil uil-eye-slash'"></i>
                                </button>
                            </span>
    		                <small class="invalid-feedback" v-if=" $v.model.new_password.$error">
    		                    Tu <strong>nueva contraseña</strong> no es válida. Debe tener <strong>minimó 8 caracteres</strong> y al menos <strong>una mayusula, una minuscula y un número</strong>.
    		                </small>
    		        	</div>
                    </div>
    			</div>

    			<!-- col:confirmation_password -->
    			<div class="col-12 col-md-6 col-lg-4">
    				<!-- form-group:confirmation_password -->
		        	<div class="form-group">
		        		<label for="confirmation_password">Repite tu nueva contraseña</label>
                        <div class="input-group input-group--password">
		            	<input
                            :type="!showConfirmationPass ? 'password' : 'text'"
		                	:class="{'form-control': true, 'is-invalid': $v.model.confirmation_password.$error }"
		                	v-model.trim.lazy="model.confirmation_password"
		                	placeholder="Repite tu nueva contraseña"
                            maxlength="18"
		                	:disabled="isLoading"/>
                            <span class="input-group-btn">
                                <button
                                    @click="showConfirmationPass = !showConfirmationPass"
                                    class="btn btn-default reveal"
                                    :disabled="isLoading"
                                    tabindex="-1" 
                                    type="button">
                                    <i :class="showConfirmationPass ? 'uil uil-eye' : 'uil uil-eye-slash'"></i>
                                </button>
                            </span>
                        </div>
		               <small class="invalid-feedback" v-if="$v.model.confirmation_password.$error">
		                    La <strong>confirmación de tu contraseña</strong> no es válida. Debe tener <strong>minimó 8</strong> caracteres y al menos <strong>una mayusula, una minuscula y un número</strong>.
		                </small>
                        <small
                            class="invalid-feedback"
                            v-if="!$v.model.confirmation_password.sameAsPassword">
                            <strong>confirmación de contraseña</strong> no coincide.
                        </small>
		        	</div>
    			</div>
	    		<div class="col-12 d-flex flex-row-reverse">
  				    <b-button type="button" variant="primary" class="ml-2" @click="submit" :disabled="!isEdit">Guardar</b-button>                      
  			        <b-button type="button" variant="outline-danger" @click="resetForm" v-show="isEdit">Cancelar</b-button>
	    		</div>
    		</div>
    	</form>
    </div>
</template>

<script>
import UserService from '@/services/user.service';
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'

function validatePassword (value) {
    return /^(?=.*\d)(?!.* )(?=.*[a-z])(?=.*[A-Z])(?!.*\s)*.{8,18}$/.test(value)
}

export default {
	data () {
		return {
			isLoading: false,
			model: {},
			isEdit: false,
			restore: true,
            showCurrentPass: false,
            showNewPass: false,
            showConfirmationPass: false,
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
	methods: {
        toggleEdit () {
			this.isEdit = !this.isEdit;
        },
        resetForm () {
        	this.model = {}
        	this.$v.model.$reset()
            this.isLoading = false
            this.showCurrentPass = false
			this.restore = true;
			this.isEdit = false;
            this.showNewPass = false
            this.toggleEdit()
        },
        submit () {
            this.$v.$touch()
            if (!this.$v.model.$invalid) {
            	this.isLoading = true
                UserService.updatePassword({
                    curPw: this.model.current_password,
                    newPw: this.model.new_password
                }).then(
                resp => {
                    this.$bus.emit("notifications:push", { type: 'dark', message: 'Su contraseña fue actualizado correctamente!'})
                	this.resetForm()
                },
                err => {
                    console.log({err})
                    this.$bus.emit("notifications:push", { type: 'error', message: err })

                    this.$func.buzzing('#form-password')

                    this.isLoading = false
                })
            } else {
                this.$func.buzzing('#form-password')
            }
		}
	},
    validations: {
    	model: {
    		current_password: {
    			required,
                validatePassword (value) {
                    return /^(?=.*\d)(?!.* )(?=.*[a-z])(?=.*[A-Z])(?!.*\s)*.{8,18}$/.test(value)
                }
    		},
    		new_password: {
    			required,
                validatePassword (value) {
                    return /^(?=.*\d)(?!.* )(?=.*[a-z])(?=.*[A-Z])(?!.*\s)*.{8,18}$/.test(value)
                }
    		},
    		confirmation_password: {
    			required,
                validatePassword,
                sameAsPassword: sameAs('new_password'),
    		}
    	}
    }
}
</script>
