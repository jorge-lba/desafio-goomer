/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm'
import Restaurant from './Restaurant'

@Entity('restaurants_images')
export default class RestaurantImages {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  path: string

  @Column()
  restaurant_id: number

  @ManyToOne(() => Restaurant, restaurant => restaurant.images)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant
}
