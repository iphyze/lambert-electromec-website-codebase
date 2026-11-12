export const divisionsContent = {
  seo: {
    title: 'Divisions d’ingénierie | Lambert Electromec',
    description: 'Découvrez les divisions de Lambert Electromec dans les bâtiments et usines, les solutions énergétiques hybrides, les centres de données et les solutions de traitement du pétrole et du gaz.',
  },
  pageHeader: {
    eyebrow: 'Divisions spécialisées',
    title: 'Divisions',
    description: 'Des capacités d’ingénierie intégrées organisées autour des systèmes d’infrastructure qui assurent le fonctionnement des villes, des industries et des installations critiques.',
    imageKey: 'Slider-6',
    breadcrumbs: [
      { label: 'Accueil', href: '/' },
      { label: 'Divisions' },
    ],
    menuLabel: 'Navigation de la page Divisions',
    menuItems: [
      {
        label: 'Bâtiments et usines',
        href: '/divisions#buildings-factories',
        targetId: 'buildings-factories',
        activePaths: ['/divisions'],
      },
      {
        label: 'Solutions énergétiques',
        href: '/divisions#power-solutions',
        targetId: 'power-solutions',
      },
      {
        label: 'Centre de données',
        href: '/divisions#data-center',
        targetId: 'data-center',
      },
      {
        label: 'Pétrole et gaz',
        href: '/divisions#oil-gas',
        targetId: 'oil-gas',
      },
    ],
    meta: {
      label: 'Capacité intégrée',
      value: 'Bâtiments. Énergie. Données. Traitement.',
    },
  },

  buildingsFactories: {
    eyebrow: 'Bâtiments et usines',
    title: 'Bâtiments et usines',
    intro: 'La division bâtiments et usines de Lambert Electromec comprend les travaux d’ingénierie électrique et mécanique, les services et les installations.',
    imageKey: 'Slider-2',
    secondaryImageKey: 'Slider-1',
    visualLabel: 'Systèmes complets pour bâtiments',
    visualValue: 'Exécution électrique, mécanique et aménagement',
    electrical: {
      eyebrow: 'Ingénierie électrique',
      title: 'Ingénierie électrique',
      intro: 'Chez Lambert, nous avons développé au cours des années notre division d’ingénierie électrique pour devenir une véritable référence dans l’industrie de par notre excellence dans les installations à basse, moyenne, moyenne et haute tensions.',
      supportingText: 'Une expertise solide et robuste en provision globale de services techniques et de gestion dans les domaines suivants:',
      groups: [
        {
          title: 'Haute et moyenne tension',
          icon: 'highVoltage',
          items: [
            'Turbines à gaz et production, transport et distribution d’électricité',
            'Générateurs, transformateurs et synchronisation',
            'Sous-stations électriques et distribution d’énergie',
            'Comptage et connexion aux services publics',
          ],
        },
        {
          title: 'Basse tension',
          icon: 'lowVoltage',
          items: [
            'Tableaux électriques : tableaux de distribution principaux, tableaux de distribution secondaires, tableaux de commande de moteurs et batterie de de condensateurs',
            'Tableaux de Synchronisation, Commutateur de changement (automatique et mécanique)',
            'Barres conductrices blindées (bus bars)',
            'Éclairage, dispositifs de commutation, et Système de contrôle d’éclairage intelligents',
            'Surtension, mise à la terre et protection anti-foudre',
            'Onduleur et stabilisateur de tension',
            'Système de câblage incluant des solutions de plancher surélevé',
          ],
        },
        {
          title: 'Très basse tension (ELV)',
          icon: 'extraLowVoltage',
          columns: 2,
          items: [
            'Systèmes de gestion de bâtiments',
            'Systèmes de gestion de parking',
            'Systèmes d’alarme incendie',
            'Systèmes de télévision en circuit fermé',
            'Systèmes de contrôle d’accès',
            'Systèmes d’alarme antivol',
            'Systèmes de sonorisation',
            'Systèmes audiovisuels',
            'Systèmes d’entrée vidéo',
            'Systèmes pour salles de conférence',
            'Données et systèmes PABX',
            'Clôture électrique',
            'Système d’alarme anti-intrusion',
            'Système d’alarme pour personnes handicapées',
          ],
        },
      ],
    },
    mechanical: {
      eyebrow: 'Ingénierie mécanique',
      title: 'Ingénierie mécanique',
      intro: 'En tant qu’entreprise leader dans le domaine du génie mécanique, électrique et plomberie (MEP), Lambert Electromec travaille au cœur des besoins de ses clients. Nous offrons des services d’ingénierie mécanique de pointe fondés sur notre expertise dans plusieurs domaines.',
      piped: {
        title: 'Services de canalization',
        icon: 'piped',
        items: [
          'Eau potable et sanitaire, eau pluviale, assainissement et évacuation d’eau usées',
          'Piscines et bassins d’eau',
          'Stations et contrôles de traitement des eaux usées et de l’eau, forages',
          'Systèmes secours d’incendie',
          'Systèmes d’extension automatique d’incendie',
          'Systèmes de canalisations industrielles',
          'Systèmes hydrauliques',
        ],
      },
      hvac: {
        title: 'CVC',
        icon: 'hvac',
        sectors: [
          {
            title: 'Immeubles commerciaux et résidentiels',
            text: 'Désenfumage, ventilation et climatisation destinés aux espaces flexibles et vastes ainsi qu’aux espaces communs et isolés pour garantir un confort maximal.',
          },
          {
            title: 'Usines et entrepôts',
            text: 'Désenfumage, ventilation, climatisation et chambres froides et chaudières pour assurer un environnement de travail sûr et sain.',
          },
          {
            title: 'Centres de données',
            text: 'Unités de contrôle précis de la température et de l’humidité pour garantir le bon fonctionnement d’équipements de sensibilités élevées.',
          },
          {
            title: 'Hôpitaux',
            text: 'Respect strict des normes internationales en matière de chauffage, ventilation et climatisation dans les hôpitaux et les lieux nécessitant des températures, des niveaux d’humidité et des systèmes de filtration spéciaux prédéterminés et très spécifiques.',
          },
        ],
      },
    },
    fitOut: {
      eyebrow: 'Travaux d’aménagement',
      title: 'Travaux d’aménagement',
      intro: 'Lambert Electromec participe à la transformation d’espaces vides, en utilisant des équipements de qualité supérieure pour créer des bureaux fonctionnels équipés des dernières technologies.',
      imageKey: 'Slider-3',
      items: [
        { title: 'Prises électriques', icon: 'outlets' },
        { title: 'Planchers surélevés', icon: 'floors' },
        { title: 'Système CVC', icon: 'hvac' },
        { title: 'Systèmes de protection incendie', icon: 'fire' },
        { title: 'Systèmes de sécurité interne', icon: 'security' },
        { title: 'Travaux de plomberie', icon: 'plumbing' },
      ],
    },
  },

  powerSolutions: {
    eyebrow: 'Production d’énergie électrique et solutions hybrides',
    title: 'Production d’énergie électrique et solutions hybrides',
    intro: 'La division Lambert Power & Energy tire profit de ses connaissances, de son expertise et de sa technologie à travers différents départements et partenaires mondiaux pour créer une synergie au sein du secteur de l’énergie. Le résultat est une riche gamme d’expérience capable d’optimiser les segments techniques, commerciaux et environnementaux de l’industrie.',
    presence: 'Avec des bureaux opérationnels au Nigéria, au Ghana et en Côte d’Ivoire, ainsi qu’un bureau d’études au Moyen-Orient, notre division Énergie est idéalement placée pour mener à bien des projets en Afrique.',
    imageKey: 'Slider-7',
    visualLabel: 'Réseau de livraison énergétique',
    visualValue: 'Production, distribution et systèmes renouvelables',
    capabilities: {
      title: 'Capacités',
      lead: 'Notre division Énergie et électricité est en mesure de répondre à vos besoins les plus complexes : cahier des charges et exigences des clients, planification initiale et exécution du site, ainsi qu’exploitation et maintenance (O&M).',
      body: 'Nous sommes un fournisseur de solutions complètes, avec un interlocuteur unique pour un soutien continu. En fonction des exigences du client, notre champ d’action peut être le suivant :',
      models: [
        { code: 'IFC', text: 'ingénierie, fourniture d’équipements et construction' },
        { code: 'CET', text: 'construction, exploitation et transfert' },
        { code: 'CPE', text: 'construction, propriété et exploitation - Centrale électrique indépendante adaptée à vos besoins' },
      ],
    },
    services: {
      title: 'Services',
      intro: 'La division Lambert Énergie est active dans les domaines suivants :',
      items: [
        { title: 'Production d’énergie', icon: 'generation' },
        { title: 'Distribution de l’énergie', icon: 'distribution' },
        { title: 'Énergie renouvelable', icon: 'renewable' },
        { title: 'Stockage de l’énergie', icon: 'storage' },
        { title: 'Audit et gestion de l’énergie', icon: 'audit' },
        { title: 'Études de faisabilité (ALIMENTATION ET PRÉ-ALIMENTATION)', icon: 'studies' },
        { title: 'Exploitation et maintenance', icon: 'maintenance' },
      ],
    },
    details: [
      {
        key: 'generation',
        eyebrow: 'Production d’énergie',
        title: 'Production d’énergie',
        intro: 'Nous fournissons une gamme complète de services pour des centrales thermiques de différentes tailles, de 5 MW à 200 MW, alimentées par des moteurs alternatifs et des turbines de tous types :',
        blocks: [
          {
            title: 'Moteurs alternatifs',
            text: 'LPP utilise tous les types de moteurs alternatifs, de basse à haute vitesse, utilisant tous les types de carburant, gaz naturel, LFO, HFO... en fonction de la disponibilité et de l’application.',
          },
          {
            title: 'Turbines',
            text: 'couvrant les turbines à gaz à un ou deux étages, les turbines à vapeur utilisant tous les types de combustibles applicables.',
          },
        ],
      },
      {
        key: 'renewable',
        eyebrow: 'Énergies renouvelables',
        title: 'Énergies renouvelables',
        intro: 'Lambert est un fournisseur réputé d’énergies renouvelables et de solutions de stockage au service des établissements résidentiels et commerciaux. Nous offrons notre expertise dans la conception et l’installation des éléments suivants :',
        items: [
          'Solaire photovoltaïque et solaire thermique',
          'Biomasse',
          'Gas de décharge',
          'Vent',
          'Chaleur gaspillée',
          'Récupération et traitement de la chaleur perdue',
        ],
      },
      {
        key: 'storage',
        eyebrow: 'Stockage de l’énergie',
        title: 'Stockage de l’énergie',
        intro: 'Le système de stockage de l’énergie électrique (SSEE) est un tout nouveau service de la division Lambert Énergie.',
        items: [
          'Nous proposons différentes solutions de systèmes de stockage d’énergie pour différents scénarios d’application, contribuant à améliorer la structure d’énergie électrique avec des caractéristiques de haute performance et de haute sécurité.',
          'Ce système peut être associé à des modules photovoltaïques pour améliorer l’utilisation de l’énergie nouvelle.',
          'Cette solution peut être utilisée dans les projets de grandes centrales électriques connectées au réseau, ainsi que dans la demande d’électricité commerciale et industrielle en réseau ou hors réseau.',
        ],
      },
      {
        key: 'audit',
        eyebrow: 'Audit et gestion de l’énergie',
        title: 'Audit et gestion de l’énergie',
        intro: 'Nous vous soutenons à réaliser les investissements les plus rentables pour vos installations énergétiques, avec un bon retour sur investissement et une bonne période de remboursement.',
        blocks: [
          {
            title: 'Dimensionnement des composants énergétiques',
            items: [
              'Réaliser une évaluation énergétique complète, qui comprend la production et la consommation d’énergie afin d’éliminer les gaspillages en termes de dépenses d’investissement et de fonctionnement.',
              'Nous éliminons les gaspillages et appliquons notre modèle de dimensionnement des composants adaptés à vos besoins énergétiques.',
            ],
          },
          {
            title: 'Évaluation de l’énergie solaire',
            items: [
              'Nos consultants en énergie vous fourniront une évaluation approfondie pour vérifier si l’énergie solaire est une option viable qui répond à vos besoins, de la manière la mieux intégrée à vos installations électriques.',
            ],
          },
        ],
      },
      {
        key: 'operations',
        eyebrow: 'Exploitation et maintenance',
        title: 'Exploitation et maintenance (O&M)',
        paragraphs: [
          'Conformément aux exigences des normes internationales, nos services d’exploitation et de maintenance des centrales électriques visent à proposer une offre complète axée sur le client. Nous répondons à la demande croissante d’énergie renouvelable en utilisant des solutions innovantes et notre savoir-faire technologique.',
          'Nous fournissons une gamme complète de services d’exploitation et de maintenance avec notre personnel expérimenté d’exploitation et de maintenance pour garantir une haute disponibilité, une production élevée de MW, un meilleur rendement et un faible coût global d’exploitation et de maintenance.',
        ],
      },
    ],
  },

  dataCenter: {
    eyebrow: 'Centre de données et télécommunications',
    title: 'Centre de données et télécommunications',
    intro: 'Lambert Electromec fournit des infrastructures, des installations, des systèmes de câblage, de sécurité et audiovisuels complets pour centres de données, de la conception à la réalisation.',
    imageKey: 'Slider-5',
    visualLabel: 'Infrastructure critique',
    visualValue: 'Conçue, étudiée et construite comme un système unique',
    groups: [
      {
        title: 'Infrastructure des centres de données',
        subtitle: 'Câblage structuré pour centre de données',
        icon: 'structured',
        items: [
          'Conception/ingénierie/construction complète, de la création à l’achèvement.',
          'Planification et aménagement de l’espace pour les planchers surélevés, les rayonnages et les armoires.',
          'Conception et installation de solutions en fibre optique.',
          'Conception et installation de solutions en cuivre.',
          'Conception et installation de solutions pour les baies et les armoires.',
          'Conception et installation d’une solution de cheminement.',
          'Systèmes de plateaux suspendus.',
          'Systèmes de plateaux surélevés.',
          'Personnel certifié.',
        ],
      },
      {
        title: 'Installations de centres de données',
        subtitle: 'Électrique',
        icon: 'electrical',
        items: [
          'Conception et ingénierie.',
          'Distribution d’énergie.',
          'Systèmes onduleurs (UPS).',
          'Systèmes d’alimentation de secours.',
          'Alimentation en courant continu.',
        ],
      },
      {
        title: 'Installations de centres de données',
        subtitle: 'Mécanique',
        icon: 'mechanical',
        items: [
          'Systèmes de CVC',
          'Systèmes d’eau chaude et froide',
          'Gestion de l’énergie',
          'Technologies de refroidissement de précision',
          'Détection des fuites d’eau',
        ],
      },
      {
        title: 'Installations de centres de données',
        subtitle: 'Services de câblage et capacités',
        icon: 'cabling',
        items: [
          'Faux planchers, schématisation et planification de l’espace pour étagères et armoires',
          'Conception et installation de solutions en fibre',
          'Conception et installation de solutions en cuivre',
          'Conception et installation de solutions pour les baies et les armoires',
          'Conception et installation d’une solution de cheminement',
          'Gestion professionnelle de projets/programmes, de la conception à l’achèvement',
          'Services de documentation professionnels',
        ],
      },
      {
        title: 'Sécurité',
        subtitle: 'Systèmes de sécurité intégrés',
        icon: 'security',
        items: [
          'Systèmes de surveillance IP/CCTV',
          'Système de contrôle d’accès',
        ],
      },
      {
        title: 'Systèmes audiovisuels',
        subtitle: 'Environnements collaboratifs connectés',
        icon: 'audiovisual',
        items: [
          'Salles de réunion et de conférence',
          'Téléconférence video',
        ],
      },
    ],
  },

  oilGas: {
    eyebrow: 'Pétrole et gaz et solutions de traitement',
    title: 'Pétrole et gaz et solutions de traitement',
    intro: 'Lambert Electromec offre des capacités complètes pour accompagner l’industrie du pétrole et du gaz tout au long du cycle de vie des projets. De l’identification initiale des projets et de la planification préalable au développement, en passant par la gouvernance, l’ingénierie, la mise en service et la livraison finale, Lambert fournit des solutions complètes conformes aux normes de l’industrie et aux attentes des clients.',
    secondary: 'Lambert Electromec dispose de compétences spécialisées pour offrir une gamme de solutions de traitement destinées à l’industrie du pétrole et du gaz. En collaboration avec son partenaire technique, VFuels LLC, Lambert a mené à bien divers projets modulaires. Ces solutions peuvent varier de 1 000 à 30 000 barils par jour (bpj) par module pour le traitement des condensats et du pétrole brut. En plus des unités de traitement de gaz allant de 1 million à 20 millions de pieds cubes standard par jour (mmscfd).',
    imageKey: 'Slider-9',
    visualLabel: 'Capacité de traitement',
    visualValue: 'Modulaire, évolutive et axée sur le cycle de vie',
    metrics: [
      { value: '1 000–30 000', label: 'bpj par module' },
      { value: '1–20', label: 'mmscfd de traitement du gaz' },
      { value: 'EPCC', label: 'livraison complète' },
    ],
    overview: {
      title: 'Aperçu des services',
      items: [
        'Identification du projet',
        'Services professionnels de construction',
        'Supervision sur site',
        'Ingénierie et conception',
        'Assurance qualité / Contrôle qualité (AQ/CQ)',
        'Mise en service et lancement',
      ],
    },
    servicesIntro: {
      eyebrow: 'Services dans le secteur du pétrole et du gaz',
      title: 'Services dans le secteur du pétrole et du gaz',
      text: 'Notre entreprise fournit des services EPCC (ingénierie, approvisionnement, construction et mise en service) complets adaptés au secteur du pétrole et du gaz, avec un accent particulier sur le développement de raffineries modulaires, des systèmes mécaniques et la réalisation d’infrastructures.',
    },
    groups: [
      {
        title: 'Ingénierie et développement de projets',
        icon: 'engineering',
        items: [
          'Développement de concepts et études de faisabilité',
          'Conception technique avant-projet (FEED) et ingénierie détaillée',
          'Coordination des licences de procédés et assistance technique',
          'Services d’ingénierie multidisciplinaires',
          'Conseil et structuration du financement de projets',
          'Cadres de gouvernance, de gestion des risques et de conformité',
        ],
      },
      {
        title: 'Construction modulaire de raffineries',
        icon: 'refinery',
        items: [
          'Fabrication, assemblage et intégration d’unités de traitement modulaires et de skids',
          'Installation d’équipements ISBL (À l’intérieur des limites de la batterie) et OSBL (À l’extérieur des limites de la batterie)',
          'Fabrication et montage de structures métalliques pour unités de traitement, supports de tuyauterie et skids',
        ],
      },
      {
        title: 'Travaux de génie civil et de structure',
        icon: 'civil',
        items: [
          'Préparation du site, terrassement et excavation',
          'Construction de fondations civiles pour équipements statiques et rotatifs',
          'Structures en béton pour parcs de réservoirs, zones de traitement et bâtiments',
          'Construction clé en main d’installations de bureaux, administratives et de sécurité',
        ],
      },
      {
        title: 'Mise en service et assistance opérationnelle',
        icon: 'commissioning',
        items: [
          'Achèvement mécanique, vérification des boucles et essais du système',
          'Assistance à la pré-mise en service, à la mise en service et au lancement',
          'Exploitation et maintenance (O&M) d’installations de raffinage modulaires',
          'Maintenance préventive et corrective des systèmes mécaniques et électriques',
        ],
      },
      {
        title: 'Systèmes de tuyauterie et mécaniques',
        icon: 'piping',
        items: [
          'Installation complète de tuyauterie de process et d’utilités (acier au carbone, acier inoxydable, alliage, GRE)',
          'Installation de pompes, compresseurs, récipients sous pression, réacteurs et échangeurs de chaleur',
          'Assemblage mécanique, alignement des skids et intégration des équipements',
          'Fabrication et installation de supports de chargement pour camions et de supports de tuyauterie',
          'Inspection et essai des tuyauteries, y compris RT, MPI, pneumatique.',
          'Services d’essais hydrauliques, de nettoyage chimique, de rinçage et de pré-mise en service',
        ],
      },
      {
        title: 'Parc de stockage et installations de stockage',
        icon: 'storage',
        items: [
          'Conception et construction de réservoirs de stockage de pétrole brut, de produits raffinés et d’eau',
          'Travaux de fondation des réservoirs et construction de bacs de rétention',
          'Montage et essai de réservoirs de stockage atmosphériques et sous pression',
          'Interconnexion des tuyauteries entre le parc de stockage, les unités de raffinage et les rampes de chargement',
          'Systèmes de sécurité, protection contre le débordement et intégration du système de lutte contre l’incendie',
        ],
      },
      {
        title: 'Systèmes électriques, d’instrumentation et de contrôle (E&I)',
        icon: 'controls',
        items: [
          'Installation et raccordement de tous les systèmes électriques et d’instrumentation',
          'Intégration de systèmes de contrôle des processus et d’automatisation',
          'Systèmes de détection et de suppression des incendies et des gaz (déluge, mousse, gaz inerte)',
          'Installation de systèmes de télécommunications, d’infrastructure informatique et de sécurité',
        ],
      },
      {
        title: 'Services publics et environnementaux',
        icon: 'environment',
        items: [
          'Systèmes de traitement de l’eau et des eaux usées',
          'Systèmes de production et de distribution d’électricité',
          'Systèmes d’alimentation en gaz combustible, en air, en vapeur et en azote',
          'Contrôle des émissions, systèmes de flammes et conformité environnementale',
        ],
      },
    ],
  },
}
