let getMaxIndex = () => {
  DpContainer.unsafeGetTransformRepoDp().getMaxIndex();
};

let setMaxIndex = index => {
  DpContainer.unsafeGetTransformRepoDp().setMaxIndex(index);
};

let getIsDirty = transform => {
  DpContainer.unsafeGetTransformRepoDp().getIsDirty(
    transform->TransformEntity.value,
  )
  ->OptionSt.fromNullable;
};

let setIsDirtyByIndex = index => {
  DpContainer.unsafeGetTransformRepoDp().setIsDirty(index);
};

let setIsDirty = transform => {
  DpContainer.unsafeGetTransformRepoDp().setIsDirty(
    transform->TransformEntity.value,
  );
};

let setGameObject = (transform, gameObject) => {
  DpContainer.unsafeGetTransformRepoDp().setGameObject(
    transform->TransformEntity.value,
    gameObject->GameObjectEntity.value,
  );
};

let getGameObject = transform => {
  DpContainer.unsafeGetTransformRepoDp().getGameObject(
    transform->TransformEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(GameObjectEntity.create);
};

let hasParent = transform => {
  DpContainer.unsafeGetTransformRepoDp().hasParent(
    transform->TransformEntity.value,
  );
};

let getParent = transform => {
  DpContainer.unsafeGetTransformRepoDp().getParent(
    transform->TransformEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(TransformEntity.create);
};

let setParent = (parent, child) => {
  DpContainer.unsafeGetTransformRepoDp().setParent(
    parent->TransformEntity.value,
    child->TransformEntity.value,
  );
};

let removeParent = transform => {
  DpContainer.unsafeGetTransformRepoDp().removeParent(
    transform->TransformEntity.value,
  );
};

let getChildren = transform => {
  DpContainer.unsafeGetTransformRepoDp().getChildren(
    transform->TransformEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(children => children->ListSt.map(TransformEntity.create));
};

let setChildrenByIndex = (parentIndex, childrenIndex) => {
  DpContainer.unsafeGetTransformRepoDp().setChildren(
    parentIndex,
    childrenIndex,
  );
};

let addChild = (parent, child) => {
  DpContainer.unsafeGetTransformRepoDp().addChild(
    parent->TransformEntity.value,
    child->TransformEntity.value,
  );
};

let removeChild = (parent, child) => {
  DpContainer.unsafeGetTransformRepoDp().removeChild(
    parent->TransformEntity.value,
    child->TransformEntity.value,
  );
};

let getLocalToWorldMatrix = transform => {
  DpContainer.unsafeGetTransformRepoDp().getLocalToWorldMatrix(
    transform->TransformEntity.value,
  )
  ->LocalToWorldMatrixVO.create;
};

let getLocalPosition = transform => {
  DpContainer.unsafeGetTransformRepoDp().getLocalPosition(
    transform->TransformEntity.value,
  )
  ->PositionVO.create;
};

let setLocalPosition = (transform, localPosition) => {
  DpContainer.unsafeGetTransformRepoDp().setLocalPosition(
    transform->TransformEntity.value,
    localPosition->PositionVO.value,
  );
};

let getLocalRotation = transform => {
  DpContainer.unsafeGetTransformRepoDp().getLocalRotation(
    transform->TransformEntity.value,
  )
  ->RotationVO.create;
};

let setLocalRotation = (transform, localRotation) => {
  DpContainer.unsafeGetTransformRepoDp().setLocalRotation(
    transform->TransformEntity.value,
    localRotation->RotationVO.value,
  );
};

let getLocalScale = transform => {
  DpContainer.unsafeGetTransformRepoDp().getLocalScale(
    transform->TransformEntity.value,
  )
  ->ScaleVO.create;
};

let setLocalScale = (transform, localScale) => {
  DpContainer.unsafeGetTransformRepoDp().setLocalScale(
    transform->TransformEntity.value,
    localScale->ScaleVO.value,
  );
};
