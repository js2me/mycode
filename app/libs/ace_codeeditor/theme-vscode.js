define(
  'ace/theme/vscode',
  ['require', 'exports', 'module', 'ace/lib/dom'],
  function(e, t, n) {
    'use strict'
    ;(t.isDark = !1),
      (t.cssClass = 'vs_code'),
      (t.cssText =
        '.vs_code .ace_gutter{background:#1e1e1e;color:#404040}.vs_code .ace_print-margin{width:1px;background:#25282c}.vs_code{background:#1e1e1e;color:#7cdcfe}.vs_code .ace_cursor{color:#AEAFAD}.vs_code .ace_marker-layer .ace_selection{background:#373B41}.vs_code.ace_multiselect .ace_selection.ace_start{box-shadow:0 0 3px 0 #1D1F21}.vs_code .ace_marker-layer .ace_step{background:#665200}.vs_code .ace_marker-layer .ace_bracket{margin:-1px 0 0 -1px;border:1px solid #4B4E55}.vs_code .ace_gutter-active-line,.vs_code .ace_marker-layer .ace_active-line{background-color:#2b2825}.vs_code .ace_marker-layer .ace_selected-word{border:1px solid #373B41}.vs_code .ace_invisible{color:#4B4E55}.vs_code .ace_keyword,.vs_code .ace_meta,.vs_code .ace_storage,.vs_code .ace_storage.ace_type,.vs_code .ace_support.ace_type{color:#569cd6}.vs_code .ace_keyword.ace_operator{color:#d4d4d4}.vs_code .ace_constant.ace_character,.vs_code .ace_constant.ace_language,.vs_code .ace_constant.ace_numeric,.vs_code .ace_keyword.ace_other.ace_unit,.vs_code .ace_variable.ace_parameter{color:#b5cea8}.vs_code .ace_constant.ace_other{color:#CED1CF}.vs_code .ace_invalid{color:#CED2CF;background-color:#DF5F5F}.vs_code .ace_invalid.ace_deprecated{color:#CED2CF;background-color:#B798BF}.vs_code .ace_fold{background-color:#81A2BE;border-color:#C5C8C6}.vs_code .ace_entity.ace_name.ace_function,.vs_code .ace_support.ace_function{color:#dcdcaa}.vs_code .ace_support.ace_class,.vs_code .ace_support.ace_type{color:#F0C674}.vs_code .ace_heading,.vs_code .ace_markup.ace_heading,.vs_code .ace_string{color:#ce9178}.vs_code .ace_entity.ace_name.ace_tag,.vs_code .ace_meta.ace_tag,.vs_code .ace_string.ace_regexp{color:#4ec9b0}.vs_code .ace_comment{color:#608b4e}.vs_code .ace_keyword{color:#c586c0}.vs_code .ace_gutter-cell.ace_info{background-image:none}.vs_code .ace_variable{color:#7cdcfe}.vs_code .ace_punctuation{color:#d4d4d4}.vs_code .ace_punctuation.ace_tag{color:#a5a5a5}.vs_code .ace_paren.ace_quasi{color:#da70ca}'),
      (t.$id = 'ace/theme/vscode')
    var r = e('../lib/dom')
    r.importCssString(t.cssText, t.cssClass)
  }
)
;(function() {
  window.require(['ace/theme/vscode'], function(m) {
    if (typeof module === 'object' && typeof exports === 'object' && module) {
      module.exports = m
    }
  })
})()
