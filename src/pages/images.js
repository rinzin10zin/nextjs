import { useState } from "react";

const Images = ({ results }) => {
  const [search, setSearch] = useState("");
  return (
    <div>
      <h1>Search for images on Unsplash</h1>
      <form action="">
        <input
          type="text"
          value={search}
          name="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type="submit" value="search unsplash" />
      </form>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  let results = [];
  if (query.search) {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${query.search}&client_id=${process.env.UNSPLASH_ACCESS}`
    );
    const data = await response.json();
    results = data.results;
  }
  return {
    props: {
      results,
    },
  };
}

export default Images;
