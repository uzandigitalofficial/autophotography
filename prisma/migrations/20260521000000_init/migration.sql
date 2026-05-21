-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO', 'UNLIMITED');

-- CreateEnum
CREATE TYPE "GenerationStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "StylePreset" AS ENUM ('RAIN_NEON_CINEMATIC', 'DESERT_HERO_SHOT', 'LUXURY_STUDIO_LIGHTBOX', 'OFFROAD_DOCUMENTARY', 'TUNNEL_MOTION_BLUR', 'GOLDEN_HOUR_SHOWCASE', 'INDUSTRIAL_URBAN_RAW', 'DEALERSHIP_CLEAN_LISTING');

-- CreateEnum
CREATE TYPE "CreditReason" AS ENUM ('SIGNUP_BONUS', 'GENERATION_USED', 'PURCHASE', 'SUBSCRIPTION', 'REFUND', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatarUrl" TEXT,
    "credits" INTEGER NOT NULL DEFAULT 3,
    "plan" "Plan" NOT NULL DEFAULT 'FREE',
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Generation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rawPrompt" TEXT NOT NULL,
    "stylePreset" "StylePreset" NOT NULL,
    "carMake" TEXT,
    "carModel" TEXT,
    "carYear" INTEGER,
    "imageUrl" TEXT,
    "thumbnailUrl" TEXT,
    "imagePath" TEXT,
    "replicateId" TEXT,
    "apiModel" TEXT NOT NULL DEFAULT 'black-forest-labs/flux-dev',
    "promptTokens" INTEGER,
    "status" "GenerationStatus" NOT NULL DEFAULT 'PENDING',
    "errorMessage" TEXT,
    "promptHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Generation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StructuredPrompt" (
    "id" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,
    "subjectLock" TEXT NOT NULL,
    "cameraSystem" TEXT NOT NULL,
    "lightingDesign" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "materials" TEXT NOT NULL,
    "cinematicStyle" TEXT NOT NULL,
    "qualityFlags" TEXT NOT NULL,
    "finalPrompt" TEXT NOT NULL,
    "negativePrompt" TEXT NOT NULL DEFAULT 'cartoon, illustration, distorted proportions, wrong brand badge, CGI render, watermark, text',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StructuredPrompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "delta" INTEGER NOT NULL,
    "reason" "CreditReason" NOT NULL,
    "referenceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreset" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "preset" "StylePreset" NOT NULL,
    "customRules" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPreset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeSubscriptionId_key" ON "User"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "User_clerkId_idx" ON "User"("clerkId");

-- CreateIndex
CREATE INDEX "Generation_userId_idx" ON "Generation"("userId");

-- CreateIndex
CREATE INDEX "Generation_promptHash_idx" ON "Generation"("promptHash");

-- CreateIndex
CREATE INDEX "Generation_status_idx" ON "Generation"("status");

-- CreateIndex
CREATE UNIQUE INDEX "StructuredPrompt_generationId_key" ON "StructuredPrompt"("generationId");

-- CreateIndex
CREATE INDEX "CreditLog_userId_idx" ON "CreditLog"("userId");

-- AddForeignKey
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StructuredPrompt" ADD CONSTRAINT "StructuredPrompt_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "Generation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditLog" ADD CONSTRAINT "CreditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreset" ADD CONSTRAINT "UserPreset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
