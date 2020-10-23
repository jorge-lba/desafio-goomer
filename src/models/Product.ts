/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import ProductPromotions from './ProductPromotion'
import ProductImages from './ProductImages'

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  price: number

  @Column()
  description: string

  @OneToMany(() => ProductPromotions, promotion => promotion.product, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_id' })
  promotions: ProductPromotions

  @OneToMany(() => ProductImages, images => images.product, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_id' })
  images: ProductImages
}
