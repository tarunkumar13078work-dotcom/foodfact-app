const fallbackImage =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" role="img" aria-label="Food image placeholder">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#22303f" />
          <stop offset="100%" stop-color="#111822" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" rx="36" fill="url(#bg)" />
      <circle cx="322" cy="198" r="92" fill="#f4b860" opacity="0.18" />
      <path d="M228 258c18-54 63-86 94-86s76 32 94 86" fill="none" stroke="#f4b860" stroke-width="18" stroke-linecap="round" />
      <path d="M270 166c18-22 42-34 52-34s34 12 52 34" fill="none" stroke="#8fd3ff" stroke-width="12" stroke-linecap="round" opacity="0.8" />
      <text x="50%" y="340" fill="#c9d5e8" font-family="Arial, sans-serif" font-size="30" text-anchor="middle">No image available</text>
    </svg>
  `);

function formatNutriment(value) {
  if (value === undefined || value === null || value === '') {
    return 'N/A';
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return String(value);
  }

  return `${numericValue.toFixed(1)}`;
}

function FoodCard({ product }) {
  const name = product?.product_name?.trim() || 'Unknown Product';
  const brand = product?.brands?.trim() || 'Unknown Brand';
  const imageUrl = product?.image_small_url || fallbackImage;

  const calories = formatNutriment(product?.nutriments?.['energy-kcal_100g']);
  const proteins = formatNutriment(product?.nutriments?.proteins_100g);
  const carbohydrates = formatNutriment(product?.nutriments?.carbohydrates_100g);
  const fats = formatNutriment(product?.nutriments?.fat_100g);

  return (
    <article className="food-card">
      <div className="food-card__image-wrap">
        <img
          className="food-card__image"
          src={imageUrl}
          alt={name}
          loading="lazy"
          onError={(event) => {
            if (event.currentTarget.src !== fallbackImage) {
              event.currentTarget.src = fallbackImage;
            }
          }}
        />
      </div>

      <div className="food-card__content">
        <div className="food-card__header">
          <h3 className="food-card__name">{name}</h3>
          <p className="food-card__brand">{brand}</p>
        </div>

        <div className="nutrition-grid" aria-label={`Nutrition facts for ${name}`}>
          <div className="nutrition-item">
            <span className="nutrition-label">Calories</span>
            <span className="nutrition-value">{calories} kcal</span>
          </div>
          <div className="nutrition-item">
            <span className="nutrition-label">Protein</span>
            <span className="nutrition-value">{proteins} g</span>
          </div>
          <div className="nutrition-item">
            <span className="nutrition-label">Carbs</span>
            <span className="nutrition-value">{carbohydrates} g</span>
          </div>
          <div className="nutrition-item">
            <span className="nutrition-label">Fat</span>
            <span className="nutrition-value">{fats} g</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default FoodCard;