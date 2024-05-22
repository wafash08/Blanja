import Container from './components/base/Container';
import Navbar from './components/modules/Navbar';

function App() {
	return (
		<>
			<header className='fixed top-0 left-0 w-full h-[100px] z-50 bg-white flex items-center shadow-[0_6px_40px_0_#ADADAD40]'>
				<Container className='flex items-center'>
					<Navbar hasLoggedIn={true} inHomePage={true} />
				</Container>
			</header>
		</>
	);
}

export default App;
