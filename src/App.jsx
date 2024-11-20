import { useEffect, useState } from "react";

import Navbar from "./components/navbar";
import { v4 as uuidv4 } from "uuid";
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todosString = localStorage.getItem("todos");
    if (todosString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const toggleShow = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];

    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <div className=" container max-w-xl min-h-[80vh] mx-auto px-3 my-3 bg-violet-500 rounded-xl  ">
      <Navbar />
        
        <div className="addTodo">
          <h2 className=" font-bold   text-white">Add Todo</h2>

          <input
            onChange={handleChange}
            value={todo}
            type="text "
            className="w-96 rounded-md p-1"
          />

          <button
            onClick={handleAdd}
            className="bg-slate-400 text-white text-lg font-bold ml-5 rounded-lg p-2 px-6 cursor-pointer hover:bg-slate-500"
          >
            Add
          </button>
        </div>
        <input type="checkBox" onChange={toggleShow} checked={showFinished} className="my-2" />{" "}
        Show finished
        <h2 className="text-lg my-2 ml-1 font-bold text-white">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div>No todos to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo bg-slate-600 rounded-md flex border-2 p-1 mt-1 items-center justify-between border-slate-400"
                >
                  <div className="flex gap-5 text-white">
                    <input
                      name={item.id}
                      onChange={handleCheckBox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex items-center">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className=" bg-slate-400 justify-between text-white text-lg font-bold ml-5 rounded-lg px-2 py-1 cursor-pointer hover:bg-slate-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-slate-400 text-white text-lg font-bold ml-5 rounded-lg p-2   px-4 cursor-pointer hover:bg-slate-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
