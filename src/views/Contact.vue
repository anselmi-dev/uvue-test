<template>
    <div class="container">
        <form class="row position-relative"  @submit.prevent="submit" :class="{'zumbido': zumbido}" novalidate>
            <loading :active.sync="isLoading" :is-full-page="false"></loading>
            <div class="col-12 col-md-6 mx-auto">
                <div class="row">
                    <div class="col">
                        <h1> Contáctanos! </h1>
                        <p class="text-muted">
                            Déjanos saber qué preguntas y / o comentarios tienes para nosotros. Nos pondremos en contacto con usted lo antes posible.
                        </p>
                    </div>
                </div>
                <div class="row">
                    <!-- col:first_name -->
                    <div class="col-12 col-md-6">
                        <!-- form-group:first_name -->
                        <div class="form-group">
                            <label for="first_name">Nombre</label>
                            <input
                                type="text"
                                v-model="model.first_name"
                                :class="{'form-control': true, 'is-invalid': $v.model.first_name.$error }"
                                placeholder="Nombre"
                                :disabled="isLoading" />
                            <small class="invalid-feedback" v-if="$v.model.first_name.$error && !$v.model.first_name.required">
                                Su <strong>Nombre</strong> es requerido.
                            </small>
                            <small class="invalid-feedback" v-if="$v.model.first_name.$error && !$v.model.first_name.minLength">
                                El <strong>Nombre</strong> debe tener al menos <strong>{{ $v.model.first_name.$params.minLength.min }} caracteres.</strong>
                            </small>
                        </div>
                    </div>

                    <!-- col:last_name -->
                    <div class="col-12 col-md-6">
                        <!-- form-group:last_name -->
                        <div class="form-group">
                            <label for="last_name">Apellido</label>
                            <input
                                type="text"
                                :class="{'form-control': true, 'is-invalid': $v.model.last_name.$error }"
                                v-model="model.last_name"
                                placeholder="Apellido"
                                :disabled="isLoading" />
                            <small class="invalid-feedback" v-if="$v.model.last_name.$error && !$v.model.last_name.required">
                                Su <strong>Apellido</strong> es requerido.
                            </small>
                            <small class="invalid-feedback" v-if="$v.model.last_name.$error && !$v.model.last_name.minLength">
                                Su <strong>Apellido</strong> debe tener al menos <strong>{{ $v.model.last_name.$params.minLength.min }} caracteres.</strong>
                            </small>
                        </div>
                    </div>

                    <!-- COL:EMAIL -->
                    <div class="col-12">
                        <!-- FORM-GROUP:EMAIL -->
                        <div class="form-group">
                            <label for="email">Correo electrónico</label>
                            <input
                                type="email"
                                :class="{'form-control': true, 'is-invalid': $v.model.email.$error }"
                                v-model="model.email"
                                placeholder="mi-correo@email.com"
                                :disabled="isLoading"/>
                            <small class="invalid-feedback" v-if="$v.model.email.$error && !$v.model.email.required">
                                Su <strong>Correo electrónico</strong> es requerido.
                            </small>
                            <small class="invalid-feedback" v-if="$v.model.email.$error && !$v.model.email.email">
                                Su <strong>Correo electrónico</strong> no es un formato válido.
                            </small>
                        </div>
                    </div>

                    <!-- COL:EMAIL -->
                    <div class="col-12">
                        <!-- FORM-GROUP:EMAIL -->
                        <div class="form-group">
                            <textarea
                                rows="5"
                                :class="{'form-control': true, 'is-invalid': $v.model.message.$error }"
                                v-model="model.message"
                                placeholder="¿Cómo te podemos ayudar?"
                                :disabled="isLoading"
                            >
                            </textarea>
                            <small class="invalid-feedback" v-if="$v.model.message.$error && !$v.model.message.required">
                                Su <strong>mensaje</strong> es requerido.
                            </small>
                        </div>
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">
                            Enviar mensaje
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>


<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    data () {
        return {
            isLoading: false,
            zumbido: false,
            model: {},
        }
    },
    methods: {
        cancel () {
            this.resetForm()
        },
        submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.isLoading = true
                // this.userUpdate(this.model)
                // .then((resp) => {
                //     this.$bus.emit("notifications:push", { type: 'dark', message: 'Su perfil fue actualizado correctamente!' })
                //     this.cancel ()
                // })
                // .catch(err => {
                //     this.$bus.emit("notifications:push", { title: 'Ups!', type: 'error', message: responseError })
                // })
                // .finally(() => {
                //     this.isLoading = false
                // })
            } else {
                this.zumbido = true
                setTimeout(() => {
                    this.zumbido = false
                }, 250)
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
            message: {
                required,
            },
        }
    }
}
</script>
