import { GetServerSideProps } from "next";
import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { parseCookies } from "nookies";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
}

interface Props {
  products: IProduct[];
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const cookies = parseCookies(context);
  const token = cookies.token; // читаем токен из cookies

  let products: IProduct[] = [];

  try {
    // проверка токена, например, через API или jwt.verify
    const res = await axios.get("http://localhost:5001/api/products", {
      headers: { Cookie: `token=${token}` },
    });
    products = res.data;
  } catch (err) {
    // если токен недействителен — редирект
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      products,
    },
  };
};

export default function ProductPage({ products }: Props) {
  const [cart, setCart] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleCartItem = (id: string, name: string) => {
    setCart((prev) => {
      if (prev.includes(id)) {
        toast.info(`${name} удален из корзины`);
        return prev.filter((itemId) => itemId !== id);
      } else {
        toast.success(`${name} добавлен в корзину`);
        return [...prev, id];
      }
    });
  };

  const toggleFavorite = (id: string, name: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        toast.info(`${name} убран из избранных`);
        return prev.filter((favId) => favId !== id);
      } else {
        toast.success(`${name} добавлен в избранное`);
        return [...prev, id];
      }
    });
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
      <h1>Каталог товаров</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {products.map((product) => (
          <div
            key={product._id}
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
              alt="Товар"
              style={{
                width: "100%",
                height: "auto",
                marginBottom: 10,
                borderRadius: 4,
              }}
            />
            {/* Иконка "мне нравится" */}
            <button
              onClick={() => toggleFavorite(product._id, product.name)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: favorites.includes(product._id) ? "red" : "gray",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 30,
                height: 30,
                cursor: "pointer",
              }}
              title={
                favorites.includes(product._id)
                  ? "Убрать из избранных"
                  : "Добавить в избранное"
              }
            >
              ♥
            </button>
            <h2>{product.name}</h2>
            <p>Цена: {product.price} ₽</p>
            <p>{product.description}</p>
            <button
              style={{ marginTop: 10 }}
              onClick={() => toggleCartItem(product._id, product.name)}
            >
              {cart.includes(product._id)
                ? "Удалить из корзины"
                : "Добавить в корзину"}
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
