"use strict";
exports.__esModule = true;
exports.isPackage = void 0;
function isPackage(packageName, gluePackageName) {
    console.log("hola");
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
exports.isPackage = isPackage;
//# sourceMappingURL=isPackage.js.map