import { GetServerSideProps } from "next";
import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { parseCookies } from "nookies";
import { Product } from "../../components/product";

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
          <Product
            key={product._id}
            product={product}
            isFavorite={favorites.includes(product._id)}
            isInCart={cart.includes(product._id)}
            onToggleFavorite={toggleFavorite}
            onToggleCart={toggleCartItem}
          />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
