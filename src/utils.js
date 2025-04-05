import { words } from "./words";

export function randomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].toLowerCase()
}


export function getFarewellText(language) {

    const options = [
        `Farewell, ${language} 👋`,
        `R.I.P. ${language} ⚰️`,
        `We'll miss you, ${language} 💔`,
        `Oh no, not ${language} 😭`,
        `Gone but not forgotten, ${language} 💔`,
        `The end of ${language} 😪`,
        `${language}, May we meet again! 😪`,
        `${language} has left the chat 👋`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex]

}
