import { Project } from 'src/project/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('increment')
  user_id: number;

  @Column({ type: 'varchar', name: 'name', nullable: false })
  name: string;

  @Column({ type: 'varchar', name: 'email', nullable: false, unique: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Project, (project) => project.user, { cascade: true })
  projects: Project[];
}
