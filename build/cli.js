"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const answer_choice_1 = require("./models/answer-choice");
const questions_1 = require("./questions");
const logger_util_1 = require("./utils/logger.util");
let CLI = class CLI {
    constructor(featureRequest, mergeRequest) {
        this.featureRequest = featureRequest;
        this.mergeRequest = mergeRequest;
        this.executeCLI();
    }
    async executeCLI() {
        (0, logger_util_1.showTitleAndBanner)();
        let providerAnswer = await (0, questions_1.providerQuestion)();
        if (providerAnswer.provider === answer_choice_1.ProviderValue.GITHUB) {
            return this.githubActions();
        }
        else if (providerAnswer.provider === answer_choice_1.ProviderValue.GITLAB) {
            return this.gitlabActions();
        }
    }
    async githubActions() {
        let githubAnswer = await (0, questions_1.githubFileQuestion)();
        if (githubAnswer.files === answer_choice_1.GithubChoiceValue.FEATURE_REQUEST) {
            return this.featureRequest.generateFile();
        }
    }
    async gitlabActions() {
        let gitlabAnswer = await (0, questions_1.githubFileQuestion)();
        if (gitlabAnswer.files === answer_choice_1.GitlabChoiceValue.MERGE_REQUEST) {
            return this.mergeRequest.generateFile();
        }
    }
};
CLI = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)('FeatureRequest')),
    tslib_1.__param(1, (0, inversify_1.inject)('MergeRequest'))
], CLI);
exports.CLI = CLI;
//
// clear();
// console.log(
//   chalk.green(figlet.textSync('hello cli', { horizontalLayout: 'full' }))
// );
// yargs(hideBin(process.argv))
//   // Use the commands directory to scaffold.
//   .commandDir('commands')
//   // Enable strict mode.
//   .strict()
//   // Useful aliases.
//   .alias({ h: 'help' }).argv;
