<template>
    <div>
        <div class="account-content__title border-bottom-0 mb-0 aligns-items-center d-flex justify-content-space-between flex-wrap">
            <span>Mis anuncios</span>
            <temporarilyDisable/>
        </div>
        <b-tabs content-class="mt-3">
            <b-tab title="Clases">
                <teacherGigs />
            </b-tab>
            <b-tab title="Cursos">
                <div class="d-flex flex-wrap align-items-center justify-content-space-between alert alert-light">
                    <span class="text-dark font-weight-bold">Aun no posees cursos</span>
                </div>
            </b-tab>
            <b-tab title="Conferencias">
                <div class="d-flex flex-wrap align-items-center justify-content-space-between alert alert-light">
                    <span class="text-dark font-weight-bold">Aun no posees conferencias</span>
                </div>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import teacherGigs from '@/components/account/teacher/teacherGigs'
import temporarilyDisable from '@/components/teacher/temporarilyDisable'

export default {
    components: {
        temporarilyDisable,
        teacherGigs
    }
}
</script>