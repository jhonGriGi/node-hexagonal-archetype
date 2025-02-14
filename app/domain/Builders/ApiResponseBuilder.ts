class LambdaResponseBuilder {

  private statusCode!: number;
  private headers?: Record<string, string>;
  private body?: string;
  private cookies?: string[];
  private isBase64Encoded?: boolean;


  constructor() {
  }

  static empty() {
    return new LambdaResponseBuilder();
  }

  withBody(body: object | string): LambdaResponseBuilder {
    if (typeof body === "object") {
      this.body = JSON.stringify(body);
    } else {
      this.body = body;
    }
    return this;
  }


  withStatusCode(statusCode: number): LambdaResponseBuilder {
    this.statusCode = statusCode;
    return this;
  }

  withHeaders(headers: Record<string, string>): LambdaResponseBuilder {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  addCookie(cookie: string): LambdaResponseBuilder {
    if (!this.cookies) {
      this.cookies = [];
    }
    this.cookies.push(cookie);
    return this;
  }

  setCookies(cookies: string[]): LambdaResponseBuilder {
    this.cookies = cookies;
    return this;
  }

  setBase64Encoding(isBase64Encoded: boolean): LambdaResponseBuilder {
    this.isBase64Encoded = isBase64Encoded;
    return this;
  }

  build(): {
    statusCode: number;
    headers?: Record<string, string>;
    body?: string;
    cookies?: string[];
    isBase64Encoded?: boolean;
  } {
    return {
      statusCode: this.statusCode,
      headers: this.headers,
      body: this.body,
      cookies: this.cookies,
      isBase64Encoded: this.isBase64Encoded
    };
  }
}

export default LambdaResponseBuilder;