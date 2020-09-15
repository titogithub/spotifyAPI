import MusicController from '../controller/MusicController';

export default class MusicRouter {

    private route: any;
    private musicController: MusicController

    constructor(){
      this.musicController = new MusicController();
    }

    public init(express: any) {
        this.route = express.Router();

        this.route.route('/spotify')
        .get(this.musicController.getMusic);

        this.route.route('/spotify/:id')
        .get(this.musicController.getMusicById);
    }

    public getRoute(){
        return this.route;
    }

}

