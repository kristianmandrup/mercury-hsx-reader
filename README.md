# Mercury hsx reader

A reader to hook in HSX syntax to JavaScript, using
[sweet.js](http://sweetjs.org/). Why? Because now you can use any
other language extensions (macros) with HSX.

All you have to do is
integrate [sweet.js](https://github.com/mozilla/sweet.js) in your pipeline and you can have everything,
including *working* sourcemaps and nice errors across all things.

**This is beta**. There are likely small bugs and edge cases to be
fixed. That said, it should be relatively stable.

```
<div>
  Monkeys:
  {listOfMonkeys} {climbingTrees}
</div>
```

```
h('div', null, ['Monkeys:', listOfMonkeys, ' ', climbingTrees]);
```

On parsing error:

```
<div>
    <h1>Title</h1>
    <p>
</div>
```

```
SyntaxError: [MSX] Expected corresponding closing tag for p
5: </div>
     ^
    at Object.readtables.parserAccessor.throwSyntaxError ...
```

### Running tests

`node hsx-tests.js`
