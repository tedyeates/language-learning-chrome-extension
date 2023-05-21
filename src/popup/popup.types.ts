import { Word } from "../store/store.types"

export type ReplacementMapping = {
    [key: string]: Word
}

export type Translation = {
    value: string,
    translation: string
}

export type MainView = {
    page: HTMLElement,
    viewTranslationButton: HTMLButtonElement
}

export type TranslationView = {
    page: HTMLElement
}

export type View = {
    page: HTMLElement
    [key:string]: HTMLElement
} 