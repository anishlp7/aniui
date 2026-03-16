import path from "path";
import fs from "fs-extra";
import prompts from "prompts";
import { logger } from "../utils/logger";
import { buildSystemPrompt } from "../prompts/system";

interface GenerateOptions {
  output?: string;
}

export async function generateCommand(
  description: string,
  opts: GenerateOptions
): Promise<void> {
  const cwd = process.cwd();

  // Check API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    logger.error("ANTHROPIC_API_KEY environment variable is not set.");
    logger.info("Set it in your shell:");
    logger.info('  export ANTHROPIC_API_KEY="sk-ant-..."');
    process.exit(1);
  }

  logger.title("AniUI — Generate Screen");
  logger.info(`Prompt: "${description}"`);
  logger.break();

  // Build system prompt
  const systemPrompt = await buildSystemPrompt();

  // Call Claude API
  let Anthropic: typeof import("@anthropic-ai/sdk").default;
  try {
    Anthropic = (await import("@anthropic-ai/sdk")).default;
  } catch {
    logger.error("@anthropic-ai/sdk is not installed.");
    logger.info("Install it to use the generate command:");
    logger.info("  npm install @anthropic-ai/sdk");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  logger.info("Generating with Claude...");

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: "user", content: description }],
  });

  // Extract code from response
  let code = "";
  for (const block of response.content) {
    if (block.type === "text") {
      code = block.text;
    }
  }

  // Extract code from markdown code block if present
  const codeBlockMatch = code.match(/```(?:tsx?)\n([\s\S]*?)```/);
  if (codeBlockMatch) {
    code = codeBlockMatch[1].trim();
  }

  if (!code) {
    logger.error("No code was generated. Try a different description.");
    process.exit(1);
  }

  // Show preview
  logger.break();
  logger.title("Generated Code:");
  logger.break();
  console.log(code);
  logger.break();

  // Determine output path
  let outputPath: string = opts.output ?? "";
  if (!outputPath) {
    const response = await prompts({
      type: "text",
      name: "path",
      message: "Save to (leave empty to skip):",
      initial: `app/${slugify(description)}.tsx`,
    });

    if (!response.path) {
      logger.info("Code not saved. Copy it from above.");
      return;
    }
    outputPath = response.path;
  }

  const fullPath = path.resolve(cwd, outputPath);
  await fs.ensureDir(path.dirname(fullPath));
  await fs.writeFile(fullPath, code, "utf-8");

  logger.break();
  logger.success(`Saved to ${path.relative(cwd, fullPath)}`);

  // Show token usage
  logger.info(
    `Tokens: ${response.usage.input_tokens} input, ${response.usage.output_tokens} output`
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}
