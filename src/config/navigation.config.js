import { divisionNavigationChildren } from './divisions.config.js'

export const navigation = [
  { labelKey: 'nav.home', href: '/' },
  {
    labelKey: 'nav.about',
    href: '/about',
    children: [
      { labelKey: 'nav.profile', href: '/about/profile' },
      { labelKey: 'nav.history', href: '/about/history' },
      { labelKey: 'nav.missionVision', href: '/about/mission-vision' },
    ],
  },
  {
    labelKey: 'nav.corporate',
    href: '/corporate',
    children: [
      { labelKey: 'nav.solutionProvider', href: '/corporate/solution-provider' },
      { labelKey: 'nav.hse', href: '/corporate/hse' },
      { labelKey: 'nav.qmsIso', href: '/corporate/qms-iso' },
      { labelKey: 'nav.csr', href: '/corporate/csr' },
    ],
  },
  {
    labelKey: 'nav.divisions',
    href: '/divisions',
    children: divisionNavigationChildren,
  },
  { labelKey: 'nav.renewableEnergy', href: '/renewable-energy' },
  { labelKey: 'nav.projects', href: '/projects' },
  { labelKey: 'nav.facilityManagement', href: '/facility-management' },
  { labelKey: 'nav.contact', href: '/contact', variant: 'cta' },
]
