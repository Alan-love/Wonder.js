import { disposeComponent as disposeComponentSystem } from "../../geometry/GeometrySystem";
import { Geometry } from "../../geometry/Geometry";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../../device/WorkerDetectSystem";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { GeometryData } from "../../geometry/GeometryData";
import { expect } from "wonder-expect.js";
import {
    disposeBuffers
} from "../../../renderer/webgl2/utils/worker/both_file/buffer/bufferUtils";
import { DeviceManagerData } from "../../../renderer/device/DeviceManagerData";
import { VaoData } from "../../../renderer/vao/VaoData";
import { addDisposeHandle as addDisposeHandleToMap } from "../../ComponentSystem";

export var addDisposeHandle = (BoxGeometry: any, CustomGeometry: any) => {
    addDisposeHandleToMap(BoxGeometry, disposeComponent);
    addDisposeHandleToMap(CustomGeometry, disposeComponent);
}

export var disposeComponent = (component: Geometry) => {
    disposeComponentSystem(component, _disposeBuffers);
}

var _disposeBuffers = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    //todo fix
    _disposeBuffers = requireCheckFunc((disposedIndexArray: Array<number>) => {
        it("should not add data twice in one frame", () => {
            expect(GeometryData.disposedGeometryIndexArray.length).equal(0);
        });
    }, (disposedIndexArray: Array<number>) => {
        GeometryData.disposedGeometryIndexArray = disposedIndexArray;
    })
}
else {
    _disposeBuffers = (disposedIndexArray: Array<number>) => {
        disposeBuffers(disposedIndexArray, DeviceManagerData, VaoData);
    }
}
