<template>
    <div class="teacher-courses" v-if="courses.length">
        <div class="teacher-information__title">
            Cursos
        </div>
        <div class="teacher-information__content">
            <div class="alert alert-gray text-dark"> Él profesor aun no posee cursos. </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        courses: {
            type: Array,
            required: false,
            default() {
                return []
            }
        }
    }
}
</script>