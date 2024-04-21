
import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
    .then(() => dispatch(sessionActions.restoreUser()))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className='loginform'>
      <h1 className='logintitle'>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label className='username'>
          Username or Email:
          <br/>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <br/>
        <label className='password'>
          Password:
          <br/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
          <br/>
          <div className='buttons'>

        <button type="submit" style={{position:'relative',left:'3px'}} className='login'>Log In</button> {" "}


<button className='demo' type='submit' style={{position:'relative',left:'6px'}} onClick={() => {
  setCredential('demo@user.io')
  setPassword('password')

}}>DemoUser</button> {" "}
<br/>
<button className='demo' type='submit' onClick={() => {
  setCredential('master@email.com')
  setPassword('master')

}}>DemoMaster</button> {" "}

<button className='demo' type='submit' onClick={() => {
  setCredential('imanadmin')
  setPassword('password')

}}>DemoAdmin</button>
</div>
      </form>
    </div>
  );
}

export default LoginFormModal;
