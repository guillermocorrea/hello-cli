import { inject, injectable } from 'inversify';
import {
  Answer,
  GithubChoiceValue,
  GitlabChoiceValue,
  ProviderValue,
} from './models/answer-choice';

import { githubFileQuestion, providerQuestion } from './questions';
import { showTitleAndBanner } from './utils/logger.util';
import { FeatureRequest } from './templates/github/feature-request.template';
import { MergeRequest } from './templates/gitlab/merge-request.template';

@injectable()
export class CLI {
  constructor(
    @inject('FeatureRequest') private featureRequest: FeatureRequest,
    @inject('MergeRequest') private mergeRequest: MergeRequest
  ) {
    this.executeCLI();
  }

  private async executeCLI() {
    showTitleAndBanner();
    let providerAnswer: Answer = await providerQuestion();

    if (providerAnswer.provider === ProviderValue.GITHUB) {
      return this.githubActions();
    } else if (providerAnswer.provider === ProviderValue.GITLAB) {
      return this.gitlabActions();
    }
  }

  private async githubActions() {
    let githubAnswer: Answer = await githubFileQuestion();
    if (githubAnswer.files === GithubChoiceValue.FEATURE_REQUEST) {
      return this.featureRequest.generateFile();
    }
  }

  private async gitlabActions() {
    let gitlabAnswer: Answer = await githubFileQuestion();
    if (gitlabAnswer.files === GitlabChoiceValue.MERGE_REQUEST) {
      return this.mergeRequest.generateFile();
    }
  }
}
