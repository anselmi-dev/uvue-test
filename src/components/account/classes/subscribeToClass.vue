<template>
    <div class="d-flex">
        <i class="uil uil-question-circle text-muted"  v-b-tooltip.hover title="Inscríbase a su clase con un código"></i>
        <form class="form-subscribetoclass" @submit.prevent="sendCode">
            <loading :active.sync="isLoading" :is-full-page="false"></loading>
            <div>
                <input
                    type="text"
                    id="codigo_class"
                    class="form-control"
                    :class="{'is-invalid': $v.code.$error }"
                    placeholder="Código de la clase"
                    v-model="code">
                <button type="submit" class="btn btn-primary" :disabled="!code"><i class="uil uil-arrow-circle-right"></i></button>
            </div>
        </form>
    </div>
</template>

<script>
import ClassesService from '@/services/classes.service';
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            isLoading: false,
            code: ''
        }
    },
    methods: {
        ...mapActions({
            clearClass: 'auth/clearClass',
            classPending: 'auth/classPending',
            classCompleted: 'auth/classCompleted',
            resetAllClass: 'auth/resetAllClass',
        }),
        sendCode () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                ClassesService.subscribeToClass({code: this.code}).then((resp) => {
                    this.clear()
                    this.resetAllClass()
                    this.$bus.emit("notifications:push", { type: 'dark', message: resp.data.message })
                })
                .catch(err => {
                    this.$func.buzzing('.form-subscribetoclass')
                    this.$bus.emit("notifications:push", { type: 'error', message: err })
                })
                .finally(() => {
                    this.isLoading = false
                })
            }
        },
        clear () {
            this.code = ''
            this.isLoading = false
            this.$v.$reset()
        }
    },
    validations: {
        code: {
            required,
            minLength: minLength(5)
        }
    }
}
</script>

<style lang="scss">
    .form-subscribetoclass {
        input {
            padding-right: 44px !important;
        }
        div {
            position: relative;
        }
        button {
            position: absolute;
            top: 0;
            right: 0;
            margin: 3px;
            bottom: 0;
            padding: 4px;
        }
    }
</style>