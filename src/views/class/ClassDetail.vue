<template>
    <div class="class-detail">
        <b-container>
            <div v-if="!classDetails.isLoad">
                cargando
            </div>
            <div v-else>
                <b-row>
                    <b-col cols="12" class="mt-4 mb-2 d-flex flex-wrap align-items-center justify-content-space-between">
                        <router-link :to="{name: 'account.classes'}" class="font-weight-bold">
                            <i class="uil uil-angle-left-b"></i>
                            <span>Volver a mis clases</span>
                        </router-link>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" md="6" lg="8">
                        <div class="punku-box">
                            <h4>Resumen de la clase de <strong>{{ classDetails.subject.title }}</strong></h4>
                            <div>
                                Profesor: <strong class="text-capitalize">{{ classDetails.teacher | splitFullName }}</strong>
                            </div>
                            <div>
                                Horario: {{ `${classDetails.date_start},${classDetails.date_end}` | rangeDateClass }}
                            </div>
                            <!-- <pre>{{ classDetails }}</pre> -->
                            <hr>
                            <div>
                                <h4>Comentarios del profesor</h4>
                                <div class="d-block border border-light rounded p-2 my-2">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod sint perspiciatis neque sapiente porro repellendus vel vitae voluptatem nam, in eius! Atque incidunt voluptatum quas porro doloremque unde sequi delectus.
                                </div>
                                <div class="d-block border border-light rounded p-2 my-2">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod sint perspiciatis neque sapiente porro repellendus vel vitae voluptatem nam, in eius! Atque incidunt voluptatum quas porro doloremque unde sequi delectus.
                                </div>
                                <div class="d-block border border-light rounded p-2 my-2">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod sint perspiciatis neque sapiente porro repellendus vel vitae voluptatem nam, in eius! Atque incidunt voluptatum quas porro doloremque unde sequi delectus.
                                </div>
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="12" md="6" lg="4">
                        <div class="punku-box">
                            <h5>Documentos compartidos</h5>

                            
                            <div class="teacher-cv__content -mx-1">
                                <a :href="'file'" target="_blank" class="teacher-cv__link d-block">
                                    <i class="ipunku-paperclip"></i> Lorem, ipsum.
                                </a>
                                <a :href="'file'" target="_blank" class="teacher-cv__link d-block">
                                    <i class="ipunku-paperclip"></i> Lorem, ipsum.
                                </a>
                                <a :href="'file'" target="_blank" class="teacher-cv__link d-block">
                                    <i class="ipunku-paperclip"></i> Lorem, ipsum.
                                </a>
                            </div>

                            <div class="alert alert-light">
                                No compartieron archivos
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>

import ClassesService from '@/services/classes.service';

export default {
    components: {},
    beforeDestroy () {
    },
    data () {
        return {
            isLoading: true,
            classDetails: {}
        }
    },
    beforeMount () {
        ClassesService.getClassDetails(this.$route.params.id)
        .then((resp) => {
            this.classDetails = resp.classDetails
            this.classDetails.isLoad = true
        })
        .catch(err => {
            this.$bus.emit("app-error")
        })
    },
    methods: {}
}
</script>