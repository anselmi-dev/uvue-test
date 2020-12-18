<template>
	<div class="teacher-create__step position-relative" :id="'teacher-create-'+index">
		<loading :active.sync="isLoading" :is-full-page="false" />
        <div class="punku__title">
            Video de presentación <small>(Opcional)</small>
        </div>
        <div class="row align-items-center">
            <div class="col-12 col-md-6">
                <p>Aquí puedes registrar un vídeo de presentación</p>
                <p>Te recomendamos grabar el vídeo solo y en un lugar iluminado</p>
                <ul>
                    <li>Tamaño máximo de <strong>{{ (max_size/1024)/1024 }} MB</strong>  .</li>
                    <li>Duración máxima de <strong>{{ Math.trunc(max_time) }}s</strong>.</li>
                    <li>Formato debe ser <strong>MP4</strong>.</li>
                </ul>
                <p>¿Necesitas subir un video de mayor duración? Hazte premium y preséntate de una mejor forma para diferenciarte de los demás</p>
            </div>

            <div class="col-12 col-md-6 text-center">
                <div class="content-videou" :class="{'empyt': !video}">
                    <video width="400" height="200" controls="none" preload="metadata" aspect="16by9" :src="video" :key="video">
                        <source :src="video" type="video/mp4">
                    </video>
                </div>
                <label class="btn btn-sm btn-primary" name="video-gig">
                    SUBIR VIDEO
                        <!-- capture -->
					<input
						name="video-gig"
						class="d-none"
						id="video-gig"
						type="file"
                        preload="auto"
                        :accept="type_accept"
						@change="onFileSelected"
						:disabled="isLoading"/>
                </label>
            </div>
        </div>
        <div class="row">
            <div class="teacher-create__actions">
                <button class="punku-action" @click="next" :disabled="isLoading">Terminar mi anuncio</button>
            </div>
        </div>
        <popupVideoPremium />
	</div>
</template>

<script>
import teacherCreate from '@/mixins/teacherCreate'
import SubjectsService from '@/services/subjects.service';
import UserService from '@/services/user.service';
import popupVideoPremium from '@/components/premium/popupVideoPremium'

export default {
    mixins: [teacherCreate],
    components: {
        popupVideoPremium
    },
    data () {
    	return {
            isFirst: true,
    		file: null,
    		video: null,
    		preVideo: null,
    		isLoading: false,
            max_time: this.isPremium ? 120 : 20.9,
            max_size: this.isPremium ? (20 * 1024 * 1024) : (3 * 1024 * 1024),
            type_accept: 'video/mp4;capture=camera',
            isFirstModalPremium: false
    	};
    },
    mounted () {
        this.max_time = this.isPremium ? 120 : 20.9
        this.max_size = this.isPremium ? (20 * 1024 * 1024) : (3 * 1024 * 1024)
    },
    methods: {
    	next () {
            this.isFirst = false
    		this.nextStep({video_url: this.preVideo})
            this.$bus.emit('teacher.create.finalize')
    	},
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
                                        this.updateProfilePicture (this.file)
                                    } else {
                                        this.isLoading = false
                                        this.$bus.emit("notifications:push", { type: 'error', message: `Tu video no cumple los requisitos`})
                                    }
                                    clearInterval(timer);
                                }
                            }, 500)
                        }
                        reader.readAsDataURL(this.file);
                    } else {
                        this.isLoading = false
                        this.$bus.emit("notifications:push", { type: 'error', message: `Tu video no cumple los requisitos`})
                    }
                } else {
                    this.isLoading = false
                    this.$bus.emit("notifications:push", { type: 'error', message: `Tu video no cumple los requisitos`})
                }
            }
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
        },
        verificDuration (time) {
            time = parseFloat(time.toFixed(2));
            var hours = Math.floor(time / 3600);
            var minutes = Math.floor((time - (hours * 3600)) / 60);
            var seconds = time - (hours * 3600) - (minutes * 60);
            if (hours == 0 && minutes == 0 && seconds <= this.max_time)
                return true
            return false
        }
    }
}
</script>

<style lang="scss">
    .content-videou {
        position: relative;
        margin-bottom: .5rem;
        video {
            box-shadow: 0px 3px 6px #868686;
            border-left: 3px solid $primary;
        }
        &.empyt:before {
            position: absolute;
            top: 0;
            right: 0;
            content: "";
            width: 100%;
            height: 100%;
            background: #cad4df;
            background-image: url('~@/assets/images/vplaceholder.jpg');
            background-size: cover;
            background-position: center;
            z-index: 1;
            line-height: 0;
            display: block;
        }
    }
</style>