import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
          address,
          city,
          state,
          zipcode,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <div className="sgnupform">
      <h1 style={{textDecoration:'underline'}}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label className="nmlbl">
          Email:
          <br />
        </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        {errors.email && <p>{errors.email}</p>}
        <br />
        <br />
        <label className="usrnmlbl">
          Username:
          <br />
        </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        {errors.username && <p>{errors.username}</p>}
        <br />
        <br />

        <label className="frstnamelbl">
          First Name:
          <br />
        </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        {errors.firstName && <p>{errors.firstName}</p>}
        <br />
        <br />
        <label style={{position:'relative',left: '50px', fontWeight:'bold'}}>
          Last Name:
        </label>
          <br />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        {errors.lastName && <p>{errors.lastName}</p>}
        <br />
        <br />
        <label style={{position:'relative',left: '50px', fontWeight:'bold'}}>
          Password:
          <br />
        </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        {errors.password && <p>{errors.password}</p>}
        <br />
        <label style={{position:'relative',left: '20px', fontWeight:'bold'}}>
          <br />
          Confirm Password:
          <br />
        </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <br />
        <br />
        <label style={{position:'relative',left: '50px', fontWeight:'bold'}}>Address: </label>
        <br />
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <br />
        <label style={{position:'relative',left: '65px', fontWeight:'bold'}}>
          City:
          <br />
        </label>
          <input
            type="text"
            placeholder="city"
            onChange={(e) => setCity(e.target.value)}
          />
        <br />
        <br />
        <label style={{position:'relative',left: '60px', fontWeight:'bold'}}>
          State:
          <br />
        </label>
          <input
            type="text"
            placeholder="state"
            onChange={(e) => setState(e.target.value)}
          />
        <br />
        <br />
        <label style={{position:'relative',left: '50px', fontWeight:'bold'}}>
          Zipcode:
          <br />
        </label>
          <input
            type="text"
            placeholder="zipcode"
            onChange={(e) => setZipcode(e.target.value)}
          />
        <br />
        <br />
        <button type="submit" className="subbutton" style={{fontSize:'20pt',fontStyle:'italic'}}>Sign Up</button>
      </form>
      <br />
    </div>
  );
}

export default SignupFormModal;
