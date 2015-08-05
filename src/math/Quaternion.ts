/// <reference path="../definitions.d.ts"/>
module dy {
    export class Quaternion {
        public static create(x?:number, y?:number, z?:number, w?:number) {
            var obj = new this(x, y, z, w);

            return obj;
        }

        private _x:number = null;
        get x() {
            return this._x;
        }

        set x(x:number) {
            this._x = x;
        }

        private _y:number = null;
        get y() {
            return this._y;
        }

        set y(y:number) {
            this._y = y;
        }

        private _z:number = null;
        get z() {
            return this._z;
        }

        set z(z:number) {
            this._z = z;
        }

        private _w:number = null;
        get w() {
            return this._w;
        }

        set w(w:number) {
            this._w = w;
        }

        constructor(x:number = 0, y:number = 0, z:number = 0, w:number = 1) {
            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;
        }

        /**
         * @function
         * @name pc.Quat#setFromEulerAngles
         * @description Sets a quaternion from Euler angles specified in XYZ order.
         * @param {Number} ex Angle to rotate around X axis in degrees.
         * @param {Number} ey Angle to rotate around Y axis in degrees.
         * @param {Number} ez Angle to rotate around Z axis in degrees.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var q = new pc.Quat();
         * q.setFromEulerAngles(45, 90, 180);
         */
        public setFromEulerAngles(eulerAngles:Vector3) {
            var sx, cx, sy, cy, sz, cz, halfToRad,
                ex = eulerAngles.x,
                ey = eulerAngles.y,
                ez = eulerAngles.z;

            halfToRad = 0.5 * DEG_TO_RAD;
            ex *= halfToRad;
            ey *= halfToRad;
            ez *= halfToRad;

            sx = Math.sin(ex);
            cx = Math.cos(ex);
            sy = Math.sin(ey);
            cy = Math.cos(ey);
            sz = Math.sin(ez);
            cz = Math.cos(ez);

            this._x = sx * cy * cz - cx * sy * sz;
            this._y = cx * sy * cz + sx * cy * sz;
            this._z = cx * cy * sz - sx * sy * cz;
            this._w = cx * cy * cz + sx * sy * sz;

            return this;
        }

        public multiply(rhs:Quaternion) {
            var q1x, q1y, q1z, q1w, q2x, q2y, q2z, q2w,
                result = Quaternion.create();

            q1x = this._x;
            q1y = this._y;
            q1z = this._z;
            q1w = this._w;

            q2x = rhs.x;
            q2y = rhs.y;
            q2z = rhs.z;
            q2w = rhs.w;

            result.x = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
            result.y = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;
            result.z = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
            result.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;

            return result;
        }

