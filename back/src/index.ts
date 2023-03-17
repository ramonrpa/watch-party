import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import { newConnection } from './socket';
import cors from 'cors';

const port: number = Number(process.env.PORT) || 3004;
const app: express.Application = express();
const httpServer: http.Server = http.createServer(app);
const io: Server = new Server(httpServer, { cors: { origin: '*' } });

app.use(cors());

io.on('connection', newConnection);

httpServer.listen(port, () => {
  console.log('Servidor iniciado na porta', port);
});
