import { Users } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn('increment', { name: 'project_id' })
  projectId: number;

  @Column({ type: 'varchar', name: 'project_name', nullable: false })
  projectName: string;

  @Column({ type: 'varchar', name: 'project_description', nullable: false })
  projectDescription: string;

  @CreateDateColumn()
  created_on: Date;

  @ManyToOne(() => Users, (user) => user.projects)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
