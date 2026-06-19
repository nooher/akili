// examples/consume.mjs — proves Akili's engine works as a standalone library.
//
// This imports the BUILT artifact (pkg/index.js) exactly as a `github:nooher/akili`
// consumer would via the `akili/engine` subpath export, and runs two queries that
// exercise two different experts (SNIL compute + Afya/TibaAI health). It uses only
// what's in this repo — @laetoli/snil is bundled into pkg/index.js, so no other
// install is needed. Run:  node examples/consume.mjs
//
// (Consumers write:  import { askAkili } from 'akili/engine';  — same surface.)

import { askAkili } from '../pkg/index.js';

const line = (s) => console.log(s);

line('=== Akili engine as a library ===\n');

// 1) SNIL compute: math → SNIL code → execution
const math = await askAkili('kokotoa 2 + 3');
line('Q: kokotoa 2 + 3');
line(`  domain     : ${math.domain}`);
line(`  expert     : ${math.expert}`);
line(`  snil.code  : ${math.snil ? math.snil.code : '(none)'}`);
line(`  snil.output: ${math.snil ? math.snil.output : '(none)'}`);
line(`  text.sw    : ${math.text.sw.replace(/\n+/g, ' ')}`);
line('');

// 2) Afya / TibaAI: malaria symptoms
const afya = await askAkili('dalili za malaria');
line('Q: dalili za malaria');
line(`  domain     : ${afya.domain}`);
line(`  expert     : ${afya.expert}`);
line(`  confidence : ${afya.confidence}`);
line(`  sources    : ${(afya.sources ?? []).map((s) => s.label).join(', ')}`);
line(`  text.sw    : ${afya.text.sw.slice(0, 160).replace(/\n+/g, ' ')}...`);
line('');

line('=== OK: package is Node-importable and routes to experts ===');
