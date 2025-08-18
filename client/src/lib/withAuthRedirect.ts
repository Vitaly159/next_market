import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

export const WithAuthRedirect: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies.token;

  try {
    if (token) {
      // Токен есть — перенаправляем на страницу с продуктами
      return {
        redirect: {
          destination: "/products",
          permanent: false,
        },
      };
    }
  } catch {}

  // Токена нет — показываем страницу логина
  return { props: {} };
};
