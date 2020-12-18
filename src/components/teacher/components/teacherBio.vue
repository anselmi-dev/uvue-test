<template>
    <div class="teacher-bio">
        <div v-if="data.description">
            <div class="teacher-bio__title">
                Sobre mí
            </div>

            {{ data.description }}

            <hr>
        </div>


        <div class="teacher-bio__title">
            Mi nivel de instrucción en el tema
        </div>

        {{ data.education_level }}

    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: null,
        }
    }
}
</script>
