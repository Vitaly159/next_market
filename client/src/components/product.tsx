import { FC } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

interface Props {
  product: Product;
  isFavorite: boolean;
  isInCart: boolean;
  onToggleFavorite: (id: string, name: string) => void;
  onToggleCart: (id: string, name: string) => void;
}

export const Product: FC<Props> = ({
  product,
  isFavorite,
  isInCart,
  onToggleFavorite,
  onToggleCart,
}) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        width: 250,
        position: "relative",
      }}
    >
      <img
        src="https://static.tildacdn.com/tild3830-6438-4063-a565-323364326162/Vozvrat_ne_kachestve.png"
        alt={product.name}
        style={{
          width: "100%",
          height: "auto",
          marginBottom: 10,
          borderRadius: 4,
        }}
      />
      {/* Иконка "мне нравится" */}
      <button
        onClick={() => onToggleFavorite(product._id, product.name)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: isFavorite ? "red" : "gray",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 30,
          height: 30,
          cursor: "pointer",
        }}
        title={isFavorite ? "Убрать из избранных" : "Добавить в избранное"}
      >
        ♥
      </button>
      <h2>{product.name}</h2>
      <p>Цена: {product.price} ₽</p>
      <p>{product.description}</p>
      <button
        style={{ marginTop: 10 }}
        onClick={() => onToggleCart(product._id, product.name)}
      >
        {isInCart ? "Удалить из корзины" : "Добавить в корзину"}
      </button>
    </div>
  );
};
