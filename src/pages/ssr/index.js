/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { slug } from "@/helpers";

const index = ({ name, age, data }) => {
  return (
    <div>
      <h1>Retrieving cocktails with Server Side Rendering</h1>
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

export async function getServerSideProps() {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
  );
  const { drinks: data } = await response.json();
  return {
    props: {
      data: data,
    },
  };
}

export default index;
