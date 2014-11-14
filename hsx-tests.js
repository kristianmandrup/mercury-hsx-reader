var fs = require('fs');
var sweet = require('sweet.js');
sweet.setReadtable('./index.js');

var tests = [
  '<a />',
  '<a v />',
  '<a foo="bar"> {value} <b><c /></b></a>',
  '<a b={" "} c=" " d="&amp;" />',
  '<a\n/>',
  '<AbC-def\n  test="&#x0026;&#38;">\nbar\nbaz\n</AbC-def>',
  '<a b={x ? <c /> : <d />} />',
  '<a>{}</a>',
  '<div>@test content</div>',
  '<div><br />7x invalid-js-identifier</div>',
  '<a.b></a.b>',
  '<a.b.c></a.b.c>',
  '<:sideBySideEditor/>'
  // '<div><:sideBySideMdEditor state="sideBySideEditor"/></div>'
];

var results = [
  "h('a', null)",
  "h('a', { v: true })",
  "h('a', { foo: 'bar' }, [ ' ', value, ' ', h('b', null, [h('c', null)])])",
  "h('a', { b: ' ', c: ' ', d: '&'})",
  "h('a', null)",
  "h('AbC-def', { test: '&&' }, ['bar' + ' ' + 'baz'])",
  "h('a', { b: x ? h('c', null) : h('d', null) })",
  "h('a', null)",
  "h('div', null, ['@test content'])",
  "h('div', null, [ h('br', null), '7x invalid-js-identifier'])",
  "h('a.b', null)",
  "h('a.b.c', null)",
  "sideBySideEditor.render(state.sideBySideEditor)"
  // "h('div', sideBySideMdEditor.render(state.sideBySideEditor))",
];

tests.forEach(function(test, i) {
  var code = sweet.compile(test).code;

  code = code.trim()
    .replace(/;$/, '')
    .replace(/\n/g, '')
    .replace(/ +/g, ' ');
  var result = results[i]
        .replace(/\n/g, '')
        .replace(/ +/g, ' ');

  if(code !== result) {
    throw new Error('Failed: expected ' + result +
                    ' but got ' + code);
  }
});

console.log('passed');
