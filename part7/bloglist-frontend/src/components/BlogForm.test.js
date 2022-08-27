import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PostForm from "./PostForm";

test("Test check, that the form calls the event handler it received as props with the right details when a new blog is created.", () => {
  const handleNewBlog = jest.fn();

  const component = render(<PostForm handleNewBlog={handleNewBlog} />);

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");

  const form = component.container.querySelector("#form");

  fireEvent.change(title, {
    target: { value: "blog title" },
  });
  fireEvent.change(author, {
    target: { value: "blog author" },
  });
  fireEvent.change(url, {
    target: { value: "blog url" },
  });

  fireEvent.submit(form);

  expect(handleNewBlog.mock.calls).toHaveLength(1);
  expect(handleNewBlog.mock.calls[0][0].title).toBe("blog title");
  expect(handleNewBlog.mock.calls[0][0].author).toBe("blog author");
  expect(handleNewBlog.mock.calls[0][0].url).toBe("blog url");
});
