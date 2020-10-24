/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import Product from './Product'

@Entity('products_promotions')
export default class ProductPromotion {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  product_id: number

  @Column()
  price: number

  @Column()
  description: string

  @Column()
  weekday_start: number

  @Column()
  weekday_end: number

  @Column()
  time_start: string

  @Column()
  time_end: string

  @Column()
  valid: boolean

  @ManyToOne(() => Product, product => product.promotions)
  @JoinColumn({ name: 'product_id' })
  product: Product
}
