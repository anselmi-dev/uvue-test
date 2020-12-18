import stepOne from './stepOne'
import stepSubject from './stepSubject'
import stepEducationLevel from './stepEducationLevel'
import stepTitle from './stepTitle'
import stepDescription from './stepDescription'
import stepLanguage from './stepLanguage'
import stepRequirements from './stepRequirements'
import stepModality from './stepModality'
import stepReservation from './stepReservation'
import stepPersonalData from './stepPersonalData'
import stepAvatar from './stepAvatar'
import stepVideo from './stepVideo'
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
    stepReservation,
    stepPersonalData,
    stepAvatar,
    stepLanguage,
    stepVideo
	},
	data () {
		return {
      isSubmit: false,
			orderComponents: [
        'stepOne',
				'stepSubject',
				'stepTitle',
				'stepDescription',
				'stepEducationLevel',
				'stepLanguage',
				'stepRequirements',
        'stepModality',
        'stepReservation',
				'stepPersonalData',
        'stepAvatar',
        'stepVideo',
			]
		};
	},
  methods: {
    ...mapActions({gigCreate: 'auth/gigCreate', teacherCreate: 'auth/teacherCreate'}),
    sendDateTeacher () {
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
      } else {
          this.isSubmit = true
          try {
            this.teacherCreate({
              phone: objectData.phone,
              pic_url: objectData.pic_url ? objectData.pic_url : null,
              type_doc_ide: objectData.payment_info.type_doc_ide,
              num_doc_ide: objectData.payment_info.num_doc_ide,
              bank: objectData.payment_info.bank,
              account_number: objectData.payment_info.account_number,
              account_number2: objectData.payment_info.account_number2,
              first_class_discount: objectData.first_class_discount,
              about_me: objectData.description,
              schedule: objectData.schedule,
            }).then(resp => {
              this.gigCreate({
                  teacher: resp.id,
                  last_name: this.user.last_name,
                  languages: objectData.languages,
                  subject: objectData.subject.map(item => item._id),
                  fare: objectData.modality.single.price,
                  fare_group: objectData.modality.group.select ? objectData.modality.group.price : null,
                  video_url: objectData.video_url ? objectData.video_url : null,
                  files_url: objectData.files_url ? objectData.files_url : null,
                  requirements: objectData.requirements,
                  title: objectData.title,
                  description: objectData.description,
                  education_level: objectData.education_level,
                  auto_reservation: objectData.auto_reservation,
                  first_class_discount: objectData.first_class_discount,
                  group_class: objectData.modality.group.select,
                  main_gig: true
              }).then(resp => {
                this.$router.push({name: 'teacher.success'})
              })
              .catch(err => {
                this.isSubmit = false
                this.$bus.emit("notifications:push", {
                    title: 'Ups!',
                    type: 'error',
                    message: 'Ocurrio un error inesperado'
                })
                console.log(err)
              })
            })
            .catch(err => {
              this.isSubmit = false
              this.$bus.emit("notifications:push", {
                  title: 'Ups!',
                  type: 'error',
                  message: 'Ocurrio un error inesperado'
              })
              console.log(err)
            })
          } catch (e) {
            this.isSubmit = false
            this.$bus.emit("notifications:push", {
              type: 'error',
              message: 'Ocurrio un error inesperado'
            })
          }
      }
    },
  },
  beforeMount() {
    this.$store.dispatch('teacherCreate/initial')
    this.$store.dispatch('teacherCreate/pushComponents', { name: this.orderComponents[this.countSteps] })
    this.$bus.$on("teacher.create.push-step", (index) => {
    	let nameStep = this.orderComponents[this.countSteps]
      this.$store.dispatch('teacherCreate/pushComponents', {name: nameStep})
    })

    this.$bus.$on("teacher.create.finalize", this.sendDateTeacher)
  },
  beforeDestroy () {
    this.$store.dispatch('teacherCreate/initial')
    this.$bus.$off("teacher.create.finalize")
    this.$bus.$off("teacher.create.push-step")
    this.$store.dispatch('teacherCreate/clearSteps')
  }
}
