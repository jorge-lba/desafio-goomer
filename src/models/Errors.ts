/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
@Entity('errors_request')
export default class Erros {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  error: string

  @Column()
  query: string

  @Column()
  parameters: string

  @Column()
  date: Date

  @Column()
  message: string
}
