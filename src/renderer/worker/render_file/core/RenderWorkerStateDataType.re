open GPUDetectReWoType;

type jobFlags = option(array(string));

type job = {
  name: string,
  flags: jobFlags
};

type pipelineJob = {name: string};

type pipelineJobs = array(array(pipelineJob));

type jobData = {
  pipelineJobs,
  jobs: array(job)
};

type renderWorkerState = {
  jobData: option(jobData),
  gpuDetectData,
  deviceManagerData: DeviceManagerReWoType.deviceManagerData
};

type renderWorkerStateData = {mutable state: option(renderWorkerState)};