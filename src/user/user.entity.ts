import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', name: 'name', nullable: false })
  name: string;
  @Column({ type: 'varchar', name: 'email', nullable: false, unique: true })
  email: string;
}
