import { cac } from 'cac';
import { colors, consola } from '@repo/node-utils';
import { defineLintCommand } from './lint';

try {
  const vsh = cac('vsh');

  // vsh lint
  defineLintCommand(vsh);

  vsh.on('command:*', () => {
    consola.error(colors.red('Invalid command!'));
    process.exit(1);
  });
} catch (error) {
  consola.error(error);
  process.exit(1);
}
