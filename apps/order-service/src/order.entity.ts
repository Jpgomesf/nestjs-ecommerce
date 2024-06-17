import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column('json')
  items: Array<{ productId: string; quantity: number }>;

  @Column()
  totalPrice: number;

  @Column()
  status: string;
}
