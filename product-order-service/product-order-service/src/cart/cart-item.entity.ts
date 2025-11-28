import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    productId!: number;

    @Column()
    quantity!: number;

    @Column('decimal')
    price!: number;

    @Column()
    productName!: string;

    @ManyToOne(() => Cart, (cart) => cart.items)
    cart!: Cart;
}
