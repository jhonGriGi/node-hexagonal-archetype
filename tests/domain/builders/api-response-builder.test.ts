import LambdaResponseBuilder from '@domain/builders/api-response-builder';

describe('LambdaResponseBuilder test suite', () => {
    it('should build response with all properties', () => {
        const response = LambdaResponseBuilder.empty()
            .withStatusCode(200)
            .withHeaders({ 'Content-Type': 'application/json' })
            .withBody({ message: 'success' })
            .addCookie('session=abc123')
            .setBase64Encoding(false)
            .build();

        expect(response.statusCode).toBe(200);
        expect(response.headers).toEqual({ 'Content-Type': 'application/json' });
        expect(response.body).toBe(JSON.stringify({ message: 'success' }));
        expect(response.cookies).toEqual(['session=abc123']);
        expect(response.isBase64Encoded).toBe(false);
    });

    it('should set multiple cookies', () => {
        const response = LambdaResponseBuilder.empty()
            .withStatusCode(200)
            .setCookies(['cookie1=value1', 'cookie2=value2'])
            .build();

        expect(response.cookies).toEqual(['cookie1=value1', 'cookie2=value2']);
    });

    it('should merge headers', () => {
        const response = LambdaResponseBuilder.empty()
            .withStatusCode(200)
            .withHeaders({ 'Content-Type': 'application/json' })
            .withHeaders({ 'X-Custom': 'value' })
            .build();

        expect(response.headers).toEqual({
            'Content-Type': 'application/json',
            'X-Custom': 'value',
        });
    });
});
