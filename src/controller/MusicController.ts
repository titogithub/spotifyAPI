import {Request, Response} from "express";
import MusicService from '../services/MusicService';
import { asyncRequest } from "../Utils/RequestUtils";
import Track from "../entity/Track";
import HttpResponseUtils from '../Utils/HttpResponseHandler';

export default class MusicController {

    private service: MusicService;

    private client_id = 'CLIENT_ID'; // Your client id
    private client_secret = 'CLIENT_SECRET'; // Your secret

    constructor() {
        this.service = new MusicService();
    }

    public getMusicById = async (req: Request, res: Response, next: any) => {
      const token = res.locals.spotifyAuth;
      const artistId = req.params.id;
      const limit = req.query.limit || 10;
      const offset = req.query.offset || 0;
      const options = {
        url: `https://api.spotify.com/v1/tracks/${artistId}`,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true,
        method:'GET'
      };
      if (!artistId) {
        next({message: 'no artist id', statusCode:404});
        return;
      }

      try {
        const {response: {body}}:any = await asyncRequest(options);
        HttpResponseUtils.sendSuccess(res, body);
      } catch (error) {
        console.log('error: ', error);
        HttpResponseUtils.sendInternalError(res, 'internal server error');
      }
    }

    public getMusic = async (req: Request , res: Response, next: any ) => {
      const token = res.locals.spotifyAuth;
      const {artistName} = req.query;
      const limit = req.query.limit || 10;
      const offset = req.query.offset || 0;
      if (!artistName) {
        next({message: 'no artist name', statusCode:404});
        return;
      } else if (artistName.length < 3) {
        next({message: 'not enough characters', statusCode:404});
        return;
      }

      const options = {
        url: `https://api.spotify.com/v1/search?q=${artistName}&type=track&limit=${limit}&offset=${offset}`,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true,
        method:'GET'
      };

      try {
        const {response: {body: {tracks: {items:trackList}}}}:any = await asyncRequest(options);
        const trackEntities = trackList.map( v => {
          const trackItem = new Track();
          trackItem.trackAlbum = v.album.name;
          trackItem.songTitle = v.name;
          trackItem.songId = v.id;
          return trackItem;
        })

      await this.service.saveMusic(trackEntities);
      HttpResponseUtils.sendCreate(res, {songs: trackEntities});
      } catch (error) {
        console.log('error: ', error);
        HttpResponseUtils.sendInternalError(res, 'internal server error');
      }
    }

}
