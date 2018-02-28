import { SmartCLI } from "..";

const cli = new SmartCLI();
cli
    .addCommand({
        name: 'cmd-1',
        action: () => null,
        flags: [],
        description: 'Command one description'
    })
    .addCommand({
        name: 'cmd-2',
        action: () => null,
        flags: [],
        description: 'Command two description'
    })
    .addCommand({
        name: 'cmd-3',
        action: () => null,
        flags: [
            {
                name: 'flag-1',
                description: 'Flag one description',
                options: []
            },
            {
                name: 'flag-2',
                description: 'Flag two description',
                options: []
            },
            {
                name: 'flag-3',
                description: 'Flag three description',
                options: []
            }
        ],
        description: 'Command three description'
    })
    .run('help');