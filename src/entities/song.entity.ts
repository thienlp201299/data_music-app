import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AuthorEntity } from "./author.entity";
import { CategoriesEntity } from "./categories.entity";
import { PresentEntity } from './present.entity';
import { SingerEntity } from './singer.entity';

@Entity('songs')
export class SongEntity {
    @PrimaryGeneratedColumn('increment') id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    song_name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    music: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    image: string;

    @Column({ type: 'text', nullable: true })
    lyric: string;

    @Column({ type: 'int', nullable: false, default: 0 })
    view_number: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(type => AuthorEntity, author => author.songs)
    @JoinColumn([{ name: 'author_id', referencedColumnName: 'id' }])
    author: AuthorEntity;

    @ManyToOne(type => CategoriesEntity, category => category.songs)
    @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
    category: CategoriesEntity;

    @OneToMany(type => PresentEntity, present => present.song, {
        cascade: ["insert", "update", "remove"]
    })
    public presents!: PresentEntity[];
}