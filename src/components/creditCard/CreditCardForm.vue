<template>
  <div class="card-form">
    <loading :active.sync="isLoading" :is-full-page="false" :height="15"></loading>
    <div class="row">
      <div class="col">
        <div class="card-form__inner">
          <div class="form-group">
            <label for="cardNumber">
              Número de la tarjeta
            </label>
            <input
              v-imask="cardMasks"
              @accept="onAcceptCardType"
              :value="cardNumber"
              :class="{'is-invalid': $v.cardNumber.$error }"
              autofocus
              id="cardNumber"
              class="form-control"
              autocomplete="off"
            />
          </div>
          <div class="form-group">
            <label for="cardName">
              Titular
            </label>
            <input
              id="cardName"
              v-model="name"
              :class="{'is-invalid': $v.name.$error }"
              class="form-control"
              autocomplete="off"
            />
          </div>
          <div class="row px--1">
            <div class="col px-1">
              <div class="row px--1">
                <div class="col-12 px-1">
                  <label for="cardMonth">
                    Fecha de expiración
                  </label>
                </div>
                <div class="col-6 px-1 form-group">
                  <select
                    class="form-control"
                    id="cardMonth"
                    :class="{'is-invalid': $v.expireMonth.$error }"
                    v-model="expireMonth"
                  >
                    <option value="" disabled selected>Mes</option>
                    <option
                      v-for="n in 12"
                      :value="n < 10 ? '0' + n : n"
                      :key="n"
                    >
                      {{ 10 > n ? "0" + n : n }}
                    </option>
                  </select>
                </div>
                <div class="col-6 px-1 form-group">
                  <select
                    class="form-control"
                    id="cardYear"
                    v-model="expireYear"
                    :class="{'is-invalid': $v.expireYear.$error }"
                  >
                    <option value="" disabled selected>Año</option>
                    <option
                      v-for="(n, $index) in 12"
                      :value="$index + currentYear"
                      :key="n"
                    >
                      {{ $index + currentYear }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col px-1">
              <div class="card-input">
                <label for="cardCvv">CVV</label>
                <input
                  type="text"
                  class="form-control"
                  id="cardCvv"
                  :value="cvv"
                  :class="{'is-invalid': $v.cvv.$error }"
                  autocomplete="off"
                  v-imask="cvvMask"
                  @accept="onAcceptCvv"
                  @focus="showBack = true"
                  @blur="showBack = false"
                />
              </div>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col">
              <button class="btn btn-outline-danger" @click="cancel">
                Cancelar
              </button>
            </div>
            <div class="col text-right">
              <button @click="submitCard" class="btn btn-outline-primary">
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <credit-card
          :expireYear="expireYear"
          :expireMonth="expireMonth"
          :cardNumber="cardNumber"
          :name="name"
          :cvv="cvv"
          :showBack="showBack"
          :symbolImage="'/img/' + symbolImage + '.png'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CreditCard from "./CreditCard.vue";
import { IMaskDirective } from "vue-imask";
import { cardMasks, cvvMask } from "./masks";
import { required, minLength } from 'vuelidate/lib/validators'

import { mapActions } from 'vuex'

export default {
  components: {
    CreditCard
  },
  data() {
    return {
      isLoading: false,
      isEdit: false,
      cardMasks: cardMasks,
      cvvMask: cvvMask,
      cardNumber: '',
      expireMonth: '',
      expireYear: '',
      name: '',
      cvv: '',
      currentYear: new Date().getFullYear(),
      showBack: false,
      symbolImage: "mastercard"
    };
  },
  beforeMount() {
    this.$bus.$on("account:update:credit-card", (currentPayment) => {
      const current = Object.assign({}, currentPayment)
      this.isEdit = true
      this.cardNumber= current.cardNumber
      this.expireMonth= current.expireMonth.toString()
      this.expireYear= current.expireYear.toString()
      this.name= current.name
      this.cvv= current.cvv.toString()
    })
  },
  beforeDestroy() {
    this.$bus.$off("account:update:credit-card");
  },
  methods: {
    ...mapActions({createCreditCard: 'auth/createCreditCard'}),
    cancel () {
      this.cardNumber = ""
      this.expireMonth = ""
      this.expireYear = ""
      this.name = ""
      this.cvv = ""
      this.$v.$reset()
      this.isEdit = false
      this.$bus.emit('account:toggleForm:payment-methods')
    },
    submitCard() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.isLoading = true
        this.createCreditCard({
          cardNumber: this.cardNumber,
          expireMonth: this.expireMonth.toString(),
          expireYear: this.expireYear.toString(),
          name: this.name,
          cvv: this.cvv,
        })
        .then((resp) => {
          console.log(resp)
          this.$bus.emit("notifications:push", {type: 'dark', message: 'Su agrego correctamente!'})
          this.cancel ()
        })
        .catch(err => {
          console.log(err)
          this.$bus.emit("notifications:push", { title: 'Ups!', type: 'error', message: err })
        })
        .finally(() => { this.isLoading = false })
      }
    },
    onAcceptCardType(e) {
      const maskRef = e.detail;
      const type = maskRef.masked.currentMask.cardtype;
      if (type !== "Unknown") {
        this.symbolImage = type;
      }
      this.cardNumber = maskRef.value;
    },
    onAcceptCvv(e) {
      const maskRef = e.detail;
      this.cvv = maskRef.value;
    }
  },
  directives: {
    imask: IMaskDirective
  },
  validations: {
    cardNumber: { required, minLength: minLength(16) },
    expireMonth: { required },
    expireYear: { required },
    name: { required },
    cvv: { required }
  }
};
</script>

<style scoped lang="scss">
  .card-form {
    max-width: 100%;
    // width: 300px;
    margin: auto;
  }
  .px--1 { margin-left: -0.25rem; margin-right: -0.25rem }
</style>
