<template>
    <b-modal
        id="modal-classes-observaciones"
        centered
        size="lg"
        :hide-footer="true"
        :hide-header="true"
        :hide-header-close="true">
            <div v-if="currentClass" class="px-2 pb-3">
                <div class="flex flex-wrap mb-3 h5">
                    <span class="d-inline-block font-weight-bold">
                        Detalle de la clase
                    </span> <span class="d-inline-block">{{currentClass.subject.title}}</span>
                </div>
                <hr>
                <div v-if="isEmpyt">
                    <span class="border-bottom border-primary mb-2 d-block">Observaciones</span>
                    <div class="mb-4" v-if="currentClass.observations">
                        <span>
                            {{ currentClass.observations }}
                        </span>
                    </div>

                    <div v-if="currentClass.files_url.length">
                        <div class="border-bottom border-primary mb-2 d-block">Archivos adjuntados</div>
                        <div class="d-flex" v-for="(file, index) in currentClass.files_url" :key="index">
                            <a :href="file" target="_blank" class="teacher-cv__link text-truncate">
                                <i class="ipunku-paperclip"></i>
                                {{ file | nameFile }}
                            </a>
                        </div>
                    </div>
                </div>
                <div v-else>
                    Sin archivos ni observaciones agregadas.
                </div>
                <div class="mt-4" v-if="!isTeacher">
                    <router-link :to="{name: 'gig.reservation.edit', params: {id: currentClass._id}}" class="btn btn-outline-primary">
                        Editar
                    </router-link>
                </div>
            </div>
    </b-modal>
</template>

<script>
    export default {
        data () {
            return {
                isLoading: false,
                currentClass: null
            }
        },
        computed: {
            isEmpyt () {
                if (!(
                        this.currentClass &&
                        this.currentClass.files_url.length ||
                        this.currentClass.observations
                    )) {
                    return false;
                }
                return true;
            },
            isTeacher () {
                return  this.user.teacher && this.user.teacher._id == this.currentClass.teacher.teacher
            },
        },
        filters: {
            nameFile (file) {
                try {
                    const split = file.split('/')
                    return decodeURI(split[split.length-1])
                } catch (e) {
                    return 'SIN NOMBRE'
                }
            },
        },
        beforeMount() {
            this.$bus.$on('classes:observaciones', this.observationsClass)
        },
        methods: {
            observationsClass (currentClass) {
                this.currentClass = currentClass
                this.$bvModal.show('modal-classes-observaciones')
            }
        }
    }
</script>
