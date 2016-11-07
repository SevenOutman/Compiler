/**
 * Created by Doma on 2016/11/7.
 */
import Paxer from './Paxer'
import SemanticAnalyzer from './Semantic'

function Processor(console, parseTree, symbolTable) {
  var self = this;
  var paxer = self.paxer = Paxer.new();
  var semantic = self.semantic = new SemanticAnalyzer();

  self.compilee = () => {}

  self.compile = function (file) {
    self.compilee(file);
    if (file) {
      Cache.st = {};
      symbolTable.symbols([]);
      console.log("Compile '" + file.fileName() + "'...");
      self.paxer.setInput(file.content());
    }
  };

  self.preprocesscode = function (code) {
    var processed;
    var findOperatorReg = /(\+|\-|\*|\/|!=|>=?|<=?|==?)/g,
      findDelimiterReg = /(\(|\)|\{|}|;|,|\$)/g;
    code = code.replace(/\n/g, " ")
        .replace(findOperatorReg, " $1 ")
        .replace(findDelimiterReg, " $1 ")
        .replace(/[ ]+/g, " ")
        .replace(/(else|then)\s+\{/g, "$1{")
        .replace(/}\s+(else)/, "}$1")
        .trim() + " ";
    processed = code.replace(/(then|else|then\{|else\{|}else\{|\{|}|;)\s/g, "$1\n")
      .replace(/\s+(,|;|\))/g, "$1")
      .replace(/\(\s+/g, "(")
      .replace(/(then|else)\{/g, "$1 {")
      .replace(/}(else)/, "} $1");
    // .replace(/([^\n]+)(?=else)/g, "$1\n");
    return processed;
  };

  self.compileNext = function () {
    var status = paxer.getStatus();
    if (status == 'DONE' || status == 'ERROR') {
      return;
    }
    paxer.go();
    switch (status = paxer.getStatus()) {
      case "DONE":
        semantic.eat(paxer.getRootS(), paxer.getSymbolTable());
        console.success(paxer.getCurMovementF());
        console.success('code parsed.');
        console.warn(paxer.getWarningMsg());
        console.error(semantic.getErrorMsg());
        parseTree.assembly.show(semantic.getAssembly());
        return;
      case "ERROR":
        console.error(paxer.getErrMsg());
        return;
      case "WARNING":
      case "NORMAL":
        console.success(paxer.getCurMovementF());
        parseTree.pen.setSource(paxer.getSequentialNodes());
        parseTree.pen.render();
    }
    symbolTable.updateSymbols(paxer.getSymbolTable());
    return status;
  };
  self.compileFF = function () {
    var status = paxer.getStatus();
    if (status == "DONE") {
      console.success('code parsed.');
    } else if (paxer.getStatus() == "ERROR") {
      console.error(paxer.getErrMsg());
    } else {
      Benchmark.mark("parse");
      while (paxer.getStatus() != "DONE" && paxer.getStatus() != "ERROR") {
        paxer.go();
      }
      switch (status = paxer.getStatus()) {
        case 'DONE':
          semantic.eat(paxer.getRootS(), paxer.getSymbolTable());
          var parseTime = Benchmark.measure("parse");
          parseTree.assembly.show(semantic.getAssembly());
          console.success(paxer.getMovementsF());
          console.warn(paxer.getWarningMsg());
          console.error(semantic.getErrorMsg());
          console.success("Compile finished in " + parseTime.toFixed(4) + " millisecs.");
          console.success("Can we make it faster?");
          break;
        case 'ERROR':
          console.error(paxer.getErrMsg());
          break;
      }
    }
    symbolTable.updateSymbols(paxer.getSymbolTable());
    return status;
  };
}
export default new Processor()
