#!/usr/bin/env node
// Use the active calendar so FDE renders honor live dates and published state.
process.argv.push('--pillar=FDE Interview Series');
require('./render-upcoming-doodles');
