import OpenAI from "openai";
import { STYLE_PRESETS, NEGATIVE_PROMPT_BASE } from "./presets";
import { StylePreset } from "@prisma/client";
import crypto from "crypto";

let _openai: OpenAI | null = null;
function getOpenAI() {
  if (!_openai) _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  return _openai;
}

export type StructuredPromptOutput = {
  subjectLock: string;
  cameraSystem: string;
  lightingDesign: string;
  environment: string;
  materials: string;
  cinematicStyle: string;
  qualityFlags: string;
  finalPrompt: string;
  negativePrompt: string;
  carMake: string | null;
  carModel: string | null;
  carYear: number | null;
  detectedPreset: StylePreset;
  promptHash: string;
  tokensUsed: number;
};

const SYSTEM_PROMPT = `You are a Car Visual Director AI. Your ONLY job is to convert a user's casual car prompt into a precise, structured cinematic automotive photography prompt.

RULES:
- Never invent car modifications not stated by user
- Always preserve exact car identity (make, model, year if stated)
- Never hallucinate wrong badges, body kits, or specs
- Output MUST be valid JSON only — no extra text, no markdown fences, no explanations
- Be precise and technical, not vague or creative
- Minimise tokens while maximising prompt quality`;

function buildUserMessage(rawPrompt: string, presetHint: string): string {
  return `Convert this prompt: "${rawPrompt}"
Style preset context: ${presetHint}
Return ONLY valid JSON (no markdown, no extra text) matching this exact schema:
{
  "carMake": string | null,
  "carModel": string | null,
  "carYear": number | null,
  "detectedPreset": "RAIN_NEON_CINEMATIC" | "DESERT_HERO_SHOT" | "LUXURY_STUDIO_LIGHTBOX" | "OFFROAD_DOCUMENTARY" | "TUNNEL_MOTION_BLUR" | "GOLDEN_HOUR_SHOWCASE" | "INDUSTRIAL_URBAN_RAW" | "DEALERSHIP_CLEAN_LISTING",
  "subjectLock": "exact car description preserving identity — make, model, year, exact colour, no invented mods",
  "cameraSystem": "lens focal length mm, angle of shot, framing description",
  "lightingDesign": "specific lighting setup — sources, direction, colour temperature",
  "environment": "full environment and background description",
  "materials": "paint finish, reflectivity, surface material accuracy notes",
  "qualityFlags": "photorealism keywords, resolution, accuracy requirements"
}`;
}

export async function buildStructuredPrompt(
  rawPrompt: string,
  forcePreset?: StylePreset
): Promise<StructuredPromptOutput> {
  const presetHint = forcePreset
    ? (STYLE_PRESETS[forcePreset]?.name ?? "Rain Neon Cinematic")
    : detectPresetHint(rawPrompt);

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4.1-mini",
    max_tokens: 512,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserMessage(rawPrompt, presetHint) },
    ],
  });

  const responseText = response.choices[0]?.message?.content ?? "";

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(responseText);
  } catch {
    throw new Error(`Prompt engine returned invalid JSON: ${responseText.slice(0, 200)}`);
  }

  const preset =
    forcePreset ??
    (parsed.detectedPreset as StylePreset) ??
    "RAIN_NEON_CINEMATIC";
  const presetDef = STYLE_PRESETS[preset] ?? STYLE_PRESETS["RAIN_NEON_CINEMATIC"];

  const finalPrompt = [
    `${parsed.subjectLock},`,
    `professional automotive photography,`,
    `${presetDef.lighting},`,
    `${presetDef.camera},`,
    `${parsed.lightingDesign},`,
    `${parsed.environment},`,
    `${parsed.materials},`,
    `${parsed.qualityFlags},`,
    `shot on Phase One IQ4, ultra high resolution, photorealistic, cinematic`,
  ].join(" ");

  const negativePrompt = [NEGATIVE_PROMPT_BASE, presetDef.negativeAdditions].join(", ");

  const promptHash = crypto
    .createHash("sha256")
    .update(`${rawPrompt.toLowerCase().trim()}::${preset}`)
    .digest("hex");

  const tokensUsed =
    (response.usage?.prompt_tokens ?? 0) + (response.usage?.completion_tokens ?? 0);

  return {
    subjectLock: String(parsed.subjectLock ?? ""),
    cameraSystem: String(parsed.cameraSystem ?? ""),
    lightingDesign: String(parsed.lightingDesign ?? ""),
    environment: String(parsed.environment ?? ""),
    materials: String(parsed.materials ?? ""),
    qualityFlags: String(parsed.qualityFlags ?? ""),
    cinematicStyle: presetDef.name,
    detectedPreset: preset,
    finalPrompt,
    negativePrompt,
    carMake: parsed.carMake ? String(parsed.carMake) : null,
    carModel: parsed.carModel ? String(parsed.carModel) : null,
    carYear: parsed.carYear ? Number(parsed.carYear) : null,
    promptHash,
    tokensUsed,
  };
}

function detectPresetHint(rawPrompt: string): string {
  const lower = rawPrompt.toLowerCase();
  if (lower.includes("rain") || lower.includes("neon") || lower.includes("night"))
    return STYLE_PRESETS.RAIN_NEON_CINEMATIC.name;
  if (lower.includes("desert") || lower.includes("sand") || lower.includes("off-road"))
    return STYLE_PRESETS.DESERT_HERO_SHOT.name;
  if (lower.includes("studio") || lower.includes("lightbox") || lower.includes("white"))
    return STYLE_PRESETS.LUXURY_STUDIO_LIGHTBOX.name;
  if (lower.includes("tunnel") || lower.includes("motion") || lower.includes("speed"))
    return STYLE_PRESETS.TUNNEL_MOTION_BLUR.name;
  if (lower.includes("golden") || lower.includes("sunset") || lower.includes("sunrise"))
    return STYLE_PRESETS.GOLDEN_HOUR_SHOWCASE.name;
  if (lower.includes("listing") || lower.includes("dealer"))
    return STYLE_PRESETS.DEALERSHIP_CLEAN_LISTING.name;
  return STYLE_PRESETS.RAIN_NEON_CINEMATIC.name;
}
