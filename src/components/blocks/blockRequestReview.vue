<template>
    <div class="block-request-review px-2 py-2">
        <form @submit.prevent="send" novalidate v-if="!success">
            <h3 class="mb-0">
                Reseña de su clase
            </h3>
            <p class="text-muted">
                {{ reviewed_gig.gig_title }}
            </p>
            <hr>
            <b-form-rating
                variant="warning"
                show-value
                show-value-max
                v-model="model.stars"
                stars="5"/>
            <small class="invalid-feedback d-block" v-if="$v.model.stars.$error">
                Debe agregar una clasificación
            </small>
            <hr>

            <div class="textarea-autosize-count">
                <textarea-autosize
                    class="block-request-review-textarea form-control pb-3"
                    placeholder="Cuéntanos como te fue con el profesor..."
                    v-model="model.review_text"
                    height="30"
                    :maxlength="$v.model.review_text.$params.maxLength.max"
                    :minlength="$v.model.review_text.$params.minLength.min"
                />
                <small>{{ model.review_text.length }} / {{ $v.model.review_text.$params.maxLength.max }}</small>
            </div>
            <small class="invalid-feedback d-block" v-if="$v.model.review_text.$error">
                Debe tener al menos {{ $v.model.review_text.$params.minLength.min }} caracteres
            </small>
            <hr>
            <b-row class="row--xs">
                <b-col cols="auto">
                    <button type="button" class="btn btn-outline-dark btn-sm" @click="cancel">CANCELAR</button>
                </b-col>
                <b-col cols="auto">
                    <button type="submit" class="btn btn-primary btn-sm">ENVIAR</button>
                </b-col>
                <b-col cols="12" class="mt-2">
                    <small class="text-muted">Por favor no incluyas información de contacto.</small>
                </b-col>
            </b-row>
        </form>
        <div v-else>
            <i class="uil uil-comment-check"></i>
        </div>
    </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import RecommendationService from '@/services/recommendation.service'

export default {
    data () {
        return {
            isLoading: false,
            model: {
                stars: null,
                review_text: ''
            },
            success: false
        }
    },
    props: {
        reviewed_gig: {
            type: Object,
            required: false,
            default: {}
        }
    },
    methods: {
        send () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.isLoading = true
                this.model.reviewed_gig = this.reviewed_gig.gig._id
                this.model.reviewed_class = this.reviewed_gig._id
                RecommendationService.createReview(this.model).then((resp) => {
                    this.$bus.emit("notifications:push", { type: 'dark', message: 'Se envio su calificación'})
                    this.$bvModal.hide('modal-request-review')
                    this.isLoading = false
                }).catch((message)=> {
                    this.$bus.emit("notifications:push", { type: 'error', message})
                    console.log(message)
                })
            }
        },
        cancel () {
            this.isLoading = false
            this.model = {
                stars: null,
                review_text: ''
            }
            this.$v.model.$reset()
            this.$bvModal.hide('modal-request-review')
        },
    },
    validations: {
        model: {
            stars: { required },
            review_text: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(180)
            }
        }
    }
}
</script>

<style>
    .block-request-review-textarea {
        height: 60px !important;
    }
</style>