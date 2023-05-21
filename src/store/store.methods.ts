import { learntLevel } from './store.constants'
import { Word, SeenWords } from './store.types'

const saveNewWord = (word: Word, seenWords: SeenWords) => {
    seenWords[word.value] = {...word, seenCount: 1, level: 0}
    chrome.storage.sync.set({'seenWords': seenWords})
}


const calculateLevel = (word: Word) => {
    return word.seenCount
}


const updateWord = (word: Word, seenWords: SeenWords) => {
    const seenWord = seenWords[word.value]
    
    if (!seenWord.seenCount) return

    let newValue =  {
        ...seenWord,
        seenCount: seenWord.seenCount + 1,
    }

    newValue.level = calculateLevel(newValue)

    chrome.storage.sync.set({'seenWords': {
        ...seenWords, 
        [word.value]: newValue
    }})
    
}


export const saveWord = async (word: Word) => {
    let results = await chrome.storage.sync.get('seenWords')
    console.log(results.seenWords)
    if (word.value in results.seenWords) {
        return updateWord(word, results.seenWords)
    }

    saveNewWord(word, results.seenWords)
}


export const getLearntWords = async () => {
    const results = await chrome.storage.sync.get('seenWords')
    console.log(results.seenWords)
    if (!results.seenWords) return []

    return Object.values<Word>(results.seenWords).filter(wordData => (
        wordData.level && wordData.level >= learntLevel
    ))
}