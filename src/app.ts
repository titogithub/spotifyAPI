const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const cors = require('cors');
import Courserouter from './routes/MusicRouter';
import ErrorUtils from './Utils/ErrorUtils';
import Interceptor from './interceptor/Interceptor';

export default class App {

    private express:any;
    private courseRouter:Courserouter;
    private errorUtils:ErrorUtils;
    private interceptor:Interceptor


    constructor() {
        this.courseRouter = new Courserouter();
        this.errorUtils = new ErrorUtils();
        this.express = express();
        this.configMiddleware();
        this.interceptor = Interceptor.getInstance();
        this.configApi();
    }

    private configMiddleware(): void {
        this.express.use(bodyParser.json({limit: "50mb"}));
        this.express.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cors());
    }

    private configApi(): void {
        this.express.use(this.interceptor.intercept);
        this.courseRouter.init(express);
        this.express.use('/api', this.courseRouter.getRoute());
        this.express.use(this.errorUtils.handleError);
    }

    public getExpress:Function = () => {
        return this.express;
    }
}

