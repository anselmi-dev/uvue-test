<template>
    <div>
        <div class="account-content__title">
            <b-row class="row--xs">
                <b-col>
                    <span>Mis cursos por dictar</span>
                </b-col>
                <b-col cols="auto">
                    <router-link :to="{name: 'course.new'}" class="h5 btn btn-outline-primary">Crear curso</router-link>
                </b-col>
            </b-row>
        </div>
        <div class="d-flex flex-wrap align-items-center justify-content-space-between alert alert-light">
            <span class="text-dark font-weight-bold" >Aun no posees cursos</span>
        </div>
    </div>
</template>
