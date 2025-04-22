import { randomBytes } from 'crypto';

/**
 * generates the sec-websocket-key  header value for a websocket connection
 * 
 * This value is completely up to the client and is supposed to be any random string
 */
export function generateWebsocketKey(): string {
    return randomBytes(16).toString('base64')
}
