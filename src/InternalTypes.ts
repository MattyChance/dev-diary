export interface Post {
    user: User,
    title: string,
    createDate: string,
    updateDate: string,
    notes: string,
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