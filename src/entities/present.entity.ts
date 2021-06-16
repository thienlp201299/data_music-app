import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn } from 'typeorm'
import { SongEntity } from './song.entity';
import { SingerEntity } from './singer.entity';

@Entity('presents')
export class PresentEntity {

    @PrimaryColumn()
    public songId!: number;

    @PrimaryColumn()
    public singerId!: number;

    @ManyToOne(type => SongEntity, song => song.presents)
    public song!: SongEntity;

    @ManyToOne(type => SingerEntity, singer => singer.presents)
    public singer!: SingerEntity;
}