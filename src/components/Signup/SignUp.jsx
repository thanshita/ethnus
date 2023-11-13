import React, { useState } from 'react'
import { Navigate, useNavigate, Link, Await } from 'react-router-dom'
import { FormControl, Stack, TextField, Button } from '@mui/material'
import Axios from 'axios'
import './SignUp.css'
import bcrypt from 'bcryptjs'

import Navbar from '../Navbar/Navbar'

const SignUp = () => {

    const [newUserData, setNewUserData] = useState({
        name: "", email: "", phone: "", password: ""
    });
    const navigator = useNavigate();

   

    var reader;
    

    const handlechange = (e, label) => {
        if (label !== 'password')
            setNewUserData({ ...newUserData, [label]: e.target.value.toLowerCase() });
        else
            setNewUserData({ ...newUserData, password: hasher(e.target.value) });
    }

    const hasher = (pass) => {
        return bcrypt.hashSync(pass, '$2a$10$CwTycUXWue0Thq9StjUM0u')
    }

    const handleSubmit = async (e) => {

        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        var validPhone = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;


        if (newUserData.name === '') {
            alert("please enter ur name..");
            return
        } else if (!(newUserData.email).match(validRegex)) {
            alert("please enter valid email address")
            return
        } else if (!validPhone.test(newUserData.phone)) {
            alert("please enter valid phone number")
            return
        } else if (newUserData.password.length < 6) {
            alert("password should be atleast 6 characters")
            return
        }


        console.log(newUserData)

        Axios.post('https://online-food-delivery-system.onrender.com/newcustomer', newUserData)
            // Axios.post('http://localhost:3001/newcustomer', newUserData)
            .then((res) => {
                console.log("client", res)
                if (res.data.message === 'success') {
                    alert("signup successfull")
                    navigator('/home')
                }
                else if (res.data.message === 'duplicate') {
                    alert('Sorry,this email was already registered ..')
                }

            }).catch(err => alert(err))

        e.preventDefault();
        const response = fetch("http://localhost:5000/api/creatuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name: newUserData.name, Email: newUserData.email, PhoneNumber: newUserData.phone, Password: newUserData.password })
        })
        const json = (await response).json()
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials")
        }

    }

    return (
        <>
            <Navbar />
            <div id='abcd'>

                <FormControl id='signupdiv'>
                    <h2 style={{ color: "magenta", margin: "30px 0" }}>Sign Up Form</h2>
                    <Stack direction="column" alignItems="center" spacing={2}>
                        <TextField label="Name" required margin='normal' variant='filled' color='secondary' onChange={e => handlechange(e, "name")}></TextField>
                        <TextField label="Email" required type='email' margin='normal' variant='filled' color='secondary' onChange={e => handlechange(e, "email")}></TextField>
                        <TextField label="PhoneNumber" required type='number' margin='normal' variant='filled' color='secondary' onChange={e => handlechange(e, "phone")}></TextField>
                        <TextField label="Password" required type='password' margin='normal' variant='filled' color='secondary' onChange={e => handlechange(e, "password")}></TextField>
                      
                        <Button type='submit' variant="contained" onClick={handleSubmit} component="label"> Submit </Button>
                    </Stack>
                </FormControl>
            </div>
        </>
    )
}

export default SignUp
