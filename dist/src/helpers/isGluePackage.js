"use strict";
exports.__esModule = true;
exports.isGluePackage = void 0;
function isGluePackage(packageName, gluePackageName) {
    if (packageName === gluePackageName) {
        return true;
    }
    if (gluePackageName.startsWith('@')) {
        var arr = gluePackageName.split(['/']);
        if (arr[1] && arr[1] === "glue-plugin-".concat(packageName) || arr[1] === packageName) {
            return true;
        }
    }
    return false;
}
exports.isGluePackage = isGluePackage;
//# sourceMappingURL=isGluePackage.js.map