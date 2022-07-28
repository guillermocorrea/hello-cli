import { GithubPath } from '../../models/path';
import { FileName } from '../../models/filename';
import { DefaultTemplate } from '../default/default.template';
import { inject, injectable } from 'inversify';

@injectable()
export class FeatureRequest {
  private fileName = FileName.FEATURE_REQUEST;
  private filePath = GithubPath.ISSUE_TEMPLATE;
  private hasPath = true;

  constructor(
    @inject('DefaultTemplate') private defaultTemplate: DefaultTemplate
  ) {}

  public generateFile(): void {
    return this.defaultTemplate.generateFile(
      this.fileName,
      this.fileContent(),
      this.hasPath,
      this.filePath
    );
  }

  private fileContent = (): string => {
    return `---
name: Feature request
about: Suggest an idea for this project
title: ''
labels: ''
assignees: ''
---
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]
**Describe the solution you'd like**
A clear and concise description of what you want to happen.
**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.
**Additional context**
Add any other context or screenshots about the feature request here.
        `;
  };
}
