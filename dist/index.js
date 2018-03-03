"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_const_1 = require("./consts/types.const");
const inversify_config_1 = require("./inversify.config");
class SmartCLI {
    constructor() {
        this._commands = [];
        this.UI = {
            out: inversify_config_1.IoCContainer.get(types_const_1.TYPES.IOutput),
            input: inversify_config_1.IoCContainer.get(types_const_1.TYPES.IInput)
        };
        this._parser = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IParser);
        this._dispatcher = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IDispatcher);
        this._helpManager = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IHelpManager);
    }
    addCommand(cmd) {
        this._commands.push(cmd);
        return this;
    }
    run(rawUserInput) {
        this.UI.input.askUserInput({
            question: 'Your mum sucks cocks right?',
            callback: (answer) => console.log('Of course it does! ' + answer)
        });
        return;
        // this._commands.forEach(cmd => this._parser.addCommand(cmd));
        // this._helpManager.setCommands(this._parser.getCommand({ single: false }).commands);
        // this._parser.addCommand(this._helpManager.getHelpCommandOpts());
        // return this._dispatcher.dispatch(this._parser.parse(rawUserInput));
    }
}
exports.SmartCLI = SmartCLI;
//# sourceMappingURL=index.js.map