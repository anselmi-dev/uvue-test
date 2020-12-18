<template>
    <div class="gig-is-premium">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-6 mx-auto">
                <h2 class="text-center my-2">
                    Hazte Premium. Sé feliz.
                </h2>
                <div class="punku-box">
                    <div class="row row--sm text-center">
                        <div class="col">
                            <img :src="require('@/assets/icons/gemas.svg')" alt="gema premium" width="100" class="mb-2">
                        </div>
                        <div class="col-12">
                            Lorem ipsum dolor, <br> sit amet consectetur adipisicing elit.
                        </div>
                    </div>
                    <hr>
                    <div class="row row--sm my-3 py-1">
                        <div class="col-auto">
                            <i class="uil uil-question-circle" style="font-size: 5rem"></i>
                        </div>
                        <div class="col">
                            <p class="font-weight-bold mb-1">Lorem ipsum dolor sit</p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quidem enim nulla quam earum.
                        </div>
                    </div>
                    <div class="row row--sm my-3 py-1">
                        <div class="col">
                            <p class="font-weight-bold mb-1">Lorem ipsum dolor sit</p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quidem enim nulla quam earum.
                        </div>
                        <div class="col-auto">
                            <i class="uil uil-question-circle" style="font-size: 5rem"></i>
                        </div>
                    </div>
                    <div class="row row--sm my-3 py-1">
                        <div class="col-auto">
                            <i class="uil uil-question-circle" style="font-size: 5rem"></i>
                        </div>
                        <div class="col">
                            <p class="font-weight-bold mb-1">Lorem ipsum dolor sit</p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quidem enim nulla quam earum.
                        </div>
                    </div>
                    <div class="row row--sm my-3 py-1">
                        <div class="col">
                            <p class="font-weight-bold mb-1">Lorem ipsum dolor sit</p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quidem enim nulla quam earum.
                        </div>
                        <div class="col-auto">
                            <i class="uil uil-question-circle" style="font-size: 5rem"></i>
                        </div>
                    </div>
                    <hr>
                    <div class="row row--sm my-3 py-1">
                        <div class="col">
                            <button class="btn btn-primary w-100"  @click="setPremium" >
                                <strong>SE PREMIUM</strong>
                            </button>
                        </div>
                        <div class="col-12 text-center mt-2">
                            <router-link :to="{name: 'contact'}">Contáctanos para más información</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>
