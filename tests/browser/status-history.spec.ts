import {test,expect} from '@playwright/test';
test('DEV logos and hourly detail support gaps, outage totals, keyboard and mobile',async({page})=>{
 const end=Date.UTC(2026,8,11,15),rows=Array.from({length:168},(_,i)=>({start:new Date(end-(167-i)*3600000).toISOString(),online:i===167?30:0,offline:i===166?30:0,maintenance:0,unknown:0}));
 await page.route('**/api/public/history',route=>route.fulfill({json:{available:true,updatedAt:new Date(end).toISOString(),sampledAt:new Date(end).toISOString(),stale:false,hours:168,services:{'prismatic-dev':rows}}}));
 await page.goto('http://127.0.0.1:4311');
 const prismatic=page.locator('article').filter({has:page.getByRole('heading',{name:'Prismatic DEV',exact:true})}),diamond=page.locator('article').filter({has:page.getByRole('heading',{name:'DiamondCrew DEV',exact:true})});
 await expect(prismatic.locator('img')).toHaveAttribute('src','/branding/prismatic.png');await expect(diamond.locator('img')).toHaveAttribute('src','/branding/dcrp.svg');
 await page.getByRole('button',{name:'Detail: Prismatic DEV',exact:true}).click();
 await expect(prismatic.locator('.history-bar')).toHaveCount(24);await expect(prismatic.locator('.history-uptime strong')).toHaveText('50.00 %');
 await prismatic.locator('.history-bar').last().focus();await page.keyboard.press('ArrowLeft');await expect(prismatic.locator('.history-selection')).toContainText('výpadek 30');
 await prismatic.getByLabel('Období').selectOption('168');await expect(prismatic.locator('.history-bar')).toHaveCount(168);
 await prismatic.locator('.history-bar').last().focus();await page.keyboard.press('Home');await expect(prismatic.locator('.history-selection')).toContainText('Bez dat');
 for(const width of [390,320]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.screenshot({path:'.artifacts/status-hourly-mobile.png',fullPage:true});
 await page.setViewportSize({width:1320,height:1000});await page.screenshot({path:'.artifacts/status-hourly-desktop.png',fullPage:true});
});
