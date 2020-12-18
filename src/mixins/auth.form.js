import AuthService from '@/services/auth.service';
import GoogleLogin from 'vue-google-login';

export default {
    data() {
        return {
            isLoading: false,
            zumbido: false,
            error: null,
            paramsGoogle: {
                client_id: "376167615765-brf7h5dt32h63475lg5sl11bmfcsm3kk.apps.googleusercontent.com",
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    props: {
        modal: {
            default: true,
    		type: Boolean
    	}
    },
    components: { GoogleLogin },
    methods: {
        loginFacebook() {
            this.isLoading = true
            FB.login((response) => {
                if (response.authResponse && response.authResponse.accessToken) {
                    AuthService.login({ 'code': response.authResponse.accessToken, 'type': 'facebook' })
                    .then((resp) => {
                        // localStorage.setItem('before-register', true);
                        this.$bus.$emit('close-modal-auth')
                        const redirect = this.$route.query.redirect ? this.$route.query.redirect : '/'
                        if (this.$route.path !== redirect)
                            this.$router.push(redirect)
                        else
                            this.$router.go()
                    })
                    .catch(err => {
                        this.isLoading = false
                    })
                } else {
                    this.isLoading = false
                }
            })
        },
        logoutFacebook () {
            FB.logout((response) => {
                localStorage.removeItem('token');
            });
        },
        onSuccessGoogle (googleUser) {
            AuthService.login({ 'code': googleUser.xc.id_token, 'type': googleUser.xc.idpId }).then(() => {
                const redirect = this.$route.query.redirect ? this.$route.query.redirect : '/'
                // localStorage.setItem('before-register', true);
                if (this.$route.path !== redirect) {
                    this.$router.push(redirect)
                }
                else
                    this.$router.go()
                this.resetForm()
                this.$modal.hide('modal-login')
            })
        },
        onFailureGoogle (resp) {
            console.log(resp)
        }
    }
}