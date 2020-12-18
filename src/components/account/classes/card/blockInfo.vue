<template>
    <div class="ablock-event__ibottom">
        <div class="d-block"> Tema <strong>{{ data.subject.title }}</strong> </div>
        <div v-if="!isTeacher">
            <span class="text-muted h7">Con el profesor <strong class="text-capitalize text-dark">{{ data.teacher | splitFullName }}</strong></span>
        </div>
        <div v-else>
            <b-row class="text-muted h7row--xs" v-if="data.student_qt > 1">
                <b-col cols="auto">
                    <b-badge variant="light" pill class="text-uppercase break-spaces">
                        <i class="uil uil-users-alt"></i> Clase grupal ({{ data.student_qt }} estudiantes)
                    </b-badge>
                </b-col>
                <b-col cols="auto">
                    reservado por <strong class="text-capitalize">{{ data.student[0] | splitFullName }}</strong>
                </b-col>
            </b-row>
            <b-row class="text-muted h7row--xs" v-else>
                <b-col cols="auto">
                    <b-badge variant="light" class="text-uppercase">
                        <i class="uil uil-user"></i> Clase individual
                    </b-badge>
                </b-col>
                <b-col cols="auto">
                    reservado por
                    <strong class="text-capitalize">{{ data.student[0] | splitFullName }}</strong>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            required: true,
            type: Object
        }
    },
    computed: {
        isTeacher () {
            return this.user.teacher && (this.user.teacher._id == this.data.gig.teacher)
        },
    }
}
</script>