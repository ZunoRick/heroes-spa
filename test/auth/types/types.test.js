import { types } from '../../../src/auth'

describe('pruebas en "Types.js"', () => {
  test('debe de regresar estos types', () => {
    expect(types).toEqual({
      login:  '[Auth] Login',
      logout: '[Auth] Logout',
    })
  })
});