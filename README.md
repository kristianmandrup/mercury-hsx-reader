# Mercury HSX reader

A reader to hook in HSX syntax to JavaScript, using
[sweet.js](http://sweetjs.org/). Why? Because now you can use any
other language extensions (macros) with HSX.

All you have to do is integrate [sweet.js](https://github.com/mozilla/sweet.js) in your
pipeline and you can have everything, including *working* source maps and nice errors across all things.

**This is beta**. There are likely small bugs and edge cases to be
fixed. That said, it should be relatively stable.

- `<:MyCool` to render component of that name
- `<|MyCool` to render widget of that name
- `<MyCool` to render partial of that name (must start with capital letter)

```html
<div>
  Monkeys:
  {listOfMonkeys} {climbingTrees}
</div>
<:MyCool />
<|MyWidget />
<SideBySideEditor />
<MyEditor state="sideBySideEditor"/>
<header>
  <section name="main">
    <h2>my title</h2>
    <p>some text here</p>
  <section>
</header>
```

Outputs the following JavaScript:

```
h('div', null, ['Monkeys:', listOfMonkeys, ' ', climbingTrees]);
this.renderComponent('MyCool');
this.renderWidget('MyWidget');
this.renderPartial('SideBySideEditor');
this.renderPartial('MyEditor', { state: 'sideBySideEditor' });
h('header', null,
  [h('section', { name: 'main' },
    [h('h2', null,
       ['my title']),
     h('p', null,
       ['some text here'])
    ])
   ]
)
```

On parsing error:

```
<div>
    <h1>Title</h1>
    <p>
</div>
```

```
SyntaxError: [HSX] Expected corresponding closing tag for p
5: </div>
     ^
    at Object.readtables.parserAccessor.throwSyntaxError ...
```

### Running tests

`node hsx-tests.js`

### License

Keep calm and *ENJOY* ;)