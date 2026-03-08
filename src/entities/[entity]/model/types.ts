export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface Company {
    name: string;
    catchPhase: string;
    bs: string;
}

export interface Geo {
    lat: string;
    lng: string; 
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

export interface Album {
    userId: number;
    id: number;
    title: string;
}

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
