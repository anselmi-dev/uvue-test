<template>
    <div class="teacher-my-ads">
        <loading :active.sync="isLoading" :is-full-page="false"></loading>
        <b-table v-if="gigs.length" :items="gigs" :fields="fields" class="table--no-head">
            <template v-slot:cell(title)="row">
                <span class="h4 d-block mb-0">
                    <router-link
                        class="text-break"
                        :to="{name: 'gig.show', params: { slug: row.item.slug } }"
                        v-line-clamp:20="3">
                        {{ row.item.title }}
                    </router-link>
                </span>
                <div class="flex flex-wrap -mx-1">
                    <b-badge variant="secondary" class="mx-1" v-if="row.item.main_gig">
                        Anuncio principal
                    </b-badge>
                    <b-badge variant="light" class="mx-1">
                        {{ row.item.is_active ? 'Activo' : 'Desactivado' }}
                    </b-badge>
                    <span class="text-truncate text-muted h8 mx-1">
                        Publicado el {{ row.item.created_at | gigDateCreate }}
                    </span>
                </div>
            </template>
            <template v-slot:cell(actions)="row">
                <b-dropdown variant="none" right>
                    <template #button-content >
                        <i class="uil uil-ellipsis-v"></i>
                    </template>

                    <b-dropdown-item
                        @click="makePrincipal({gig: row.item._id})"
                        v-if="!row.item.main_gig">
                        <div class="d-flex">
                            <i class="uil uil-tag-alt"></i>
                            <span class="ml-1 d-none d-sm-block">Principal</span>
                        </div>
                    </b-dropdown-item>

                    <b-dropdown-item @click="editGig(row.item.slug)">
                        <div class="d-flex">
                            <i class="uil uil-edit-alt"></i> <span class="ml-1 d-none d-sm-block">Editar</span>
                        </div>
                    </b-dropdown-item>

                    <b-dropdown-item @click="deleteGig(row.item._id)">
                        <div class="d-flex">
                            <i class="uil uil-trash"></i> <span class="ml-1 d-none d-sm-block">Eliminar</span>
                        </div>
                    </b-dropdown-item>

                </b-dropdown>
            </template>
        </b-table>

        <div v-else class="alert alert-info alert--app">
            <div class="icon">
                <i class="uil uil-exclamation-triangle"></i>
            </div>
            <div class="content">
                No posee ningun anuncio.
            </div>
        </div>

        <div class="row row--sm">
            <div class="col-auto">
                <button @click="createAds" class="btn btn-outline-primary" v-if="gigs.length < 3">
                    Agrega otro anuncio
                </button>
                <div class="text-muted h8" v-else>
                    <i class="uil uil-info-circle"></i>
                    <span>Alcanzaste el máximo limite de anuncios permitidos.</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import TeacherService from '@/services/teacher.service.js'

export default {
    data () {
        return {
            isLoading: false,
            fields: [
                {
                    label: 'Mis anuncios',
                    key: 'title',
                    sortable: false
                },
                { key: 'actions', label: '' }
            ]
        }
    },
    computed: {
        gigs () {
            return this.user ? this.user.teacher.gigs : []
        }
    },
    methods: {
        ...mapActions({
            gigDestroy: 'auth/gigDestroy',
            gigMakePrincipal: 'auth/gigMakePrincipal'
        }),
        createAds () {
            if (this.gigs.length > 0 && !this.isPremium) {
                this.$router.push({name: 'premium'})
            } else {
                this.$router.push({name: 'gig.create'})
            }
        },
        editGig (slug) {
            this.$router.push({name: 'gig.edit', params: { slug } })
        },
        deleteGig (id) {
            this.$confirm({
                title: `¿Estás seguro de querer continuar?`,
                message: 'No podrá recuperar su anuncio',
                button: { no: 'No', yes: 'Si'},
                callback: confirm => {
                    if (confirm) {
                        this.isLoading = true
                        this.gigDestroy(id)
                        .then(resp => {
                            this.isLoading = false
                            this.$bus.emit("notifications:push", {
                                type: 'dark',
                                message: 'Se elimino correctamente su anuncio.'
                            })
                        })
                    }
                }
            })
        },
        toGoGig (slug) {
            this.$router.push({name: 'gig.show', params: { slug } })
        },
        makePrincipal (data) {
            TeacherService.makeGigPrincipal (data)
                .then((resp) => {
                    this.gigMakePrincipal(data.gig)
                })
                .catch((message) => {
                    this.$bus.emit("notifications:push", { type: 'error', message })
                })
        }
    }
}
</script>
