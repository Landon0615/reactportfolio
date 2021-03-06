import React, {useState} from 'react';
import { validateEmail, capitalizeFirstLetter } from "./utils/helpers";
import Navbar from './Navbar'
import Footer from './Footer'
import ParticlesBg from 'particles-bg'


function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const { name, email, message } = formState;
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(e) {
    if (e.target.name === 'email') {
      const isValid = validateEmail(e.target.value);

      if (!isValid) {
        setErrorMessage('Please enter a valid email');
      } else {
        setErrorMessage('');
      }
    }
    else {
      if (!e.target.value.length) {
        setErrorMessage(`${capitalizeFirstLetter(e.target.name)} is required`);
      } else {
        setErrorMessage('');
      }
    }
    if (!errorMessage) {
      setFormState({ ...formState, [e.target.name]: e.target.value })
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formState.name,
        email: formState.email,
        message: formState.message
      })
    })
    .then((res) => res.json())
    .then(async (res) => {
      const resData = await res;
      if (resData.status === "success") {
        alert("Message Sent!");
      } else if (resData.status === "fail") {
        alert("Message failed to send");
      }
    })
    .catch(err => {
      console.log("Error: " + err)
    })
  }

  return (
      <>
      <Navbar/>
    <div style={{ fontFamily: 'Monospace', fontSize: 20, color: '#607d8b', fontWeight: 'bold' }} className="page-div">
      <h2>Contact Me</h2>
      <form className="contact-form page-body" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="contact-el">Name:</label><br />
          <input style={{ fontFamily: 'Monospace', fontSize: 20, color: '#607d8b', fontWeight: 'bold' }} type="text" name="name" className="contact-el" defaultValue={name} onBlur={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email address:</label><br />
          <input style={{ fontFamily: 'Monospace', fontSize: 20, color: '#607d8b', fontWeight: 'bold' }} type="email" name="email" className="contact-el" defaultValue={email} onBlur={handleChange} />
        </div>
        <div>
          <label htmlFor="message" className="contact-el">Message:</label><br />
          <textarea style={{ fontFamily: 'Monospace', fontSize: 20, color: '#607d8b', fontWeight: 'bold' }} name="message" className="contact-el" defaultValue={message} onBlur={handleChange} />
        </div>
        {errorMessage && (
          <div>
            <p className="error-text contact-el">
              {errorMessage}</p>
          </div>
        )}
        <button style={{ fontFamily: 'Monospace', fontSize: 20, color: 'black', fontWeight: 'bold', background:'grey' }} type="submit" className="submit-contact contact-el">Submit</button>
      </form>
    </div>
    <Footer/>
    <ParticlesBg color="#008b8b" num={200} type="cobweb" bg={true} />
    </>
  );
}

export default Contact;