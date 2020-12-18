<template>
  <div class="card-front">
    <!-- <img class="card-front__image" :src="backgroundImage" /> -->
    <div class="card-front__image">
      <svg version="1.1" id="cardfront" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px" y="0px" viewBox="0 0 750 471" style="enable-background:new 0 0 750 471;" xml:space="preserve">
          <g id="Front">
              <g id="CardBackground">
                  <g id="Page-1_1_">
                      <g id="amex_1_">
                          <path id="Rectangle-1_1_" class="lightcolor grey" d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                  C0,17.9,17.9,0,40,0z" />
                      </g>
                  </g>
                  <path id="svg-credicard__bg-primary" d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z" />
              <g id="cchip">
                  <g>
                      <path class="st2" d="M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3
              c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z" />
                  </g>
                  <g>
                      <g>
                          <rect x="82" y="70" class="st12" width="1.5" height="60" />
                      </g>
                      <g>
                          <rect x="167.4" y="70" class="st12" width="1.5" height="60" />
                      </g>
                      <g>
                          <path class="st12" d="M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3
                  c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3
                  C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5
                  c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5
                  c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z" />
                      </g>
                      <g>
                          <rect x="82.8" y="82.1" class="st12" width="25.8" height="1.5" />
                      </g>
                      <g>
                          <rect x="82.8" y="117.9" class="st12" width="26.1" height="1.5" />
                      </g>
                      <g>
                          <rect x="142.4" y="82.1" class="st12" width="25.8" height="1.5" />
                      </g>
                      <g>
                          <rect x="142" y="117.9" class="st12" width="26.2" height="1.5" />
                      </g>
                  </g>
              </g>
          </g>
          </g>
      </svg>
    </div>
    <!-- <img class="card-front__symbol" :src="symbolImage" /> -->
    <div class="card-front__symbol">
      <img v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'" v-if="getCardType" class="card-item__typeImg" height="50">
    </div>
    <img class="card-front__chip" :src="require('@/assets/images/crediCard/chip.png')" />
    <div class="card-front__chip"></div>
    <p class="card-front__number">{{ cardNumber || '0000 0000 0000 0000' }}</p>
    <div class="card-front__info">
      <p>Expires</p>
      <p class="card-front__expires value">
        {{ expireMonth || "MM" }} / {{ (expireYear && sliceYear) || "YY" }}
      </p>
    </div>
    <div class="card-front__info left">
      <p>Card Owner</p>
      <p class="value">{{ name || "Nombre" }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backgroundImage: {
      required: true
    },
    symbolImage: {
      required: true
    },
    cardNumber: {
      required: true
    },
    expireMonth: {
      required: true
    },
    expireYear: {
      required: true
    },
    name: {
      required: true
    }
  },
  computed: {
    sliceYear() {
      return this.expireYear.toString().slice(2);
    },
    getCardType () {
      let number = this.cardNumber ? this.cardNumber : '1';
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
  }
};
</script>

<style scoped lang="scss">
$x-space: 24px;
$y-space: 16px;
.card-front {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  z-index: 100;
  &__image {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    // background-color: $gray-600;
    overflow: hidden;
  }
  &__number {
    position: absolute;
    font-size: 26px;
    top: 35%;
    left: 24px;
  }
  &__chip {
    position: absolute;
    top: $y-space;
    left: $x-space;
    height: 44px;
  }
  &__symbol {
    position: absolute;
    top: $y-space;
    right: $x-space;
    height: 48px;
  }
  &__info {
    position: absolute;
    bottom: $y-space;
    right: $x-space;
    color: white;
    text-align: left;
    margin: 0;
    &.left {
      left: $x-space;
    }
    .value {
      // font-weight: bold;
    }
    p {
      margin: 0;
    }
  }
  &__expires {
    right: auto;
    left: $x-space;
  }
  @media screen and (max-width: 480px) {
    &__number {
      font-size: 22px;
    }
    &__info {
      font-size: 12px;
    }
    &__chip {
      height: 34px;
    }
    &__symbol {
      height: 38px;
    }
  }
  @media screen and (max-width: 360px) {
    &__number {
      font-size: 18px;
    }
  }
}
#Rectangle-1_1_ {
  fill: #ababab;
}
#svg-credicard__bg-primary {
  fill: #797979;
}
</style>
