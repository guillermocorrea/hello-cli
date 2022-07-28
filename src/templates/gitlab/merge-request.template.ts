import { GitlabPath } from '../../models/path';
import { FileName } from '../../models/filename';
import { DefaultTemplate } from '../default/default.template';
import { inject, injectable } from 'inversify';

@injectable()
export class MergeRequest {
  private fileName = FileName.MERGE_REQUEST;
  private filePath = GitlabPath.MERGE_REQUEST_TEMPLATE;
  private hasPath = true;

  constructor(
    @inject('DefaultTemplate') private defaultTemplate: DefaultTemplate
  ) {}

  public generateFile(): void {
    this.defaultTemplate.generateFile(
      this.fileName,
      this.fileContent(),
      this.hasPath,
      this.filePath
    );
  }

  private fileContent(): string {
    return `# What does this implement/fix? Explain your changes.
…
## Does this close any currently open issues?
…
## Any relevant logs, error output, etc?
(Please put this in a code block, so it is more readable for reviewers )
## Any other comments?
...
## Where has this been tested?
**Browsers:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] IE 11
- [ ] Edge
- [ ] Opera
        `;
  }
}
