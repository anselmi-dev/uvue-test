<template>
    <div class="teacher-cv">
        <div class="teacher-information__title">
            Certificados
        </div>
        <div class="teacher-information__content">
            <div class="teacher-cv__content">
                <a :href="file" target="_blank" class="teacher-cv__link" v-for="(file, index) in files" :key="index">
                    <i class="ipunku-paperclip"></i> {{ file | nameFile }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        files: {
            type: Array,
            default: null,
        }
    },
    filters: {
        nameFile (file) {
            try {
                const split = file.split('/')
                return decodeURI(split[split.length-1])
            } catch (e) {
                return 'SIN NOMBRE'
            }
        }
    },
}
</script>
