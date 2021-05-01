import sharp from "sharp";

const MIME_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/svg+xml"];

export const resize = async (
  input: Buffer,
  mimeType?: string,
  MAX_SIZE?: number
): Promise<Buffer> => {
  if (!input) return input;
  if (!mimeType || !MIME_TYPES.includes(mimeType)) return input;

  try {
    return await sharp(input)
      .resize({
        width: MAX_SIZE,
        height: MAX_SIZE,
        fit: "contain",
      })
      .toBuffer();
  } catch (error) {
    console.log(`resize error`, error);
    return input;
  }
};