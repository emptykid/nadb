import {EmitEvent, Package} from "../constants";
import {Command} from "./command";
import {Transport} from "../transport";

export class HostVersion extends Command {
    public readonly command = 'host:version';

    constructor(conn: Transport) {
        super(conn);
    }

    public execute(): Promise<number> {
        return this.send(this.command).then((pack: Package) => {
            return parseInt(pack.payload, 16);
        });
    }

}
