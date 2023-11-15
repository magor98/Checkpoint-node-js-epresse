const express = require('express');
const app = express();

// Custom middleware to check if it's working hours
const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hourOfDay = now.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay <= 17) {
        next(); // Continue to the next middleware or route handler
    } else {
        res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
    }
};

// Use the middleware for all routes
app.use(workingHoursMiddleware);

// Set up routes
app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/services', (req, res) => {
    res.render('services.ejs');
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

// Set up static files (styles.css)
app.use(express.static('public'));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
