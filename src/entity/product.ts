import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text',{nullable:true})
  description: string;

  @Column('text',{nullable:true})
  value: number;

  @Column('text',{nullable:true})
  code: string;
}
export type CreateProductInput = Omit<Product, 'id'>;
export type UpdateProductInput = Partial<Product>;
