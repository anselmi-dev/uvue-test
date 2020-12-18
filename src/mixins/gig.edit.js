import actions from '@/components/gigs/edit/actions'
import Loading from 'vue-loading-overlay';
import GigsService from '@/services/gigs.service';

export default {
  components: {
    actions,
    Loading
  },
  data() {
    return {
      disabled: false,
      isLoading: false,
      modelInitial: null,
      modelEdit: null
    }
  },
  mounted() {
    this.modelInitial = this.model
  },
  props: {
    id: {
      required: true
    },
    model: {
      required: true
    }
  },
  methods: {
    edit() {
      this.modelEdit = this.modelInitial
      this.toggleEdit()
    },
    cancel() {
      this.$v.modelEdit.$reset()
      this.toggleEdit()
    },
    toggleEdit() {
      this.disabled = !this.disabled
    },
    update () {
      this.$v.modelEdit.$touch()
      if (!this.$v.modelEdit.$invalid) {
        const data = Object.assign(this.getDataFormat(), { id: this.id })
        this.sendData(data)
        .then((resp) => {
          this.modelInitial = this.modelEdit
        })
      }
    },
    sendData(data) {
      this.isLoading = true
      return new Promise((resolve, reject) => {
        GigsService.updateGig(data)
          .then((resp) => {
            this.isLoading = false
            this.toggleEdit()
            this.$bus.emit("notifications:push", {
              type: 'dark',
              message: 'Tus cambios fueron guardados exitosamente.'
            })
            resolve(resp.data)
          })
          .catch((err) => {
            this.isLoading = false
            console.error(err)
            reject(err)
          })
      })
    },
    toggleGig () {
      this.$v.modelEdit.$touch()
      this.isLoading = true
      GigsService.toggleStatus(this.id)
        .then((resp) => {
          this.isLoading = false
          this.toggleEdit()
          this.$bus.emit("notifications:push", {
            type: 'dark',
            message: 'Tus cambios fueron guardados exitosamente.'
          })
          this.modelInitial = this.modelEdit
        })
        .catch((err) => {
          this.isLoading = false
        })
    }
  },
  computed: {}
}
