import { GlueStackPlugin } from "src";
import IPlugin from "@gluestack/framework/types/plugin/interface/IPlugin";
import IHasContainerController from "@gluestack/framework/types/plugin/interface/IHasContainerController";

export function developList(program: any, glueStackPlugin: GlueStackPlugin) {
  const command = program
    .command("develop:list")
    .description("Lists all the container instances")
    .action(() => runner(glueStackPlugin));
}

export async function runner(glueStackPlugin: GlueStackPlugin) {
  const arr: any = [];
  glueStackPlugin.app
    .getContainerTypePluginInstances(false)
    .filter((instance: IPlugin & IHasContainerController) => {
      if (instance && instance?.containerController) {
        arr.push({
          instance: instance.getName(),
          status: instance.getContainerController().getStatus(),
          port: instance.getContainerController().getPortNumber() || "-",
          "container_id/pid":
            instance.getContainerController().getContainerId() || "-",
        });
      }
    });
  console.table(arr);
}
