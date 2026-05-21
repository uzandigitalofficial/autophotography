export type PresetDefinition = {
  id: string;
  name: string;
  lighting: string;
  camera: string;
  environment: string;
  mood: string;
  negativeAdditions: string;
  emoji: string;
  description: string;
};

export const STYLE_PRESETS: Record<string, PresetDefinition> = {
  RAIN_NEON_CINEMATIC: {
    id: "RAIN_NEON_CINEMATIC",
    name: "Rain Neon Cinematic",
    emoji: "🌧️",
    description: "Tokyo nights, neon-soaked wet streets",
    lighting:
      "neon sign reflections on wet asphalt, chromatic aberration, practical light sources from storefronts, deep shadows with colour-graded fill, no harsh flash",
    camera:
      "anamorphic 40mm lens, low hero angle 30cm from ground, slight dutch tilt 2 degrees, foreground rain bokeh, lens flares from neon sources",
    environment:
      "urban night scene, rain-soaked street, Tokyo or Seoul aesthetic, wet reflections doubling the car, steam from manholes, neon signage in background",
    mood: "moody, cinematic, editorial, brooding luxury",
    negativeAdditions: "daytime, sunshine, dry road, studio",
  },
  DESERT_HERO_SHOT: {
    id: "DESERT_HERO_SHOT",
    name: "Desert Hero Shot",
    emoji: "🏜️",
    description: "Salt flats, endless horizon, harsh sun",
    lighting:
      "harsh directional sunlight, deep shadow side, golden dust haze, sun flare at horizon line",
    camera: "24mm wide angle, low angle 20cm ground, dramatic sky compression, polarised sky",
    environment:
      "salt flats or desert road, cracked earth, heat shimmer, vast sky, no other vehicles",
    mood: "epic, cinematic, power, isolation",
    negativeAdditions: "city, rain, night, people",
  },
  LUXURY_STUDIO_LIGHTBOX: {
    id: "LUXURY_STUDIO_LIGHTBOX",
    name: "Luxury Studio Lightbox",
    emoji: "💡",
    description: "Commercial-grade studio perfection",
    lighting:
      "large soft box overhead, two rim lights at 45 degrees rear, reflection strips on bodywork, pure white or dark gradient cyclorama",
    camera: "85mm three-quarter front angle, eye level, studio perfect symmetry",
    environment:
      "seamless studio background, reflective floor, no environmental distractions",
    mood: "clean, premium, product photography, commercial",
    negativeAdditions: "outdoor, environmental, gritty, dirty",
  },
  OFFROAD_DOCUMENTARY: {
    id: "OFFROAD_DOCUMENTARY",
    name: "Offroad Documentary",
    emoji: "🌲",
    description: "Raw terrain, mud, authentic adventure",
    lighting:
      "overcast natural light, dust particle volumetric, gritty real-world lighting, no studio treatment",
    camera: "35mm, handheld feel, slight motion, dust on lens, environmental perspective",
    environment:
      "dirt trail, rocky terrain, mud spray, forest or mountain pass, authentic terrain",
    mood: "raw, authentic, adventurous, documentary",
    negativeAdditions: "studio, clean, urban, perfect lighting",
  },
  TUNNEL_MOTION_BLUR: {
    id: "TUNNEL_MOTION_BLUR",
    name: "Tunnel Motion Blur",
    emoji: "⚡",
    description: "Speed lines, light streaks, pure velocity",
    lighting:
      "tunnel strip lights streaking, ambient undercar glow, motion blur on background lights, sharp car body",
    camera: "panning shot technique, 50mm, background blur motion lines, car sharp",
    environment: "highway tunnel, light streaks, speed blur, industrial concrete",
    mood: "speed, motion, dynamic, power",
    negativeAdditions: "static, parked, outdoor nature",
  },
  GOLDEN_HOUR_SHOWCASE: {
    id: "GOLDEN_HOUR_SHOWCASE",
    name: "Golden Hour Showcase",
    emoji: "🌅",
    description: "Warm sunset, coastal roads, aspirational",
    lighting:
      "warm orange-gold hour sun at 10 degrees, strong side key light, soft warm shadow fill, lens flare kiss",
    camera: "50mm three-quarter rear angle, slight elevation, sky in frame",
    environment: "coastal road, empty mountain pass, sunset sky, warm tones",
    mood: "aspirational, lifestyle, warm, premium",
    negativeAdditions: "night, rain, cold tones, urban",
  },
  INDUSTRIAL_URBAN_RAW: {
    id: "INDUSTRIAL_URBAN_RAW",
    name: "Industrial Urban Raw",
    emoji: "🏭",
    description: "Parking garages, concrete, underground grit",
    lighting:
      "sodium street lamps, harsh overhead industrial lights, strong contrast, gritty shadows",
    camera: "35mm, low angle, slight tilt, raw editorial framing",
    environment:
      "parking garage, industrial estate, concrete brutalist architecture, graffiti",
    mood: "gritty, raw, editorial, underground",
    negativeAdditions: "luxury, clean studio, nature",
  },
  DEALERSHIP_CLEAN_LISTING: {
    id: "DEALERSHIP_CLEAN_LISTING",
    name: "Dealership Clean Listing",
    emoji: "🚘",
    description: "True-to-life, accurate, listing-ready",
    lighting:
      "even overcast exterior light, no harsh shadows, accurate colour representation",
    camera: "50mm three-quarter front, eye level, no tilt, wide enough to show full car",
    environment:
      "clean dealership lot or neutral showroom exterior, plain background, no distractions",
    mood: "clean, informational, true-to-life, listing",
    negativeAdditions: "dramatic, moody, blur, lens flare, distortion",
  },
};

export const NEGATIVE_PROMPT_BASE =
  "cartoon, illustration, anime, CGI render, 3D model, distorted body panels, wrong badge, hallucinated model, extra wheels, missing wheels, deformed chassis, text overlay, watermark, blurry car body, melted metal, unrealistic reflections, floating elements";
