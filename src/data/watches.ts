export interface WatchProduct {
  id: string;
  name: string;
  series: string;
  category: 'ANALOG' | 'DIGITAL' | 'HYBRID' | 'CHRONOGRAPH' | 'SPORT' | 'AUTOMATIC';
  tagline: string;
  price: string;
  image: string;
  caseMaterial: string;
  diameter: string;
  thickness: string;
  movement: string;
  powerReserve: string;
  waterResistance: string;
  crystal: string;
  strap: string;
  description: string;
  animationType: 'analog-rotate' | 'digital-activate' | 'chrono-sweep' | 'hybrid-pulse' | 'sport-dynamic' | 'automatic-macro';
  hotspots?: {
    id: string;
    label: string;
    desc: string;
    x: number; // percentage
    y: number; // percentage
    detailZoom: number;
  }[];
}

export const WATCH_COLLECTION: WatchProduct[] = [
  {
    id: 'precision-chronos-premier',
    name: 'CHRONOS PREMIER',
    series: 'SERIES 01 / RACING',
    category: 'CHRONOGRAPH',
    tagline: 'Precision in motion. 1/10th second column-wheel actuation.',
    price: '$6,450',
    image: '/Luxury_chronograph_watch_floating_20260923234027.jpeg',
    caseMaterial: '316L Surgical Brushed Steel & Black Ceramic Tachymeter',
    diameter: '42.0 mm',
    thickness: '12.8 mm',
    movement: 'Calibre P-890 Column-Wheel Automatic Chronograph',
    powerReserve: '72 Hours',
    waterResistance: '100m / 10 ATM',
    crystal: 'Double-domed Sapphire with Anti-Reflective Inner Coating',
    strap: 'Perforated Racing Calfskin with Red Contrast Stitching',
    description: 'Constructed for high-velocity precision. Three concentric guilloché sub-dials register elapsed seconds, 30 minutes, and 12 hours with razor-fine balance.',
    animationType: 'chrono-sweep',
    hotspots: [
      { id: 'bezel', label: 'Tachymeter Scale', desc: 'Monolithic ceramic engraved with diamond-tipped tooling to calculate speed over distance.', x: 38, y: 22, detailZoom: 1.8 },
      { id: 'subdials', label: 'Guilloché Sub-dials', desc: 'Micro-concentric turned registers with red chronograph elapsed counters.', x: 48, y: 46, detailZoom: 2.2 },
      { id: 'pushers', label: 'Tactile Pushers', desc: 'Dual-gasket screw-down pump pushers delivering 0.15N crisp mechanical feedback.', x: 62, y: 34, detailZoom: 2.0 },
      { id: 'strap', label: 'Perforated Leather', desc: 'Italian full-grain calf leather perforated for thermal airflow during high-intensity track use.', x: 46, y: 82, detailZoom: 1.6 },
    ]
  },
  {
    id: 'precision-aethel-heritage',
    name: 'AETHEL HERITAGE',
    series: 'SERIES 02 / ATELIER',
    category: 'ANALOG',
    tagline: 'Sunburst galvanic ocean blue dial with hand-beveled indices.',
    price: '$5,200',
    image: '/Luxury_watch_floating_in_studio_20260923233742.jpeg',
    caseMaterial: 'Satin-Brushed & Mirror-Polished 316L Steel',
    diameter: '40.0 mm',
    thickness: '10.2 mm',
    movement: 'Calibre P-200 Hand-Finished Automatic, 28,800 vph',
    powerReserve: '68 Hours',
    waterResistance: '150m / 15 ATM',
    crystal: 'Box Sapphire with Seven-Layer AR Treatment',
    strap: 'Solid H-Link Integrated Stainless Steel Bracelet',
    description: 'An enduring expression of purist horology. The deep radial sunburst dial shifts subtly from midnight navy to cobalt under changing illumination.',
    animationType: 'analog-rotate',
    hotspots: [
      { id: 'dial', label: 'Galvanic Blue Dial', desc: 'Deep galvanic lacquering creates an iridescent optical reflection with circular brushing.', x: 49, y: 48, detailZoom: 2.2 },
      { id: 'bezel', label: 'Engine-Turned Bezel', desc: 'Coin-edge knurling with luminescent reference triangle at 12 o\'clock.', x: 48, y: 30, detailZoom: 1.9 },
      { id: 'bracelet', label: 'Articulated H-Links', desc: 'Hand-finished micro-chamfers with toolless rapid-adjustment deployant buckle.', x: 50, y: 72, detailZoom: 1.7 },
    ]
  },
  {
    id: 'precision-tactical-hybrid',
    name: 'TACTICAL T-HYBRID',
    series: 'SERIES 03 / INSTRUMENT',
    category: 'HYBRID',
    tagline: 'Two worlds. One time. Mechanical hands over inverted OLED display.',
    price: '$4,800',
    image: '/Sports_watch_with_hybrid_display_20260923234049.jpeg',
    caseMaterial: 'Grade 5 Titanium with Diamond-Like Carbon (DLC) Coating',
    diameter: '44.0 mm',
    thickness: '13.5 mm',
    movement: 'Dual-Architecture Kinetic Mechanical + High-Density Micro-OLED',
    powerReserve: '30 Days Hybrid / 60h Mechanical Reserve',
    waterResistance: '200m / 20 ATM',
    crystal: 'Scratch-Proof Synthetic Corundum Sapphire',
    strap: 'Fluoroelastomer FKM Tactical Rubber with Reinforced Grooves',
    description: 'Merging physical mechanical gear-trains with high-resolution biometric and altitude telemetry. Hands automatically park at 9 and 3 upon telemetry activation.',
    animationType: 'hybrid-pulse',
    hotspots: [
      { id: 'hybrid-display', label: 'Inverted OLED Matrix', desc: 'Sub-surface display displaying dual timezones, barometer, and split-second laps.', x: 46, y: 52, detailZoom: 2.4 },
      { id: 'hands', label: 'Micro-Stepper Hands', desc: 'Skeletonized luminescent hands powered by twin independent micro-stepper motors.', x: 44, y: 40, detailZoom: 2.0 },
      { id: 'bezel', label: 'Directional Bezel', desc: 'Matte black DLC titanium bezel with high-contrast orange countdown quadrant.', x: 50, y: 24, detailZoom: 1.8 },
    ]
  },
  {
    id: 'precision-monolith-black',
    name: 'MONOLITH NOIR',
    series: 'SERIES 04 / ESSENCE',
    category: 'DIGITAL',
    tagline: 'Less, perfected. Matte ceramic architecture with gilded accents.',
    price: '$7,100',
    image: '/Luxury_watch_on_white_background_20260923234055.jpeg',
    caseMaterial: 'High-Tech Matte Zirconia Ceramic',
    diameter: '39.0 mm',
    thickness: '8.4 mm',
    movement: 'Ultra-Thin Calibre P-100 Monolithic Architecture',
    powerReserve: '55 Hours',
    waterResistance: '50m / 5 ATM',
    crystal: 'Flat Beveled Sapphire with Invisible Gasket',
    strap: 'Integrated Matte Zirconia Ceramic Link Bracelet',
    description: 'Absolute reduction to pure sculptural form. Zero extraneous markings, zero reflections, paired with hand-applied 18K brushed gold baton markers.',
    animationType: 'digital-activate',
    hotspots: [
      { id: 'case', label: 'Zirconia Ceramic', desc: 'Sintered at 1,500°C for extreme scratch resistance and featherlight tactile warmth.', x: 52, y: 46, detailZoom: 2.1 },
      { id: 'indices', label: '18K Gilded Batons', desc: 'Diamond-cut gold hour markers catching microscopic photons across pitch black.', x: 46, y: 42, detailZoom: 2.5 },
      { id: 'clasp', label: 'Butterfly Deployant', desc: 'Concealed titanium locking mechanism completely invisible when closed.', x: 62, y: 65, detailZoom: 1.8 },
    ]
  },
  {
    id: 'precision-meridian-flagship',
    name: 'MERIDIAN 2K FLAGSHIP',
    series: 'SERIES 05 / ARCHITECTURE',
    category: 'AUTOMATIC',
    tagline: 'The pinnacle of precision engineering. UTC / Alarm complication.',
    price: '$8,900',
    image: '/Luxury_wristwatch_floating_in_st…_2K_20260923233705.jpeg',
    caseMaterial: 'Multi-Piece Brushed 316L Steel with Polished Chamfers',
    diameter: '42.5 mm',
    thickness: '11.6 mm',
    movement: 'Manufacture Calibre 9100 Twin-Barrel Complication',
    powerReserve: '80 Hours',
    waterResistance: '120m / 12 ATM',
    crystal: 'Antireflective Sapphire with Hexagonal Bevels',
    strap: 'Bespoke Vulcanized Black Rubber with Quick-Release Titanium Clasp',
    description: 'Engineered for transcontinental precision. Dual digital displays integrated within the deep grain dial manage multi-zone reference time and mechanical acoustic alarm.',
    animationType: 'automatic-macro',
    hotspots: [
      { id: 'crown', label: 'Fluted Dual Crown', desc: 'Laser-etched star insignia with quad-O-ring hermetic sealing.', x: 50, y: 22, detailZoom: 2.0 },
      { id: 'screens', label: 'Twin Apertures', desc: 'Integrated micro-windows displaying UTC day/date and sub-second digital time.', x: 50, y: 48, detailZoom: 2.3 },
      { id: 'lugs', label: 'Integrated Lugs', desc: 'Geometric angular architecture blending the case seamlessly into the vulcanized strap.', x: 33, y: 46, detailZoom: 1.8 },
    ]
  },
  {
    id: 'precision-calibre-soleil',
    name: 'CALIBRE SOLEIL',
    series: 'SERIES 06 / CLASSIC',
    category: 'SPORT',
    tagline: 'Fluted bezel architecture with fluted steel crown and date loupe.',
    price: '$6,800',
    image: '/Luxury_watch_on_white_background_20260923234101.jpeg',
    caseMaterial: 'Oystergrade 904L Corrosion-Resistant Stainless Steel',
    diameter: '41.0 mm',
    thickness: '11.0 mm',
    movement: 'Calibre P-3235 Chronometer Certified (-2/+2 sec/day)',
    powerReserve: '70 Hours',
    waterResistance: '100m / 10 ATM',
    crystal: 'Sapphire with 2.5x Cyclops Date Magnifier',
    strap: 'Solid 3-Link Brushed & Mirror-Polished Steel',
    description: 'Light dancing across geometric facets. The fluted bezel casts rhythmic reflections while the cyclops date lens delivers instantaneous midnight jump.',
    animationType: 'sport-dynamic',
    hotspots: [
      { id: 'fluted', label: 'Fluted Bezel', desc: 'Precision milled triangular ridges reflecting incident light from every angle.', x: 49, y: 32, detailZoom: 2.2 },
      { id: 'cyclops', label: 'Cyclops Lens', desc: 'Sapphire magnification window enlarging the date numeral by 2.5x for effortless legibility.', x: 50, y: 42, detailZoom: 2.4 },
      { id: 'bracelet', label: 'Oyster-Pattern Links', desc: 'Robust three-piece links with polished center and satin outer links.', x: 28, y: 55, detailZoom: 1.8 },
    ]
  }
];

