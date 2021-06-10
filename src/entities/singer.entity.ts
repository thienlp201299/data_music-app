import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PresentEntity } from './present.entity';
import { SongEntity } from './song.entity';

@Entity('singers')
export class SingerEntity {
    @PrimaryGeneratedColumn('increment') id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    singer: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    avatar_singer: string;

    @Column({ type: 'date' })
    date_of_birth: Date;

    @Column({ type: 'text', nullable: true })
    story: string;

    @OneToMany(type => PresentEntity, present => present.singer)
    public presents!: PresentEntity[];
}