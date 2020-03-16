
export class Constants {
    public static adb_server_port: number = 5030;
    public static default_adb_server_port: number = 5037;

}

export class EmitEvent {
    public static Error = 'error';
    public static Data = 'data';
    public static End = 'end';
    public static Close = 'close';
    public static Connected = 'connected';
    public static Package = 'package';
}

export class Status {
    public static OKAY = 'OKAY';
    public static FAIL = 'FAIL';
    public static STAT = 'STAT';
    public static LIST = 'LIST';
    public static DENT = 'DENT';
    public static RECV = 'RECV';
    public static DATA = 'DATA';
    public static DONE = 'DONE';
    public static SEND = 'SEND';
    public static QUIT = 'QUIT';
}

export class Package {
    public status: string;
    public length: number;
    public payload: string;

    constructor(status: string, length: number, payload: string) {
        this.status = status;
        this.length = length;
        this.payload = payload;
    }

    public toString(): string {
        return JSON.stringify({
            status: this.status,
            length: this.length,
            payload: this.payload
        });
    }

}
