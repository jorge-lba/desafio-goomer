/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Restaurant from './Restaurant'

@Entity('working_hours')
export default class RestaurantWorkingHours {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  weekday_start: string

  @Column()
  weekday_end: string

  @Column()
  opening_time: string

  @Column()
  closing_time: string

  @ManyToOne(() => Restaurant, restaurant => restaurant.working_hours)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant
}
