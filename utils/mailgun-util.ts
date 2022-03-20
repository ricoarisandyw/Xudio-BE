import Mailgun from "mailgun.js";
import formData from 'form-data'
import {env} from 'process'

const mailgun = new Mailgun(formData)
const mailgunClient = mailgun.client({
    username: 'api',
    key: 'cbb6f4611d6993c52cfc3056f4433564-1b237f8b-5cf243f0'
})

export {mailgunClient}