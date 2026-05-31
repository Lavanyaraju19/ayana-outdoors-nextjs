import trek1 from '@/assets/trek-1.jpg';
import trek2 from '@/assets/trek-2.jpg';
import trek3 from '@/assets/trek-3.jpg';
import trek4 from '@/assets/trek-4.jpg';
import campHero from '@/assets/camp-hero.jpg';

export interface Trek {
  id: string;
  title: string;
  image: string;
  price: string;
  priceNum: number;
  date: string;
  duration: string;
  shortDescription: string;
  overview: string;
  highlights: string[];
  itinerary: { day: string; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
  ageGroup: string;
  fitnessLevel: string;
  safety: string[];
  category: 'summer-camp' | 'weekend-trek';
}

export const allTreks: Trek[] = [
  {
    id: 'himalayan-adventure',
    title: 'Himalayan Adventure Camp',
    image: trek1,
    price: '₹15,999',
    priceNum: 15999,
    date: 'May 15 – May 22, 2026',
    duration: '8 Days',
    shortDescription: 'An immersive trek through the majestic Himalayan trails with camping under the stars.',
    overview: 'Join us for an unforgettable 8-day adventure through the Himalayan trails. This camp is designed to build confidence, resilience, and a deep connection with nature. Children will learn survival skills, teamwork, and environmental awareness while exploring some of the most breathtaking landscapes in the world.',
    highlights: ['Summit attempt at 12,000 ft', 'Star gazing in clear mountain skies', 'River crossing & rappelling', 'Campfire stories & local culture immersion', 'Nature journaling & photography'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Orientation', description: 'Arrive at base camp, team introductions, safety briefing, and evening campfire.' },
      { day: 'Day 2', title: 'Acclimatization Trek', description: 'Short trek to nearby viewpoint, basic trekking skills training.' },
      { day: 'Day 3', title: 'Forest Trail', description: 'Trek through dense rhododendron forests, wildlife spotting.' },
      { day: 'Day 4', title: 'River Valley', description: 'Descend to river valley, river crossing training, camping by the river.' },
      { day: 'Day 5', title: 'Alpine Meadows', description: 'Trek to high alpine meadows, panoramic mountain views.' },
      { day: 'Day 6', title: 'Summit Day', description: 'Early morning summit attempt, celebration at the peak.' },
      { day: 'Day 7', title: 'Descent & Celebration', description: 'Descend to base camp, certificate ceremony, farewell dinner.' },
      { day: 'Day 8', title: 'Departure', description: 'Breakfast, group photo, departure.' },
    ],
    inclusions: ['All meals (veg & non-veg)', 'Camping equipment', 'Certified trek guides', 'First aid & emergency support', 'Transportation from base city', 'Certificate of completion'],
    exclusions: ['Personal expenses', 'Travel insurance', 'Gear beyond basic camping', 'Tips for guides'],
    ageGroup: '10–16 years',
    fitnessLevel: 'Moderate – should be able to walk 6-8 km daily',
    safety: ['1:5 instructor-to-child ratio', 'Certified wilderness first responders', 'Satellite phone for emergencies', 'Weather monitoring system', 'Emergency evacuation plan'],
    category: 'summer-camp',
  },
  {
    id: 'western-ghats-explorer',
    title: 'Western Ghats Explorer',
    image: campHero,
    price: '₹12,499',
    priceNum: 12499,
    date: 'Jun 1 – Jun 7, 2026',
    duration: '7 Days',
    shortDescription: 'Discover the biodiversity of the Western Ghats with guided nature walks and wildlife spotting.',
    overview: 'Explore one of the world\'s most biodiverse regions. This camp combines adventure with environmental education, teaching children about ecology, conservation, and sustainable living through hands-on experiences.',
    highlights: ['Waterfall trekking', 'Bird watching with experts', 'Night safari experience', 'Plantation visit & cooking workshop', 'Wildlife photography workshop'],
    itinerary: [
      { day: 'Day 1', title: 'Welcome to the Ghats', description: 'Arrival, orientation, nature walk around campsite.' },
      { day: 'Day 2', title: 'Waterfall Trek', description: 'Trek to hidden waterfalls, swimming in natural pools.' },
      { day: 'Day 3', title: 'Wildlife Day', description: 'Guided bird watching, insect study, nature journaling.' },
      { day: 'Day 4', title: 'Adventure Activities', description: 'Zip-lining, rope course, team challenges.' },
      { day: 'Day 5', title: 'Cultural Immersion', description: 'Visit local village, learn traditional crafts.' },
      { day: 'Day 6', title: 'Night Safari', description: 'Daytime rest, evening night safari and stargazing.' },
      { day: 'Day 7', title: 'Farewell', description: 'Certificate ceremony, departure.' },
    ],
    inclusions: ['All meals', 'Accommodation', 'Expert naturalist guides', 'Activity equipment', 'Transport from Bangalore'],
    exclusions: ['Personal expenses', 'Travel insurance', 'Camera equipment'],
    ageGroup: '8–14 years',
    fitnessLevel: 'Easy to Moderate',
    safety: ['Trained staff at all times', 'Medical kit on every trek', 'Parent updates via WhatsApp', 'Safe water & hygiene protocols'],
    category: 'summer-camp',
  },
  {
    id: 'coorg-wilderness',
    title: 'Coorg Wilderness Camp',
    image: trek3,
    price: '₹11,999',
    priceNum: 11999,
    date: 'Jun 15 – Jun 21, 2026',
    duration: '7 Days',
    shortDescription: 'Riverside camping, waterfall trekking, and adventure sports in the Scotland of India.',
    overview: 'Experience the lush green paradise of Coorg. This camp offers a perfect blend of adventure, relaxation, and learning in one of India\'s most beautiful hill stations.',
    highlights: ['Abbey Falls trek', 'Coffee plantation tour', 'Kayaking & river rafting', 'Bamboo craft workshop', 'Campfire & cultural evening'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Coorg', description: 'Settle in, explore surroundings, evening bonfire.' },
      { day: 'Day 2', title: 'Waterfall Adventure', description: 'Trek to Abbey Falls and Iruppu Falls.' },
      { day: 'Day 3', title: 'Coffee Country', description: 'Coffee plantation tour, chocolate making workshop.' },
      { day: 'Day 4', title: 'Water Sports', description: 'Kayaking and river activities at Dubare.' },
      { day: 'Day 5', title: 'Forest Trek', description: 'Deep forest trek with nature guide.' },
      { day: 'Day 6', title: 'Adventure Day', description: 'Rock climbing, zip-lining, team challenges.' },
      { day: 'Day 7', title: 'Departure', description: 'Farewell breakfast, certificates, departure.' },
    ],
    inclusions: ['All meals', 'Homestay accommodation', 'Activity equipment', 'Expert guides', 'Transport from Bangalore'],
    exclusions: ['Personal expenses', 'Travel insurance', 'Souvenirs'],
    ageGroup: '8–15 years',
    fitnessLevel: 'Easy',
    safety: ['24/7 medical support', 'Life jackets for water activities', 'Certified adventure instructors'],
    category: 'summer-camp',
  },
  {
    id: 'skandagiri-night-trek',
    title: 'Skandagiri Night Trek',
    image: trek2,
    price: '₹2,499',
    priceNum: 2499,
    date: 'Every Weekend',
    duration: '1 Night',
    shortDescription: 'Experience the magic of a night trek to Skandagiri peak and witness a breathtaking sunrise above the clouds.',
    overview: 'Skandagiri, also known as Kalavara Durga, offers one of the most spectacular sunrise views near Bangalore. This night trek takes you through ancient ruins and forest trails to reach the summit at dawn.',
    highlights: ['Sunrise above the clouds', 'Ancient fort ruins exploration', 'Night sky photography', 'Forest trail experience', 'Group camping at summit'],
    itinerary: [
      { day: '11:00 PM', title: 'Assembly & Start', description: 'Meet at base village, safety briefing, begin trek.' },
      { day: '2:00 AM', title: 'Mid-point Rest', description: 'Rest at midpoint, snacks and hydration break.' },
      { day: '4:30 AM', title: 'Summit Arrival', description: 'Reach summit, set up for sunrise viewing.' },
      { day: '6:00 AM', title: 'Sunrise', description: 'Witness the magnificent sunrise above cloud cover.' },
      { day: '8:00 AM', title: 'Descent', description: 'Begin descent, breakfast at base, departure.' },
    ],
    inclusions: ['Expert trek guide', 'Flashlights', 'Snacks & breakfast', 'First aid kit', 'Transport from Bangalore'],
    exclusions: ['Personal trekking gear', 'Travel insurance', 'Camera equipment'],
    ageGroup: '12+ years',
    fitnessLevel: 'Moderate',
    safety: ['Experienced night trek guides', 'Group movement only', 'Emergency torch backup', 'First aid trained staff'],
    category: 'weekend-trek',
  },
  {
    id: 'bheemeshwari-riverside',
    title: 'Bheemeshwari Riverside',
    image: trek3,
    price: '₹3,499',
    priceNum: 3499,
    date: 'Sat–Sun',
    duration: '2 Days',
    shortDescription: 'Riverside camping, kayaking, and nature walks at the beautiful Bheemeshwari nature camp.',
    overview: 'Located on the banks of the Cauvery river, Bheemeshwari offers an incredible weekend getaway. Enjoy kayaking, coracle rides, nature walks, and riverside camping in a pristine natural setting.',
    highlights: ['Kayaking on river Cauvery', 'Coracle ride experience', 'Riverside camping', 'Bird watching', 'Fishing activities'],
    itinerary: [
      { day: 'Day 1 Morning', title: 'Departure from Bangalore', description: 'Early morning pickup, scenic drive to Bheemeshwari.' },
      { day: 'Day 1 Afternoon', title: 'Water Activities', description: 'Kayaking, coracle rides, and swimming.' },
      { day: 'Day 1 Evening', title: 'Camping Setup', description: 'Set up tents by the river, campfire dinner.' },
      { day: 'Day 2 Morning', title: 'Nature Walk', description: 'Guided nature walk, bird watching session.' },
      { day: 'Day 2 Afternoon', title: 'Return', description: 'Lunch, pack up, return to Bangalore.' },
    ],
    inclusions: ['All meals', 'Camping gear', 'Water activity equipment', 'Transport', 'Expert guides'],
    exclusions: ['Personal items', 'Travel insurance'],
    ageGroup: '8+ years (families welcome)',
    fitnessLevel: 'Easy',
    safety: ['Life jackets mandatory for water activities', 'Trained water sports instructors', 'First aid on site'],
    category: 'weekend-trek',
  },
  {
    id: 'savandurga-hill-trek',
    title: 'Savandurga Hill Trek',
    image: trek4,
    price: '₹1,999',
    priceNum: 1999,
    date: 'Every Saturday',
    duration: '1 Day',
    shortDescription: 'Conquer one of the largest monolith hills in Asia with panoramic views of the surrounding landscape.',
    overview: 'Savandurga is one of the largest monolith hills in Asia. This day trek offers stunning panoramic views, ancient temple ruins, and a challenging climb that rewards you with an unforgettable experience.',
    highlights: ['Asia\'s largest monolith climb', 'Panoramic valley views', 'Ancient temple exploration', 'Rocky terrain adventure', 'Manchanabele Dam viewpoint'],
    itinerary: [
      { day: '6:00 AM', title: 'Pickup from Bangalore', description: 'Early morning pickup, drive to Savandurga.' },
      { day: '7:30 AM', title: 'Trek Start', description: 'Warm-up, safety briefing, begin ascent.' },
      { day: '10:00 AM', title: 'Summit', description: 'Reach summit, explore ruins, photo session.' },
      { day: '11:30 AM', title: 'Descent', description: 'Begin careful descent through rocky terrain.' },
      { day: '1:00 PM', title: 'Lunch & Return', description: 'Lunch at local restaurant, return to Bangalore.' },
    ],
    inclusions: ['Transport from Bangalore', 'Trek guide', 'Breakfast & lunch', 'First aid', 'Photos'],
    exclusions: ['Personal gear', 'Travel insurance', 'Tips'],
    ageGroup: '10+ years',
    fitnessLevel: 'Moderate to Challenging',
    safety: ['Experienced rock climbing guides', 'Safety ropes on steep sections', 'Group movement protocol'],
    category: 'weekend-trek',
  },
];

export const summerCamps = allTreks.filter((t) => t.category === 'summer-camp');
export const weekendTreks = allTreks.filter((t) => t.category === 'weekend-trek');
