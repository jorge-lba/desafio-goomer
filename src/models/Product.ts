/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import ProductPromotions from './ProductPromotion'
import Restaurant from './Restaurant'
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
  category: string

  @Column()
  restaurant_id: number

  @OneToMany(() => ProductPromotions, promotion => promotion.product, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_id' })
  promotions: ProductPromotions[]

  @OneToMany(() => Restaurant, promotion => promotion.products, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_id' })
  restaurant: Restaurant

  @OneToMany(() => ProductImages, images => images.product, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_id' })
  product_images: ProductImages
}
