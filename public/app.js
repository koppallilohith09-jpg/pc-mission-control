import {$,notify,bytes,request} from './common.js';
let paused=false,busy=false;const history=[];
function bar(id,value){$(id).style.width=Math.max(0,Math.min(100,value))+'%'}
function chart(){
 const c=$('#history'),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);x.strokeStyle='#75e7f7';x.lineWidth=2;x.beginPath();
 history.forEach((n,i)=>{const a=i/(history.length-1||1)*c.width,b=c.height-n/100*(c.height-10);i?x.lineTo(a,b):x.moveTo(a,b)});x.stroke();
}
async function tick(){
 if(paused||busy)return;busy=true;
 try{
  const d=await request('/api/metrics');$('#machine').textContent=d.platform.toUpperCase()+' / '+d.cores+' LOGICAL CORES';
  $('#sample-time').textContent='Updated '+new Date().toLocaleTimeString();$('#cpu').textContent=d.cpu.toFixed(1)+'%';bar('#cpu-bar',d.cpu);
  history.push(d.cpu);if(history.length>60)history.shift();chart();
  const ram=d.memory.used/d.memory.total*100;$('#ram').textContent=ram.toFixed(1)+'%';bar('#ram-bar',ram);$('#ram-detail').textContent=bytes(d.memory.used)+' of '+bytes(d.memory.total);
  if(d.disk){const used=d.disk.total-d.disk.available;$('#disk').textContent=(used/d.disk.total*100).toFixed(1)+'%';bar('#disk-bar',used/d.disk.total*100);$('#disk-detail').textContent=bytes(d.disk.available)+' available of '+bytes(d.disk.total)}
  if(d.network.available){$('#network').textContent='↓ '+bytes(d.network.receivedPerSecond)+'/s';$('#network-detail').textContent='Upload ↑ '+bytes(d.network.sentPerSecond)+'/s'}
  else{$('#network').textContent='Unavailable';$('#network-detail').textContent=d.network.reason}
  $('#uptime').textContent=Math.floor(d.uptime/86400)+'d '+Math.floor(d.uptime%86400/3600)+'h '+Math.floor(d.uptime%3600/60)+'m';notify('');
 }catch(e){notify(e.message)}finally{busy=false}
}
$('#pause').onclick=()=>{paused=!paused;$('#pause').textContent=paused?'Resume readings':'Pause readings';if(!paused)tick()};tick();setInterval(tick,2000);
