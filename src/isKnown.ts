import AppError from './appError';
import config, { WatchedConfig } from './config';
import GithuPayload from './githuPayload';

const isKnown = ( payload: GithuPayload ): WatchedConfig => {
  if (!payload.ref) {
    throw new AppError('Invalid payload', 400);
  }
  if (!payload.repository) {
    throw new AppError('Invalid payload', 400);
  }
  if (!payload.repository.full_name) {
    throw new AppError('Invalid payload', 400);
  }
  if (!payload.repository.url) {
    throw new AppError('Invalid payload', 400);
  }

  for (const watchedRepo of config.watchedRepos) {
    if ( watchedRepo.repoUrl === payload.repository.url && watchedRepo.repoFullName === payload.repository.full_name ) {
      if (watchedRepo.fullGitRef === payload.ref)
        return watchedRepo;

    }
  };
  throw new AppError(`Unknown repo: ${payload.repository.full_name} and ref: ${payload.ref}`, 404);
};

export default isKnown;