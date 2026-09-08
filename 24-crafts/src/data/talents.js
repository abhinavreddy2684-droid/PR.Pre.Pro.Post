import crafts from "./crafts";

const playbackSingers = [
  {
    id: 1,
    name: "Aarav Menon",
    craft: "Playback Singing",
    location: "Hyderabad, India",
    experience: "8 years",
    genres: ["Film", "Classical", "Romantic"],
    availability: "Available",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85",
    bio: "Playback vocalist known for expressive performances across Telugu and Hindi cinema.",
    experiences: [
      {
        period: "2021 — Present",
        title: "Playback Vocalist",
        company: "Independent · Telugu Cinema",
        description: "Recording lead and supporting vocals for feature films, original soundtracks and cinematic projects.",
        craft: "Playback Singing",
      },
    ],
  },
  {
    id: 2,
    name: "Meera Rao",
    craft: "Playback Singing",
    location: "Mumbai, India",
    experience: "11 years",
    genres: ["Film", "Indie", "Soul"],
    availability: "Available",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    bio: "Versatile vocalist with a warm tone and experience in feature films and original soundtracks.",
    experiences: [
      {
        period: "2022 — Present",
        title: "Playback Vocalist",
        company: "Feature Film Productions",
        description: "Lead vocals and studio recording across feature films and original soundtrack releases.",
        craft: "Playback Singing",
      },
      {
        period: "2018 — 2022",
        title: "Studio Vocalist",
        company: "Independent Music Productions",
        description: "Worked with composers and music directors on original songs, demos and commercial recordings.",
        craft: "Playback Singing",
      },
    ],
  },
  {
    id: 3,
    name: "Rohan Varma",
    craft: "Playback Singing",
    location: "Chennai, India",
    experience: "6 years",
    genres: ["Film", "Pop", "Classical"],
    availability: "Available",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
    bio: "Playback singer blending contemporary pop vocals with classical foundations.",
    experiences: [
      {
        period: "2023 — Present",
        title: "Playback Singer",
        company: "South Indian Film Productions",
        description: "Recording contemporary and classical-influenced vocals for feature films and soundtrack projects.",
        craft: "Playback Singing",
      },
      {
        period: "2020 — 2023",
        title: "Recording Artist",
        company: "Independent Studios",
        description: "Created vocal arrangements and recorded original music for independent productions.",
        craft: "Playback Singing",
      },
      {
        period: "2018 — 2020",
        title: "Live Vocalist",
        company: "Live & Stage Productions",
        description: "Performed across live showcases while developing a studio-focused playback practice.",
        craft: "Playback Singing",
      },
    ],
  },
  {
    id: 4,
    name: "Ananya Iyer",
    craft: "Playback Singing",
    location: "Bengaluru, India",
    experience: "9 years",
    genres: ["Film", "Folk", "Acoustic"],
    availability: "On request",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=85",
    bio: "Singer and live performer experienced in cinematic, folk and acoustic arrangements.",
    experiences: [
      {
        period: "2024 — Present",
        title: "Playback Singer",
        company: "Feature Film & Streaming Projects",
        description: "Recording cinematic vocals for feature films and streaming productions across multiple languages.",
        craft: "Playback Singing",
      },
      {
        period: "2021 — 2024",
        title: "Studio Vocalist",
        company: "Music Direction Studios",
        description: "Collaborated with composers on vocal production, scratch tracks and final soundtrack recordings.",
        craft: "Playback Singing",
      },
      {
        period: "2019 — 2021",
        title: "Live Performer",
        company: "Independent Stage Productions",
        description: "Performed acoustic and folk-inspired sets while building a professional recording portfolio.",
        craft: "Playback Singing",
      },
      {
        period: "2017 — 2019",
        title: "Session Vocalist",
        company: "Independent Recording Projects",
        description: "Contributed vocals to independent songs, demos and short-form visual productions.",
        craft: "Playback Singing",
      },
    ],
  },
  {
    id: 5,
    name: "Kabir Shah",
    craft: "Playback Singing",
    location: "Hyderabad, India",
    experience: "13 years",
    genres: ["Film", "Sufi", "Romantic"],
    availability: "Available",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
    bio: "Experienced male vocalist specialising in emotionally driven cinematic performances.",
  },
  {
    id: 6,
    name: "Ishita Kapoor",
    craft: "Playback Singing",
    location: "Pune, India",
    experience: "7 years",
    genres: ["Film", "Pop", "Jazz"],
    availability: "Available",
    image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=900&q=85",
    bio: "Contemporary vocalist with a polished studio sound and strong live performance experience.",
  },
  {
    id: 7,
    name: "Vikram Das",
    craft: "Playback Singing",
    location: "Kochi, India",
    experience: "10 years",
    genres: ["Film", "Melody", "Devotional"],
    availability: "On request",
    image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=85",
    bio: "Playback vocalist with a distinctive melodic style and multilingual repertoire.",
  },
  {
    id: 8,
    name: "Nisha Varma",
    craft: "Playback Singing",
    location: "Chennai, India",
    experience: "5 years",
    genres: ["Film", "Indie", "Soul"],
    availability: "Available",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=85",
    bio: "Emerging vocalist bringing a modern indie sensibility to cinematic music.",
  },
];

const names = [
  ["Arjun Mehta", "Priya Nair", "Ritvik Rao"],
  ["Dev Malhotra", "Ira Kapoor", "Karan Bose"],
  ["Aditya Sen", "Tara Menon", "Neil Varma"],
  ["Kabir Anand", "Maya Iyer", "Rishi Das"],
  ["Vihaan Shah", "Anika Rao", "Samar Khan"],
  ["Arnav Kapoor", "Diya Menon", "Rohan Nair"],
  ["Ayaan Mehta", "Sara Bose", "Yash Varma"],
  ["Reyansh Das", "Kiara Shah", "Manav Rao"],
];

const locations = [
  "Mumbai, India",
  "Hyderabad, India",
  "Chennai, India",
  "Bengaluru, India",
  "Pune, India",
  "Kochi, India",
  "Delhi, India",
  "Kolkata, India",
];

const images = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85",
];

const genres = ["Film", "Indie", "Commercial", "Classical", "Contemporary", "Experimental"];
const availability = ["Available", "Available", "On request"];

const generatedTalents = crafts
  .filter((craft) => craft.title !== "Playback Singing")
  .flatMap((craft, craftIndex) =>
    craft.talentTypes.slice(0, 3).map((role, index) => {
      const person = names[craftIndex % names.length][index];
      const id = 100 + craftIndex * 3 + index;

      return {
        id,
        name: person,
        craft: craft.title,
        role,
        location: locations[(craftIndex + index) % locations.length],
        experience: `${5 + ((craftIndex + index) % 9)} years`,
        genres: [
          genres[(craftIndex + index) % genres.length],
          genres[(craftIndex + index + 2) % genres.length],
          genres[(craftIndex + index + 4) % genres.length],
        ],
        availability: availability[(craftIndex + index) % availability.length],
        image: images[(craftIndex + index) % images.length],
        bio: `${role} with a production-focused practice and experience across independent and commercial work.`,
      };
    }),
  );

export default [...playbackSingers, ...generatedTalents];
