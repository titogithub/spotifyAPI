import { Response, Request } from "express";
import { asyncRequest } from '../Utils/RequestUtils';

export default class Interceptor {

    private static readonly NOT_AUTHORIZED_USER_MESSAGE: string = 'Not authorized user';
    
    private static instance: Interceptor;
    private authOptions:any;
    private client_id = '93dc0b5b05bc4e63a5db4afa035a7e04'; 
    private client_secret = 'f32b2e1fda4f4bff8278ca8d5ba27b97';

    private constructor() {
        this.authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
              'Authorization': 'Basic ' + (new Buffer(this.client_id + ':' + this.client_secret).toString('base64'))
            },
            form: {
              grant_type: 'client_credentials'
            },
            json: true,
            method: 'POST'
          };
    }

    public static getInstance(): Interceptor {
        if (!this.instance) {
            this.instance = new Interceptor();
        }
        return this.instance;
    }

    public intercept = async (req: Request , res: Response , next: Function) => {
        try {
            const {response, body}:any = await asyncRequest(this.authOptions);
            if (response.statusCode === 200) {
                res.locals.spotifyAuth =  response.body.access_token;
                next();
            } else {
                next({statusCode:response.statusCode, message:body.error_description});
            }
        } catch (error) {
            console.log('error: ', error);
            next({statusCode:505, message:'internal server error'});
        }
    }
}
