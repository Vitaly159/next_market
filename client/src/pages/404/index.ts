import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/products"); // или /products, если хотите
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // ничего не рендерим
}
