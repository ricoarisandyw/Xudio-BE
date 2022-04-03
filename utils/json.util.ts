export const convertNullToEmptyString = (object: any) => {
    return JSON.parse(JSON.stringify(object).replace(/null/g, "\"\""))
}