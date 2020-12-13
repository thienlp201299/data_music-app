import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SongEntity } from './song.entity';

@Entity('categories')
export class CategoriesEntity {

    @PrimaryGeneratedColumn('increment') id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @OneToMany(
        type => SongEntity, songs => songs.category
    )
    songs: SongEntity[];

}