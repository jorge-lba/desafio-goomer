/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm'
import PromotionHours from './PromotionHours'
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

  @ManyToOne(() => Product, product => product.promotions)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @OneToMany(() => PromotionHours, hours => hours.promotion, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'promotion_id' })
  promotions_hours: PromotionHours
}
