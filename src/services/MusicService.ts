import { ConnectORM } from "../connection/Connection";
import { Repository, ObjectType, Connection } from "typeorm";
import Track from "../entity/Track";

export default class MusicService {

	public saveMusic = async (track:Track) => {
		const connection:Connection = await ConnectORM.getConnection();
		const trackRepository:Repository<Track> = connection.getRepository(Track);
		await trackRepository.save(track);
	}

}