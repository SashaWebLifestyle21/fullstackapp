import React from 'react';
import {IBook} from "../../../redux/service/CardService";

interface IBookProp {
    book: IBook
}


const Book = ({ book }: IBookProp) => {
    return (
        <div>
            <h1>{book.title}</h1>
            <p>{book.subtitle}</p>
            <p>{book.price}</p>
        </div>
    );
};

export default Book;