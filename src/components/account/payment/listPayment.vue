<template>
    <div class="list-payment">
        <loading :active.sync="isLoading" :is-full-page="false" :height="15"></loading>
        <div class="list-payment__items" v-if="items.length">
            <div class="list-payment__item" v-for="(item, index) in items">
                <div class="list-payment__item-type">
                    <img
                        :src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/'+
                        getCardType(item.stripped_card_number) +'.png'"
                        width="60px">
                </div>
                <div class="list-payment__item-info">
                    <span class="text-truncate d-block">{{ item.stripped_card_number | cardNumber }}</span>
                    <span class="text-truncate text-muted">{{ item.name }}</span>
                </div>
                <div class="list-payment__item-actions">
                    <button class="btn btn-xs btn-outline-danger" @click.prevent="handleDestroy(index)">Borrar</button>
                    <!-- <button class="btn btn-xs btn-outline-dark" @click.prevent="handleEdit(item)">Edit</button> -->
                </div>
            </div>
        </div>
        <div class="alert alert-info alert--app" v-else>
            <div class="icon">
                <i class="uil uil-exclamation-triangle"></i>
            </div>
            <div class="content">
                Agrega una forma de pago ahora para que tu próximo pago sea más rápida y sencillo.
            </div>
        </div>
        <div class="mb-2 mt-2">
            <button class="btn btn-sm btn-outline-primary" @click="$bus.emit('account:toggleForm:payment-methods')">
                Agregar <span v-if="items.length">otra</span> tarjeta de credito.
            </button>
        </div>
    </div>
</template>

<script>
import CreditCardServices from '@/services/credit-card.service'
import { mapActions } from 'vuex'

// CAMBIOS::
//  Agregar los iconos de las tarjetas al agregar.
// Eliminar el icono de visa si no posee numero de tarjeta
export default {
    props: {
        paymentMethods: {
            type: Array,
            required: false,
            default: []
        }
    },
    data () {
        return {
            isLoading: false,
            items: this.paymentMethods
        }
    },
    filters: {
        cardNumber: function (value) {
            return value.slice(0, 4) + '********' + value.slice(8, 12)
        }
    },
    methods: {
        ...mapActions({destroyCreditCard: 'auth/destroyCreditCard'}),
        getCardType (number) {
            let re = new RegExp("^4\\d{0,15}");
            if (number.match(re) != null) return "visa";

            re = new RegExp("^3[47]\\d{0,13}");
            if (number.match(re) != null) return "amex";

            re = new RegExp("^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}");
            if (number.match(re) != null) return "mastercard";

            re = new RegExp("^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}");
            if (number.match(re) != null) return "discover";

            re = new RegExp('^9792')
            if (number.match(re) != null) return 'troy'

            re = new RegExp('^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}')
            if (number.match(re) != null) return 'diners'

            return "visa"; // default type
        },
        handleEdit (element) {
            this.$bus.emit('account:update:payment-methods', element)
        },
        handleDestroy (index) {
            this.$confirm({
                title: `¿Estás seguro de querer continuar?`,
                message: 'No podrá recuperar la información',
                button: { no: 'No', yes: 'Si'},
                callback: confirm => {
                    if (confirm) {
                        this.isLoading = true
                        this.destroyCreditCard(this.items[index]._id)
                        .then((resp) => {
                            this.$bus.emit("notifications:push", {type: 'dark', message: 'Se elimino correctamente su tarjeta de crédito!'})
                        })
                        .catch(err => {
                            console.log({err})
                            this.$bus.emit("notifications:push", { title: 'Ups!', type: 'error', message: err })
                        })
                        .finally(() => {
                          this.isLoading = false
                        })
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .list-payment {
        position: relative;
        &__items {
            display: flex;
            flex-wrap: wrap;
            max-width: 100%;
            margin-left: -.25rem;
            margin-right: -.25rem;
        }
        &__item {
            display: flex;
            align-items: center;
            padding: .5rem;
            border: 1px solid $gray-300;
            width: calc(100% - (.25rem * 2));
            max-width: 100%;
            margin-bottom: .5rem;
            border-radius: $border-radius;
            margin-right: .25rem;
            margin-left: .25rem;
            @include media-breakpoint-up(lg) {
                width: calc(50% - (.25rem * 2));
            }
            &:not(:last-child) {
                margin-bottom: .5rem;
            }
            &-info {
                padding-left: .5rem
            }
            &-type {
                background-color: $gray-500;
                height: 100%;
                display: flex;
                align-items: center;
                border-radius: 3px;
                padding: .25rem;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            &-actions {
                margin-left: auto;
                & > * {
                    margin-left: .25rem;
                    margin-right: .25rem;
                }
            }
        }

    }

</style>
