import stepOne from './stepOne'
import stepSubject from './stepSubject'
import stepEducationLevel from './stepEducationLevel'
import stepTitle from './stepTitle'
import stepDescription from './stepDescription'
import stepLanguage from './stepLanguage'
import stepRequirements from './stepRequirements'
import stepModality from './stepModality'
import stepPersonalData from './stepPersonalData'
import stepVideoGig from './stepVideoGig'
import { mapActions } from 'vuex'

export default {
	components: {
    stepOne,
    stepSubject,
    stepEducationLevel,
    stepTitle,
    stepDescription,
    stepRequirements,
    stepModality,
    stepPersonalData,
    stepLanguage,
    stepVideoGig
	},
	data () {
		return {
      isSubmit: false,
			orderComponents: [
        'stepOne',
				'stepSubject',
				'stepEducationLevel',
				'stepTitle',
				'stepDescription',
				'stepRequirements',
				'stepLanguage',
        'stepModality',
				'stepVideoGig',
			]
		};
	},
  methods: {
    ...mapActions({gigCreate: 'auth/gigCreate'}),
    sendDateGig () {
      const storageTeacher = JSON.parse(localStorage.getItem('teacher.create'))
      let objectData = {}
      storageTeacher.steps.map((ob) => {
          if (!(typeof ob === 'string' || ob instanceof String))
              objectData = Object.assign({}, objectData, ob)
      });

      if (objectData.error) {
        this.$bus.emit("notifications:push", {
            title: 'Ups!',
            type: 'error',
            message: 'Debe completar los datos requeridos y verificar que esten correctos.'
        })
        document.getElementById(objectData.error).scrollIntoView()
      }
      else {
          this.isSubmit = true
          try {
            this.gigCreate({
              teacher: this.user.teacher._id,
              last_name: this.user.last_name,
              languages: objectData.languages,
              subject: objectData.subject.map(item => item._id),
              fare: objectData.modality.single.price,
              fare_group: objectData.modality.group.select ? objectData.modality.group.price : null,
              video_url: objectData.video_url ? objectData.video_url : null,
              files_url: objectData.files_url ? objectData.files_url : null,
              // schedule: objectData.schedule,
              requirements: objectData.requirements,
              title: objectData.title,
              description: objectData.description,
              education_level: objectData.education_level,
              auto_reservation: objectData.auto_reservation,
              first_class_discount: objectData.first_class_discount,
              group_class: objectData.modality.group.select
            }).then(resp => {
              this.$router.push({name: 'gig.success', params: { slug: resp.teacher }})
            })
            .catch(err => {
              this.isSubmit = false
              this.$bus.emit("notifications:push", {type: 'error',message: 'Ocurrio un error inesperado'})
            })
          } catch (e) {
            this.isSubmit = false
            this.$bus.emit("notifications:push", {
                title: 'Ups!',
                type: 'error',
                message: 'Ocurrio un error inesperado'
            })
          }
      }
    },
  },
  beforeMount() {
    if (this.user.teacher.gigs.length > 0 && !this.isPremium) {
      this.$router.push({name: 'premium'})
    } else {
      this.$store.dispatch('teacherCreate/initial')
      this.$store.dispatch('teacherCreate/pushComponents', { name: this.orderComponents[this.countSteps] })
      this.$bus.$on("teacher.create.push-step", (index) => {
        let nameStep = this.orderComponents[this.countSteps]
        this.$store.dispatch('teacherCreate/pushComponents', {name: nameStep})
      })
      
      this.$bus.$on("teacher.create.finalize", this.sendDateGig)
    }
  },
  beforeDestroy () {
    this.$store.dispatch('teacherCreate/initial')
    this.$bus.$off("teacher.create.finalize")
    this.$bus.$off("teacher.create.push-step")
    this.$store.dispatch('teacherCreate/clearSteps')
  }
}
