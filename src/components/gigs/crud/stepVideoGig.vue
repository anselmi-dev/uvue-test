<template>
	<div class="teacher-create__step position-relative" :id="'teacher-create-'+index">
		<loading :active.sync="isLoading" :is-full-page="false" />
        <div class="punku__title">
            Video de presentación <small>(Opcional)</small>
        </div>
        <div class="row align-items-center">
            <div class="col">
                <p>Tu video de presentación debe cumplir con las siguientes características:</p>
                <ul>
                    <li>Tamaño un máximo de 2 MB.</li>
                    <li>Tiempo maximo es de 10s.</li>
                    <li>Su formato debe ser MP4.</li>
                </ul>
                <p>Recomendamos:</p>
                <ul>
                    <li>Rostro sea muy visible.</li>
                    <li>Buena iluminación.</li>
                    <li>Sin <b>desnudo</b>.</li>
                    <li>Salir con ropa adecuada.</li>
                    <li>No salir acompañado.</li>
                </ul>
            </div>
            <div class="col-12 col-sm-6 text-center">
                <img :src="require('@/assets/icons/video.svg')">
                <label class="btn btn-sm btn-primary" name="video-gig">
                    SUBIR VIDEO
					<input
						name="video-gig"
						id="video-gig"
						type="file"
						accept="video/mp4,video/x-m4v,video/*"
						class="d-none"
						@change="onFileSelected"
						:disabled="isLoading"/>
                </label>
            </div>
        </div>
        <div class="row">
            <div class="teacher-create__actions">
                <button class="punku-action" @click="next" :disabled="isLoading">Crear anuncio</button>
            </div>
        </div>
	</div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import teacherCreate from '@/mixins/teacherCreate'
import SubjectsService from '@/services/subjects.service';
import UserService from '@/services/user.service';

export default {
    mixins: [teacherCreate],
    components: {
    	Loading
    },
    data () {
    	return {
            isFirst: true,
    		file: null,
    		video: null,
    		preVideo: null,
    		isLoading: false
    	};
    },
    methods: {
    	next () {
            this.isFirst = false
            this.pushStep({video_url: this.preVideo})
            this.$bus.emit('teacher.create.finalize')
    	},
		onFileSelected (event) {
			this.isLoading = true
			this.file = event.target.files[0];
			this.updateProfilePicture (this.file)
		},
		updateProfilePicture (file) {
			UserService.updateProfilePicture({
				fileName: file.name,
				fileType: file.type
			}).then(
			resp => {
				this.preVideo = resp.image_url.url
				this.uploadFile(resp.image_url.signedRequest)
			},
			error => {
                let responseError = 'Ocurrio un error! Intente nuevamente o más tarde.'
                try {
                    responseError = error.response.data.err
                } catch (e) {}

                this.$bus.emit("notifications:push", {
                    title: 'Ups!',
                    type: 'error',
                    message: responseError
                })

                console.warn({'authentication/login': responseError})
				this.isLoading = false
			})
		},
		uploadFile (url) {
			UserService.uploadFile(url, this.file, this.file.type).then(
			resp => {
				this.video = this.preVideo
				this.isLoading = false
			},
			error => {
                let responseError = 'Ocurrio un error! Intente nuevamente o más tarde.'
                try {
                    responseError = error.response.data.err
                } catch (e) {}

                this.$bus.emit("notifications:push", {
                    title: 'Ups!',
                    type: 'error',
                    message: responseError
                })

                console.warn({'authentication/login': responseError})

        		this.isLoading = false
			})
		}
    }
}
</script>
