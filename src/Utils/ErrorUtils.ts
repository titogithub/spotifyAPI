export default class ErrorUtils {
  public handleError:Function = (err:any, req:any, res:any, next:any) => {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
}
