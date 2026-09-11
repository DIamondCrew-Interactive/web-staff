import {test,expect} from '@playwright/test';
test('access editor starts without grants and refresh discards stale permission forms',async({page,request})=>{
 const admin='111111111111111111',member='222222222222222222';let revision=1,grants=['image-service'];const saves:any[]=[];
 await page.route('**/admin/access',async route=>{if(route.request().resourceType()==='document')await route.fulfill({response:await request.get('http://127.0.0.1:4310/')});else await route.fallback();});
 await page.route('**/api/session',route=>route.fulfill({json:{authenticated:true,internalAccess:true,adminAccess:true,accessManaged:true,loginAvailable:true,user:{username:'Fixture admin',avatarUrl:'/diamondcrew-logo.png'},csrfToken:'fixture-csrf'}}));
 await page.route('**/api/admin/access',route=>route.fulfill({json:{revision,actorId:admin,services:['cookbook','servercontroller','proxymanager','image-service'],audit:[],users:[{id:admin,displayName:'Admin',active:true,admin:true,grants:[],epoch:1},{id:member,displayName:'CDN kolega',active:true,admin:false,grants,epoch:1}]}}));
 await page.route('**/api/admin/access/users/*',async route=>{saves.push(route.request().postDataJSON());await route.fulfill({json:{revision:++revision}});});
 await page.goto('http://127.0.0.1:4310/admin/access');
 await expect(page.getByRole('heading',{name:'Uživatelé a přístupy'})).toBeVisible();
 await expect(page.getByRole('checkbox',{name:'Image Service — správa médií'})).not.toBeChecked();await expect(page.getByRole('checkbox',{name:'Správce uživatelů a přístupů ve Staff'})).not.toBeChecked();
 await page.getByRole('button',{name:/CDN kolega/}).click();await expect(page.getByRole('checkbox',{name:'Image Service — správa médií'})).toBeChecked();
 revision=2;grants=[];await page.getByRole('button',{name:'Obnovit a zahodit formulář'}).click();
 await expect(page.getByLabel('Discord User ID')).toHaveValue('');await expect(page.getByRole('button',{name:'Uložit profil a přístupy'})).toBeDisabled();
 await page.getByRole('button',{name:/CDN kolega/}).click();await expect(page.getByRole('checkbox',{name:'Image Service — správa médií'})).not.toBeChecked();
 await page.getByLabel('Název profilu').fill('Kolega po kontrole');await page.getByRole('button',{name:'Uložit profil a přístupy'}).click();
 await expect(page.getByRole('status')).toContainText('uloženy');expect(saves[0].expectedRevision).toBe(2);expect(saves[0].grants).toEqual([]);
 await page.getByRole('button',{name:'Nový profil'}).click();await page.getByLabel('Discord User ID').fill(member);await expect(page.getByRole('button',{name:'Uložit profil a přístupy'})).toBeDisabled();await page.getByLabel('Discord User ID').fill('333333333333333333');await page.getByRole('checkbox',{name:'Image Service — správa médií'}).check();await page.getByRole('button',{name:'Uložit profil a přístupy'}).click();
 await expect.poll(()=>saves.length).toBe(2);expect(saves[1].grants).toEqual(['image-service']);expect(saves[1].admin).toBe(false);
 for(const width of [390,320]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.screenshot({path:'.artifacts/access-admin-mobile.png',fullPage:true});
});
