/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { slug } from "@/helpers";

const Index = () => {
  const [data, setData] = useState({ loading: false, cocktails: [] });
  useEffect(() => {
    const getCocktails = async () => {
      setData({ loading: true, cocktails: [] });
      const {
        data: { drinks },
      } = await axios(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
      );
      setData({ loading: false, cocktails: drinks });
    };
    getCocktails();
  }, []);

  return (
    <div>
      <h1>Retrieving cocktails with Client Side Rendering</h1>
      <div className="cocktails">
        {data.loading && <p>Loading.....</p>}
        {data.cocktails.length &&
          data.cocktails.map(({ idDrink, strDrink, strDrinkThumb }) => (
            <article key={idDrink}>
              <Link href={`csr/detail/${idDrink}-${slug(strDrink)}`}>
                <img src={strDrinkThumb} alt={strDrink} />
                <p>{strDrink}</p>
              </Link>
            </article>
          ))}
      </div>
    </div>
  );
};

export default Index;
