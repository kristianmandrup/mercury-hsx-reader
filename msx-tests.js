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
  '<a.b.c></a.b.c>'
];

var results = [
  "m('a', null)",
  "m('a', { v: true })",
  "m('a', { foo: 'bar' }, [ ' ', value, ' ', m('b', null, [m('c', null)])])",
  "m('a', { b: ' ', c: ' ', d: '&'})",
  "m('a', null)",
  "m('AbC-def', { test: '&&' }, ['bar' + ' ' + 'baz'])",
  "m('a', { b: x ? m('c', null) : m('d', null) })",
  "m('a', null)",
  "m('div', null, ['@test content'])",
  "m('div', null, [ m('br', null), '7x invalid-js-identifier'])",
  "m('a.b', null)",
  "m('a.b.c', null)"
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
