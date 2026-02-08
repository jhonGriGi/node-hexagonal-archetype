import DomainException from '@domain/exceptions/domain-exception';

describe('domainException test suite', () => {
    it('should create exception with message', () => {
        const exception = new DomainException('Test error');

        expect(exception.message).toBe('Test error');
        expect(exception.name).toBe('DomainException');
    });

    it('should be instance of Error', () => {
        const exception = new DomainException('Test error');

        expect(exception instanceof Error).toBe(true);
        expect(exception instanceof DomainException).toBe(true);
    });
});
