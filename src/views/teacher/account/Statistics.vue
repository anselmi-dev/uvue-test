<template>
    <div>
        <div class="account-content__title">
            <span>Mis estadísticas</span>
        </div>
        <teacherStatistics />
    </div>
</template>

<script>
import teacherStatistics from '@/components/account/teacher/teacherStatistics'

export default {
    components: {
        teacherStatistics
    }
}
</script>