        /**
         * @function
         * @name pc.Quat#setFromMat4
         * @description Converts the specified 4x4 matrix to a quaternion. Note that since
         * a quaternion is purely a representation for orientation, only the translational part
         * of the matrix is lost.
         * @param {pc.Mat4} m The 4x4 matrix to convert.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * // Create a 4x4 rotation matrix of 180 degrees around the y-axis
         * var rot = new pc.Mat4().setFromAxisAngle(pc.Vec3.UP, 180);
         *
         * // Convert to a quaternion
         * var q = new pc.Quat().setFromMat4(rot);
         */
        public setFromMatrix(matrix:Matrix) {
            var m00, m01, m02, m10, m11, m12, m20, m21, m22,
                tr, s, rs, lx, ly, lz, m;

            m = matrix.values;

            // Cache matrix values for super-speed
            m00 = m[0];
            m01 = m[1];
            m02 = m[2];
            m10 = m[4];
            m11 = m[5];
            m12 = m[6];
            m20 = m[8];
            m21 = m[9];
            m22 = m[10];

            // Remove the scale from the matrix
            lx = 1 / Math.sqrt(m00 * m00 + m01 * m01 + m02 * m02);
            ly = 1 / Math.sqrt(m10 * m10 + m11 * m11 + m12 * m12);
            lz = 1 / Math.sqrt(m20 * m20 + m21 * m21 + m22 * m22);

            m00 *= lx;
            m01 *= lx;
            m02 *= lx;
            m10 *= ly;
            m11 *= ly;
            m12 *= ly;
            m20 *= lz;
            m21 *= lz;
            m22 *= lz;

            // http://www.cs.ucr.edu/~vbz/resources/quatut.pdf

            tr = m00 + m11 + m22;
            if (tr >= 0) {
                s = Math.sqrt(tr + 1);
                this._w = s * 0.5;
                s = 0.5 / s;
                this._x = (m12 - m21) * s;
                this._y = (m20 - m02) * s;
                this._z = (m01 - m10) * s;
            } else {
                if (m00 > m11) {
                    if (m00 > m22) {
                        // XDiagDomMatrix
                        rs = (m00 - (m11 + m22)) + 1;
                        rs = Math.sqrt(rs);

                        this._x = rs * 0.5;
                        rs = 0.5 / rs;
                        this._w = (m12 - m21) * rs;
                        this._y = (m01 + m10) * rs;
                        this._z = (m02 + m20) * rs;
                    } else {
                        // ZDiagDomMatrix
                        rs = (m22 - (m00 + m11)) + 1;
                        rs = Math.sqrt(rs);

                        this._z = rs * 0.5;
                        rs = 0.5 / rs;
                        this._w = (m01 - m10) * rs;
                        this._x = (m20 + m02) * rs;
                        this._y = (m21 + m12) * rs;
                    }
                } else if (m11 > m22) {
                    // YDiagDomMatrix
                    rs = (m11 - (m22 + m00)) + 1;
                    rs = Math.sqrt(rs);

                    this._y = rs * 0.5;
                    rs = 0.5 / rs;
                    this._w = (m20 - m02) * rs;
                    this._z = (m12 + m21) * rs;
                    this._x = (m10 + m01) * rs;
                } else {
                    // ZDiagDomMatrix
                    rs = (m22 - (m00 + m11)) + 1;
                    rs = Math.sqrt(rs);

                    this._z = rs * 0.5;
                    rs = 0.5 / rs;
                    this._w = (m01 - m10) * rs;
                    this._x = (m20 + m02) * rs;
                    this._y = (m21 + m12) * rs;
                }
            }

            return this;
        }

        /**
         * @function
         * @name pc.Quat#setFromAxisAngle
         * @description Sets a quaternion from an angular rotation around an axis.
         * @param {pc.Vec3} axis World space axis around which to rotate.
         * @param {Number} angle Angle to rotate around the given axis in degrees.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var q = new pc.Quat();
         * q.setFromAxisAngle(pc.Vec3.UP, 90);
         */
        public setFromAxisAngle(angle:number, axis:Vector3) {
            var sa, ca;

                axis = axis.normalize();

            angle *= 0.5 * DEG_TO_RAD;

            sa = Math.sin(angle);
            ca = Math.cos(angle);

            this._x = sa * axis.x;
            this._y = sa * axis.y;
            this._z = sa * axis.z;
            this._w = ca;

            return this;
        }

        /**
         * @function
         * @name pc.Quat#invert
         * @description Generates the inverse of the specified quaternion.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * // Create a quaternion rotated 180 degrees around the y-axis
         * var rot = new pc.Quat().setFromEulerAngles(0, 180, 0);
         *
         * // Invert in place
         * rot.invert();
         */
        public invert() {
            return this.conjugate().normalize();
        }

        public conjugate() {
            this._x *= -1;
            this._y *= -1;
            this._z *= -1;

            return this;
        }

        /**
         * @function
         * @name pc.Quat#clone
         * @description Returns an identical copy of the specified quaternion.
         * @returns {pc.Quat} A quaternion containing the result of the cloning.
         * @example
         * var q = new pc.Quat(-0.11, -0.15, -0.46, 0.87);
         * var qclone = q.clone();
         *
         * console.log("The result of the cloning is: " + q.toString());
         */
        public clone() {
            return Quaternion.create(this._x, this._y, this._z, this._w);
        }

        public copy() {
            return Quaternion.create(this._x, this._y, this._z, this._w);
        }

