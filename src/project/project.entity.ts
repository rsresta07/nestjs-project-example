import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', name: 'project_name', nullable: false })
  projectName: string;
  @Column({ type: 'varchar', name: 'project_description', nullable: false })
  projectDescription: string;
}
