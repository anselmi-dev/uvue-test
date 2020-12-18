<template>
    <div class="gig-table-calendar" :class="{'gig-table-calendar--edit': isEdit}">
      <table class="table table-bordered table-sm mb-0" style="width: calc(100% - .25rem)">
        <thead>
          <tr>
            <th
              style="width: calc(100% / 7)"
              v-for="(head, index) in calendar.thead"
              :key="index">
              {{ head.label }}
            </th>
          </tr>
        </thead>
      </table>
      <div class="table-scroll">
        <table class="table table-bordered table-sm mb-0">
          <tbody>
            <tr v-for="(hour, index) in calendar.hours">
              <td
                style="width: calc(100% / 7)"
                v-for="(head, index) in calendar.thead"
                class="py-2"
                :class="{'bg-primary text-white': isEventActive(Object.assign(hour, {daysOfWeek: [head.value]}))}"
                @click.prevent="eventToggle(hour, head.value)"
                :key="index"
                v-b-tooltip.hover :title="head.label + ' ' + hour.startTime + '-' + hour.endTime">
                {{ hour.startTime }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        isEdit: {
            type: Boolean,
            required: false,
            default: true
        },
        schedule: {
            type: Array,
            required: false,
            default: []
        }
    },
    data() {
        return {
            scheduleEdit: [],
            calendar: {
                thead: [
                  { label: 'LUN', value: 1 },
                  { label: 'MAR', value: 2 },
                  { label: 'MIE', value: 3 },
                  { label: 'JUE', value: 4 },
                  { label: 'VIE', value: 5 },
                  { label: 'SAB', value: 6 },
                  { label: 'DOM', value: 7 },
                ],
                hours: [
                  {startTime:  '00:00', endTime: '01:00'},
                  {startTime:  '01:00', endTime: '02:00'},
                  {startTime:  '02:00', endTime: '03:00'},
                  {startTime:  '03:00', endTime: '04:00'},
                  {startTime:  '04:00', endTime: '05:00'},
                  {startTime:  '05:00', endTime: '06:00'},
                  {startTime:  '06:00', endTime: '07:00'},
                  {startTime:  '07:00', endTime: '08:00'},
                  {startTime:  '08:00', endTime: '09:00'},
                  {startTime:  '09:00', endTime: '10:00'},
                  {startTime:  '10:00', endTime: '11:00'},
                  {startTime:  '11:00', endTime: '12:00'},
                  {startTime:  '12:00', endTime: '13:00'},
                  {startTime:  '13:00', endTime: '14:00'},
                  {startTime:  '14:00', endTime: '15:00'},
                  {startTime:  '15:00', endTime: '16:00'},
                  {startTime:  '16:00', endTime: '17:00'},
                  {startTime:  '17:00', endTime: '18:00'},
                  {startTime:  '18:00', endTime: '19:00'},
                  {startTime:  '19:00', endTime: '20:00'},
                  {startTime:  '20:00', endTime: '21:00'},
                  {startTime:  '21:00', endTime: '22:00'},
                  {startTime:  '22:00', endTime: '23:00'},
                  {startTime:  '23:00', endTime: '00:00'}
                ]
            }
        }
    },
    mounted () {
      this.initial()
    },
    methods: {
        initial () {
            this.scheduleEdit = [...this.schedule]
        },
        edit () {
            this.initial()
        },
        isEventActive (schedule) {
            return this.isEvent(schedule) != -1
        },
        eventToggle (hour, day) {
            if (this.isEdit) {
                const event = Object.assign(hour, {daysOfWeek: [day]})
                const index = this.isEvent(event)
                if (index == -1)
                    this.scheduleEdit.push(Object.assign({}, event))
                else {
                    this.scheduleEdit.splice(index, 1)
                }
                this.$emit('update', this.scheduleEdit)
            }
        },
        isEvent (schedule) {
            return this.scheduleEdit.findIndex((element) => {
                return element.daysOfWeek[0] == schedule.daysOfWeek[0]
                        && element.startTime == schedule.startTime
                        && element.endTime == schedule.endTime
            })
        }
    }
}
</script>

<style lang="scss">
    .gig-table-calendar {
      text-align: center;
    }

    .tooltip.b-tooltip {
      pointer-events: none
    }
    .gig-table-calendar  .table-scroll {
          max-height: 60vh;
          min-height: 300px;
          overflow-y: auto;
            &::-webkit-scrollbar {
              width: 5px;
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
</style>
