import type { Linter } from 'eslint';
import { prettier, vue } from './configs';

type FlatConfig = Linter.Config;

type FlatConfigPromise =
  | FlatConfig
  | FlatConfig[]
  | Promise<FlatConfig>
  | Promise<FlatConfig[]>;

async function defineConfig(config: FlatConfig[] = []) {
  const configs: FlatConfigPromise[] = [vue(), prettier(), ...config];

  const resolved = await Promise.all(configs);
  return resolved.flat();
}

export { defineConfig };
