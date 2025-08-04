import safeJsonStringify from 'safe-json-stringify';

export function safeStringify(data: object) {
    return safeJsonStringify(data, null, 2);
}
