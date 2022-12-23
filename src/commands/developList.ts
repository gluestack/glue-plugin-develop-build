import { GlueStackPlugin } from "src";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import IHasContainerController from "@gluestack/framework/types/plugin/interface/IHasContainerController";

export function developList(program: any, glueStackPlugin: GlueStackPlugin) {
  program
    .command("develop:list")
    .description("Lists all the container instances")
    .action(() => runner(glueStackPlugin));
}

export async function runner(glueStackPlugin: GlueStackPlugin) {
  const arr: any = [];
  glueStackPlugin.app
    .getContainerTypePluginInstances(false)
    // @ts-ignore
    .forEach((instance: IInstance & IHasContainerController) => {
      if (instance && instance?.containerController) {
        arr.push({
          instance: instance.getName(),
          type: instance.callerPlugin.getType(),
          status: instance.getContainerController().getStatus(),
          port:
            instance.getContainerController().getStatus() === "up"
              ? instance.getContainerController().portNumber || "-"
              : "-",
          "container_id/pid":
            instance.getContainerController().getContainerId() || "-",
        });
      }
    });
  console.table(arr);
}
