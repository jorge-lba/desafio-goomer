import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Restaurant from './Restaurant'

@Entity('working_hours')
export default class RestaurantWorkingHours {
  
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  weekday: string

  @Column()
  opening_time: Date

  @Column()
  closing_time: Date

  @ManyToOne(() => Restaurant, restaurant => restaurant.working_hours)
  @JoinColumn({name: 'restaurant_id'})
  restaurant: Restaurant
}