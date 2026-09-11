import {useEffect,useRef,useState} from 'react';
import type {StatusHistory as HistoryData,HistoryHour} from '../shared/status-history';

function description(hour:HistoryHour) {
  const total=hour.online+hour.offline+hour.maintenance+hour.unknown,known=hour.online+hour.offline;
  return `${new Date(hour.start).toLocaleString('cs-CZ',{timeZone:'Europe/Prague',day:'numeric',month:'numeric',hour:'2-digit',minute:'2-digit',timeZoneName:'short'})} · ${total?`${total} měření; online ${hour.online}, výpadek ${hour.offline}, údržba ${hour.maintenance}, neznámý ${hour.unknown}`:'Bez dat'}${known?` · dostupnost ${(hour.online/known*100).toFixed(2)} %`:''}`;
}
export function StatusHistory({history,id,error}:{history:HistoryData|null;id:string;error:boolean}) {
  const [period,setPeriod]=useState(24),[selected,setSelected]=useState<string|null>(null);
  const scroll=useRef<HTMLDivElement>(null);
  useEffect(()=>{if(scroll.current)scroll.current.scrollLeft=scroll.current.scrollWidth;},[period,history?.available]);
  if(error||!history?.available)return <p>Historie zatím není dostupná. Záznam začne po zapnutí sběru měření.</p>;
  const rows=(history.services[id]||[]).slice(-period),online=rows.reduce((n,r)=>n+r.online,0),known=rows.reduce((n,r)=>n+r.online+r.offline,0);
  const detail=rows.find(r=>r.start===selected);
  return <section className="hourly-history" aria-label="Hodinová historie dostupnosti">
    <div className="history-heading"><strong>Historie po hodinách</strong><label>Období <select value={period} onChange={e=>{setPeriod(Number(e.target.value));setSelected(null);}}><option value={24}>24 hodin</option><option value={168}>7 dní</option></select></label></div>
    <div className="history-uptime"><strong>{known?`${(online/known*100).toFixed(2)} %`:'—'}</strong><span>dostupnost ze známých měření</span></div>
    <div className="history-scroll" ref={scroll}><div className="history-bars" style={{gridTemplateColumns:`repeat(${rows.length},minmax(0,1fr))`}}>{rows.map(row=>{const state=row.offline?(row.online?'mixed':'offline'):row.maintenance?'maintenance':row.online?'online':'unknown';return <button type="button" key={row.start} className={`history-bar history-${state}`} tabIndex={selected===row.start||(!selected&&row===rows.at(-1))?0:-1} onKeyDown={e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const buttons=Array.from(e.currentTarget.parentElement!.querySelectorAll('button'));const index=buttons.indexOf(e.currentTarget);buttons[e.key==="Home"?0:e.key==="End"?buttons.length-1:Math.max(0,Math.min(buttons.length-1,index+(e.key==="ArrowRight"?1:-1)))]?.focus();}} aria-label={description(row)} title={description(row)} aria-pressed={selected===row.start} onFocus={()=>setSelected(row.start)} onClick={()=>setSelected(row.start)}/>;})}</div></div>
    <div className="history-axis"><span>{rows[0]?new Date(rows[0].start).toLocaleString('cs-CZ',{timeZone:'Europe/Prague',day:'numeric',month:'numeric',hour:'2-digit',minute:'2-digit'}):'—'}</span><span>Aktuální hodina</span></div>
    <p className="history-selection" aria-live="polite">{detail?description(detail):'Vyber sloupec pro detail hodiny. Klávesnice: šipky vlevo/vpravo, Home/End. Časy jsou v pásmu Europe/Prague.'}</p>
    <p>Poslední měření: {history.sampledAt?new Date(history.sampledAt).toLocaleString('cs-CZ'):'zatím žádné'}.{history.stale&&' Sběr zatím neprobíhá nebo jsou měření zastaralá.'}</p><p className="history-legend"><span>🟢 Online</span><span>🔴 Výpadek</span><span>🟠 Částečný výpadek</span><span>🟣 Údržba</span><span>⚪ Neznámý / bez dat</span></p>
    <p>Jeden sloupec = jedna hodina, kontrola přibližně každou minutu. Neznámé stavy, údržba a chybějící měření se do procenta nepočítají. Probíhající hodina není úplná.</p>
  </section>;
}
