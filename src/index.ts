/** @format */
import express,{Request,Response, NextFunction} from "express";
import bodyParser from 'body-parser'

import {dataSource} from './config'
import Routes from './routes/bill'

const app = express();



// once in your application bootstrap
dataSource.initialize()
  .then(async () => {
    app.use(bodyParser.json())
    app.use(Routes)
    app.use((error, _req: Request, res: Response, next: NextFunction) => {
      if (error) {
        return res.status(500).json({
          error: "Unxpected error occurred !!!",
        });
      }

      return next();
    });

    app.use(( _req: Request, res: Response,_next: NextFunction) => {
      return res.status(404).json({
        error: "Route not found",
      });
    });

    app.listen(process.env.PORT || 8080)
  })
  .catch((error) => console.log(error));
