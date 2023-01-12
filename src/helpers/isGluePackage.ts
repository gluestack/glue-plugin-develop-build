export function isGluePackage(packageName: string, gluePackageName: string): boolean {
  if (packageName === gluePackageName) {
    return true;
  }
  if (gluePackageName.startsWith('@')) {
    // @ts-ignore
    let arr = gluePackageName.split(['/']);
    if (arr[1] && arr[1] === `glue-plugin-${packageName}` || arr[1] === packageName) {
      return true;
    }
  }
  return false;
}