import axios from 'axios'

export const translate = async (term: string) => {
    if (!process.env.TRANSLATION_SERVER) {
        throw new Error("No TRANSLATION_SERVER specified")
    }
    
    const response = await axios.post(
        `${process.env.TRANSLATION_SERVER}/translate`,
        { term }
    )
    
    return response.data
}