"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Prompt_core_1 = require("./core/Prompt.core");
var TablePrinter_core_1 = require("./core/TablePrinter.core");
var GenericOutput_core_1 = require("./core/GenericOutput.core");
var SCLI = (function () {
    function SCLI() {
        this.TablePrinter = new TablePrinter_core_1.TablePrinter();
        this.Prompt = new Prompt_core_1.Prompt();
        this.GenericOutput = new GenericOutput_core_1.GenericOutput();
    }
    SCLI.prototype.printTable = function (table) {
        this.TablePrinter.printTable(table);
    };
    SCLI.prototype.prompt = function (question, callback) {
        this.Prompt.prompt(question, callback);
    };
    return SCLI;
}());
exports.SCLI = SCLI;
exports.SmartCLI = new SCLI();
