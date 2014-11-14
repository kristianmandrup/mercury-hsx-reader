
let _DOM = macro {
  rule { { $a . $b $expr ... } } => {
    _DOM_member { $a . $b $expr ... }
  }

  rule { { $el $attrs } } => {
    h(str_expr($el), $attrs)
  }

  rule { { $el $attrs , } } => {
    h(str_expr($el), $attrs)
  }

  rule { { $elStart $attrs $($children:expr,) ... } } => {
    h(str_expr($elStart), $attrs, [$children (,) ...])
  }

//  rule { { :$elStart $attrs $($children:expr,) ... } } => {
//    $elStart.render(state.$attrs[state]), [$children (,) ...]
//  }

  rule { { $($elStart:) $($children:expr,) ... } } => {
    $elStart.render(state.$elStart), [$children (,) ...]
  }

  rule { } => { _DOM }
}

macro _DOM_member {
  rule { { $a . $b $expr ... } } => {
    _DOM_member { ($a . $b) $expr ... }
  }

  rule { { $expr ... } } => {
    _DOM { $expr ... }
  }
}

// inspired by: http://stackoverflow.com/questions/24809324/sweet-js-expression-to-string-literal
macro str_expr {

    case {
        _ ($toks:expr)
    } => {
        var unwrap = function (token) {
          var unwrapped = unwrapSyntax(token);
          if (unwrapped.inner) {
            return unwrapped.inner.map(unwrap).join("");
          } else {
            return unwrapped;
          }
        }

        var toks = #{$toks};
        var toks_str = unwrapSyntax(toks[0]).inner.map(unwrap).join("");

        //console.log("toks", toks);
        //var toks_str = unwrapSyntax(toks[0]).inner.join("");

        letstx $tok_str = [makeValue(toks_str, #{here})];
        return #{
             $tok_str
        }
    }
}

export _DOM
