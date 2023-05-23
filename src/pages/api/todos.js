const todos = ["gras afrijden", "tv kijken", "getting bag"];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.json(todos);
  }
  if (req.method === "POST") {
    todos.push(req.body.todo);
    res.json(todos);
  }
}
