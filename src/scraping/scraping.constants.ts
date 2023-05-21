const articles = [
    "the",
    "a",
    "an"
]

export const textReplacements = new RegExp([
    "<code>.+<\/code>",
    "<[/]?[a-zA-Z]*( [a-zA-Z]*=\"[a-zA-Z:/.]*(\" ?))*>",
    "[^a-zA-Z -]",
    ...articles
].join('|'), 'gi')

export const numberWordsToGet = 20