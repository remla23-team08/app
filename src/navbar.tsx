import * as React from 'react'
import { Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const MyNavbar = () => {
	return (
		<Navbar className='myNavbar'>
			<LinkContainer to="/">
				<Navbar.Brand className="myNavbar mb-0 h1 mx-2">Restaurant Reviewer</Navbar.Brand>
			</LinkContainer>
		</Navbar>
	)
}

export default MyNavbar