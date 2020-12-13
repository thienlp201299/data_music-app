import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { SongEntity } from './song.entity';
import { SingerEntity } from './singer.entity';

@Entity('presents')
export class PresentEntity {
    @PrimaryGeneratedColumn('increment')
    public presentId!: number;

    @Column()
    public songId!: number;

    @Column()
    public singerId!: number;

    @ManyToOne(type => SongEntity, song => song.presents)
    public song!: SongEntity;

    @ManyToOne(type => SingerEntity, singer => singer.presents)
    public singer!: SingerEntity;
} 