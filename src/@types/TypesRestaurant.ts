/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
interface RequestBody {
  name: string,
  street: string,
  number: number,
  complement:string,
  state: string,
  city:string,
  zip_code: string,
  weekdays_start:string[],
  weekdays_end: string[],
  opening_times:string[],
  closing_times:string[]
}

interface Address {
  id?: number,
  street: string,
  number: number,
  complement:string,
  state: string,
  city:string,
  zip_code: string
}

interface WorkingHours {
  id?: number,
  weekday_start:string,
  weekday_end: string,
  opening_time:string,
  closing_time:string,
}

interface Image {
  id?: number,
  url?: string,
  path: string
}

interface DataRestaurant {
  id?: number,
  name:string,
  address: Address,
  working_hours:WorkingHours[]
  images:Image[],
}

interface WorkingHoursRequest {
  weekdays_start:string[],
  weekdays_end: string[],
  opening_times:string[],
  closing_times:string[],
}

export {
  RequestBody,
  Address,
  WorkingHours,
  Image,
  DataRestaurant,
  WorkingHoursRequest
}
