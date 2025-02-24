// Using fetch

async function getImageDescription(apiKey, imageUrl, extraInstructions = null) {
  const url = 'https://easy-peasy.ai/api/generate';

  const payload = {
    preset: 'image-description-generator',
    keywords: imageUrl,
  };

  if (extraInstructions) {
    payload.extra1 = extraInstructions;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Example usage
const apiKey = 'dfdab8ea-88ad-4c55-af16-fd292cdb0b99'
const imageUrl = 'image.png';

getImageDescription(apiKey, imageUrl)
  .then((result) => console.log(result))
  .catch((error) => console.error('Error:', error));
