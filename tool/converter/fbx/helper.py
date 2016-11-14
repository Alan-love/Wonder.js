import os

from fbx import *

# #####################################################
# Helpers
# #####################################################
def getRadians(v):
    return ((v[0]*math.pi)/180, (v[1]*math.pi)/180, (v[2]*math.pi)/180)

# def getHex(c):
#     color = (int(c[0]*255) << 16) + (int(c[1]*255) << 8) + int(c[2]*255)
#     return int(color)


# #####################################################
# Object Name Helpers
# #####################################################
def hasUniqueName(o, class_id):
    scene = o.GetScene()
    object_name = o.GetName()
    object_id = o.GetUniqueID()

    object_count = scene.GetSrcObjectCount(FbxCriteria.ObjectType(class_id))

    for i in range(object_count):
        other = scene.GetSrcObject(FbxCriteria.ObjectType(class_id), i)
        other_id = other.GetUniqueID()
        other_name = other.GetName()

        if other_id == object_id:
            continue
        if other_name == object_name:
            return False

    return True

def getObjectId(o, forcePrefix = True, defaultName = "defaultName"):
    return _getId(o, FbxNode.ClassId, "Object", forcePrefix, defaultName)

def getMaterialId(o, forcePrefix = True, defaultName = "defaultMaterialName"):
    return _getId(o, FbxSurfaceMaterial.ClassId, "Material", forcePrefix, defaultName)


def getTextureId(t, forcePrefix = True):
    if type(t) is FbxFileTexture:
        texture_file = t.GetFileName()
        texture_id = os.path.splitext(os.path.basename(texture_file))[0]
    else:
        texture_id = t.GetName()
        if texture_id == "_empty_":
            texture_id = ""
    prefix = ""
    # if option_prefix or force_prefix:
    if forcePrefix:
        prefix = "Texture_%s_" % t.GetUniqueID()
        if len(texture_id) == 0:
            prefix = prefix[0:len(prefix)-1]
    return prefix + texture_id

def getSamplerId(textureId):
    return textureId.replace("Texture_", "Sampler_")

def getImageId(textureId):
    return textureId.replace("Texture_", "Image_")

def _getId(o, classId, typeName, forcePrefix = False, defaultName = "defaultMaterialName"):
    if not o:
        return ""

    object_name = o.GetName()
    object_id = o.GetUniqueID()

    if not forcePrefix:
        forcePrefix = not hasUniqueName(o, classId)

    prefix = ""
    # if option_prefix or force_prefix:
    if forcePrefix:
        prefix = "%s_%s_" % (typeName,object_id)


    name = prefix + object_name

    if name == "":
        return defaultName

    return name


def setName(o, dict):
    name = o.GetName()

    if name != None and name != "":
        dict["name"] = name

def getPrefixedName(o, prefix):
    return (prefix + '_%s_') % o.GetUniqueID() + o.GetName()
