-- Seeds the database with exactly the content currently live on the site (ported from
-- src/data/homepageContent.ts and the per-page JSX it replaces), so the DB-backed site
-- renders identically to the pre-migration one on first load.

insert into public.site_settings (id, phone, whatsapp_number, email, address_locality, address_region, social_instagram, social_youtube, social_facebook, social_linkedin)
values (true, '+91 98765 43210', '919876543210', 'info@ayanaoutdoors.com', 'Bengaluru', 'Karnataka',
        'https://instagram.com/ayanaoutdoors', 'https://youtube.com/@ayanaoutdoors',
        'https://facebook.com/ayanaoutdoors', 'https://linkedin.com/company/ayanaoutdoors');

insert into public.hero_content (id, eyebrow, headline, headline_highlight, subheadline, highlights, cta_primary_label, cta_primary_link, cta_secondary_label, cta_secondary_link, cta_tertiary_label, cta_tertiary_link)
values (true, 'Helping Children Grow Beyond the Classroom', 'Outdoor Learning', 'for Children',
        'Building Confidence, Leadership and Life Skills Through Trekking, Travel and Outdoor Experiences.',
        array['Western Ghats Adventures', 'Children & Parents Treks', 'School Outdoor Learning Programs'],
        'Find My Child''s Adventure', '/adventures', 'Talk to Us', '/contact', 'Safety is Our Priority', '/safety-care');

insert into public.impact_stats (value, label, description, sort_order) values
  ('11+', 'Years Experience', 'Outdoor learning journeys shaped with care.', 0),
  ('8000+', 'Participants', 'Children, families and groups guided through adventure.', 1),
  ('2000+', 'Children in Himalayas', 'Young explorers introduced to bigger mountain classrooms.', 2),
  ('200+', 'Programs Conducted', 'Treks, camps, workshops and learning-led experiences.', 3),
  ('School & Family', 'Programs', 'Designed for classrooms, parents and growing children.', 4);

insert into public.adventures (title, image_path, description, duration, difficulty, age_group, learn_link, enquiry_link, sort_order) values
  ('Every Sunday Treks', '/images/trek-4.jpg', 'Regular weekend outdoor learning for children who need fresh air, movement and confidence-building routines.', '1 Day', 'Easy to Moderate', '8+ years', '/adventures', '/contact', 0),
  ('Western Ghats Treks', '/images/camp-hero.jpg', 'Nature-based education through forests, biodiversity trails and guided observation in the Western Ghats.', '2-7 Days', 'Easy to Moderate', '8-16 years', '/adventures', '/contact', 1),
  ('Monsoon Special Treks', '/images/trek-3.jpg', 'Rain-season adventure learning with route readiness, teamwork, trail discipline and environmental awareness.', '1-2 Days', 'Moderate', '10+ years', '/adventures', '/contact', 2),
  ('Parents & Children Treks', '/images/contact-image.jpg', 'Shared outdoor experiences where parents and children build trust, communication and lifelong memories.', '1-2 Days', 'Easy', 'Families', '/who-we-journey-with', '/contact', 3),
  ('Girls Only Treks', '/images/trek-1.jpg', 'Supportive trail environments for courage, belonging, independence and confident outdoor participation.', '1-3 Days', 'Easy to Moderate', '8-16 years', '/adventures', '/contact', 4),
  ('Night Out Camping', '/images/trek-2.jpg', 'Campfire learning, sky watching, basic outdoor responsibility and screen-free social confidence.', '1 Night', 'Beginner Friendly', '10+ years', '/adventures', '/contact', 5),
  ('Himalayan Expeditions', '/images/trek-1.jpg', 'Progressive mountain journeys focused on resilience, leadership, preparation and self-belief.', '7-8 Days', 'Moderate', '10-16 years', '/adventures', '/contact', 6),
  ('Special Events & Workshops', '/images/trek-4.jpg', 'Outdoor education sessions for schools, communities and families who want real-world learning beyond classrooms.', 'Half Day+', 'Custom', 'Schools & Families', '/adventures', '/contact', 7);

