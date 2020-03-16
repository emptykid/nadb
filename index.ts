
import { Transport } from "./src/transport";
import {Protocol} from "./src/protocol";
import {EmitEvent, Package} from "./src/constants";
import {HostVersion} from "./src/command/version";
import {Client} from "./src/client";

const client = new Client();
/*
client.startServer().then(() => {
    console.log(`adb server started`);
}, (err) => {
    console.error(`can not start adb server error[${err}]`);
});
 */

client.devices().then((devices: any[]) => {
    console.log(JSON.stringify(devices));
    devices.forEach((dev) => {
        client.forward(dev.id, 54331, 54330).then((ret) => {
            console.log(ret);
        });
    });
});

