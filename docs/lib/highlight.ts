import { codeToHtml, type BundledLanguage, type BundledTheme } from "shiki";

const lightTheme: BundledTheme = "github-light";
const darkTheme: BundledTheme = "github-dark";

export async function highlight(
  code: string,
  lang: BundledLanguage = "tsx"
): Promise<string> {
  return codeToHtml(code, {
    lang,
    themes: { light: lightTheme, dark: darkTheme },
    defaultColor: false,
  });
}
