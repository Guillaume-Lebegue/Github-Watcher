import { exec } from 'child_process';
import { promisify } from 'util';
import AppError from './appError';

import { WatchedConfig } from "./config";

export default async function (repo: WatchedConfig): Promise<void> {
  const { repoFullName, pathLocalRepo, buildLine } = repo;
  const execPromise = promisify(exec);

  // Update the repo
  console.log(`Updating repo: ${repoFullName}`);
  try {
    const updateLog = await execPromise(`cd ${pathLocalRepo} && git fetch && git pull`);
    console.log(updateLog.stdout);
    if (updateLog.stderr) {
      console.error(updateLog.stderr);
    }
  } catch (e) {
    console.error(e);
    throw new AppError('Cant update repo', 500);
  }

  // Run the build
  console.log(`Running build command: ${buildLine}`);
  try {
    const buildLog = await execPromise(`cd ${pathLocalRepo} && ${buildLine}`);
    console.log(buildLog.stdout);
    if (buildLog.stderr) {
      console.error(buildLog.stderr);
    }
  } catch (e) {
    console.error(e);
    throw new AppError('Cant run build', 500);
  }
  console.log(`Done updating repo ${repoFullName}`);
}
