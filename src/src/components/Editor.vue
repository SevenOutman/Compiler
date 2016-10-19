<template>
  <div class="editor-box" data-bind="with: editor">
    <div class="editor-placeholder" data-bind="visible: tabs().length < 1">Choose a file from workspace
      or <a id="cover-open" data-bind="click: openNewFile">create a new file</a></div>
    <div class="tab-bar"><!--ko with: $root.processor.compilee-->
      <div class="tab-bar-cover"><span id="compiling-filename" data-bind="text: fileName"></span>
      </div><!--/ko-->
      <button class="tab-new" data-bind="click: openNewFile">&plus;</button>
      <div class="tab-row">
        <div class="tab-group" data-bind="foreach: tabs">
          <div class="tab-cell"
               data-bind="css: {active: isActive}, click: $parents[0].setActive.bind($data)">
            <a><span data-bind="text: file.fileName"></span> <span class="tab-dismiss"
                                                                   data-bind="click: $parents[0].closeTab.bind($data)">&times;</span></a>
          </div>
        </div>
      </div>
    </div>
    <div class="editor-container"><textarea id="editor"></textarea></div>
  </div>
</template>
