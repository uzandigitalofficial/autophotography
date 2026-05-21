import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.STORAGE_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY!,
    secretAccessKey: process.env.STORAGE_SECRET_KEY!,
  },
});

const BUCKET = process.env.STORAGE_BUCKET!;
const PUBLIC_URL = process.env.STORAGE_PUBLIC_URL!;

export async function uploadImageToStorage(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<{ publicUrl: string; storagePath: string }> {
  const storagePath = `generations/${filename}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: storagePath,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  const publicUrl = `${PUBLIC_URL}/${storagePath}`;
  return { publicUrl, storagePath };
}

export async function getPresignedUrl(storagePath: string): Promise<string> {
  return getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: BUCKET, Key: storagePath }),
    { expiresIn: 3600 }
  );
}
