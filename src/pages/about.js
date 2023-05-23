import Head from "next/head";
import Script from "next/script";
import { useState } from "react";

const About = () => {
  const [color, setColor] = useState("#000");
  const getRandomColor = () => {
    setColor(randomColor());
  };
  return (
    <>
      <Head>
        <title>Dit is de about page</title>
      </Head>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/randomcolor/0.6.1/randomColor.js"
        onLoad={getRandomColor}
      ></Script>
      <h1>About page</h1>
      <button onClick={getRandomColor}>Get new Color</button>
      <p style={{ backgroundColor: color }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quod
        officia consequatur eaque ea totam molestias, accusamus facilis ipsum
        aliquam doloribus laborum dolore dignissimos quo repellat dolorum cum
        unde accusantium?
      </p>
    </>
  );
};

export default About;
