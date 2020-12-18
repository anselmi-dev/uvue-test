<template>
    <div class="teacher-create__step" :id="'teacher-create-'+index">
        <div class="punku__title">
            Modalidad y precio de tu hora de clase
        </div>
        <hr>
        <div class="teacher-create__moptions auto">
            <label for="individual">
                <input
                    type="checkbox"
                    v-model="model.modality.single.select"
                    disabled
                    id="individual"
                    value="true">
                <div class="content">
                    <div class="content-img">
                        <img :src="require('@/assets/icons/individual.svg')" alt="individual.svg">
                    </div>
                    <div class="text">
                        <span>Individual</span>
                        Clase para una sola persona
                    </div>

                    <div class="teacher-create__iprice">
                        <money
                            v-model="model.modality.single.price"
                            class="form-control"
                            maxlength="6"
                            tabindex="-1"
                            :class="{'is-invalid': !$v.model.modality.single.price.prices_greater }" />
                        <small class="d-block mt-1">
                            Gastos y comisión (S/ {{ (model.modality.single.price * 0.2).toFixed(2) }} )
                        </small>
                        <small class="d-block mt-1">
                            Te depositaremos
                            (S/ {{ (model.modality.single.price - (model.modality.single.price * 0.2)).toFixed(2) }} )
                        </small>
                        <small
                            class="text-danger"
                            v-if="model.modality.single.price < 30">
                            El precio no puede ser menor a <b>S/ 30</b>
                        </small>
                    </div>
                </div>
            </label>

            <label for="grupal">
                <input
                    type="checkbox"
                    v-model="model.modality.group.select"
                    id="grupal"
                    value="true">
                <div class="content">
                    <div class="content-img">
                       <img :src="require('@/assets/icons/grupo.svg')" alt="grupo.svg">
                    </div>

                    <div class="text">
                        <span>Grupal</span>
                        Clase para máximo 5 personas
                    </div>

                    <div class="teacher-create__iprice">
                        <money
                            v-model="model.modality.group.price"
                            maxlength="6"
                            class="form-control"
                            tabindex="-1"
                            :class="{'is-invalid': !$v.model.modality.group.price.priceg_greater }" />

                         <small class="d-block mt-1">
                            Gastos y comisión
                            (S/ {{ (model.modality.group.price * 0.2).toFixed(2) }} )
                        </small>
                        <small class="d-block mt-1">
                            Te depositaremos
                            (S/ {{ (model.modality.group.price - (model.modality.group.price * 0.2)).toFixed(2) }} )
                        </small>
                        <small
                            class="text-danger d-block"
                            v-if="model.modality.single.price <= model.modality.group.price && model.modality.group.select">
                            El precio debe ser menor que el precio individual <b>S/ {{model.modality.single.price}}</b>
                        </small>
                        <small
                            class="text-danger d-block"
                            v-if="model.modality.group.price < 25 && model.modality.group.select">
                            El precio no puede ser menor a <b>{{ 25 | currencySol }}</b>
                        </small>
                    </div>
                </div>
            </label>
        </div>

        <hr>

        <label for="checkbox-first_class_discount" class="switch flex-wrap">
            <input
                type="checkbox"
                class="mr-2"
                v-model="model.first_class_discount"
                id="checkbox-first_class_discount">
            <span class="switch--toggle"></span>
            <span class="ml-2 h6 text-dark mb-0 ">
                <strong>50% de descuento en la primera clase</strong>
            </span>
            <span class="d-block text-muted mt-1">
                {{
                    model.first_class_discount ?
                    'Si eliges esta opción todas tus primeras clases individuales tendrán un 50% de descuento y la comisión cobrada por Punku también será de 50%' :
                    'Si eliges esta opción tus tarifas registradas serán aplicadas desde la primera clase. No hay descuento alguno.'
                }}
            </span>
        </label>

        <div class="teacher-create__actions" v-if="!$v.model.$invalid" v-show="isVisible">
            <button @click="next">
                Siguiente
            </button>
        </div>
    </div>
</template>

<script>
import teacherCreate from '@/mixins/teacherCreate'
import SubjectsService from '@/services/subjects.service';
import { required, between} from 'vuelidate/lib/validators'

function prices_greater (value) {
    if (this.model.modality.single.select) {
        return value >= 30
    }
    return true;
}

function priceg_greater (value) {
    if (this.model.modality.group.select) {
        return value >= 25 && value < this.model.modality.single.price
    }
    return true;
}

export default {
    mixins: [teacherCreate],
    data () {
        return {
            isFirst: true,
            model: {
                first_class_discount: true,
                modality: {
                    single: {
                        select: true,
                        price: 0
                    },
                    group: {
                        select: false,
                        price: 0
                    }
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
        'model.modality.group.select' (newVal) {
            this.model.modality.group.price = 0
        },
    },
    methods: {
        next () {
            this.isFirst = false
            this.nextStep(this.model)
        }
    },
    validations: {
        model: {
            modality: {
                single: {
                    select: { required },
                    price: {
                        required,
                        prices_greater
                    }
                },
                group: {
                    select: {},
                    price: {
                        priceg_greater
                    }
                }
            }
        }
    }
}
</script>
