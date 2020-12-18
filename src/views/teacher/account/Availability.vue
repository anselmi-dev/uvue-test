<template>
    <div>
        <div class="account-content__title">
            <span>Mi disponibilidad</span>
        </div>
        <teacherAvailability />
    </div>
</template>

<script>
import teacherAvailability from '@/components/account/teacher/teacherAvailability'

export default {
    components: {
        teacherAvailability
    }
}
</script>