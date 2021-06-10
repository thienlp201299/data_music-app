import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AuthorEntity } from "./author.entity";
import { CategoriesEntity } from "./categories.entity";
import { PresentEntity } from './present.entity';
import { SingerEntity } from './singer.entity';

@Entity('songs')
export class SongEntity {
    @PrimaryGeneratedColumn('increment') id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    songName: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    music: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    image: string;

    @Column({ type: 'text', nullable: true })
    lyric: string;

    @Column({ type: 'int', nullable: false, default: 0 })
    viewNumber: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(type => AuthorEntity, author => author.songs)
    @JoinColumn({ name: 'authorId' })
    author: AuthorEntity;

    @ManyToOne(type => CategoriesEntity, category => category.songs)
    @JoinColumn({ name: 'categoryId' })
    category: CategoriesEntity;

    @OneToMany(type => PresentEntity, present => present.song)
    public presents!: PresentEntity[];
}