import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('pruebas en <PrivateRoute/>', () => {
  test('debe de mostrar el children si está autenticado', () => {
      Storage.prototype.setItem = jest.fn()

      const contextValue = {
        logged: true,
        user: {
          id: 'abd',
          name: 'Ricardo'
        }
      }

      const lastPath = '/search?q=batman'
  
      render(
        <AuthContext.Provider value={{ authState: contextValue }}>
          <MemoryRouter initialEntries={[lastPath]}>
            <PrivateRoute>
              <h1>Ruta Privada</h1>
            </PrivateRoute>
          </MemoryRouter>
        </AuthContext.Provider>
      )
  
      expect(screen.getByText('Ruta Privada')).toBeTruthy()
      expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', lastPath)
    })
});