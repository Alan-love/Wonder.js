open Js.Promise;

open Most;

let _createFetchLogicJobStreamArr = (dataDir, fetchFunc) => [|
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "logic/setting/logic_setting.json"|]),
    fetchFunc
  )
  |> map((json) => LogicJobConfigParseSystem.convertLogicSettingToRecord(json)),
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "logic/pipeline/init_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => LogicJobConfigParseSystem.convertInitPipelinesToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "logic/pipeline/update_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => LogicJobConfigParseSystem.convertUpdatePipelinesToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "logic/job/init_jobs.json"|]),
    fetchFunc
  )
  |> map((json) => LogicJobConfigParseSystem.convertInitJobsToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "logic/job/update_jobs.json"|]),
    fetchFunc
  )
  |> map((json) => LogicJobConfigParseSystem.convertUpdateJobsToRecord(json))
  |> Obj.magic
|];

let _createFetchRenderJobStreamArr = (dataDir, fetchFunc) => [|
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "render/setting/render_setting.json"|]),
    fetchFunc
  )
  |> map((json) => RenderJobConfigParseSystem.convertRenderSettingToRecord(json)),
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "render/pipeline/init_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => RenderJobConfigParseSystem.convertInitPipelinesToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "render/pipeline/render_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => RenderJobConfigParseSystem.convertRenderPipelinesToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "render/job/init_jobs.json"|]),
    fetchFunc
  )
  |> map((json) => RenderJobConfigParseSystem.convertInitJobsToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "render/job/render_jobs.json"|]),
    fetchFunc
  )
  |> map((json) => RenderJobConfigParseSystem.convertRenderJobsToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "render/shader/shaders.json"|]),
    fetchFunc
  )
  |> map((json) => RenderJobConfigParseSystem.convertShadersToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "render/shader/shader_libs.json"|]),
    fetchFunc
  )
  |> map((json) => RenderJobConfigParseSystem.convertShaderLibsToRecord(json))
  |> Obj.magic
|];

let _collectAllRecords = (stream) =>
  stream |> reduce((arr, record) => arr |> ArraySystem.push(record), [||]);

let _addInitDataFunc = (initDataFunc, promise) =>
  promise |> then_((recordArr) => (recordArr, initDataFunc) |> resolve);

let load = (dataDir: string, fetchFunc, state: StateDataType.state) =>
  /* TODO load gloal_resources */
  /* TODO perf: use mergeArray instead of concatArray */
  mergeArray([|
    fromPromise(
      _createFetchLogicJobStreamArr(dataDir, fetchFunc)
      |> MostUtils.concatArray
      |> _collectAllRecords
      |> _addInitDataFunc(LogicJobConfigHelper.initData)
    ),
    fromPromise(
      _createFetchRenderJobStreamArr(dataDir, fetchFunc)
      |> MostUtils.concatArray
      |> _collectAllRecords
      |> _addInitDataFunc(RenderJobConfigHelper.initData)
    )
    |> Obj.magic
  |])
  |> reduce(
       (state, (recordArr, initDataFunc)) => initDataFunc(recordArr |> Obj.magic, state),
       state
     )
  |> then_((state) => state |> AllJobSystem.init |> resolve);