export function success(message: string, data: any = null) {
    return {
        status: "success",
        message: message,
        data: data
    }
}

export function failed(message: string, data: any = null) {
    return {
        status: "error",
        message: message,
        data: data
    }
}