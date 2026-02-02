import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import sharp from "sharp";

const execFileAsync = promisify(execFile);

const assets = [
  {
    input: "public/images/IMG_4516.JPG",
    output: "reef-aquarium-sump-cabinet",
  },
  {
    input: "public/images/IMG_5599.JPG",
    output: "reef-aquarium-white-cabinet",
  },
  {
    input: "public/images/IMG_6521.JPG",
    output: "reef-aquarium-black-cabinet",
  },
  {
    input: "public/images/IMG_6540.JPG",
    output: "sump-filtration-equipment",
  },
  {
    input: "public/images/PHOTO-2023-12-21-10-43-07.jpg",
    output: "reef-aquarium-coral-closeup",
  },
  {
    input: "public/images/IMG_5641.HEIC",
    output: "reef-aquarium-sump-maintenance",
  },
  {
    input: "public/images/IMG_5748.HEIC",
    output: "living-room-reef-aquarium",
  },
];

const outputDir = path.resolve("public/images");
const maxWidth = 2000;
const quality = 82;

async function loadSharp(inputPath, name, forceSips = false) {
  if (!forceSips) {
    try {
      await sharp(inputPath).metadata();
      return sharp(inputPath);
    } catch (error) {
      // Fall through to sips conversion.
    }
  }

  const tempPath = path.resolve("public/images", `${name}-temp.jpg`);
  await execFileAsync("sips", [
    "-s",
    "format",
    "jpeg",
    inputPath,
    "--out",
    tempPath,
  ]);
  return sharp(tempPath);
}

async function processAsset({ input, output }) {
  const inputPath = path.resolve(input);
  const outputPath = path.join(outputDir, `${output}.webp`);

  const isHeic = inputPath.toLowerCase().endsWith(".heic");
  let pipeline = await loadSharp(inputPath, output, isHeic);

  try {
    await pipeline
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outputPath);
  } catch (error) {
    pipeline = await loadSharp(inputPath, output, true);
    await pipeline
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outputPath);
  }

  console.log(`Optimized: ${outputPath}`);
}

async function run() {
  for (const asset of assets) {
    await processAsset(asset);
  }
}

run().catch((error) => {
  console.error("Image optimisation failed:", error);
  process.exit(1);
});
