"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prompt_core_1 = require("./core/Prompt.core");
const TablePrinter_core_1 = require("./core/TablePrinter.core");
const GenericOutput_core_1 = require("./core/GenericOutput.core");
class SCLI {
    constructor() {
        this.TablePrinter = new TablePrinter_core_1.TablePrinter();
        this.Prompt = new Prompt_core_1.Prompt();
        this.GenericOutput = new GenericOutput_core_1.GenericOutput();
    }
    printTable(table) {
        this.TablePrinter.printTable(table);
    }
    prompt(question, callback) {
        this.Prompt.prompt(question, callback);
    }
}
exports.SmartCLI = new SCLI();
//# sourceMappingURL=index.js.map