        /**
         * @function
         * @name pc.Quat#normalize
         * @description Returns the specified quaternion converted in place to a unit quaternion.
         * @returns {pc.Quat} The result of the normalization.
         * @example
         * var v = new pc.Quat(0, 0, 0, 5);
         *
         * v.normalize();
         *
         * // Should output 0, 0, 0, 1
         * console.log("The result of the vector normalization is: " + v.toString());
         */
        public normalize() {
            var len = this.length();
            if (len === 0) {
                this._x = this._y = this._z = 0;
                this._w = 1;
            } else {
                len = 1 / len;
                this._x *= len;
                this._y *= len;
                this._z *= len;
                this._w *= len;
            }

            return this;
        }

        /**
         * @function
         * @name pc.Quat#length
         * @description Returns the magnitude of the specified quaternion.
         * @returns {Number} The magnitude of the specified quaternion.
         * @example
         * var q = new pc.Quat(0, 0, 0, 5);
         * var len = q.length();
         * // Should output 5
         * console.log("The length of the quaternion is: " + len);
         */
        public length() {
            var x, y, z, w;

            x = this._x;
            y = this._y;
            z = this._z;
            w = this._w;

            return Math.sqrt(x * x + y * y + z * z + w * w);
        }


    /*
     ///multiplyVector3方法用来将四元数变换应用到参数vector.
     ///
     */
    ///<summary>multiplyVector3</summary>
    ///<param name ="a" type="Vector3">三维向量</param>
    ///<returns type="Quaternion">返回新的四元数</returns>
    public multiplyVector3( vector:Vector3 ) {
        //
        ////这里实际上调用的是vector.applyQuaternion()方法,将四元数变换应用到三维向量vector.
        //console.warn( 'THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.' );
        //return vector.applyQuaternion( this );

        var q = this;
        var x = vector.x;
        var y = vector.y;
        var z = vector.z;

        var qx = q.x;
        var qy = q.y;
        var qz = q.z;
        var qw = q.w;

        // calculate quat * vector

        var ix =  qw * x + qy * z - qz * y;
        var iy =  qw * y + qz * x - qx * z;
        var iz =  qw * z + qx * y - qy * x;
        var iw = - qx * x - qy * y - qz * z;

        // calculate result * inverse quat

        return Vector3.create(
            ix * qw + iw * - qx + iy * - qz - iz * - qy,
            iy * qw + iw * - qy + iz * - qx - ix * - qz,
            iz * qw + iw * - qz + ix * - qy - iy * - qx
        );

        //this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
        //this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
        //this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

        //return this;	//返回新坐标值的三维向量
    }

        public set(x:number, y:number, z:number, w:number){
            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;
        }

        public sub(quat:Quaternion){
            return quat.copy().invert().multiply(this);
        }

        /**
         * @function
         * @name pc.Quat#getEulerAngles
         * @description Converts the supplied quaternion to Euler angles.
         * @param {pc.Vec3} [eulers] The 3-dimensional vector to receive the Euler angles.
         * @returns {pc.Vec3} The 3-dimensional vector holding the Euler angles that
         * correspond to the supplied quaternion.
         */
        public getEulerAngles() {
            var x, y, z, qx, qy, qz, qw, a2;

            qx = this._x;
            qy = this._y;
            qz = this._z;
            qw = this._w;

            a2 = 2 * (qw * qy - qx * qz);
            if (a2 <= -0.99999) {
                x = 2 * Math.atan2(qx, qw);
                y = -Math.PI / 2;
                z = 0;
            } else if (a2 >= 0.99999) {
                x = 2 * Math.atan2(qx, qw);
                y = Math.PI / 2;
                z = 0;
            } else {
                x = Math.atan2(2 * (qw * qx + qy * qz), 1 - 2 * (qx * qx + qy * qy));
                y = Math.asin(a2);
                z = Math.atan2(2 * (qw * qz + qx * qy), 1 - 2 * (qy * qy + qz * qz));
            }

            return Vector3.create(x, y, z).scale(RAD_TO_DEG);
        }
    }
}
