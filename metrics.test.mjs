import {test} from 'node:test';import assert from 'node:assert/strict';import {metrics} from './server.mjs';
test('reports plausible real OS measurements',()=>{const d=metrics();assert.ok(d.cpu>=0&&d.cpu<=100);assert.ok(d.memory.total>0);assert.ok(d.memory.used>=0&&d.memory.used<=d.memory.total);assert.ok(d.cores>0);assert.ok(d.uptime>=0);if(d.disk)assert.ok(d.disk.available<=d.disk.total)});
