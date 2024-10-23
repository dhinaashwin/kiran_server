const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
  origin: 'https://kiranrup.vercel.app',
  credentials: true
}));
app.use(bodyParser.json());

// Transporter for Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dhinaashwin11@gmail.com',
    pass: 'zdsonclqrqpzeezi',
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('Error in nodemailer configuration: ', error);
  } else {
    console.log('Nodemailer is ready to send emails');
  }
});
app.get((req,res) => {
    res.send('Connected');
}) 

app.post('/send-email', (req, res) => {
  console.log(req.body); // Log incoming request data
  const { name, email, mobile, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'kiranrup05@gmail.com',
    subject: `New message from ${name}`,
    text: `You have a new message from:
           Name: ${name}
           Email: ${email}
           Mobile: ${mobile}
           Message: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Email not sent', error });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
