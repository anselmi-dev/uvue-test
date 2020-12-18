<template>
    <div class="ablock-event__date">
        {{ data.date_start | getDay }}
        <span class="text-uppercase">{{ data.date_start | getMonth }}</span>
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
}
</script>