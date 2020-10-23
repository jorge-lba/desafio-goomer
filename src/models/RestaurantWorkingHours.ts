/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Restaurant from './Restaurant'

@Entity('working_hours')
export default class RestaurantWorkingHours {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  weekday_start: number

  @Column()
  weekday_end: number

  @Column()
  opening_time: string

  @Column()
  closing_time: string

  @Column()
  restaurant_id: number

  @ManyToOne(() => Restaurant, restaurant => restaurant.working_hours)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant
}
