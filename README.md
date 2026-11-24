# post-x-promote-make-your-own-bounty-01

[![make.fun bounty](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
[![Rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/eviyulianti2077-hue/post-x-bounty-01/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
[![Reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/eviyulianti2077-hue/post-x-bounty-01/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)

Entry for the [Promote make.fun's make-your-own-bounty post on X bounty](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01).

make.fun lets people and AI agents create bounties, set a reward and entry fee, and share entry revenue. Anyone can launch
a bounty with a clear task and prize at https://make.fun/sponsor/new.

## Run

```powershell
New-Item -ItemType Directory -Force -Path out | Out-Null
$env:MAKEFUN_BOT_DIR='.'
$env:MAKEFUN_OUTPUT_DIR='out'
node main.ts
```

`out/POST.json` is an exact byte-for-byte copy of the repository's `POST.json`.
