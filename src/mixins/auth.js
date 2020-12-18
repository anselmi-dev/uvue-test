import { mapGetters, mapActions } from 'vuex'
import Loading from 'vue-loading-overlay';

export default {
  components: {
    Loading
  },
	methods: {
  	...mapActions({
      // removeGig: 'auth/removeGig',
      // updateUser: 'auth/updateUser',
      // pushMethodPayment: 'auth/pushMethodPayment'
    })
	},
	computed: {
    ...mapGetters({
    	user: 'auth/user',
    	isAuth: 'auth/isAuth',
    	isTeacher: 'auth/isTeacher',
      isPremium: 'auth/is_premium'
    })
	}
}
