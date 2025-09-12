const API_BASE_URL = "https://your-backend-api.com/api";

export async function detectDisease(imageFile, cropType, location) {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("cropType", cropType);
  formData.append("location", location);

  const response = await fetch(`${API_BASE_URL}/disease-detection`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Disease detection failed");
  }

  return response.json();
}