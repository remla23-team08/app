import * as React from 'react'
import { Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const MyNavbar = () => {

	const [ version, setVersion ] = React.useState(null);
	const [ versionLink, setVersionLink ] = React.useState(null);

	React.useEffect(() => {
		const clean = process.env.VERSION.replace(/^(.*?)(?:\-.*)?$/, '$1')
		setVersion(clean)
		setVersionLink("https://github.com/remla23-team08/app/tree/" + clean)
	}, []);

	return (
		<Navbar className='myNavbar'>
			<LinkContainer to="/">
				<Navbar.Brand className="myNavbar mb-0 h1 mx-2">Restaurant Reviewer</Navbar.Brand>
			</LinkContainer>
			<Navbar.Collapse role='heading' className='justify-content-end myNavbar mb-0 mx-2' >
				<Navbar.Text className=" myNavbar">
					Version: <a href={versionLink}>{version}</a>
				</Navbar.Text>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default MyNavbar