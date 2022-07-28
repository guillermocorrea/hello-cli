import fs from 'fs-extra';
import path from 'path';
import { injectable } from 'inversify';

@injectable()
export class DefaultTemplate {
  constructor() {}

  public generateFile(
    nameOfFileWithExtensions: string,
    fileContent: string,
    hasPath = false,
    pathOfFile = ''
  ): void {
    this.createFile(pathOfFile, nameOfFileWithExtensions, fileContent);
  }

  private async createFile(
    pathOfFile: string,
    fileName: string,
    fileContent: string
  ): Promise<void> {
    const dirPath = path.join(process.cwd(), pathOfFile);
    await fs.ensureDir(dirPath);
    const filePath = path.join(dirPath, fileName);
    fs.writeFile(filePath, fileContent, (error) => {
      if (!error) {
        console.log(`File created: ${fileName}`);
      } else {
        console.error(`File error: ${fileName}`, error);
      }
    });
  }
}
