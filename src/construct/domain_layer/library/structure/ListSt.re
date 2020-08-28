let rec traverseResultM = (list, f) => {
  // define the monadic functions
  let (>>=) = (x, f) => Result.bind(x, f);

  let retn = Result.succeed;

  // define a "cons" function
  let cons = (head, tail) => [head, ...tail];
  // loop through the list
  switch (list) {
  | [] =>
    // if empty, lift [] to a Result
    retn([])
  | [head, ...tail] =>
    // otherwise lift the head to a Result using f
    // then lift the tail to a Result using traverse
    // then cons the head and tail and return it
    f(head) >>= (h => traverseResultM(tail, f) >>= (t => retn(cons(h, t))))
  };
};

let rec traverseReduceResultM =
        (list: list('a), param: 'b, f: ('b, 'a) => Result.t2('b))
        : Result.t2('b) => {
  // define the monadic functions
  let (>>=) = (x, f) => Result.bind(x, f);

  let retn = Result.succeed;

  // define a "cons" function
  let cons = (head, tail) => [head, ...tail];
  // loop through the list
  switch (list) {
  | [] => retn(param)
  | [head, ...tail] =>
    f(param, head) >>= (h => traverseReduceResultM(tail, h, f))
  };
};

let _id = value => value;

let rec sequenceResultM = list => {
  traverseResultM(list, _id);
};

let ignoreTraverseResultValue = traverseResult => {
  traverseResult->Result.mapSuccess(_ => ());
};

let range = (start, end_) => {
  Belt.List.makeBy(end_ - start + 1, i => i + start);
};

let map = (list, func) => {
  Belt.List.map(list, func);
};

let _eq = (source, target) => source === target;

let includes = (list, value) => {
  list->Belt.List.has(value, _eq);
};

let getBy = Belt.List.getBy;

let reduce = Belt.List.reduce;

let forEach = Belt.List.forEach;

let push = (list, value) => {
  list->Belt.List.concat([value]);
};

let toArray = Belt.List.toArray;

let fromArray = Belt.List.fromArray;

let remove = (list, value) => list->Belt.List.filter(v => v !== value);
