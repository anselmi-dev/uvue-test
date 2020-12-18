<template>
    <div class="teacher-bio position-relative">
        <loading :active.sync="isLoading" :is-full-page="false" :height="20"/>
        <div class="title d-flex">
            Video de presentación
            <button
                v-if="modelInitial"
                class="btn btn-sm text-danger p-0 ml-auto" @click="removerFile()">
                Remover
            </button>
        </div>
        <div v-if="!modelInitial || true">
            <ul>
                <li>Tamaño máximo de <strong>{{ (max_size/1024)/1024 }} MB</strong>  .</li>
                <li>Duración máxima de <strong>{{ Math.trunc(max_time) }}s</strong>.</li>
                <li>Formato debe ser <strong>MP4</strong>.</li>
            </ul>
        </div>
        <div class="teacher-content-video" v-if="modelInitial">
            <div class="video">
                <vue-player :src="modelInitial" :video-placeholder-src="modelInitial" :model="modelInitial" style="height: 200px"></vue-player>
            </div>
        </div>
        <div class="d-block">
            {{ !modelInitial ? 'Subir video ' : 'Actualizar video ' }}
            <label class="font-weight-bold text-primary cursor-pointer h6" name="video-gig">
                Aquí
                <input
                    name="video-gig"
                    id="video-gig"
                    type="file"
                    :accept="objectFile.type_accept"
                    capture
                    @change="onFileSelected"
                    :disabled="isLoading"
                    class="d-none"/>
            </label>
            <!-- <a href="#" class="font-weight-bold"></a> -->
        </div>
        <popupVideoPremium />
    </div>
</template>

<script>
// Segun el filtro no hay alternativas.

import gigEdit from '@/mixins/gig.edit'
import vuePlayer  from  '@algoz098/vue-player'
import FileService from '@/services/file.service.js'
import popupVideoPremium from '@/components/premium/popupVideoPremium'

export default {
    mixins: [gigEdit],
    components: {
        vuePlayer,
        popupVideoPremium
    },
    props: {
        gig: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            isLoading: false,
            objectFile: {
                file: null,
                type_accept: 'video/mp4',
                max_size: this.isPremium ? (20 * 1024 * 1024) : (3 * 1024 * 1024), // 3 MB POR DEFECTO
            },
            max_time: this.isPremium ? 120 : 20.9,
            max_size: this.isPremium ? (20 * 1024 * 1024) : (3 * 1024 * 1024), // 3 MB POR DEFECTO
            isFirstModalPremium: false
        }
    },
    mounted () {
        this.objectFile.max_size = this.isPremium ? (20 * 1024 * 1024) : (3 * 1024 * 1024)
        this.max_time = this.isPremium ? 120 : 20.9
        this.max_size = this.isPremium ? (20 * 1024 * 1024) : (3 * 1024 * 1024)
    },
    methods: {
		onFileSelected (event) {
            this.file = event.target.files[0];
            event.target.value = null
            if (this.file) {
                if(this.file.name.match(/\.(mp4)$/i)) {
                    this.isLoading = true
                    if (this.file.size <= this.max_size) {
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            var videoElement = document.createElement('video');
                            videoElement.src = e.target.result;
                            var timer = setInterval(() => {
                                if (videoElement.readyState === 4) {
                                    if (this.verificDuration(videoElement.duration)) {
                                        this.load(this.file)
                                    } else {
                                        this.isLoading = false
                                        if (!this.isFirstModalPremium) {
                                            this.isFirstModalPremium = true
                                            setTimeout(() => {
                                                this.$bvModal.show('modal-video-premium')
                                            }, 500)
                                        } else {
                                            this.$bus.emit("notifications:push", { type: 'error', message: `No puede superar los ${Math.trunc(this.max_time)}s`})
                                        }
                                    }
                                    clearInterval(timer);
                                }
                            }, 500)
                        }
                        reader.readAsDataURL(this.file);
                    } else {
                        this.isLoading = false
                        if (!this.isFirstModalPremium) {
                            setTimeout(() => {
                                this.$bvModal.show('modal-video-premium')
                            }, 500)
                            this.isFirstModalPremium = true
                        } else 
                            this.$bus.emit("notifications:push", { type: 'error', message: `El video no puede superar los ${(this.max_size/1024)/1024}MB`})
                    }
                } else {
                    this.isLoading = false
                    this.$bus.emit("notifications:push", { type: 'error', message: `El formato del video es incorrecto. Solo se permite .mp4`})
                }
            }
        },
        verificDuration (time) {
            time = parseFloat(time.toFixed(2));
            var hours = Math.floor(time / 3600);
            var minutes = Math.floor((time - (hours * 3600)) / 60);
            var seconds = time - (hours * 3600) - (minutes * 60);
            if (hours == 0 && minutes == 0 && seconds <= this.max_time)
                return true
            return false
        },
        load (file) {
            let formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', file.name);
            formData.append('fileType', file.type);
            formData.append('gig_title', this.gig.title);
            
            FileService.upload(formData)
            .then(resp => {
                this.modelEdit = resp.data.url
                this.update()
                this.isLoading = false
            })
            .catch(err => {
                this.isLoading = false
                this.$bus.emit("notifications:push", { type: 'error', message: 'Ocurrio un error inesperado' })
            })
        },
        removerFile (index) {
            this.$confirm({
                title: `¿Estás seguro de querer continuar?`,
                message: 'No podrá recuperar la información',
                button: { no: 'No', yes: 'Si'},
                callback: confirm => {
                    if (confirm) {
                        this.modelEdit = null
                        this.update()
                    }
                }
            })
        },
        getDataFormat () {
            return {
                video_url: this.modelEdit
            }
        },
    },
    validations: {
        modelEdit: {}
    }
}
</script>

<style lang="scss">
    .teacher-content-video {
        margin-top: map-get($spacers, 4);
        margin-bottom: map-get($spacers, 4);
    }
    .vue-video-center {
        border-left: 4px solid $primary !important;
    }
</style>
