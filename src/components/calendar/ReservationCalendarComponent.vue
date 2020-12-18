<template>
  <div>
  <FullCalendar
    :options="calendarOptions"
    ref="calendar"/>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import moment from "moment";
import teacherCreate from '@/mixins/teacherCreate'

const today = new Date();

export default {
  mixins: [teacherCreate],
  components: {
    FullCalendar
  },
  props: {
    arrayHoras: {
      default: null
    },
    arrayEvents: {
      default: null
    }
  },
  data() {
    return {
      arrayHorasLaboralesGIG: this.arrayHoras,
      calendarOptions: {
        plugins: [timeGridPlugin, interactionPlugin],
        initialView: "timeGridWeek",
        slotDuration: "01:00",
        allDaySlot: false,
        editable: false,
        handleWindowResize: true,
        locale: "es",
        locales: allLocales,
        eventClassNames: 'bg-primary',
        firstDay: today.getDay(),
        validRange: {
          start: today.setDate(today.getDate()),
          // end: '2020-11-30T22:00:00'
        },
        selectConstraint: {
          // start: '2020-10-30T10:00:00',
          // end: '2020-10-30T22:00:00'
        },
        displayEventTime: false,
        slotLabelFormat: {
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false
        },
        selectable: true,
        businessHours: this.arrayHoras,
        selectConstraint: "businessHours",
        events: [],
        dateClick: (info) => {
          // console.log('dataClick')
        },
        select: (start, end, allDay) => {
          
            const event =
            {
              start: start.startStr,
              end: start.endStr,
              // description: 'Hola',
              // title: 'z'
            }

            this.$refs.calendar.options.events.push(event)
            console.log(this.$refs.calendar.options.events)
            this.$emit('emitReserve', event)
        },
        eventClick: (calEvent, jsEvent, view) => {
          this.$refs.calendar.options.events = []
          this.$emit('emitReserve', null)
        },
        eventDidMount: function(info) {
          // console.log(info.el)
          // info.el.setAttribute('title', info.event.extendedProps.description)
          // info.el.setAttribute('id', 'my-trigger-button-id')
          // info.el.setAttribute('v-b-tooltip.hover', true)
        }
      }
    };
  },
};
</script>

<style lang="scss">
.fc .fc-toolbar.fc-header-toolbar {
  margin-bottom: 1rem
}
.fc .fc-non-business {
    background: rgba(215, 215, 215, 0.3);
    background: var(--fc-non-business-color, rgba(215, 215, 215, 0.6))  !important;
}
.fc .fc-view-harness-active > .fc-view {
  margin-top: 0px
}
.fc .fc-view-harness {
  height: 400px !important;
}
.fc .fc-scroller-liquid-absolute {
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: lighten($gray-300, 0%);
  }

  &::-webkit-scrollbar-thumb {
    background: lighten($primary, 15%);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: darken($primary, 10%);
  }
}
.fc-scrollgrid thead tr .fc-scroller-harness .fc-scroller {
  overflow: hidden !important
}
tbody tr.fc-scrollgrid-section:not(.fc-scrollgrid-section-liquid) {
  display: none;
}
.fc-view {
  margin-top: 30px;
}
</style>
