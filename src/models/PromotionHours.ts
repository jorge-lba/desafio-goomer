/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import ProductPromotions from './ProductPromotion'

@Entity('promotions_hours')
export default class Product {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  promotion_id: number

  @Column()
  weekday_start: number

  @Column()
  weekday_end: number

  @Column()
  opening_time: string

  @Column()
  closing_time: string

  @Column()
  valid: boolean

  @ManyToOne(() => ProductPromotions, promotion => promotion.promotions_hours)
  @JoinColumn({ name: 'promotion_id' })
  promotion: ProductPromotions
}
