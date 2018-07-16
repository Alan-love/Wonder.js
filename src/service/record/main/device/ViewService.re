open ViewType;

open WonderWebgl.DomExtendType;

let getCanvas = ({canvas}) => canvas;

let unsafeGetCanvas = record => getCanvas(record) |> OptionService.unsafeGet;

let setCanvas = (canvas: htmlElement, record) => {
  ...record,
  canvas: Some(canvas),
};

let getOffset: htmlElement => (int, int) = [%raw
  canvas => {|
                var offset = [canvas.offsetLeft,  canvas.offsetTop];
                var offsetParent = canvas;

            while (offsetParent = offsetParent.offsetParent) {
                offset[0] += offsetParent.offsetLeft;
                offset[1] += offsetParent.offsetTop;
            }

            return offset;
|}
];