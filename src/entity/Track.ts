import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";

@Entity('track')
export default class Track {

    @PrimaryGeneratedColumn({name:'spotify_track_id'})
    songId:string;

    @Column({name:'track_name'})
    songTitle:string;

    @Column({name:'album_name'})
	trackAlbum:string;

}