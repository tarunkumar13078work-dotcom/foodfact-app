import FoodCard from './FoodCard';

function FoodList({ products = [] }) {
  return (
    <section className="food-section" aria-label="Food search results">
      <div className="food-grid">
        {products.map((product) => (
          <FoodCard key={product?.code} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FoodList;