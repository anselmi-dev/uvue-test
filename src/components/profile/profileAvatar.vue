<template>
	<div class="account-picture" :class="{'account-picture--not-edit': !isEdit}">
		<label for="profile-picture" class="account-picture__content">
			<loading :active.sync="isLoading" :is-full-page="false" />
			<avatar
				:backgroundColor="'#0069ff'"
			 	:src="src ? src : user.pic_url"
				:username="split_name" />
				<!-- capture -->
			<input
				name="profile-picture"
				id="profile-picture"
				type="file"
				accept="image/*;capture=camera"
				class="d-none"
				@change="onFileSelected"
				:disabled="isLoading"
				v-if="isEdit"/>
		</label>
        <label for="profile-picture" class="btn btn-sm btn-primary position-relative" v-show="showButton">
			<loading :active.sync="isLoading" :is-full-page="false" :height="15"/>
            SUBIR UNA FOTO
        </label>
	</div>
</template>

<script>
import UserService from '@/services/user.service';
import Avatar from 'vue-avatar'

export default {
  	components: {
    	Avatar,
  	},
  	props: {
  		src: {
  			type: String,
  			required: false,
  			default: null
  		},
  	  	isEdit: {
  	    	type: Boolean,
  	    	required: false,
  	    	default: true
  	  	},
  	  	showButton: {
  	    	type: Boolean,
  	    	required: false,
  	    	default: false
  	  	},
  	  	callback: {
  	    	type: String,
  	    	required: false,
  	    	default: null
  	  	}
  	},
	data () {
		return {
			show: false,
			isLoading: false,
			file: null,
			profilePicture: null,
			imgDataUrl: ''
		}
	},
    computed: {
        split_name () {
            return this.user.first_name.split(" ")[0] + ' ' +  this.user.last_name.split(" ")[0];
        }
    },
	methods: {
		toggleShow () {
			this.show = !this.show;
		},
		onFileSelected (event) {
			if (this.isEdit) {
			    this.file = event.target.files[0];
                if (this.file) {
					if (this.file.type.includes('image/')) {
						this.isLoading = true
						if (this.file.size > 2097152) {
							this.isLoading = false
							event.target.value = ''
							this.$bus.emit("notifications:push", {
								type: 'error',
								message: 'La imagen no puede superar los 2MB.'
							})
						} else {
							this.updateProfilePicture(this.file)
						}
					} else {
						this.$bus.emit("notifications:push", {
							type: 'error',
							message: 'El formato no es una imagen.'
						})
					}
                }
			}
		},
		updateProfilePicture (file) {
			UserService.updateProfilePicture({
				fileName: file.name,
				fileType: file.type
			}).then(
			resp => {
				this.profilePicture = resp.image_url.url
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

				this.isLoading = false
			})
		},
		uploadFile (url) {
			UserService.uploadFile(url, this.file, this.file.type).then(
			resp => {
				if (this.callback) {
					this.$emit(this.callback, this.profilePicture);
					this.isLoading = false
				}
				else {
					let userObj = Object.assign({}, this.user)
					userObj.pic_url = this.profilePicture + '?time=' + Date.now()
                	this.$store.dispatch('auth/updateAvatar', userObj)
                    const fr = new FileReader();
                    fr.onload = () => {
                        this.user.pic_url = fr.result;
                    }
                    fr.readAsDataURL(this.file);
        			this.isLoading = false
                    this.$bus.emit("notifications:push", {
                        type: 'dark',
                        message: 'Actualizaste tu foto de perfil.'
                    })
				}
			},
			error => {

                let responseError = 'Ocurrio un error! Intente nuevamente o más tarde.'
                try {
                    responseError = error.response.data.err
                } catch (e) {}

                this.$bus.emit("notifications:push", { title: 'Ups!', type: 'error', message: responseError})

        		this.isLoading = false
			})
		}
	}
}
</script>

<style lang="scss">
    .account-picture--not-edit .account-picture__content:before {
        display: none;
    }
    .account-picture--not-edit .account-picture__content {
        cursor: default;
        pointer-events: none;
    }
	.vue-image-crop-upload.vue-image-crop-upload {
		display: flex;
		align-items: center;
		overflow: auto;
		justify-content: center;
    	padding-top: 35px;
    	padding-bottom: 35px;
	}
	.vue-image-crop-upload .vicp-wrap.vicp-wrap {
    	max-width: 80%;
    	width: 500px;
    	height: min-content;
    	position: relative;
	}
	.vue-image-crop-upload .vicp-wrap .vicp-operate.vicp-operate {
		position: relative;
		top: initial;
		bottom: initial;
		display: inline-block;
		margin-top: 1rem;
		a {
			font-weight: 600;
			color: $primary;
		}
	}
</style>
