export const divisionsContent = {
  seo: {
    title: 'Engineering Divisions',
    description: 'Explore Lambert Electromec divisions across buildings and factories, power and hybrid solutions, data centres and telecoms, and oil and gas processing solutions.',
  },
  pageHeader: {
    eyebrow: 'Specialist delivery divisions',
    title: 'Divisions',
    description: 'Integrated engineering capability organised around the infrastructure systems that keep cities, industries and critical facilities operating.',
    imageKey: 'Slider-6',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Divisions' },
    ],
    menuLabel: 'Division page navigation',
    menuItems: [
      {
        label: 'Buildings & Factories',
        href: '/divisions#buildings-factories',
        targetId: 'buildings-factories',
        activePaths: ['/divisions'],
      },
      {
        label: 'Power Solutions',
        href: '/divisions#power-solutions',
        targetId: 'power-solutions',
      },
      {
        label: 'Data Centre',
        href: '/divisions#data-center',
        targetId: 'data-center',
      },
      {
        label: 'Oil & Gas',
        href: '/divisions#oil-gas',
        targetId: 'oil-gas',
      },
    ],
    meta: {
      label: 'Integrated capability',
      value: 'Buildings. Power. Data. Processing.',
    },
  },

  buildingsFactories: {
    eyebrow: 'Buildings & Factories',
    title: 'Buildings & Factories',
    intro: 'The buildings and factories arm of Lambert Electromec consists of Electrical and Mechanical Engineering works, services, and installations.',
    imageKey: 'Slider-2',
    secondaryImageKey: 'Slider-1',
    visualLabel: 'Complete building systems',
    visualValue: 'Electrical, Mechanical and Fit-Out execution',
    electrical: {
      eyebrow: 'Electrical Engineering',
      title: 'Electrical Engineering',
      intro: 'Lambert Electromec has over the years developed its electrical engineering arm into a veritable industry source noted for excellence in low, medium and high voltage installations.',
      supportingText: 'A history of solid and robust expertise in providing comprehensive in-house technical and management services in the following fields:',
      groups: [
        {
          title: 'High & Medium Voltage',
          icon: 'highVoltage',
          items: [
            'Gas Turbines and Power generation, transmission and distribution',
            'Generators, Transformers and Synchronization.',
            'Power Sub-stations and distribution.',
            'Metering and Utility connection.',
          ],
        },
        {
          title: 'Low Voltage',
          icon: 'lowVoltage',
          items: [
            'Panelboards: Main distribution Boards, Submain distribution boards, Motor control center, capacitor bank',
            'Synchronizing panel, Change Over Switch (Automatic & Mechanical).',
            'Bus Duct Riser',
            'Lighting, Switching Devices & Lighting Control System',
            'Surge, Earthing and Lightning protection',
            'Uninterruptible Power Supply (UPS) and AVR',
            'Cable Management System Including Raised Floor Solutions',
          ],
        },
        {
          title: 'Extra Low Voltage',
          icon: 'extraLowVoltage',
          columns: 2,
          items: [
            'Building Management Systems',
            'Parking Management Systems',
            'Fire Alarm Systems',
            'Closed Circuit Television Systems',
            'Access Control Systems',
            'Burglar Alarm',
            'Public Address Systems',
            'Audio Visual Systems',
            'Video Door Entry Systems',
            'Conference Halls Systems',
            'Data & PABX Systems',
            'Electrical Fence',
            'Intruder Alarm System',
            'Disabled Alarm System',
          ],
        },
      ],
    },
    mechanical: {
      eyebrow: 'Mechanical Engineering',
      title: 'Mechanical Engineering',
      intro: "As a Top Mechanical Electrical and Plumbing (MEP) firm, Lambert Electromec works at the heart of our customers' needs. We provide cutting-edge Mechanical engineering services based on our expertise in numerous areas.",
      piped: {
        title: 'Piped Services',
        icon: 'piped',
        items: [
          'Potable water, sewage, drainage, and waste distribution networks.',
          'Swimming pools and water features.',
          'Sewage and water treatment plants and controls, Boreholes.',
          'Fire Fighting.',
          'Fire Suppression Systems',
          'Industrial Pipe Systems.',
          'Hydraulic Systems',
        ],
      },
      hvac: {
        title: 'HVAC',
        icon: 'hvac',
        sectors: [
          {
            title: 'Commercial and Residential Buildings',
            text: 'Heating, Ventilating and Air Conditioning of flexible and vast spaces as well as common and remote areas to ensure maximum comfort.',
          },
          {
            title: 'Factories & Warehouses',
            text: 'Heating, Ventilating and Air Conditioning, Cold rooms, Boilers thereby ensuring a healthy and safe working environment.',
          },
          {
            title: 'Data Centre',
            text: 'Precision temperature and humidity control units to ensure proper operation of extremely valuable and highly sensitive equipment.',
          },
          {
            title: 'Hospitals',
            text: 'Strictly abiding by the international norms for heating, ventilating and air conditioning in hospitals and locations requiring pre-determined and very specific temperatures, humidity levels, and special filtration systems.',
          },
        ],
      },
    },
    fitOut: {
      eyebrow: 'Fit-Out Works',
      title: 'Fit-Out Works',
      intro: 'Lambert Electromec is involved in the transformation of empty spaces, using premium equipment to achieve a functioning office setup with up-to-date technology.',
      imageKey: 'Slider-3',
      items: [
        { title: 'Electrical Outlets', icon: 'outlets' },
        { title: 'Raised Access Floors', icon: 'floors' },
        { title: 'HVAC System', icon: 'hvac' },
        { title: 'Fire Protection Systems', icon: 'fire' },
        { title: 'Internal Security Systems', icon: 'security' },
        { title: 'Plumbing Works', icon: 'plumbing' },
      ],
    },
  },

  powerSolutions: {
    eyebrow: 'Power Generation & Hybrid Solutions',
    title: 'Power Generation & Hybrid Solutions',
    intro: 'Lambert Power & Energy division leverages its own knowledge, expertise and technology, and that of its associates and partners worldwide, to provide cross-synergies to the power business. This provides a wide range of experience for optimising technical, commercial and environmental outcomes in the industry.',
    presence: 'With operational offices in Nigeria, Ghana and Côte d’Ivoire, supported by a design office in the Middle East, our Power division is well placed to undertake projects across West Africa.',
    imageKey: 'Slider-7',
    visualLabel: 'Power delivery network',
    visualValue: 'Generation, distribution and renewable systems',
    capabilities: {
      title: 'Capabilities',
      lead: "Our Power & Energy division can handle your most complex requirements; clients' brief and requirements, initial site planning and execution, as well as operation and maintenance (O&M).",
      body: "We are a total solutions provider, with a single point of contact for seamless support. According to the client's requirements, our scope can be:",
      models: [
        { code: 'EPC', text: 'Engineering, Procurement and Construction' },
        { code: 'BOT', text: 'Build Operate Transfer' },
        { code: 'IPP/BOO', text: 'Build Own Operate - Independent Power Plant dedicated to your own needs' },
      ],
    },
    services: {
      title: 'Services',
      intro: 'Lambert Power & Energy division is active in the fields of:',
      items: [
        { title: 'Power Generation', icon: 'generation' },
        { title: 'Power Distribution', icon: 'distribution' },
        { title: 'Renewable Energy', icon: 'renewable' },
        { title: 'Energy Storage', icon: 'storage' },
        { title: 'Energy Audit & Management', icon: 'audit' },
        { title: 'Feasibility Studies, Pre-FEED and FEED', icon: 'studies' },
        { title: 'Operation & Maintenance', icon: 'maintenance' },
      ],
    },
    details: [
      {
        key: 'generation',
        eyebrow: 'Power Generation',
        title: 'Power Generation',
        intro: 'We provide a full range of services for different sizes of thermal power plants, from 5 MW - 200 MW, powered by reciprocating engines and Turbines of all types:',
        blocks: [
          {
            title: 'Reciprocating Engines',
            text: 'Lambert uses reciprocating engines from low to high speed, firing different fuel types including natural gas, LFO and HFO, depending on availability and application.',
          },
          {
            title: 'Turbines',
            text: 'covering Single or Double stage Gas turbines, Steam Turbines firing all types of applicable fuel.',
          },
        ],
      },
      {
        key: 'renewable',
        eyebrow: 'Renewable Energy',
        title: 'Renewable Energy',
        intro: 'Lambert is a reputable provider of renewable energy and storage solutions serving residential and commercial establishments. We offer expertise in the design and installation of the following:',
        items: [
          'Photovoltaic Solar & Solar Thermal',
          'Biomass',
          'Landfill Gas',
          'Wind',
          'Waste to Energy',
          'Waste Heat & Waste Gas Recovery',
        ],
      },
      {
        key: 'storage',
        eyebrow: 'Energy Storage',
        title: 'Energy Storage',
        intro: 'The Electrical Energy Storage System (EESS) is a brand-new service of Lambert Power division.',
        items: [
          'We offer different Energy Storage System solutions for different application scenarios, helping to improve the power supply structure with high-performance and high-security features.',
          'This system can be paired with PV modules to improve the use of new energy.',
          'This solution can be used in large power plant projects connected to the grid, commercial, and industrial on/off-grid power demand.',
        ],
      },
      {
        key: 'audit',
        eyebrow: 'Energy Audit & Management',
        title: 'Energy Audit & Management',
        intro: 'We support you in making the most cost-effective investments for your energy setup, with good ROI and payback period.',
        blocks: [
          {
            title: 'Power Asset Sizing',
            items: [
              'Performing a comprehensive energy assessment, which includes energy production and consumption to eliminate waste in terms of capital and operating expenditure.',
              'We eliminate waste and apply our power asset sizing model tailored to meet your energy needs.',
            ],
          },
          {
            title: 'Solar Power Assessment',
            items: [
              'Our energy consultants will provide you with a thorough evaluation to know if solar energy is a viable option that meet your needs, in a way that is best integrated to your power setup.',
            ],
          },
        ],
      },
      {
        key: 'operations',
        eyebrow: 'Operation & Maintenance',
        title: 'Operation & Maintenance (O&M)',
        paragraphs: [
          'In accordance with the requirements of international standards, our operation and maintenance services for power plants seek to offer a comprehensive customer-focused package. We meet the growing demand for renewable energy using innovative solutions and technological know-how.',
          'We provide a full scope of operation and maintenance services with our experienced operation and maintenance staff to guarantee high availability, high MW output, low heat rate and low overall O&M cost.',
        ],
      },
    ],
  },

  dataCenter: {
    eyebrow: 'Data Centre & Telecom',
    title: 'Data Centre & Telecom',
    intro: 'Lambert Electromec delivers complete data centre infrastructure, facilities, cabling, security and audiovisual systems from inception to completion.',
    imageKey: 'Slider-5',
    visualLabel: 'Mission-critical infrastructure',
    visualValue: 'Designed, engineered and built as one system',
    groups: [
      {
        title: 'Data Centre Infrastructure',
        subtitle: 'Data Centre Structured Cabling',
        icon: 'structured',
        items: [
          'Complete Design/Engineering/Build from inception to completion.',
          'Raised Floor, Rack & Cabinet Space Planning and Layout.',
          'Fiber Solution Design and Installation.',
          'Copper Solution Design and Installation.',
          'Rack and Cabinet Solution Design & Installation.',
          'Pathway Solution Design and Installation.',
          'Overhead Tray Systems.',
          'Raised Floor Tray Systems.',
          'Certified Personnel.',
        ],
      },
      {
        title: 'Data Centre Facilities',
        subtitle: 'Electrical',
        icon: 'electrical',
        items: [
          'Design and Engineering.',
          'Power Distribution.',
          'UPS Systems.',
          'Emergency Power Systems.',
          'DC Power',
        ],
      },
      {
        title: 'Data Centre Facilities',
        subtitle: 'Mechanical',
        icon: 'mechanical',
        items: [
          'HVAC Systems',
          'Hot and Cold-Water Systems',
          'Energy Management',
          'Precision cooling technologies',
          'Water Leak Detection',
        ],
      },
      {
        title: 'Data Centre Facilities',
        subtitle: 'Cabling Services & Capabilities',
        icon: 'cabling',
        items: [
          'Raised Floor, Rack & Cabinet Space Planning and Layout',
          'Fiber Solution Design and Installation',
          'Copper Solution Design and Installation',
          'Rack and Cabinet Solution Design & Installation',
          'Pathway Solution Design and Installation',
          'Professional Project/Program Management from inception to completion',
          'Professional Documentation Services',
        ],
      },
      {
        title: 'Security',
        subtitle: 'Integrated security systems',
        icon: 'security',
        items: [
          'IP Surveillance/CCTV systems',
          'Access Control system',
        ],
      },
      {
        title: 'Audio-Visual Systems',
        subtitle: 'Connected collaboration environments',
        icon: 'audiovisual',
        items: [
          'Board and Conference Rooms',
          'Video Teleconferencing',
        ],
      },
    ],
  },

  oilGas: {
    eyebrow: 'Oil & Gas and Processing Solutions',
    title: 'Oil & Gas and Processing Solutions',
    intro: 'Lambert Electromec offers extensive capabilities to support the Oil & Gas industry across the full project lifecycle. From early-stage project identification and pre-development planning to governance, engineering, commissioning, and final project handover, Lambert delivers end-to-end solutions that align with industry standards and client expectations.',
    secondary: 'Lambert Electromec has specialised capabilities to offer a range of processing solutions for the Oil & Gas industry. In collaboration with its technical partner, VFuels LLC, Lambert has successfully delivered various modular-based projects. These solutions can range from 1,000 to 30,000 barrels per day (bpd) per module for condensate and crude processing, in addition to gas processing units ranging from 1 million to 20 million standard cubic feet per day (mmscfd).',
    imageKey: 'Slider-9',
    visualLabel: 'Processing capability',
    visualValue: 'Modular, scalable and lifecycle-led',
    metrics: [
      { value: '1,000–30,000', label: 'bpd per module' },
      { value: '1–20', label: 'mmscfd gas processing' },
      { value: 'EPC', label: 'end-to-end delivery' },
    ],
    overview: {
      title: 'Service Overview',
      items: [
        'Project Identification',
        'Professional Construction Services',
        'On-Site Supervision',
        'Engineering & Design',
        'Quality Assurance / Quality Control (QA/QC)',
        'Commissioning & Startup',
      ],
    },
    servicesIntro: {
      eyebrow: 'Services in Oil & Gas',
      title: 'Services in Oil & Gas',
      text: 'Our company provides end-to-end Engineering, Procurement and Construction (EPC) services tailored for the Oil & Gas sector, including commissioning support, with a strong focus on modular refinery development, mechanical systems and infrastructure execution.',
    },
    groups: [
      {
        title: 'Engineering & Project Development',
        icon: 'engineering',
        items: [
          'Concept development and feasibility studies',
          'Front-End Engineering Design (FEED) and detailed engineering',
          'Process licensing coordination and technical support',
          'Multidisciplinary engineering services',
          'Project financing advisory and structuring',
          'Governance, risk, and compliance frameworks',
        ],
      },
      {
        title: 'Modular Refinery Construction',
        icon: 'refinery',
        items: [
          'Fabrication, assembly, and integration of modular process units and skids',
          'Installation of ISBL (Inside Battery Limits) and OSBL (Outside Battery Limits) equipment',
          'Structural steel fabrication and erection for process units, pipe racks, and skids',
        ],
      },
      {
        title: 'Civil & Structural Works',
        icon: 'civil',
        items: [
          'Site preparation, earthworks, and excavation',
          'Civil foundation construction for static and rotating equipment.',
          'Concrete structures for tank farms, process areas, and buildings',
          'Turnkey construction of office, administrative, and security facilities',
        ],
      },
      {
        title: 'Commissioning & Operational Support',
        icon: 'commissioning',
        items: [
          'Mechanical completion, loop checks, and system testing',
          'Pre-commissioning, commissioning, and startup support',
          'Operations & maintenance (O&M) of modular refining facilities',
          'Preventive and corrective maintenance of mechanical and electrical systems',
        ],
      },
      {
        title: 'Piping & Mechanical Systems',
        icon: 'piping',
        items: [
          'Complete process and utility piping installation (carbon steel, stainless steel, alloy, GRE)',
          'Installation of pumps, compressors, pressure vessels, reactors, and heat exchangers',
          'Mechanical assembly, skid alignment, and equipment integration',
          'Fabrication and installation of truck loading racks and pipe supports',
          'Piping inspection and testing, including RT, MPI, Pneumatic.',
          'Hydrotesting, chemical cleaning, flushing, and pre-commissioning services',
        ],
      },
      {
        title: 'Tank Farm & Storage Facilities',
        icon: 'storage',
        items: [
          'Design and construction of crude oil, product, and water storage tanks',
          'Tank foundation works and containment bund construction',
          'Erection and testing of atmospheric and pressure-rated storage tanks',
          'Piping interconnection between tank farm, refinery units, and loading racks',
          'Safety systems, overfill protection, and firefighting system integration',
        ],
      },
      {
        title: 'Electrical, Instrumentation & Control Systems (E&I)',
        icon: 'controls',
        items: [
          'Installation and termination of all electrical and instrumentation systems',
          'Process control and automation system integration',
          'Fire & gas detection and suppression systems (deluge, foam, inert gas)',
          'Installation of telecom, IT infrastructure, and security systems',
        ],
      },
      {
        title: 'Utility & Environmental Services',
        icon: 'environment',
        items: [
          'Water and wastewater treatment systems',
          'Electrical power generation and distribution systems',
          'Fuel gas, air, steam, and nitrogen supply systems',
          'Emissions control, flare systems, and environmental compliance',
        ],
      },
    ],
  },
}
