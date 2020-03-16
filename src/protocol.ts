import {Package} from "./constants";

export class Protocol {
    public static parseSend(data: string): Buffer {
        const encodeLength = ('0000' + data.length.toString(16)).slice(-4).toUpperCase();
        return Buffer.concat([Buffer.alloc(encodeLength.length, encodeLength), Buffer.alloc(data.length, data)]);
    }

    public static parseReceive(raw: Buffer): Package {
        const total = raw.length;
        if (total < 8) {
            console.error(`invalid raw size data[${raw.toString()}]`);
            return null;
        }

        const status = raw.toString('utf8', 0, 4);
        const length  = parseInt(raw.toString('utf8', 4, 8), 16);
        const payload = raw.toString('utf8', 8, total);

        return new Package(status, length, payload);
    }
}
