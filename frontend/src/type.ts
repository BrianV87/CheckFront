export type Country = {
    id: number,
    code: string,
    name: string,
    emoji: string,
    continent: {
        id: Number,
        name: string
    }
}