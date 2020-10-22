import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import Restaurant from './Restaurant'

@Entity('address')
export default class RestaurantAddress {
  
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  street: string

  @Column()
  number: number

  @Column()
  complement: string

  @Column()
  state: string

  @Column()
  city: string

  @Column()
  zip_code: string

  @OneToOne(() => Restaurant, restaurant => restaurant.address)
  @JoinColumn({name: 'restaurant_id'})
  restaurant: Restaurant
}