import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockUseNavigate = jest.fn()

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockUseNavigate,
}))

describe('pruebas en <SearchPage/>', () => {
  beforeEach(() => jest.clearAllMocks())

  test('debe de mostrarse correctamente con valores por defecto', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage/>
      </MemoryRouter>
    )

    expect(container).toMatchSnapshot()
  })

  test('debe de mostrar a Batman y el input con el valor del queryString', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage/>
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('batman')

    const img = screen.getByRole('img')
    expect(img.src).toContain('/assets/heroes/dc-batman.jpg')

    const alert = screen.getByLabelText('alert-danger')
    expect(alert.style.display).toBe('none')
  })

  test('debe de mostrar un error si no se encuentra el hero (batman123)', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage/>
      </MemoryRouter>
    )

    const alert = screen.getByLabelText('alert-danger')
    expect(alert.style.display).toBe('')
  })

  test('debe de llamar al navigate a la pantalla nueva', () => {
    const inputValue = 'batman'

    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage/>
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { name: 'searchText', value: inputValue } })

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`)
  })
});