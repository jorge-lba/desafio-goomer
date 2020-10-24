/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import RestaurantAddress from './RestaurantAddress'
import RestaurantImages from './RestaurantsImages'
import RestaurantWorkingHours from './RestaurantWorkingHours'
import Product from './Product'

@Entity('restaurants')
export default class Restaurant {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @OneToOne(() => RestaurantAddress, address => address.restaurant, {
    cascade: ['insert', 'update']
  })
  address: RestaurantAddress

  @OneToMany(() => RestaurantImages, images => images.restaurant, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'restaurant_id' })
  images: RestaurantImages[]

  @OneToMany(() => RestaurantWorkingHours, working => working.restaurant, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'restaurant_id' })
  working_hours: RestaurantWorkingHours[]

  @OneToMany(() => Product, product => product.restaurant, {
    cascade: ['insert', 'update']
  })
  // @JoinColumn({ name: 'restaurant_id' })
  products: Product[]
}
