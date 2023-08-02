import { GoogleLogin } from '@react-oauth/google';
function Auth() {
	const responseMessage = (response) => {
		console.log(response);
	};
	const errorMessage = (error) => {
		console.log(error);
	};
	return (
		<section>
			<GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
		</section>
	);
}

export default Auth;
