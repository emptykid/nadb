
import {EmitEvent, Package} from "../constants";
import {Command} from "./command";
import {Transport} from "../transport";

export class Forward extends Command {
    public readonly command = 'host-serial';

    constructor(conn: Transport) {
        super(conn);
    }

    public execute(serial: string, local: number, remote: number): Promise<boolean> {
        const command = `host-serial:${serial}:forward:tcp:${local};tcp:${remote}`;
        console.log(command);

        return this.send(command).then((pack: Package) =>  true, () => false);
    }

}