export interface ExplodedPart {
  number: string;
  name: string;
  material: string;
  role: string;
  tolerance: string;
  spec: string;
}

export const EXPLODED_PARTS: ExplodedPart[] = [
  {
    number: '01',
    name: 'SAPPHIRE CRYSTAL',
    material: 'Synthetic Corundum (9 Mohs Hardness)',
    role: 'Optical Protection & Hermetic Seal',
    tolerance: '±0.001 mm',
    spec: 'Double-curved box profile with dual-sided 7-layer anti-reflective vapor deposition.'
  },
  {
    number: '02',
    name: 'DIAL & INDICES',
    material: 'Galvanic Ocean Blue Brass with 18K Rhodium Plating',
    role: 'Time Articulation & High Legibility',
    tolerance: '±0.002 mm',
    spec: 'Sunburst radial graining with hand-applied faceted markers filled with Super-LumiNova BGW9.'
  },
  {
    number: '03',
    name: 'HANDS ASSEMBLY',
    material: 'Diamond-Cut Tempered Steel & Red Enamel',
    role: 'Precision Dynamic Indication',
    tolerance: '±0.0005 mm',
    spec: 'Three-dimensional diamond-polished facets balanced to within 0.02 micrograms for effortless torque.'
  },
  {
    number: '04',
    name: 'MECHANICAL MOVEMENT',
    material: 'Glucydur Balance, Nivaflex Hairspring & 28 Synthetic Rubies',
    role: 'Kinetic Energy Conversion & Chronometry',
    tolerance: '±0.0002 mm',
    spec: 'Calibre P-9000 vibrating at 28,800 beats per hour (4Hz) with bidirectional tungsten oscillating weight.'
  },
  {
    number: '05',
    name: 'CASE MIDDLE',
    material: 'Single-Block Forged 316L Stainless Steel',
    role: 'Structural Rigidity & Water Resistance',
    tolerance: '±0.002 mm',
    spec: 'Milled from a solid billet using 5-axis CNC machining, then hand-finished with satin brushing.'
  },
  {
    number: '06',
    name: 'SOLID CASE BACK',
    material: 'Screw-Down Steel with Exhibition Sapphire Portal',
    role: 'Hermetic Closure & Movement Visibility',
    tolerance: '±0.0015 mm',
    spec: 'Threaded screw-down sealing system maintaining 15 ATM hydrostatic pressure resistance.'
  },
  {
    number: '07',
    name: 'CROWN & STEM',
    material: 'Machined Steel with Quadruple O-Ring Gaskets',
    role: 'Manual Winding & Setting Interface',
    tolerance: '±0.001 mm',
    spec: 'Double-lock screw-in mechanism with coin-edge knurling and embossed precision insignia.'
  },
  {
    number: '08',
    name: 'STRAP ARCHITECTURE',
    material: 'Vulcanized FKM Rubber / Italian Saddle Leather',
    role: 'Ergonomic Wrist Contact & Security',
    tolerance: '±0.005 mm',
    spec: 'Anatomically curved inner channels allowing skin respiration with micro-adjustable deployant clasp.'
  }
];

export const BRAND_STATS = [
  { value: '0.002', unit: 'mm', label: 'Machining Tolerance' },
  { value: '28,800', unit: 'vph', label: 'Balance Oscillation' },
  { value: '150', unit: 'm', label: 'Hydrostatic Depth' },
  { value: '72', unit: 'hrs', label: 'Continuous Reserve' },
];
