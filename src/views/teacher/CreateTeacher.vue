<template>
    <div class="teacher-create">
        <loading :active.sync="isSubmit" :is-full-page="true"></loading>
        <div class="teacher-create__process">
            <span :style="{width: process }"></span>
        </div>

        <div class="container">
            <div class="components" v-for="(component, key) in components" :key="key">
                <component :is="component.name" :index="key" v-observe-visibility="visibilityChanged"/>
            </div>
        </div>
    </div>
</template>

<script>
import teacherCreate from '@/mixins/teacherCreate'
import newTeacher from '@/components/gigs/crud/new.teacher'

export default {
    mixins: [newTeacher, teacherCreate],
    computed: {
        /**
         * Barra de proceso en el registro
         * @return {String} Eje: 10%, 20%, 50%, etc.
         */
        process () {
            return  this.components.length > 1 ?
                    (100 * this.components.length / this.orderComponents.length) + '%'
                    : '0%'
        }
    },
    methods: {
        /**
         * Esto es el scroll que hace cuando se agrega un nuevo paso en el formulario de registro de profesor
         * @param  {Boolean} isVisible Si se encuentra visible el component
         * @param  {Object}  entry     DOM del elemento
         * @return {void}
         */
        visibilityChanged (isVisible, entry) {
            if (isVisible) {
                if (!entry.target.classList.contains("isVisible")) {
                    entry.target.classList.add('isVisible')
                    setTimeout( () => {
                        this.$scrollTo(entry.target)
                    }, 300)
                }
            }
        },
    }
}
</script>

<style lang="scss">
    .teacher-create__process {
        position: fixed;
        height: 3px;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 11111;
    }
    .teacher-create__process span {
        top: 0;
        height: 3px;
        background-color: $primary;
        display: block;
        position: relative;
        transition: all 1s;
    }
</style>
