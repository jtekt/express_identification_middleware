import axios from "axios";
import { Request, Response, NextFunction } from "express";

interface ReqWithUser extends Request {
  user?: any;
  jwt?: string;
}

// NOTE: Middleware itself cannot be async
// REALLY?
const middleware =
  (options: any = {}) =>
  async (req: ReqWithUser, res: Response, next: NextFunction) => {
    const { url } = options;
    if (!url) throw "URL not provided";

    // NOTE: previous version was pasing JWT to handler
    // res.locals.jwt = jwt;
    // req.jwt = jwt as string;

    return axios
      .get(url, { headers: req.headers })

      .then(({ data }) => {
        res.locals.user = data;
        req.user = data;
        next();
      })
      .catch((error) => {
        if (options.lax) next();
        else return res.status(403).send(error);
      });
  };

export = middleware;
