import {EmitEvent, Package, Status} from "../constants";
import {Transport} from "../transport";
import {Protocol} from "../protocol";

export class Command {
    private transport: Transport;

    constructor(transport: Transport) {
        this.transport = transport;
    }

    public send(command: string): Promise<Package> {
        return new Promise((resolve, reject) => {
            if (this.transport == null) {
                reject();
                return;
            }
            this.transport.once(EmitEvent.Package, (pack: Package) => {
                if (pack == null) {
                    reject();
                } else {
                    if (pack.status == Status.OKAY) {
                        resolve(pack);
                    } else {
                        reject(pack);
                    }
                }
            });
            this.transport.write(Protocol.parseSend(command));
        });
    }

}