insert into public.why_ayana_items (title, description, link, sort_order) values
  ('Real-World Learning', 'Children experience forests, rivers, mountains, communities and different landscapes directly—not only through books or screens.', '/adventures', 0),
  ('Confidence & Resilience', 'Outdoor challenges help children overcome fear, adapt to unfamiliar situations and develop courage, independence and self-belief.', '/adventures', 1),
  ('Life & Survival Skills', 'Children learn observation, decision-making, teamwork, basic survival skills and practical common sense through guided experiences.', '/safety-care', 2),
  ('Physical, Mental & Emotional Growth', 'Trekking and travel strengthen the body, calm the mind and help children become emotionally balanced and mentally prepared.', '/who-we-journey-with', 3),
  ('Digital Balance & Deeper Connections', 'Time outdoors gives children a meaningful break from screens and helps them connect with nature, friends, families and themselves.', '/resources', 4),
  ('Culture, Nature & Responsible Citizenship', 'Children discover local communities, traditions, geography and biodiversity—helping them respect their roots, society and the natural world.', '/sankalpa', 5);

insert into public.journey_with_items (title, description, link, sort_order) values
  ('👧 Children', 'Outdoor learning experiences for children aged 5–18, designed to build confidence, leadership, independence and a lifelong love for nature.', '/who-we-journey-with', 0),
  ('👨‍👩‍👧 Families', 'Shared outdoor experiences where children and parents reconnect, explore together and create meaningful memories through nature.', '/who-we-journey-with', 1),
  ('🏫 Schools & Teachers', 'Experiential outdoor learning programs that complement classroom education through nature, teamwork and real-world learning.', '/who-we-journey-with', 2);

insert into public.testimonials (title, label, description, link, sort_order) values
  ('Parent Reviews', 'Family trust', 'Hear how parents see confidence, independence, safety and meaningful growth after Ayana Outdoors experiences.', '/contact', 0),
  ('Children''s Experiences', 'Child voice', 'Listen to children share courage, friendships, leadership moments and outdoor memories from their journeys.', '/gallery', 1),
  ('Video Stories', 'Watch moments', 'Watch real trail energy, parent trust and child growth through approved video stories.', '/gallery', 2),
  ('School & Teacher Feedback', 'Educator voice', 'Read how schools and teachers value outdoor learning as a powerful extension of classroom education.', '/resources', 3);

insert into public.gallery_items (title, image_path, description, link, sort_order) values
  ('Photos', '/images/trek-1.jpg', 'Trail smiles, camp moments and outdoor learning snapshots.', '/gallery', 0),
  ('Videos', '/images/trek-2.jpg', 'Motion-rich memories from treks, camps and guided group experiences.', '/gallery', 1),
  ('Himalayan Memories', '/images/trek-1.jpg', 'Big mountain classrooms that build resilience and self-belief.', '/adventures', 2),
  ('Beach Camps', '/images/contact-image.jpg', 'Coastal outdoor learning and camp experiences require client-confirmed program details.', '/contact', 3),
  ('Western Ghats Adventures', '/images/camp-hero.jpg', 'Biodiversity, waterfalls, forest walks and nature-based learning.', '/adventures', 4);

insert into public.gallery_photos (title, image_path, sort_order) values
  ('Himalayan Base Camp', '/images/trek-1.jpg', 0),
  ('Skandagiri Night Trek', '/images/trek-2.jpg', 1),
  ('Forest Trail Adventure', '/images/trek-3.jpg', 2),
  ('Savandurga Summit', '/images/trek-4.jpg', 3),
  ('Western Ghats Explorer', '/images/camp-hero.jpg', 4),
  ('Campfire Moments', '/images/contact-image.jpg', 5);

