<template>
  <FullCalendar :options="calendarOptions"/>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import allLocales from "@fullcalendar/core/locales-all";

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin],
        initialView: "timeGridWeek",
        locales: allLocales,
        locale: "es",
        nowIndicator: true,
        allDaySlot: false,
        dayMaxEvents: true,
        titleFormat: { year: "numeric", month: "long" },
        headerToolbar: {
          left: "",
          center: "title",
          right: ""
        },
        views: {
          timeGrid: {
            slotLabelFormat: [
              {
                hour: "numeric",
                minute: "2-digit",
                omitZeroMinute: false
              }
            ],
            slotDuration: "01:00"
          },
          dayGrid: {}
        },
        events: [{
            daysOfWeek: [1, 2, 3],
            startTime: "08:00",
            title: 'f'
          },
          {
            daysOfWeek: [1, 2, 3],
            startTime: "09:00",
          }
        ]
      }
    };
  }
};
</script>
