

export function inInteger(input:string){
    return input?.match(/^\d+$/) ?? false
}