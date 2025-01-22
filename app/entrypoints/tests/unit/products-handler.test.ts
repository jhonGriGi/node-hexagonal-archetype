import { handlerClass } from '@lambda/products-handler'

describe('ProductsHandler test suit', () => {
  it('Should return a hello world in response with status 200', async () => {
    const response = await handlerClass.handler('', '')
    const bodyParsed = JSON.parse(response.body ?? '{}')

    expect(response.status).toBe(200)
    expect(bodyParsed).toEqual({
      Hello: 'World'
    })
  })
})
