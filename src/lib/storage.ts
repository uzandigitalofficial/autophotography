import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Lazy-initialize S3 client so missing env vars don't crash at module load time
let _s3: S3Client | null = null;
function getS3() {
  if (!_s3) {
    _s3 = new S3Client({
      region: "auto",
      endpoint: process.env.STORAGE_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.STORAGE_ACCESS_KEY!,
        secretAccessKey: process.env.STORAGE_SECRET_KEY!,
      },
    });
  }
  return _s3;
}

function getBucket() {
  return process.env.STORAGE_BUCKET!;
}

function getPublicUrl() {
  return process.env.STORAGE_PUBLIC_URL!;
}

export async function uploadImageToStorage(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<{ publicUrl: string; storagePath: string }> {
  const storagePath = `generations/${filename}`;

  await getS3().send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: storagePath,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  const publicUrl = `${getPublicUrl()}/${storagePath}`;
  return { publicUrl, storagePath };
}

export async function getPresignedUrl(storagePath: string): Promise<string> {
  return getSignedUrl(
    getS3(),
    new GetObjectCommand({ Bucket: getBucket(), Key: storagePath }),
    { expiresIn: 3600 }
  );
}
