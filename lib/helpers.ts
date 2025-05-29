import {Result} from "./types";


export const formatEmail = (text: string) => text.split("").reduce((prev: string, char, idx) => {
    prev += idx > 0 && idx < text.indexOf("@") ? '*' : char

    return prev
}, "")


export const safeTry = async <T>(promise: Promise<T>) : Promise<Result<T , Error>>    => {

    try {
        const data = await promise

        return [ true , data , "" ]
    }catch (e) {
        return [ false, e as any , (e as any).message ]
    }
}