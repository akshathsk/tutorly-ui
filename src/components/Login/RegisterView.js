import {auth} from './firebase'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
// import {signInWithEmailAndPassword} from 'firebase/auth'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }from 'mdb-react-ui-kit';
import "../Login/LoginView.scss";
import mainLogo from "../../assets/Tutorly.png";

export default function RegisterView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')}}
    return isValid} 
  const register = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
      createUserWithEmailAndPassword(auth, email, password).then((res) => {
              console.log(res.user);}).catch(err => setError(err.message))}
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      navigate("/fp/userDetails")}
  const loginPage = () => {
    navigate("/fp/login")}
    
  return(
    <div className='auth' style={{ 
        height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden',
        backgroundImage: "url(" + 'https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg?auto=compress' + ")",transform: [{ rotate: '180deg'}]}}>
    
     <MDBContainer className="my-5 gradient-form" >
     <MDBRow>

      <MDBCol col='6' className="mb-5">
        <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
          <div className="text-white text-center px-3 py-4 p-md-5 mx-md-4">
            <img src='https://images.pexels.com/photos/3863788/pexels-photo-3863788.jpeg' style={{width: '400px'}} alt="logo" />
            <p></p>
            <h4 className="mb-4">Welcome Back!</h4>
            <p className="small mb-0">Welcome back into a world of teaching and learning!</p>
            <br/>
            <MDBBtn className="mb-4 w-100 gradient-custom-3" onClick={loginPage}>Sign In</MDBBtn>
          </div>
        </div>
      </MDBCol>
      
      <MDBCol col='6' className="mb-5" >
        <div className="d-flex flex-column ms-5">
        {error && <div className='auth__error'>{error}</div>}
        <Form name='registration_form'>
          <div className="text-center">
            <img src={mainLogo} style={{width: '150px'}} alt="logo" />
             <h4 className="mt-1 mb-5 pb-1">Create Account</h4>
          </div>
          <MDBInput wrapperClass='mb-4' label='Email address' name='email' type='email' value={email} placeholder="Enter your email" required onChange={e => setEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' name='password' type='password' value={password} required placeholder='Enter your password' onChange={e => setPassword(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Confirm Password' name='confirmPassword' type='password' value={confirmPassword} required placeholder='Enter your password again' onChange={e => setConfirmPassword(e.target.value)}/>
          <div className="text-center pt-1 mb-5 pb-1">
            <MDBBtn className="mb-4 w-100 gradient-custom-3" type='submit' onClick={register}>Sign Up</MDBBtn>
              <p>OR</p>
              <GoogleLogin
                buttonText="Sign Up with Google"
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}/>
          </div> 
        </Form>    
        </div>
      </MDBCol>
      </MDBRow>
      </MDBContainer>
    </div>
    );
}