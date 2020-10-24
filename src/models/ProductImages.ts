/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Product from './Product'

@Entity('products_images')
export default class ProductImages {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  path: string

  @Column()
  product_id: number

  @ManyToOne(() => Product, product => product.product_images)
  @JoinColumn({ name: 'product_id' })
  product: Product
}
