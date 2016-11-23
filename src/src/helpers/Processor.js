/**
 * Created by Doma on 2016/11/7.
 */
import Paxer from './Paxer'
import SemanticAnalyzer from './Semantic'
import Benchmark from './Benchmark'
import store from '../store/index'
import bus from '../helpers/EventBus'

function Processor() {
  var self = this;
  var paxer = self.paxer = Paxer.new();
  var semantic = self.semantic = new SemanticAnalyzer();

  self.compilee = () => {
  }

  self.compile = function (file) {
    self.compilee(file);
    if (file) {
      Cache.st = {};
      store.commit('updateStateSymbolTable', {
        symbols: []
      })
      bus.$emit('sys:console.log', 'Compile \'' + file.fileName + '\'...')
      self.paxer.setInput(file.content);
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
        bus.$emit('sys:console.success', paxer.getCurMovementF());
        bus.$emit('sys:console.success', 'code parsed.');
        bus.$emit('sys:console.warn', paxer.getWarningMsg());
        bus.$emit('sys:console.error', semantic.getErrorMsg());
        // parseTree.assembly.show(semantic.getAssembly());
        bus.$emit('sys:parse-tree.assembly', semantic.getAssembly())

        return;
      case "ERROR":
        bus.$emit('sys:console.error', paxer.getErrMsg());
        return;
      case "WARNING":
      case "NORMAL":
        bus.$emit('sys:console.success', paxer.getCurMovementF());
        bus.$emit('sys:parse-tree.render', paxer.getSequentialNodes())
        // parseTree.pen.setSource(paxer.getSequentialNodes());
        // parseTree.pen.render();
    }
    store.commit('updateStateSymbolTable', {
      symbols: paxer.getSymbolTable()
    })
    return status;
  };
  self.compileFF = function () {
    var status = paxer.getStatus();
    if (status == "DONE") {
      bus.$emit('sys:console.success', 'code parsed.');
    } else if (paxer.getStatus() == "ERROR") {
      bus.$emit('sys:console.error', paxer.getErrMsg());
    } else {
      Benchmark.mark("parse");
      while (paxer.getStatus() != "DONE" && paxer.getStatus() != "ERROR") {
        paxer.go();
      }
      switch (status = paxer.getStatus()) {
        case 'DONE':
          semantic.eat(paxer.getRootS(), paxer.getSymbolTable());
          var parseTime = Benchmark.measure("parse");
          // parseTree.assembly.show(semantic.getAssembly());
          bus.$emit('sys:parse-tree.assembly', semantic.getAssembly())

          bus.$emit('sys:console.success', paxer.getMovementsF());
          bus.$emit('sys:console.warn', paxer.getWarningMsg());
          bus.$emit('sys:console.error', semantic.getErrorMsg());
          bus.$emit('sys:console.success', "Compile finished in " + parseTime.toFixed(4) + " millisecs.");
          bus.$emit('sys:console.success', "Can we make it faster?");
          break;
        case 'ERROR':
          bus.$emit('sys:console.error', paxer.getErrMsg());
          break;
      }
    }

    store.commit('updateStateSymbolTable', {
      symbols: paxer.getSymbolTable()
    })
    return status;
  };
}
export default new Processor()
