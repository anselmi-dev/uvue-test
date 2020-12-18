<template>
    <div class="links-recomendations">
        <b-row class="row--sm justify-content-center">
            <b-col cols="auto">
                <!-- SHARE-SOCIAL:FACEBOOK -->
                <ShareNetwork
                    network="facebook"
                    :url="url"
                    :title="title"
                    :description="description"
                    :quote="quote"
                    :hashtags="hashtags"
                    >
                    <b-button variant="facebook" size="sm" class="my-1">
                        <i class="uil uil-facebook-f"></i><span>Facebook</span>
                    </b-button>
                </ShareNetwork>
            </b-col>
            <b-col cols="auto">
                <!-- SHARE-SOCIAL:TWITTER -->
                <ShareNetwork
                    network="twitter"
                    :url="url"
                    :title="title"
                    :description="description"
                    :quote="quote"
                    :hashtags="hashtags"
                    >
                    <b-button variant="twitter" size="sm" class="my-1">
                        <i class="uil uil-twitter"></i><span>Twitter</span>
                    </b-button>
                </ShareNetwork>
            </b-col>

            <b-col cols="auto">
                <!-- SHARE-SOCIAL:LinkedIn -->
                <ShareNetwork
                    network="linkedIn"
                    :url="url"
                    :title="title"
                    :description="description"
                    :quote="quote"
                    :hashtags="hashtags"
                    >
                    <b-button variant="linkedin" size="sm" class="my-1">
                        <i class="uil uil-linkedin"></i><span>LinkedIn </span>
                    </b-button>
                </ShareNetwork>
            </b-col>


            <b-col cols="auto">
                <!-- SHARE-SOCIAL:WHATSAPP -->
                <ShareNetwork
                    network="whatsapp"
                    :url="url"
                    :title="title"
                    >
                    <b-button variant="whatsapp" size="sm" class="my-1">
                        <i class="uil uil-whatsapp"></i><span>Whatsapp</span>
                    </b-button>
                </ShareNetwork>
            </b-col>

            <!-- <b-col cols="auto">
                <a href="https://msng.link/o/?https://bootstrap-vue.org/docs/components/embed=fm">Message me on Facebook Messenger</a>
                <a href="https://msng.link/o/?https://www.npmjs.com/package/@algoz098/vue-player=ig">Message me on Instagram</a>
                <a class="btn btn-sm btn-facebook" href="https://www.facebook.com/dialog/send?link=https%3A%2F%2Fwww.sharethis.com%2F&app_id=31897047275577&redirect_uri=https%3A%2F%2Fwww.sharethis.com">
                    Messenger
                </a>
            </b-col> -->
            <b-col cols="auto" v-if="data.emailSimple">
                <!-- SHARE-SOCIAL:EMAIL -->
                <ShareNetwork
                    network="email"
                    :url="''"
                    :title="title"
                    :description="description"
                    :quote="quote"
                    :hashtags="hashtags"
                    >
                    <b-button variant="dark" size="sm" class="my-1">
                        <i class="uil uil-envelope"></i><span>Email</span>
                    </b-button>
                </ShareNetwork>
            </b-col>

            <b-col cols="auto" v-else>
                <!-- SHARE-SOCIAL:EMAILS -->
                <b-button variant="dark" size="sm" @click="$modal.show('share-email')" class="my-1">
                    <i class="uil uil-envelope"></i><span>Email</span>
                </b-button>
                <modal
                    name="share-email"
                    :scrollable="true"
                    width="500"
                    :clickToClose="false"
                    height="auto">
                    <div class="form-emails-share punku-box pt-5 pb-4">
                        <loading :active.sync="emails.isLoading" :is-full-page="true"></loading>
                        <p>Envía un correo a tus contactos para solicitar un recomendación</p>
                        <multiselect v-model="emails.items"
                                    tag-placeholder="Agregar"
                                    placeholder="Escriba los correos de sus amig@s..."
                                    :multiple="true"
                                    :showNoOptions="false"
                                    :showNoResults="false"
                                    :options="[]"
                                    :taggable="true"
                                    @tag="addTag"></multiselect>
                                    <hr>
                        <div class="row row--sm justify-content-center">
                            <b-col cols="auto">
                                <b-button variant="primary" pill @click="sendEmail">
                                    <i class="uil uil-envelopes"></i> Enviar
                                </b-button>
                            </b-col>
                            <b-col cols="auto">
                                <b-button variant="dark" pill @click="$modal.hide('share-email')">Cancelar</b-button>
                            </b-col>
                        </div>
                    </div>
                </modal>
            </b-col>

            <b-col cols="12">
                <hr>
                
                <p>Copiar el enlace</p>
                <div class="input-group mb-3">
                    <input
                        type="text"
                        class="form-control"
                        readonly
                        id="input-url-copy"
                        :value="url"
                        >
                    <div class="input-group-append">
                        <button
                            class="btn btn-dark"
                            type="button"
                            id="button-copy-link"
                            @click="copyToClipboard('copi')">COPIAR ENLACE</button>
                        <b-tooltip target="button-copy-link" triggers="click">
                            Enlace copiado
                        </b-tooltip>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import VueSocialSharing from 'vue-social-sharing'
