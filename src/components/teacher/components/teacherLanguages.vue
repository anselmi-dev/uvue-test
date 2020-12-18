<template>
    <div class="teacher-languages">
        <div class="teacher-information__title">
            Idiomas en que dicto la clase
        </div>
        <div class="teacher-information__content">
            <table class="teacher-languages__table">
                <tbody>
                    <tr v-for="(item, index) in languages" :key="index">
                        <td><span>{{ item.language }}</span></td>
                        <td class="tln"><span>{{ item.level }}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        languages: {
            type: Array,
            default: null,
        }
    }
}
</script>


<style lang="scss">
    .teacher-languages {
        &__table {
            margin-bottom: map-get($spacers, 2);
            margin-top: map-get($spacers, 2);
            tr span {
                margin: map-get($spacers, 1) 0rem;
                display: block;
            }
            td:first-child {
                font-weight: 400;
                padding-right: map-get($spacers, 2);
            }
            td.tln span {
                font-weight: 600;
                border-radius: 4px;
                background-color: $gray-300;
                padding-right: map-get($spacers, 2);
                padding-left: map-get($spacers, 2);
            }
        }
        .lvl {
            display: flex;
            display: none;
            padding-left: 10px;
            padding-right: 10px;
            span {
                height: 10px;
                width: 5px;
                background-color: $primary;
                margin: 2px;
                &.off {
                    background-color: $gray-500;
                }
            }
        }
    }
</style>
