<template>
	<div class="teacher-create__step" :id="'teacher-create-'+index">
        <div class="punku__title">
            {{ user.pic_url ? 'Actualiza' : 'Subir' }} foto de perfil <small>(Opcional)</small>
        </div>
        <div class="row">
            <div class="col-6 col-md-4 col-lg-3">
                <profileAvatar
                    :showButton="true"
                    :src="file"
                    :callback="'responseFile'"
                    @responseFile="responseFile"
                />
            </div>
            <div class="col">
                <p>Tu imagen de perfil debe cumplir con las siguientes características</p>
                <ul>
                    <li>Tamaño un máximo de <b>2 MB</b></li>
                    <li>Su formato debe ser <b>JPG</b> o <b>PNG</b></li>
                    <li>Como mínimo 500 x 500 píxeles</li>
                </ul>
                <p>Recomendamos:</p>
                <ul>
                    <li>Coloca una foto tuya actual, clara y visible</li>
                    <li>Buena iluminación.</li>
                    <li>Sin <b>desnudo</b>.</li>
                    <li>Salir con ropa adecuada.</li>
                    <li>No salir acompañado.</li>
                </ul>
            </div>
        </div>
        <hr class="row">
        <div class="row" v-if="!isFirst">
            <div class="teacher-create__actions">
                <button class="punku-action" @click="next" :disabled="isLoading">Siguiente</button>
            </div>
        </div>
	</div>
</template>

<script>
import teacherCreate from '@/mixins/teacherCreate'
import SubjectsService from '@/services/subjects.service';
import profileAvatar from '@/components/profile/profileAvatar'

export default {
    mixins: [teacherCreate],
    components: {
        profileAvatar
    },
    data () {
        return {
            file: null,
            isLoading: false,
            isFirst: false
        }
    },
    watch: {
        file (value) {
            if (!this.isFirst) {
                this.updateStep({pic_url: this.file})
            }
        }
    },
    methods: {
        next () {
            this.isFirst = true
            this.nextStep({pic_url: this.file})
        },
        responseFile (file) {
            this.file = file
        }
    },
}
</script>
