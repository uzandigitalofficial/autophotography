import OpenAI from "openai";
import { uploadImageToStorage } from "./storage";

let _openai: OpenAI | null = null;
function getOpenAI() {
  if (!_openai) _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  return _openai;
}

export type GenerationResult = {
  imageUrl: string;
  imagePath: string;
  replicateId: string; // field name kept for DB schema compatibility — holds openai generation ref
};

export async function generateCarImage(
  finalPrompt: string,
  _negativePrompt: string, // gpt-image-1 has no separate negative_prompt — appended to main prompt below
  generationId: string
): Promise<GenerationResult> {
  // gpt-image-1 does not accept a negative_prompt parameter.
  // Append "Do not include" constraints directly to the main prompt.
  const fullPrompt = `${finalPrompt}. Do not include: cartoon style, CGI render, 3D model, distorted body panels, wrong badge, hallucinated modifications, extra wheels, deformed chassis, text overlay, watermark, blurry car body.`;

  // Use type assertion to handle the union return type (stream vs non-stream)
  const response = (await getOpenAI().images.generate({
    model: "gpt-image-1",
    prompt: fullPrompt,
    n: 1,
    size: "1536x1024",
    quality: "medium",
    output_format: "png",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)) as { data: Array<{ b64_json?: string }> };

  // gpt-image-1 returns base64-encoded image data in b64_json
  const b64 = response.data[0]?.b64_json;
  if (!b64) {
    throw new Error("gpt-image-1 returned no image data");
  }

  const imageBuffer = Buffer.from(b64, "base64");

  const { publicUrl, storagePath } = await uploadImageToStorage(
    imageBuffer,
    `${generationId}.png`,
    "image/png"
  );

  return {
    imageUrl: publicUrl,
    imagePath: storagePath,
    replicateId: generationId,
  };
}
