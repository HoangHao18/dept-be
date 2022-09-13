import express, { Application } from 'express'
import mongoose from 'mongoose'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import Controller from '@utils/interfaces/controller.interface'
import ErrorMiddleware from '@middleware/error.middleware'
import helmet from 'helmet'
import { MONGO_URL, MONGO_USER, MONGO_PASS } from './config'

class App {
  public express: Application
  public port: number

  constructor(controllers: Controller[], port: number) {
    this.express = express()
    this.port = port

    this.initializeDatabaseConnection()
    this.initializeMiddleware()
    this.initializeControllers(controllers)
    this.initializeErrorHandling()
  }

  private initializeMiddleware(): void {
    this.express.use(helmet())
    this.express.use(cors())
    this.express.use(morgan('dev'))
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(compression())
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api', controller.router)
    })
  }

  private initializeErrorHandling(): void {
    this.express.use(ErrorMiddleware)
  }

  private initializeDatabaseConnection(): void {
    mongoose
      .connect(
        `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${
          MONGO_URL ?? '127.0.0.1:27017'
        }`,
        {
          directConnection: false,
          serverSelectionTimeoutMS: 2000
          // tlsAllowInvalidHostnames: true,
          // tls: true,
          // tlsCAFile: path.join(`${__dirname}/CA.pem`),
          // appName: 'mongosh'
        }
      )
      .then(() => console.log('MongoDB connected'))
      .catch(error => {
        console.log('connection failure', error)
        console.log(`${__dirname}/CA.pem`)
      })
  }

  public listen(): void {
    console.log(this.port)
    this.express.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`)
    })
  }
}
export default App
