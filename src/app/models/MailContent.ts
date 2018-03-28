

export interface MailContent {
    from?: string;
    to?: string;
    reportCC?: string;
    body?: string;
    template?: string;
    When?: string;
    sendMailCC?: string[];
}
