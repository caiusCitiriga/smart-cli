import { SmartCLI } from "..";

const cli = new SmartCLI();
cli
    .addCommand({
        name: 'cmd',
        flags: [],
        action: () => null,
        description: 'Test command',
    })
    .run('help --yolo');