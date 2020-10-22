import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Restaurant from './Restaurant'

@Entity('restaurants_images')
export default class RestaurantImages {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  path: string

  @ManyToOne(() => Restaurant, restaurant => restaurant.images)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant
}
