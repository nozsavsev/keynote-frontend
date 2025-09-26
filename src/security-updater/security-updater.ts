import * as fs from "fs";
import * as path from "path";
//@ts-ignore
import { SecurityDescriptorType } from "./generatedTypes/KeynotePaths.ts";

async function loadObject(): Promise<SecurityDescriptorType> {
  //@ts-ignore
  const _module = require("./generatedTypes/KeynotePaths.ts");
  return _module.SecurityDescriptor;
}

async function listFilesRecursively(dir: string): Promise<string[]> {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const filesAndDirs: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      filesAndDirs.push(
        fullPath
          .replaceAll(".tsx", "")
          .replaceAll(".jsx", "")
          .replaceAll(".ts", "")
          .replaceAll(".js", "")
          .replaceAll("\\\\", "\\")
          .replaceAll("pages\\", "")
          .replaceAll("\\", "/"),
      );
      const subDirEntries = await listFilesRecursively(fullPath);
      filesAndDirs.push(...subDirEntries);
    } else {
      filesAndDirs.push(
        fullPath
          .replaceAll(".tsx", "")
          .replaceAll(".jsx", "")
          .replaceAll(".ts", "")
          .replaceAll(".js", "")
          .replaceAll("\\\\", "\\")
          .replaceAll("pages\\", "")
          .replaceAll("\\", "/"),
      );
    }
  }

  return filesAndDirs;
}

(async () => {
  const dir = "../pages";

  const filesAndDirs = (await listFilesRecursively(dir))
    .filter((fod) => fod !== "_app" && !fod.startsWith("api") && !fod.endsWith("/index"))
    .map((fod) => `/${fod}`)
    .map((fod) => fod.replace("/..", ""));

  filesAndDirs.unshift("/");

  const tsGeneratedType = `export type KeynotePaths = 
  | ${filesAndDirs.map((fod) => `'${fod}'`).join("\n  | ")};`;

  const secDesk = await loadObject().catch((e) => {
    console.error(e);
  });

  const tsGeneratedObjectType = `                                                                         
                                                
export type PageAccessRuleType = 
  | 'AnyAdmin'
  | 'AnyAuthenticated'
  | 'RequireVerifiedEmail'
  | 'PrAdminManageKeynotes'
  | 'PrUploadFiles'

export type SecurityDescriptorType = { [K in KeynotePaths]: PageAccessRuleType[]; };
`;

  const tsGeneratedObject = `export const SecurityDescriptor: SecurityDescriptorType = {
  ${filesAndDirs.map((fod) => `'${fod}': [${secDesk?.[fod as keyof SecurityDescriptorType]?.map((rule: any) => `'${rule}' `) || ""}],`).join("\n  ")}
}
`;

  fs.mkdirSync("./generatedTypes", { recursive: true });
  fs.writeFileSync("./generatedTypes/KeynotePaths.ts", tsGeneratedObject + tsGeneratedType + tsGeneratedObjectType);
})();
