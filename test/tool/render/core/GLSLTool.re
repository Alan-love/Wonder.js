let getVsSource = (shaderSource) => List.nth(shaderSource |> Sinon.getCall(0) |> Sinon.getArgs, 1);

let getFsSource = (shaderSource) => List.nth(shaderSource |> Sinon.getCall(1) |> Sinon.getArgs, 1);

let containSpecifyCount = (source: string, target: string, ~count=1, ()) =>
  switch (Js.String.match(Js.Re.fromStringWithFlags(target, ~flags="g"), source)) {
  | None => count == 0
  | Some(result) => Js.Array.length(result) == count
  };

let contain = (source: string, targetLine: string) => Js.String.includes(targetLine, source);

let containMultiline = (source: string, targetLineArray: list(string)) =>
  targetLineArray
  |> List.for_all((targetLine) => Js.String.includes(targetLine |> Js.String.trim, source));