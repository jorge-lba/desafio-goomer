import { WorkingHours, WorkingHoursRequest } from '../@types/TypesRestaurant'

/* eslint-disable camelcase */
const testScheduleFormat = (format:RegExp) => (schedule:string): boolean => format.test(schedule)

const formatWorkingHour = (workingHours:WorkingHours) => {
  let start_time = workingHours.opening_time
  let end_time = workingHours.closing_time

  const [start_hours, start_minutes] = start_time
    .split(':').map(element => parseInt(element))

  const [end_hours, end_minutes] = end_time
    .split(':').map(element => parseInt(element))

  let start = new Date()
  start.setHours(start_hours, start_minutes)

  let end = new Date()
  end.setHours(end_hours, end_minutes)

  if (start.getTime() > end.getTime()) {
    [start, end] = [end, start];
    [start_time, end_time] = [end_time, start_time]
  }

  const difference = (end.getTime() - start.getTime()) / 1000 / 60

  if (difference < 15) {
    end.setMinutes(end.getMinutes() + (15 - difference))
    end_time = `${end.getHours()}:${end.getMinutes()}`
  }

  return {
    weekday_start: workingHours.weekday_start,
    weekday_end: workingHours.weekday_end,
    opening_time: start_time,
    closing_time: end_time
  }
}

const formatWorkingHourRequest = (workingHours: WorkingHoursRequest) => workingHours.weekdays_end
  .map((_, index):WorkingHours => ({
    weekday_start: workingHours.weekdays_start[index],
    weekday_end: workingHours.weekdays_end[index],
    opening_time: workingHours.opening_times[index],
    closing_time: workingHours.closing_times[index]
  }))

export {
  testScheduleFormat,
  formatWorkingHour,
  formatWorkingHourRequest
}