insert into public.media_items (title, description, link, sort_order) values
  ('Instagram Feed', 'Follow field updates, outdoor learning moments and community stories.', 'https://instagram.com/ayanaoutdoors', 0),
  ('Latest Reels', 'Short trail stories, camp energy and confidence-building moments.', 'https://instagram.com/ayanaoutdoors', 1),
  ('YouTube Videos', 'Longer video stories and program films from Ayana Outdoors.', 'https://youtube.com/@ayanaoutdoors', 2),
  ('News Articles', 'Press article links require client confirmation before publication.', '/contact', 3),
  ('Media Coverage', 'Confirmed media mentions can be added here with source links.', '/contact', 4);

insert into public.founder_facts (title, subtitle, sort_order) values
  ('NIM Certified Trek Leader', 'Nehru Institute of Mountaineering', 0),
  ('12+ Years Working with Children', null, 1),
  ('2000+ Children Taken to the Himalayas', null, 2);

insert into public.faq_items (question, answer, sort_order) values
  ('What is the minimum age to join Ayana Outdoors?', 'Our programs are designed for children aged 5–18 years. We also organise selected family adventures where younger children can participate with their parents.', 0),
  ('Is trekking during the monsoon safe for children?', 'Yes. Our monsoon programs are carefully planned with safety as the highest priority. Children experience nature in a safe environment while learning confidence, resilience and respect for the outdoors.', 1),
  ('Can parents join the programs?', 'Yes. We offer dedicated family adventures where parents and children explore, learn and create meaningful memories together.', 2),
  ('Are female trek leaders available?', 'Yes. Our team includes experienced female trek leaders and volunteers, ensuring every child feels safe, supported and comfortable throughout the journey.', 3),
  ('Can I speak with my child during the program?', 'Yes. Whenever network connectivity is available, parents can speak or video call their child. Our leaders also share regular updates with parents throughout the journey.', 4),
  ('What should my child bring?', 'A detailed packing checklist is shared before every program, so parents know exactly what to prepare based on the destination and season.', 5),
  ('Does my child need previous trekking experience?', 'No. Most of our programs are beginner-friendly and designed to help children gradually build confidence, outdoor skills and a love for nature.', 6),
  ('What if my child has travel sickness or a medical condition?', 'Please inform us during registration. Our leaders are trained to support common situations, and we plan activities with children''s comfort and well-being in mind.', 7),
  ('Is junk food allowed during the trip?', 'We encourage healthy eating during our programs. Nutritious meals and plenty of water help children stay active, energetic and enjoy the outdoor experience.', 8),
  ('How often do you conduct programs?', 'We organise outdoor learning experiences throughout the year, including weekend adventures, school programs, Western Ghats explorations, workshops and Himalayan expeditions.', 9);

insert into public.additional_faq_questions (question, sort_order) values
  ('What is the leader-to-child ratio?', 0),
  ('What happens during bad weather?', 1),
  ('How do you handle emergencies?', 2),
  ('Are meals vegetarian and hygienic?', 3),
  ('Can children carry mobile phones?', 4),
  ('How are girls'' safety and privacy managed?', 5),
  ('What if my child feels homesick?', 6),
  ('How do schools customise outdoor programs?', 7),
  ('Do you provide transport from school?', 8),
  ('What happens if a program is postponed due to weather?', 9);

insert into public.contact_options (title, description, action, link, external, sort_order) values
  ('Call Us', 'Speak with the team about age, readiness and the right program fit.', '+91 98765 43210', 'tel:+919876543210', true, 0),
  ('WhatsApp', 'Ask for trek suggestions and child-safe outdoor learning guidance.', 'Message Ayana Outdoors', 'https://wa.me/919876543210?text=Plan%20a%20safe%20outdoor%20learning%20program%20for%20my%20child', true, 1),
  ('Email', 'Share school, family or custom program requirements.', 'info@ayanaoutdoors.com', 'mailto:info@ayanaoutdoors.com', true, 2),
  ('Join Our Community', 'Stay connected with updates, learning resources and upcoming outdoor experiences.', 'Join Ayana Outdoors', '/contact', false, 3);
