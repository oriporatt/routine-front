      
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useState } from 'react';


export function ContactUs() {
    const [status, setStatus] = useState('idle');

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(e.target);

        try {
        const res = await fetch("https://formsubmit.co/241dc238ae23b2707b70024f1ceb1de8", {
            method: "POST",
            body: formData,
            headers: {
            Accept: "application/json"
            }
        });

        if (res.ok) {
            setStatus('sent');
            e.target.reset();
        } else {
            setStatus('error');
        }
        } catch (err) {
        setStatus('error');
        }
    }
    return (
      <form onSubmit={handleSubmit} className="contact-us" id="contact-us-href">
        <h2>Contact Us</h2>
        <h3>Leave your details here</h3>
        <h3>We will get back to you soon</h3>

        <TextField
            className="text-input"
            name="name"
            label="Name"
            variant="outlined"
            required
            margin="normal"
        />
        <TextField
            className="text-input"
            name="email"
            label="Email"
            type="email"
            variant="outlined"

            //   fullWidth
            required
            margin="normal"
        />
        <TextField
            className="text-input"
            name="message"
            label="Details"
            multiline
            rows={4}
            variant="outlined"
            margin="normal"

        />

        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="New Message from Routine AI!" />

        <Button type="submit" 
            variant="contained" color="primary" 
            className="submit-btn"

        >
          Send
        </Button>
        
        {status === 'sending' && <p>Sending...</p>}
        {status === 'sent' && <p style={{ color: 'green' }}>✅ Sent successfully!</p>}
        {status === 'error' && <p style={{ color: 'red' }}>❌ Failed to send. Try again.</p>}
      </form>
    )
}