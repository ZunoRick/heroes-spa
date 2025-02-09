import { MemoryRouter, Routes } from "react-router";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";
import { Route } from "react-router";

describe('pruebas en <PublicRoute/>', () => {
  test('debe de mostrar el children si no está autenticado', () => {
    const contextValue = {
      logged: false
    }

    render(
      <AuthContext.Provider value={ contextValue }>
        <PublicRoute>
          <h1>Ruta Pública</h1>
        </PublicRoute>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Ruta Pública')).toBeTruthy()
  })

  test('debe de navegar si está autenticado', () => {
    const contextValue = {
      logged: true,
      user: {
        id: 'abc',
        name:'Ricardo'
      }
    }

    render(
      <AuthContext.Provider value={{ authState: contextValue }}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="login" element={
              <PublicRoute>
                <h1>Ruta Pública</h1>
              </PublicRoute>
            }/>
            <Route path="marvel" element={ <h1>Página Marvel</h1> }/>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )
    expect(screen.getByText('Página Marvel')).toBeTruthy()
    // screen.debug()
  })
});