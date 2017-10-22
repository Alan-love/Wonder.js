open StateDataType;

open StateData;

open CompileConfig;

open Exception;

let _getIsTest (state: state) :bool => Js.Option.getExn state.initConfigData.isTest;

let _getIsTestFromStateData (stateData: stateData) =>
  switch stateData.state {
  | None => false
  | Some state => _getIsTest state
  };

let describe (message: string) func ::preCondition=(fun () => true) () =>
  preCondition () ?
    try (func ()) {
    | Check_fail failMessage => failwith {j|$message->$failMessage|j}
    } :
    ();

let test (message: string) (func: unit => unit) =>
  try (func ()) {
  | Check_fail failMessage => failwith {j|$message->$failMessage|j}
  };

let requireCheck (f: unit => unit) :unit =>
  switch compileConfig.isCompileTest {
  | false => ()
  | true =>
    switch (_getIsTestFromStateData stateData) {
    | true => f ()
    | _ => ()
    }
  };

let ensureCheck (f: 'a => unit) (returnVal: 'a) :'a =>
  switch compileConfig.isCompileTest {
  | false => returnVal
  | true =>
    switch (_getIsTestFromStateData stateData) {
    | true =>
      f returnVal;
      returnVal
    | _ => returnVal
    }
  };

let _assert (result: bool) (message: string) =>
  switch result {
  | false => failwith message
  | true => ()
  };

let assertTrue (source: bool) => _assert (source == true) "expect to be true, but actual is false";

let assertFalse (source: bool) =>
  _assert (source == false) "expect to be false, but actual is true";

let assertExist (source: option 'a) =>
  _assert (Js.Option.isSome source) "expect to be exist, but actual not";

type assertEqual _ =
  | Int :assertEqual int
  | Float :assertEqual float
  | String :assertEqual string;

let _getEqualMessage source target => {j|"expect to be $source, but actual is $target"|j};

let assertEqual (type g) (kind: assertEqual g) (source: g) (target: g) =>
  switch kind {
  | _ => _assert (source == target) (_getEqualMessage source target)
  };

type assertNumber _ =
  | Int :assertNumber int
  | Float :assertNumber float;

let _getEqualMessage source target => {j|expect to be $source, but actual is $target|j};

let assertGt (type g) (kind: assertNumber g) (source: g) (target: g) =>
  switch kind {
  | _ => _assert (source > target) {j|expect $source > $target, but actual isn't|j}
  };

let assertGte (type g) (kind: assertNumber g) (source: g) (target: g) =>
  switch kind {
  | _ => _assert (source >= target) {j|expect $source >= $target, but actual isn't|j}
  };

let assertLt (type g) (kind: assertNumber g) (source: g) (target: g) =>
  switch kind {
  | _ => _assert (source < target) {j|expect $source < $target, but actual isn't|j}
  };

let assertLte (type g) (kind: assertNumber g) (source: g) (target: g) =>
  switch kind {
  | _ => _assert (source <= target) {j|expect $source <= $target, but actual isn't|j}
  };

module Operators = {
  let (==) a b => assertEqual Int a b;
  let (==.) a b => assertEqual Float a b;
  let (>) a b => assertGt Int a b;
  let (>.) a b => assertGt Float a b;
  let (>=) a b => assertGte Int a b;
  let (>=.) a b => assertGte Float a b;
  let (<) a b => assertLt Int a b;
  let (<.) a b => assertLt Float a b;
  let (<=) a b => assertLte Int a b;
  let (<=.) a b => assertLte Float a b;
};