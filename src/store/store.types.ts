export type Word = {
    value: string,
    translation: string,
    seenCount?: number,
    level?: number
}

export type SeenWords = {
    [key: string]: Word
}