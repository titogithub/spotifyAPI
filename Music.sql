CREATE TABLE public.track (
	track_name varchar NULL,
	album_name varchar NULL,
	spotify_track_id varchar NOT NULL,
	CONSTRAINT spotify_track_id PRIMARY KEY (spotify_track_id)
);