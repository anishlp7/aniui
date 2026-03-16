import { Command } from "commander";
import { initCommand } from "./commands/init";
import { addCommand } from "./commands/add";
import { themeCommand } from "./commands/theme";

const pkg = require("../../package.json");

const program = new Command()
  .name("aniui")
  .description("Beautiful React Native components. Copy. Paste. Ship.")
  .version(pkg.version);

program
  .command("init")
  .description("Initialize AniUI in your React Native project")
  .action(async () => {
    await initCommand();
  });

program
  .command("add")
  .description("Add components to your project")
  .argument("[names...]", "component names to add")
  .action(async (names: string[]) => {
    await addCommand(names);
  });

program
  .command("theme")
  .description("Change the theme preset")
  .action(async () => {
    await themeCommand();
  });

program.parse();
