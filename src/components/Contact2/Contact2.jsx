import React,{useRef} from 'react'
import './Contact2.css'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import emailjs from '@emailjs/browser';

const Contact2 = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_j5lrs3i', 'template_1mqzjhr', form.current, '0dDqhZg44Stl2PfQ7')
            .then((result) => {
                alert("Sent Message Successfully ✅")
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        emailjs.sendForm('service_j5lrs3i', 'template_y8rmu1m', form.current, '0dDqhZg44Stl2PfQ7')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }
    return (
        <>
            <Navbar/>
            <section className="contact-section">
                <div className="contact-content">
                    <h2>Contact Us</h2>
                    <p>Have a question or feedback? Reach out to us!</p>
                    <form ref={form} onSubmit={sendEmail}>
                        <input type="text" name='user_name' placeholder="Your Name" required />
                        <input type="email" name='user_email' placeholder="Your Email" required />
                        <input type="phone" name='user_phone' placeholder="Your Mobile" required />
                        <textarea required name='user_message' placeholder="Your Message"></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact2

