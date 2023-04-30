const highlightTranslation = (match: string) => {
    console.log(`highligh match: ${match}`)
    return `<span class="thl-underline">${match}</span>`
}


const markTextForTranslation = (
    text: string, 
    wordsToMark: Array<string>
) => {
    var re = new RegExp(
        `\\b(${wordsToMark.join("|")})\\b`
        ,"gi"
    )

    return text.replace(re, (match) => highlightTranslation(match))
}


export const markAllTextForTranslation = (
    wordsToMark: Array<string>, 
    elements: Array<HTMLElement>
) => {
    elements.forEach((element) => {
        element.innerHTML = markTextForTranslation(
            element.innerText, 
            wordsToMark
        )
    })
}


export default {
    markAllTextForTranslation
}