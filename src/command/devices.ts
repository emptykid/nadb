
import {EmitEvent, Package} from "../constants";
import {Command} from "./command";
import {Transport} from "../transport";

export class DeviceList extends Command {
    public readonly command = 'host:devices';

    constructor(conn: Transport) {
        super(conn);
    }

    public execute(): Promise<any[]> {
        return this.send(this.command).then((pack: Package) => {
            const result = [];
            if (pack.payload != "") {
                const list = pack.payload.split('\n');
                list.forEach((line: string) => {
                    if (line != '') {
                        const deviceArr = line.split('\t');
                        result.push({id: deviceArr[0], type: deviceArr[1]});
                    }
                });
            }
            return result;
        });
    }

}
