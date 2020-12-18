<template >
    <div class="page-cupons">
        <b-row class="row--sm coupons" v-if="items.length">
            <b-col cols="12" sm="6" md="4" v-for="(item, index) in items" :key="index">
                <div class="coupon">
                    <div class="coupon-intro">
                        <strong>{{ item.code }}</strong>
                        <span class="d-block">
                            <span class="text-muted">Valido por</span> <strong class="text-danger">{{ item.amount | currencySol }}</strong>
                        </span>
                    </div>
                    <div class="coupon-value">
                        <!-- {{ index }} -->
                        <i class="uil uil-usd-circle"></i>
                    </div>
                </div>
            </b-col>
        </b-row>
        <b-row v-else>
            <b-col cols="12">
                <div class="d-flex flex-wrap align-items-center justify-content-space-between alert alert-light">
                    <span class="text-dark font-weight-bold">No posee cupones</span>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import CouponsService from '@/services/coupons.service'

export default {
    data() {
        return {
            load: false,
            items: []
        }
    },
    beforeMount() {
        this.load = false
        this.getCoupos()
    },
    methods: {
        getCoupos () {
            CouponsService.getAll ()
            .then(resp => {
                console.log({resp})
                this.items = resp
                this.load = true
            })
            .catch(err => {

            })
        }
    }
}
</script>

<style lang="scss">
    $background-color: #eee;
    $radius-size: 10px;

    .coupons {
        .coupon {
            margin-bottom: .5rem;
            display: flex;
            align-items: stretch;
            justify-content: stretch;
            
            > div {
                padding: .25rem;
                border-radius: $radius-size;
            }
            
            .coupon-intro {
                position: relative;
                background: $gray-200;
                flex: 3;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                padding-top: .25rem;
                padding-bottom: .25rem;
                box-shadow: -4px 1px 4px 0px #9f9f9f;
                &:after {
                    content: ' ';
                    border: 2px dashed $background-color;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    right: -2px;
                    z-index: 2;
                }
            }
            
            .coupon-value {
            display: flex;
            flex: 1;
            position: relative;
            background: #efac37;
            color: #fff;
            font-size: 38px;
            align-items: center;
            justify-content: center;
            
            &:before {
                content: ' ';
                width: $radius-size * 2;
                height: $radius-size * 2;
                position: absolute;
                top: -$radius-size;
                left: -$radius-size;
                border-radius: 100%;
                background: $background-color;
            }
            &:after {
                content: ' ';
                width: $radius-size * 2;
                height: $radius-size * 2;
                position: absolute;
                bottom: -$radius-size;
                left: -$radius-size;
                border-radius: 100%;
                background: $background-color;
            }
            }
        }
    }
</style>