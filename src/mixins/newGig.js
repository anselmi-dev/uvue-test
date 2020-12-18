import { mapGetterss } from 'vuex'

export default {
    props: {
      index: {
        default: 0
      }
    },
  	methods: {
  		updateStep (data) {
        this.$store.dispatch('teacherCreate/updateStep', {
          position: this.index,
          value: data
        })
      },
      pushStep (data) {
        this.$store.dispatch('teacherCreate/pushStep', {
          position: this.index,
          value: data
        })
      },
      nextStep (data) {
          this.$store.dispatch('teacherCreate/setStep', {
  				  position: this.index,
            value: data
  		    })
  		    if (this.isVisible) {
  		    	this.$bus.emit('teacher.create.push-step', this.index)
  		    }
  		},
  	},
  	computed: {
    	...mapGetters({
        steps: 'teacherCreate/steps',
        countSteps: 'teacherCreate/count',
        components: 'teacherCreate/components'
      }),
    	isVisible () {
    		return this.countSteps <= this.index + 1
    	}
  	}
}
