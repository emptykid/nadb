import {EventEmitter} from 'events';
import * as net from 'net';
import {Socket} from 'net';
import {EmitEvent} from "./constants";
import {Protocol} from "./protocol";

export class Transport extends EventEmitter
{
    private socket: Socket;
    private readonly port: number;

    constructor(port: number) {
        super();
        this.port = port;
    }

    public connect():void {
        this.socket = new net.Socket();
        this.socket.on(EmitEvent.Error, this.handleError.bind(this));
        this.socket.on(EmitEvent.Data, this.handleData.bind(this));
        this.socket.on(EmitEvent.End, this.handleEnd.bind(this));
        this.socket.on(EmitEvent.Close, this.handleClose.bind(this));
        this.socket.connect(this.port, this.handleConnection.bind(this));
    }

    public write(data:Buffer):void {
        this.socket.write(data);
    }

    public close(): void {
        this.socket.end();
        this.socket.removeAllListeners();
    }

    private handleConnection(): void {
        //console.log(`connect to port[${this.port}] success`);
        this.emit(EmitEvent.Connected);
    }

    private handleError(err): void {
        this.emit(EmitEvent.Error, err);
    }

    private handleData(raw: any): void {
        //console.log(raw);
        const pack = Protocol.parseReceive(raw);
        this.emit(EmitEvent.Package, pack);
    }

    private handleEnd(): void {
        //this.emit(EmitEvent.Error, 'socket end');
    }

    private handleClose(): void {
        //this.emit(EmitEvent.Error, 'socket close');
    }
}
