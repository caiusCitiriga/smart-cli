"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class Command {
    getName() { return this._name; }
    getFlags() { return this._flags; }
    getDescription() { return this._description; }
    setName(name) { this._name = name; }
    setFlags(flags) { this._flags = flags; }
    setAction(func) { this._action = func; }
    setDescription(desc) { this._description = desc; }
    run(flags) {
        this._action(flags);
    }
}
exports.Command = Command;
//# sourceMappingURL=command.entity.js.map