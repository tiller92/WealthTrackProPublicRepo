import { render, screen } from '@testing-library/react'
import {Home} from '../pages/index'
import GetStarted from '../components/GetStarted'
import '@testing-library/jest-dom'

describe('Home', () => {
	  it('renders a heading', () => {
	      render(<GetStarted />)
	      const heading = screen.getByRole('heading', {
		    name: /welcome to next\.js!/i,
		  })
	      expect(heading).toBeInTheDocument()
		    })
})

































