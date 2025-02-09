import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";

const mockUseNavigate = jest.fn()

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockUseNavigate,
}))

describe('pruebas en <Navbar/>', () => {
  const contextValue = {
    authState: {
      logged: true,
      user: {
        id: 'abc',
        name: 'Ricardo'
      },
    },
    logout: jest.fn()
  }

  beforeEach(() => jest.clearAllMocks())

  test('debe de mostrar el nombre del usuario', () => {
    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={['/marvel']}>
          <Navbar/>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Ricardo')).toBeTruthy()
  })

  test('debe de llamar el logout y navigate cuando se hace click en el botón', () => {
    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={['/marvel']}>
          <Navbar/>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    const logoutBoton = screen.getByRole('button')
    fireEvent.click(logoutBoton)

    expect(contextValue.logout).toHaveBeenCalled()
    expect(mockUseNavigate).toHaveBeenCalledWith('/login', { replace: true })
  })
});