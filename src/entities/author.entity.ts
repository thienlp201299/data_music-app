import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SongEntity } from './song.entity';


@Entity('authors')
export class AuthorEntity {
    @PrimaryGeneratedColumn('increment') id: number;

    @Column({ type: 'varchar', length: '255', nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    avatar: string;

    @Column({ type: 'date' })
    date_of_birth: Date;

    @Column({ type: 'text', nullable: true })
    story: string;

    @OneToMany(
        type => SongEntity,
        songs => songs.author,
    )
    songs: SongEntity[];
}