<template>
    <div>
        <div class="account-content__title d-flex justify-content-space-between">
            <span>Mis recomendaciones</span>
            <button class="btn btn-primary btn-sm" v-b-modal.modal-request-recomendations>
                <i class="uil uil-comment-alt-heart"></i>Solicitar
            </button>
        </div>
        <teacherRecomendations />
    </div>
</template>

<script>
import teacherRecomendations from '@/components/account/teacher/teacherRecomendations'

export default {
    components: {
        teacherRecomendations
    }
}
</script>