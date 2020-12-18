<template>
    <div class="course-new">
        <!-- COL:TITLE -->
        <div class="col-12 col-md-6 col-lg-4">
            <!-- FORM-GROUP:TITLE -->
            <div class="form-group">
                <label for="title">
                    Título del curso
                </label>
                <input type="text"
                        :class="{'form-control': true, 'is-invalid': $v.model.title.$error }"
                        v-model="model.title"
                        placeholder="Curso de matemáticas II"
                    />
                <small class="invalid-feedback" v-if="$v.model.title.$error && !$v.model.title.required">
                    El titulo es requerido
                </small>
            </div>
        </div>
        <pre>
            {{model}}
        </pre>
    </div>
</template>

<script>
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'

export default {
    data () {
        return {
            model: {
                title: "",
                description: "",
                pic_url: null,
                personal_quealites: "",
                max_user: null,
                date_start: null,
                date_end: null,
                hours: null,
                fare: null,
                fare_group: null,
                support_material: false,
                offers_certificate: false
            }
        }
    },
    validations: {
    	model: {
            title: {
                required
            },
            description: {
                required
            },
            pic_url: {
            },
            personal_quealites: {
                required
            },
            max_user: {
                required
            },
            date_start: {
                required
            },
            date_end: {
                required
            },
            hours: {
                required
            },
            fare: {
                required
            },
            fare_group: {
                required
            },
            support_material: false,
            offers_certificate: false
    	}
    }
}
</script>