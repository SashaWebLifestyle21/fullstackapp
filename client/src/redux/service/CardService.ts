import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export interface IBook {
    title: string
    subtitle: string
    isbn13: string
    price: string
    image: string
    url: string
}


interface IDataBooks {
    books: IBook[]
}


export const cardAPI = createApi({
    reducerPath: 'cardAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.itbook.store/1.0'}),
    endpoints: (build) => ({
        fetchAllBooks: build.query<IDataBooks, any>({
            query: () => ({
                url: '/search/mongodb'
            })
        })
    })
})