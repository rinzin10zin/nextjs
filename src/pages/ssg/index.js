/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { slug } from "@/helpers";

const index = ({ data }) => {
  return (
    <div>
      <h1>Retrieving cocktails with Static Side Generation</h1>
      <div className="cocktails">
        {data.map(({ idDrink, strDrink, strDrinkThumb }) => (
          <article key={idDrink}>
            <Link href={`ssr/detail/${idDrink}-${slug(strDrink)}`}>
              <img src={strDrinkThumb} alt={strDrink} />
              <p>{strDrink}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
  );
  const { drinks: data } = await response.json();
  return {
    props: {
      data,
    },
  };
}

export default index;
