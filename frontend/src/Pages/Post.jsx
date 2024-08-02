import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const Post = () => {
  const editor = useRef(null);
  const screen = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(new Date(Date.now()));

  const handleChange = () => {
    if (screen.current) {
      console.dir(screen.current.style);
      // screen.current.style.innerHtml = content;
    }
  };
  return (
    <div className="sm:grid sm:grid-cols-10 items-center align-center flex flex-col justify-center">
      <div className="col-start-1 col-span-7 ml-2 flex flex-col ">
        <input
          className="h-14 w-[90%] sm:w-[40%] items-center outline-none my-2 rounded-sm px-2 text-center"
          placeholder="Title of the Project"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>
      <div className="col-start-8  col-span-3 h-[50vh] px-4 flex flex-col w-96 justify-center gap-5">
        <div>
          <label htmlFor="date" className="">
            Deadline
          </label>
          <input
            type="date"
            id="date"
            value={deadline}
            onChange={(e) => console.log(e.target.value)}
            className="h-12 rounded-md px-2 outline-none"
            placeholder="Deadline"
          />
        </div>
        <input
          type="number"
          className="rounded-md h-12 px-2 outline-none"
          placeholder="Total Amount of Fund"
        />
        <button className="bg-blue-600 text-white py-2 px-4 my-2 rounded-sm">
          Upload Project
        </button>
      </div>
      <br />
    </div>
  );
};

export default Post;
