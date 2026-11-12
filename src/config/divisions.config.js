export const divisionRegistry = [
  {
    key: 'buildingsFactories',
    slug: 'buildings-factories',
    anchor: 'buildings-factories',
    labelKey: 'nav.buildingsFactories',
    aliases: [
      '/division/building-factories',
      '/division/buildings-factories',
      '/divisions/building-factories',
    ],
  },
  {
    key: 'powerSolutions',
    slug: 'power-solutions',
    anchor: 'power-solutions',
    labelKey: 'nav.powerSolutions',
    aliases: [
      '/division/power-solutions',
      '/division/power-generation',
      '/division/power-generation-hybrid-solutions',
    ],
  },
  {
    key: 'dataCenter',
    slug: 'data-center',
    anchor: 'data-center',
    labelKey: 'nav.dataCenter',
    aliases: [
      '/division/data-center',
      '/division/data-centre',
      '/division/data-center-telecom',
    ],
  },
  {
    key: 'oilGas',
    slug: 'oil-gas',
    anchor: 'oil-gas',
    labelKey: 'nav.oilGas',
    aliases: [
      '/division/oil-gas',
      '/division/oil-and-gas',
      '/division/oil-gas-processing-solutions',
    ],
  },
]

export const divisionNavigationChildren = divisionRegistry.map(({ labelKey, slug }) => ({
  labelKey,
  href: `/divisions/${slug}`,
}))

export const divisionSectionTargets = Object.fromEntries(
  divisionRegistry.flatMap(({ slug, anchor, aliases = [] }) => {
    const target = `/divisions#${anchor}`
    return [
      [`/divisions/${slug}`, target],
      ...aliases.map((alias) => [alias, target]),
    ]
  }),
)
