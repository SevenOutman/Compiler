<template>
  <!--ko with: parseTree-->
  <div class="tree-box resizable hidden" data-bind="css: {hidden: !isOpen(), assembly: showAssembly}">
    <div class="resizer vertical"></div>
    <div class="box-header">
      <div class="box-title hidden-assembly">Syntax Tree</div>
      <div class="box-title assembly-only">Assembly</div>
      <span class="box-caret glyphicon glyphicon-menu-right" data-bind="click: close"></span></div>
    <div class="box-body hidden-assembly" id="tree-pane">
      <div class="placeholder">Nothing to show</div>
    </div>
    <div class="box-body assembly-only" id="assembly-pane">
      <div style="float: left;height: 100%;width: 18px;background: rgb(60, 63, 65)"></div>
      <textarea id="assembly"></textarea></div>
  </div><!--/ko-->
</template>
