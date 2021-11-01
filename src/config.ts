import config from '../config.json';

export interface WatchedConfig {
  secret: string;
  repoFullName: string;
  repoUrl: string;
  fullGitRef: string;
  pathLocalRepo: string;
  buildLine: string;
}

export interface Config {
  port: number;
  watchedRepos: WatchedConfig[];
}

export default config as Config;