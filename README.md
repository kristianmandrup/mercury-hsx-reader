
# msx-reader

A reader to hook in MSX syntax to JavaScript, using
[sweet.js](http://sweetjs.org/). Why? Because now you can use any
other language extensions (macros) with MSX. All you have to do is
integrate sweet.js in your pipeline and you can have everything,
including *working* sourcemaps and nice errors across all things.

**This is beta**. There are likely small bugs and edge cases to be
fixed. That said, it should be relatively stable.

```
<div>
  Monkeys:
  {listOfMonkeys} {scratchesAss}
</div>
```

```
m('div', null, ['Monkeys:', listOfMonkeys, ' ', scratchesAss]);
```

Or

```
<div>
    <h1>Title</h1>
    <p>
</div>
```

```
SyntaxError: [MSX] Expected correspoding closing tag for p
5: </div>
     ^
    at Object.readtables.parserAccessor.throwSyntaxError (/Users/sdemjanenko/Code/msx-
reader/node_modules/sweet.js/lib/parser.js:4947:23)
    at Object.MSXReader.readElement (/Users/sdemjanenko/Code/msx-reader/msx-reader.js:
223:21)
```
