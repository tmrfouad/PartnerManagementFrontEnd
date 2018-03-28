export interface MailData {
    smtp: SmtpData;
    message: MailMessageData;
}

export interface MailMessageData {
    to: string[];
    cc: string[];
    from: string;
    subject: string;
    body: string;
    isBodyHtml: boolean;
}

export interface SmtpData {
    domain: string;
    port: number;
    enableSsl: boolean;
    timeout: number;
    deliveryMethod: string;
    useDefaultCredentials: boolean;
    userName: string;
    password: string;
}
