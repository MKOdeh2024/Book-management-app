import express, { query } from "express";
export namespace book {
  export interface Book {
    id: number;
    title: string;
    author: string;
    publicationYear: number;
  }

  export interface Request extends express.Request {
    body: book.Book;
    query: {
      title: string;
      author: string;
      year: string;
    };
  }

  export interface Response extends express.Response {}
}
