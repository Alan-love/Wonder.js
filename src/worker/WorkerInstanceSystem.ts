import { getRenderWorkerFilePath, isSupportRenderWorkerAndSharedArrayBuffer } from "../device/WorkerDetectSystem";

export var getRenderWorker = (WorkerInstanceData: any) => {
    return WorkerInstanceData.renderWorker;
}

export var setRenderWorker = (worker: Worker, WorkerInstanceData: any) => {
    WorkerInstanceData.renderWorker = worker;
}

export var createWorker = (workerFilePath: string) => {
    return new Worker(workerFilePath);
}

export var initWorkInstances = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initWorkInstances = (WorkerInstanceData) => {
        setRenderWorker(createWorker(getRenderWorkerFilePath()), WorkerInstanceData);
    }
}
else {
    initWorkInstances = (WorkerInstanceData) => {
    }
}
