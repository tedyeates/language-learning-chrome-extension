export const textReplacements = new RegExp([
    "<code>.+<\/code>",
    "<[/]?[a-zA-Z]*( [a-zA-Z]*=\"[a-zA-Z:/.]*(\" ?))*>",
    "[^a-zA-Z '-]"
].join('|'), 'gi')