import Multiselect from 'vue-multiselect'
import { required, minLength } from 'vuelidate/lib/validators'
import RecommendationService from '@/services/recommendation.service'

export default {
    components: {
        VueSocialSharing,
        Multiselect
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            emails: {
                items: [],
                isLoading: false,
            }
        }
    },
    computed: {
        url () { return this.data.url },
        title () { return this.data.title ? this.data.title : 'Hola, soy PunkuProfe. Dame una recomendación y ayuda a otros a conocerme mejor' },
        description () { return this.data.description ? this.data.description : 'PUNKU SABER | LA PUERDA AL CONOCIMIENTO' },
        quote () { return this.data.quote ? this.data.descriptions : 'Hola, soy PunkuProfe. Dame una recomendación y ayuda a otros a conocerme mejor' },
        hashtags () { return 'punku,punkusaber,punkuprofe,mipuertaalsaber' },
    },
    created() {
      FB.Event.subscribe('send_to_messenger', function(e) {});
    },
    methods: {
        addTag (newTag) {
            this.emails.items.push(newTag)
        },
        sendEmail () {
            this.$v.emails.$touch()
            if (!this.$v.emails.$invalid) {
                this.emails.isLoading = true
                RecommendationService.askForCommendation(this.emails.items)
                .then((resp) => {
                    this.emails.isLoading = false
                    this.$modal.hide('share-email')
                    this.emails.items = []
                    setTimeout(() => {}, 500)
                    this.$bus.emit("notifications:push", { title: 'Excelente!', type: 'dark', message: 'Tu recomendación fue solicitada.'})
                })
            } else {
                this.$bus.emit("notifications:push", { title: 'Ups!', type: 'error', message: 'Debe agregar por lo menos un correo electrónico'})
                this.$func.buzzing('.form-emails-share')
            }
        },
        copyToClipboard (text) {
            var copyText = document.getElementById("input-url-copy");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");
        },
    },
    validations: {
        emails: {
            items: {
                required,
                minLength: minLength(1)
            }
        }
    }
}
</script>
<style lang="scss">
    .btn-facebook {
        background-color: $facebook;
        color: $white;
        &:hover {
            background-color: lighten($color: $facebook, $amount: 5);
            color: $white;
        }
    }
    .btn-twitter {
        background-color: $twitter;
        color: $white;
        &:hover {
            background-color: lighten($color: $twitter, $amount: 5);
            color: $white;
        }
    }
    .btn-linkedin {
        background-color: $linkedin;
        color: $white;
        &:hover {
            background-color: lighten($color: $linkedin, $amount: 5);
            color: $white;
        }
    }
    .btn-whatsapp {
        background-color: $whatsapp;
        color: $white;
        &:hover {
            background-color: lighten($color: $whatsapp, $amount: 5);
            color: $white;
        }
    }
</style>