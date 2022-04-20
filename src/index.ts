/** @format */
import express,{Request,Response, NextFunction} from "express";
import bodyParser from 'body-parser'

import {dataSource} from './config'
import Routes from './routes/bill'

const app = express();

const {Eureka} = require('eureka-js-client');

const eureka = new Eureka({
  instance: {
    app: 'pg-bill-server',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:5000',
    port: {
      '$': 5000,
      '@enabled': 'true',
    },
    vipAddress: 'localhost',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    }
  },
  eureka: {
    host: process.env.EUREKA_SERVER_HOST || 'eureka-server',
    port: process.env.EUREKA_SERVER_PORT || 8761,
    servicePath: '/eureka/apps/'
  }
});



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
    eureka.logger.level('debug');
    eureka.start(function(error){
    console.log(error || 'complete');
    });

    app.listen(process.env.PORT || 8080)
  })
  .catch((error) => console.log(error));
