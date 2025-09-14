import { API_BASE_URL } from "./api";

export async function detectDisease(imageFile, cropType, location) {
  if (!imageFile) throw new Error("Image is required");

  const formData = new FormData();
  formData.append("image", imageFile);
  if (cropType) formData.append("cropType", cropType);
  if (location) formData.append("location", location);

  const response = await fetch(`${API_BASE_URL}/api/disease-detection`, {
    method: "POST",
    body: formData, // Let the browser set multipart boundary
  });

  if (!response.ok) {
    let message = "Disease detection failed";
    try {
      const err = await response.json();
      message = err?.error || message;
    } catch {
      try {
        message = await response.text();
      } catch {}
    }
    throw new Error(message);
  }

  return response.json();
}
