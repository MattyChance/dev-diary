export interface Post {
    id: number,
    user: User,
    title: string,
    createDate: string,
    updateDate: string,
    note: string,
    code: string,
    deleted: boolean,
    tag: string[],
}

export interface User {
    id: number,
    alias: string,
    firstName: string,
    lastName: string,
}