import bcrypt from 'bcrypt'

export async function encrypt(value: string){
    return bcrypt.hash(value, 10)
}

export async function checkEncrypt(value: string, hash: string){
    return new Promise((resolve) => {
        bcrypt.compare(value, hash, function(err, result){
            resolve(result)
        })
    })
}