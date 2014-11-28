var fs = require('fs');
var sweet = require('sweet.js');
sweet.setReadtable('./index.js');

var tests = [
  '<a />',
  '<a v />',
  '<a foo="bar"> {value} <b><c /></b></a>',
  '<a b={" "} c=" " d="&amp;" />',
  '<a\n/>',
  '<abC-def\n  test="&#x0026;&#38;">\nbar\nbaz\n</abC-def>',
  '<a b={x ? <c /> : <d />} />',
  '<a>{}</a>',
  '<div>@test content</div>',
  '<div><br />7x invalid-js-identifier</div>',
  '<a.b></a.b>',
  '<a.b.c></a.b.c>',
  '<:MyCool />',
  '<|MyWidget />',
  '<SideBySideEditor />',
  '<MyEditor state="sideBySideEditor"/>',
  // '<div><:SideBySideEditor /></div>',
  // '<header><section name="main"><h2>my title</h2><p>some text here</p></section></header>'
];

var results = [
  "h('a', null)",
  "h('a', { v: true })",
  "h('a', { foo: 'bar' }, [ ' ', value, ' ', h('b', null, [h('c', null)])])",
  "h('a', { b: ' ', c: ' ', d: '&'})",
  "h('a', null)",
  "h('abC-def', { test: '&&' }, ['bar' + ' ' + 'baz'])",
  "h('a', { b: x ? h('c', null) : h('d', null) })",
  "h('a', null)",
  "h('div', null, ['@test content'])",
  "h('div', null, [ h('br', null), '7x invalid-js-identifier'])",
  "h('a.b', null)",
  "h('a.b.c', null)",
  "this.renderComponent('MyCool')",
  "this.renderWidget('MyWidget')",
  "this.renderPartial('SideBySideEditor')",
  "this.renderPartial('MyEditor', { state: 'sideBySideEditor' })",
  "h('div', null, [this.renderPartial('SideBySideEditor')])",
  "h('header', null, [h('section', { name: 'main' }, [ h('h2', null, ['my title']), h('p', null, ['some text here']) ])])"
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
