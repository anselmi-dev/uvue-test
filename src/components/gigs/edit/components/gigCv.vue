<template>
    <div class="teacher-cv mb-0 pb-0 position-relative">
        <loading :active.sync="isLoading" :is-full-page="false" :height="20"/>
        <div class="title">
            Certificados
        </div>
        <div class="teacher-information__content" v-if="modelInitial">
            <div class="teacher-cv__content" :class="{'opacity-05': !isPremium}" v-if="modelInitial.length">
                <div class="d-flex" v-for="(file, index) in modelInitial" :key="index">
                    <a :href="file" target="_blank" class="teacher-cv__link text-truncate">
                        <i class="ipunku-paperclip"></i> {{ file | nameFile }}
                    </a>
                    <button class="btn btn-sm text-danger p-0 ml-auto" @click="removerFile(index)">Remover</button>
                </div>
            </div>
            <div class="d-block mt-3" v-if="!maxFiles">
                {{
                    !modelInitial.length ?
                    'Sin documentos. Puede subirlos ' :
                    'Subir otro documento '
                }}
                <router-link :to="{name: 'premium'}" v-if="!isPremium">
                    Aquí
                </router-link>
                <label class="font-weight-bold text-primary cursor-pointer h6" name="video-file-cv" v-else>
                    Aqui
                    <input
                        name="gig-file-cv"
                        id="gig-file-cv"
                        type="file"
                        class="d-none"
                        :accept="objectFile.type_accept"
                        @change="onFileSelected"
                        :disabled="isLoading"/>
                </label>
            </div>
            <div class="d-block mt-3 p-1 alert alert-light text-dark h8" v-if="!isPremium && modelInitial.length">
                <i class="uil uil-exclamation-circle"></i> Sus Certificados no seran visualizados, ya que dejo de ser premium.
            </div>
            <div class="d-block mt-3 p-1 alert alert-warning" v-if="maxFiles">
                <small class="text-dark line-height">
                    <i class="uil uil-exclamation-circle"></i>
                    Solo se permite un máximo de <strong>{{objectFile.max_files}} archivos</strong>
                </small>
            </div>
        </div>
    </div>
</template>

<script>
import gigEdit from '@/mixins/gig.edit'
import FileService from '@/services/file.service.js'

export default {
    mixins: [gigEdit],	
    props: {	
        gig: {	
            type: Object,	
            required: true	
        }	
    },
    data: function () {
        return {
            isLoading: false,
            files: [],
            objectFile: {
                file: null,
                type_accept: 'image/bmp,image/gif,image/jpeg,image/pjpeg,image/png,image/svg+xml, image/tiff, image/webp, image/x-icon, application/pdf',
                max_size: 2100581, //2MB
                max_files: 5
            },
        }
    },
    computed: {
        maxFiles () {
            return this.modelInitial.length == this.objectFile.max_files
        }
    },
    filters: {
        nameFile (file) {
            try {
                const split = file.split('/')
                return decodeURI(split[split.length-1])
            } catch (e) {
                return 'SIN NOMBRE'
            }
        }
    },
    mounted () {
        this.files = this.user.teacher.files_url
    },
    methods: {
        onFileSelected (event) {
            this.objectFile.file = event.target.files[0];
            if (!FileService.isTypeAccept(this.objectFile.file['type'], this.objectFile.type_accept) && this.objectFile.type_accept != '*') {
                this.$bus.emit("notifications:push", { type: 'error', message: 'El formato es invalido, solo se permite PDF e imagenes' })
            } else if (!(this.objectFile.file.size <= this.objectFile.max_size)) {
                this.$bus.emit("notifications:push", { type: 'warning', message: 'El máximo es de 2MB' })
            } else {
                this.isLoading = true
                let formData = new FormData();
                formData.append('file', this.objectFile.file);
                formData.append('fileName', this.objectFile.file.name);
                formData.append('fileType', this.objectFile.file.type);
                formData.append('gig_title', this.gig.title);
                FileService.upload(formData)
                .then(resp => {
                    this.modelEdit = this.modelInitial && this.modelInitial.length ? this.modelInitial : []
                    console.log({before: this.modelInitial})
                    this.modelEdit.push(resp.data.url)
                    console.log({after: this.modelEdit})
                    this.isLoading = false
                    this.update()
                })
                .catch(err => {
                    this.isLoading = false
                    this.$bus.emit("notifications:push", { type: 'error', message: 'Ocurrio un error inesperado' })
                })
            }
            event.target.value = null
        },
        removerFile (index) {
            this.$confirm({
                title: `¿Estás seguro de querer continuar?`,
                message: 'No podrá recuperar la información',
                button: { no: 'No', yes: 'Si'},
                callback: confirm => {
                    if (confirm) {
                        const file = this.modelInitial[index]
                        this.modelInitial.splice(index, 1)
                        this.modelEdit = this.modelInitial
                        this.update()
                    }
                }
            })
        },
        getDataFormat () {	
            return {	
                files_url: this.modelEdit	
            }	
        },
        // openModal () {
        //     this.$bvModal.show('modal-dropzone')
        // },
        // closeModal () {
        //     this.$bvModal.hide('modal-dropzone')
        //     this.$refs.myVueDropzone.removeAllFiles()
        // },
        // vdropzoneSuccess(file, response) {
        //     console.log(file)
        //     console.log(response)
        // }
    },	
    validations: {	
        modelEdit: {}	
    }
}
</script>

<style lang="scss">
    .teacher-cv {
        &__content {
            margin-right: -10px;
            margin-left: -10px;
            position: relative;
        }
        &__link {
            display: inline;
            position: relative;
            margin-right: 10px;
            margin-left: 10px;
        }
    }
    .opacity-05 {
        opacity: .5;
    }
</style>
