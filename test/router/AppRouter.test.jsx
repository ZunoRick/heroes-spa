import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AppRouter } from "../../src/router/AppRouter";
import { AuthContext } from "../../src/auth";

describe('pruebas en el <AppRouter/>', () => {
  test('debe de mostrar el login si no está autenticado', () => {
    const contextValue = {
      logged: false
    }

    render(
      <AuthContext.Provider value={{ authState: contextValue }}>
        <MemoryRouter initialEntries={['/marvel']}>
          <AppRouter/>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getAllByText('LoginPage')).toBeTruthy()
    // screen.debug()
  })

  test('debe de mostrar el componente de Marvel si está autenticado', () => {
    const contextValue = {
      logged: true,
      user: {
        id: 'abc',
        name: 'Ricardo'
      }
    }

    render(
      <AuthContext.Provider value={{ authState: contextValue }}>
        <MemoryRouter initialEntries={['/login']}>
          <AppRouter/>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Marvel Comics')).toBeTruthy()
    expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1)
  })
});