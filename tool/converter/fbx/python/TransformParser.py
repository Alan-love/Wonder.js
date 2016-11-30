from utils import *
from transformUtils import *

class TransformParser:
    def __init__(self):
        pass

    def parseBasicNode(self, nodeData, node):
        # For Single Matrix situation, obtain transform matrix from eDestinationPivot, which include pivot offsets and pre/post rotations.
        # nodeLocalMatrix = node.EvaluateLocalTransform(FBXSDK_TIME_ZERO, eSourcePivot)
        nodeLocalMatrix = node.EvaluateLocalTransform()

        localMatrixData = []

        for i in range(4):
            row = nodeLocalMatrix.GetRow(i)
            addVector4Data(localMatrixData, row)

        nodeData["matrix"] = localMatrixData

        # print (node.GetName(), nodeLocalMatrix.GetT(), nodeLocalMatrix.GetR())


    # refer to FBX: Camera and Lights issues(https://developer.blender.org/T41374)
    def parseCameraNode(self, nodeData, node):
        # camera = node.GetCamera()
        #
        # position = camera.Position.Get()
        # center = camera.InterestPosition.Get()
        # up = camera.UpVector.Get()
        #
        # FbxVector4(position[0], position[1], position[2], 1)

        # print (addVector3Data([], position), addVector3Data([], center), addVector3Data([], up))

        # # For Single Matrix situation, obtain transform matrix from eDestinationPivot, which include pivot offsets and pre/post rotations.
        nodeLocalMatrix = node.EvaluateLocalTransform()

        localMatrixData = []

        for i in range(4):
            row = nodeLocalMatrix.GetRow(i)
            addVector4Data(localMatrixData, row)

        nodeData["translation"] = addVector3Data([], nodeLocalMatrix.GetT())
        nodeData["scale"] = addVector3Data([], nodeLocalMatrix.GetS())


        # camera transform should rotate -90 by y axis
        nodeData["rotation"] = addVector4Data(
            [],
            rotate90ByYAxis(nodeLocalMatrix.GetQ())
        )

