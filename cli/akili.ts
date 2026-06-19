// cli/akili.ts — the Akili command-line interface.
//
// Akili (Laetoli's sovereign Swahili AI) in the terminal and in scripts — not
// just the browser. Pure Node built-ins (readline, process); the sovereign
// engine + @laetoli/snil are bundled in at build time, so it runs fully offline.
//
//   akili "swali lako"      one-shot: route + print a clean terminal answer
//   akili                   REPL: ask, answer, loop (Ctrl-D / "toka" to exit)
//   akili --json "..."      print the raw AkiliAnswer JSON (for scripting)
//   akili --help            this help
//   akili --toleo           version
//
// The engine is consumed read-only via src/node.ts (which re-exports src/akili).

import * as readline from 'node:readline';
import { askAkili, createAkili, createAkiliSession, defaultExperts } from '../src/node';
import type { AkiliAnswer } from '../src/akili/types';
import { ERROR_SW, renderAnswer, shouldUseColor } from './format';

const VERSION = '0.1.0';

interface Cli {
  help: boolean;
  version: boolean;
  json: boolean;
  query: string;
}

/** Parse argv (already sliced past node + script) into flags + a query. */
export function parseArgs(argv: string[]): Cli {
  const cli: Cli = { help: false, version: false, json: false, query: '' };
  const rest: string[] = [];
  for (const a of argv) {
    if (a === '--help' || a === '-h' || a === 'msaada') cli.help = true;
    else if (a === '--toleo' || a === '--version' || a === '-v') cli.version = true;
    else if (a === '--json') cli.json = true;
    else rest.push(a);
  }
  cli.query = rest.join(' ').trim();
  return cli;
}

const HELP = `Akili — AI huru ya Kiswahili ya Laetoli (sovereign Swahili AI)

Matumizi / Usage:
  akili "swali lako"        Uliza swali moja, pata jibu (one-shot)
  akili                     Anza mazungumzo (REPL); "toka" au Ctrl-D kutoka
  akili --json "swali"      Toa jibu kamili kama JSON (kwa script)
  akili --help | msaada     Onyesha msaada huu
  akili --toleo | --version Onyesha toleo

Mifano / Examples:
  akili "dalili za malaria ni zipi"
  akili "kokotoa wastani wa 10, 20, 30"
  akili --json "kokotoa 2 + 3"

Bila mtandao kabisa — sovereign, offline. Hupanga swali lako kwa mtaalamu
husika (afya, fasihi, lugha, sheria, kilimo, elimu, biashara, SNIL, jumla).`;

/** Print one answer to stdout in the chosen mode. */
function emit(ans: AkiliAnswer, json: boolean, color: boolean): void {
  if (json) {
    process.stdout.write(JSON.stringify(ans, null, 2) + '\n');
  } else {
    process.stdout.write(renderAnswer(ans, color) + '\n');
  }
}

/** One-shot: answer a single query then resolve. */
async function runOnce(query: string, json: boolean, color: boolean): Promise<void> {
  try {
    const ans = await askAkili(query);
    emit(ans, json, color);
  } catch {
    process.stdout.write((json ? JSON.stringify({ error: ERROR_SW }) : ERROR_SW) + '\n');
    process.exitCode = 1;
  }
}

/** REPL: a context-aware session loop over stdin. */
function runRepl(json: boolean, color: boolean): Promise<void> {
  return new Promise((resolve) => {
    const session = createAkiliSession(createAkili(defaultExperts));
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: color ? '\x1b[1;36makili›\x1b[0m ' : 'akili> ',
    });

    if (!json) {
      process.stdout.write(
        'Akili — mazungumzo. Andika swali kisha Enter. "toka" au Ctrl-D kuondoka.\n\n',
      );
    }
    rl.prompt();

    rl.on('line', (raw) => {
      const line = raw.trim();
      if (line === '') {
        rl.prompt();
        return;
      }
      if (line === 'toka' || line === 'exit' || line === 'quit') {
        rl.close();
        return;
      }
      rl.pause();
      session
        .ask(line)
        .then((ans) => emit(ans, json, color))
        .catch(() => process.stdout.write(ERROR_SW + '\n'))
        .finally(() => {
          if (!json) process.stdout.write('\n');
          rl.resume();
          rl.prompt();
        });
    });

    rl.on('close', () => {
      if (!json) process.stdout.write('\nKwaheri.\n');
      resolve();
    });
  });
}

export async function main(argv: string[]): Promise<void> {
  const cli = parseArgs(argv);
  const color = shouldUseColor({ isTTY: !!process.stdout.isTTY, env: process.env });

  if (cli.help) {
    process.stdout.write(HELP + '\n');
    return;
  }
  if (cli.version) {
    process.stdout.write(`akili ${VERSION}\n`);
    return;
  }
  if (cli.query) {
    await runOnce(cli.query, cli.json, color);
    return;
  }
  await runRepl(cli.json, color);
}

main(process.argv.slice(2));
