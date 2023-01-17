import { GlueStackPlugin } from "src";
import IPlugin from "@gluestack/framework/types/plugin/interface/IPlugin";
import IHasContainerController from "@gluestack/framework/types/plugin/interface/IHasContainerController";

export function developWatch(program: any, glueStackPlugin: GlueStackPlugin) {
  const command = program
    .command("develop:watch")
    .argument(
      "[instance-name]",
      "Name of the container instance to up (optional)",
    )
    .description(
      "Watches and restarts provided container instances or all the containers if no instance is provided",
    )
    .action((instanceName: string) => runner(instanceName, glueStackPlugin));
}

export async function runner(
  instanceName: string,
  glueStackPlugin: GlueStackPlugin,
) {
  const instances = glueStackPlugin.app.getContainerTypePluginInstances(true);
  let upInstances: (IPlugin & IHasContainerController)[] = instances;
  let found = false;
  if (instanceName) {
    for (const instance of instances) {
      if (instance.getName() === instanceName) {
        found = true;
        upInstances = [instance];
        break;
      }
    }
    if (!found) {
      console.log(`Error: could not up ${instanceName} instance not found`);
      return;
    }
  }

  // for (const instance of upInstances) {
  //   if (instance && instance?.containerController) {
  //     console.log(`Instance: ${instance.getName()}`);
  //     try {
  //       // const exist = instance.containerController.hasOwnProperty('watch');
  //       // console.log(`Instance: ${instance.getName()} -> ${exist}`);
  //     } catch (e) {
  //       console.log(
  //         `Failed: ${instance.getName()} instance could not be started`,
  //       );

  //       console.log("\x1b[33m\nError:\x1b[31m", e.message, "\x1b[0m");
  //     }
  //     console.log();
  //   }
  // }
}
