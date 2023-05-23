import db from "@/db";
import { nest } from "../helpers.js";
import { useState, useEffect } from "react";

const Friends = ({ friends }) => {
  const [input, setInput] = useState("");
  const [area, setArea] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    await fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify({
        input: input,
        message: message,
      }),
    });
  };

  return (
    <div>
      <h1>Data from mysql</h1>
      <div>
        {friends.map(({ id, name, age, hobbies }) => (
          <details key={id}>
            <summary>
              {name} ({age})
            </summary>
            <ul>
              {hobbies.map(({ name, id }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
      <div>
        <form action="">
          <input
            type="text"
            name="subject"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <textarea
            name="message"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          ></textarea>
          <input type="submit" value="sendmail" />
        </form>
      </div>
    </div>
  );
};

export default Friends;

// export async function getServerSideProps() {
//   const rows = await db.select("id", "name", "age").from("friends");
//   console.log(rows);
//   return {
//     props: { friends: rows },
//   };
// }
// export async function getStaticProps() {
//   const rows = await db.select("id", "name", "age").from("friends");
//   console.log(rows);
//   return {
//     props: { friends: rows },
//     revalidate: 60,
//   };
// }

// export async function getStaticProps(id) {
//   //   const convertedId = id.toString();
//   const friends = await db.select("id", "name", "age").from("friends");
//   const hobbies = friends.map(({id})=>{await db
//     .select("friends_has_hobbies.id", "hobbies.name")
//     .from("friends_has_hobbies")
//     .innerJoin("hobbies", "friends_has_hobbies.id", "hobbies.id")
//     .where("friends_has_hobbies.id", id)});
//   friends.forEach();
//   console.log(rows);
//   return {
//     props: { friends, hobbies },
//     revalidate: 60,
//   };
// }

// export async function getStaticProps() {
//   const friends = await db.select("id", "name", "age").from("friends");
//   const friendsWithHobbies = await Promise.all(
//     friends.map(async (f) => ({
//       ...f,
//       hobbies: await db
//         .select("friends_has_hobbies.hobbies_id", "hobbies.hobby")
//         .from("friends_has_hobbies")
//         .leftJoin("hobbies", "friends_has_hobbies.hobbies_id", "hobbies.id")
//         .where("friends_has_hobbies.friends_id", f.id),
//     }))
//   );
//   console.log(friendsWithHobbies);

//   return {
//     props: { friends, friendsWithHobbies },
//     revalidate: 60,
//   };
// }

export async function getStaticProps() {
  const friendsData = await db("friends_has_hobbies")
    .join("friends", "friends.id", "friends_has_hobbies.friends_id")
    .join("hobbies", "hobbies.id", "friends_has_hobbies.hobbies_id")
    .select(
      "friends.id",
      "friends.name",
      "friends.age",
      "friends.image",
      "hobbies.hobby",
      "hobbies.id AS hobbyId"
    );

  const friendsDefinition = [
    {
      id: { column: "id", type: "NUMBER" },
      name: "name",
      age: { column: "age", type: "NUMBER" },
      image: "image",
      hobbies: [
        {
          id: { column: "hobbyId", type: "NUMBER" },
          name: "hobby",
        },
      ],
    },
  ];

  const friends = nest(friendsData, friendsDefinition);
  console.log(friends);
  return {
    props: { friends },
    revalidate: 60,
  };
}
