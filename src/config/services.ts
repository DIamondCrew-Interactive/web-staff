import type { Service } from '../shared/types.js';
export const services: Service[] = [
  { id: 'manager', name: 'DiamondCrew Server Manager', description: 'Správa herních serverů', url: 'https://panel.diamondcrew.net', enabled: true, status: 'OPERATIONAL', category: 'management', icon: 'panel', visual: 'datacenter' },
  { id: 'controller', name: 'DiamondCrew Server Controller', description: 'Rychlé ovládání a konzole', url: 'https://admin.diamondcrew.net', enabled: true, status: 'OPERATIONAL', category: 'management', icon: 'game', visual: 'console' },
  { id: 'proxy', name: 'DiamondCrew Proxy Manager', description: 'Správa proxy a HTTPS', url: 'https://proxy.diamondcrew.net', enabled: false, status: 'IN PROGRESS', category: 'management', icon: 'network', visual: 'network' },
  { id: 'prismatic-prod', name: 'Prismatic Roleplay', description: 'Hlavní produkční server', url: 'https://tx.pmrp.cz', enabled: false, status: 'IN PROGRESS', category: 'roleplay', icon: 'game', project: 'Prismatic', environment: 'PROD', logo: '/branding/prismatic.png', visual: 'sunset' },
  { id: 'prismatic-dev', name: 'Prismatic Roleplay DEV', description: 'Vývojový server', url: 'https://tx-dev.pmrp.cz', enabled: true, status: 'OPERATIONAL', category: 'roleplay', icon: 'game', project: 'Prismatic', environment: 'DEV', logo: '/branding/prismatic.png', visual: 'night' },
  { id: 'diamond-prod', name: 'DiamondCrew Roleplay', description: 'Hlavní produkční server', url: 'https://tx.dcrp.cz', enabled: false, status: 'IN PROGRESS', category: 'roleplay', icon: 'game', project: 'DiamondCrew', environment: 'PROD', logo: '/branding/dcrp.svg', visual: 'sunset' },
  { id: 'diamond-dev', name: 'DiamondCrew Roleplay DEV', description: 'Vývojový server', url: 'https://tx-dev.dcrp.cz', enabled: false, status: 'IN PROGRESS', category: 'roleplay', icon: 'game', project: 'DiamondCrew', environment: 'DEV', logo: '/branding/dcrp.svg', visual: 'night' },
  { id: 'status', name: 'Services Status', description: 'Stav všech služeb', url: 'https://status.diamondcrew.net', enabled: true, status: 'OPERATIONAL', category: 'management', icon: 'status', visual: 'heartbeat' },
];
export const infrastructureServices: Service[] = [
  // Existing delivery root responds; new management remains unverified and cannot launch.
  { id: 'images', name: 'DiamondCrew Image Service', description: 'Images & static asset delivery', url: 'https://img.dcrp.cz/manage', enabled: false, status: 'IN PROGRESS', category: 'infrastructure', icon: 'image' },
];
