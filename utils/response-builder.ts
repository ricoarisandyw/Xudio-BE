export function success(message: string, data: any) {
    return {
        status: "success",
        message: message,
        data: data
    }
}

export function failed(message: string, data: any) {
    return {
        status: "error",
        message: message,
        data: data
    }
}