import { SmartCLI } from '../dist/index';

const cli = new SmartCLI();
cli
    .addCommand({
        name: 'cmd1',
        description: 'Test',
        action: () => console.log('Called cmd 1!'),
    })
    .addCommand({
        name: 'cmd2',
        description: 'Test',
        action: () => console.log('Called cmd 2!'),
    })
    .run('cmd1');

setTimeout(() => {
    cli.run('cmd2')
}, 1000);
