<template>
    <div class="teacher-cv mb-0 pb-0 position-relative">
        <loading :active.sync="isLoading" :is-full-page="false" :height="20"/>
        <div class="title">
            Certificados
        </div>
        <div class="teacher-information__content">
            <div class="teacher-cv__content" v-if="files.length">
                <div class="d-flex" v-for="(file, index) in files" :key="index">
                    <a :href="file" target="_blank" class="teacher-cv__link text-truncate">
                        <i class="ipunku-paperclip"></i> {{ file | nameFile }}
                    </a>
                    <button class="btn btn-sm text-danger p-0 ml-auto" @click="removerFile(index)">Remover</button>
                </div>
            </div>
            <div class="d-block mt-3">
                {{
                    !files.length ?
                    'Sin documentos. Puede subirlos ' :
                    'Subir otro documento '
                }}
                <label class="font-weight-bold text-primary cursor-pointer h6" name="video-file-cv">
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
        </div>
    </div>
</template>

<script>
import FileService from '@/services/file.service.js'
import TeacherServices from '@/services/teacher.service';
// import vue2Dropzone from 'vue2-dropzone'
// import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
    data: function () {
        return {
            isLoading: false,
            files: [],
            objectFile: {
                file: null,
                type_accept: 'image/png, image/jpeg, application/pdf',
                max_size: 2100581, //2MB
            },
            // dropzoneOptions: {
            //     url: 'https://httpbin.org/post',
            //     thumbnailWidth: 25,
            //     maxFilesize: 0.5,
            //     dictDefaultMessage: 'PDF',
            //     maxFiles: 5,
            //     acceptedFiles: 'image/*,application/pdf'
            // }
        }
    },
    filters: {
        nameFile (file) {
            try {
                const split = file.split('/')
                return split[split.length-1]
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
            if (!FileService.isTypeAccept(this.objectFile.file['type'], this.objectFile.type_accept)) {
                this.$bus.emit("notifications:push", { type: 'error', message: 'El formato es invalido, solo se permite PDF e imagenes PNG y JPG' })
            } else if (!(this.objectFile.file.size <= this.objectFile.max_size)) {
                this.$bus.emit("notifications:push", { type: 'warning', message: 'El máximo es de 2MB' })
            } else {
                this.isLoading = true
                let formData = new FormData();
                formData.append('file', this.objectFile.file);
                formData.append('fileName', this.objectFile.file.name);
                formData.append('fileType', this.objectFile.file.type);
                FileService.upload(formData)
                .then(resp => {
                    const files_url = resp.data.url
                    TeacherServices.updateTeacher({files_url}).then(resp => {
                        this.files.push(files_url)
                        this.$bus.emit("notifications:push", {
                            type: 'dark',
                            message: 'Sus preferencias de cobro fue actualizada correctamente!'
                        })
                    })
                    .catch(err => {
                        let responseError = 'Ocurrio un error! Intente nuevamente o más tarde.'
                        try { responseError = err.response.data.err } catch (e) {}
                        this.$bus.emit("notifications:push", { title: 'Ups!', type: 'error', message: responseError })
                    }).finally (() => {
                        this.isLoading = false
                    })
                    // this.modelEdit = this.modelEdit ? this.modelEdit : []
                    // this.modelEdit.push(resp.data.url)
                    // this.update()
                    // this.isLoading = false
                })
                .catch(err => {
                    this.isLoading = false
                    this.$bus.emit("notifications:push", { type: 'error', message: 'Ocurrio un error inesperado' })
                })
            }
        },
        removerFile (index) {
            this.$confirm({
                title: `¿Estás seguro de querer continuar?`,
                message: 'No podrá recuperar la información',
                button: { no: 'No', yes: 'Si'},
                callback: confirm => {
                    if (confirm) {
                        const files_url = this.files[index]
                        TeacherServices.removeTeacherDocs({files_url}).then(resp => {
                            this.files.splice(index, 1)
                            this.$bus.emit("notifications:push", { type: 'dark', message: 'Se elimino su documento de su perfil' })
                        })
                        .catch(err => {
                            let responseError = 'Ocurrio un error! Intente nuevamente o más tarde.'
                            try { responseError = err.response.data.err } catch (e) {}
                            this.$bus.emit("notifications:push", { title: 'Ups!', type: 'error', message: responseError })
                        }).finally (() => {
                            this.isLoading = false
                        })
                    }
                }
            })
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
    components: {
        // vueDropzone: vue2Dropzone
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
</style>
