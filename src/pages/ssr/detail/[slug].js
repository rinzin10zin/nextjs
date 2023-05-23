/* eslint-disable @next/next/no-img-element */
const Detail = ({ cocktail }) => {
  return (
    <>
      <h1>test</h1>
      <h1>Detail of Cocktail using CSR</h1>
      {cocktail.strDrink && (
        <>
          <h2>
            {cocktail.strDrink} - {cocktail.idDrink}
          </h2>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          <p>{cocktail.strInstructions}</p>
        </>
      )}
    </>
  );
};

export async function getServerSideProps({ params }) {
  const id = params.slug.split("-")[0];
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const { drinks } = await response.json();
  return {
    props: {
      cocktail: drinks[0],
    },
  };
}

export default Detail;
