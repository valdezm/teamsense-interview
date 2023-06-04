import App from "../App"
import { render, screen, userEvent } from "../../test-utils";
import { describe, expect, it } from "vitest"

// test('Renders Stock Page', () => {
describe("Simple working test", () => {

    it("the title is visible", () => {
        render(<App />)
        const stockHeader = screen.getByText('Vite + React')
        expect(stockHeader).toBeInTheDocument()

    })
})
