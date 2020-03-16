import {Transport} from "./transport";
import {Constants, EmitEvent} from "./constants";
import {HostVersion} from "./command/version";
import {DeviceList} from "./command/devices";
import {spawn} from "child_process";
import * as path from 'path';
import {Forward} from "./command/forward";

export class Client {
    private readonly port: number;

    constructor(port: number = Constants.adb_server_port) {
        this.port = port;
    }

    public startServer() {
        return this.cli(['-P', `${this.port}`, 'start-server']);
    }

    public killServer() {
        return this.cli(['-P', `${this.port}`, 'kill-server']);
    }

    public cli(args: string[]): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const adb = (process.platform === 'win32')? 'adb.exe' : 'adb';
            const exe = path.join(__dirname, 'bin', adb);
            const proc = spawn(exe, args);
            let output = '';
            proc.on(EmitEvent.Error, (error) => {
                reject(error);
            });
            proc.stdout.on(EmitEvent.Data, (data) => {
                output += data;
            });
            proc.on('exit', (code, signal) => {
                if (code == 0) {
                    resolve(output.trim());
                } else {
                    reject(null);
                }
            });
        });
    }

    public connection(): Promise<Transport> {
        return new Promise((resolve, reject) => {
            const transport = new Transport(this.port);
            transport.on(EmitEvent.Connected, () => {
                resolve(transport);
            });
            transport.on(EmitEvent.Error, (err) => {
                console.error(`can not connect to adb server error[${err}]`);
                resolve(null);
            });
            transport.connect();
        });
    }

    public version(): Promise<number> {
        return this.connection().then((transport: Transport) => {
            const cmd = new HostVersion(transport);
            return cmd.execute();
        });
    }

    public devices(): Promise<any[]> {
        return this.connection().then((t: Transport) => {
            const cmd = new DeviceList(t);
            return cmd.execute();
        })
    }

    public forward(serial: string, local: number, target: number): Promise<any> {
        return this.connection().then((t) => {
            const cmd = new Forward(t);
            return cmd.execute(serial, local, target);
        })
    }



}
