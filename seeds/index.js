const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground.model');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const randomCity = sample(cities);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          //Your User ID
            author: '638441ae308ff621d3c9e1bb',
            location: `${randomCity.city}, ${randomCity.state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae distinctio quo, provident consequatur repudiandae voluptatibus hic sapiente, sit vero ipsam vel quisquam repellendus repellat ut sint dignissimos alias at placeat.',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                randomCity.longitude, 
                randomCity.latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dry6oqzir/image/upload/v1670055435/YelpCamp/bqbqheuydoflbv6ipnea.jpg',
                  filename: 'YelpCamp/bqbqheuydoflbv6ipnea'
                },
                {
                  url: 'https://res.cloudinary.com/dry6oqzir/image/upload/v1670055436/YelpCamp/nrvsjyhtwkhz1zpmedbq.jpg',
                  filename: 'YelpCamp/nrvsjyhtwkhz1zpmedbq'
                }
              ]            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    db.close()
});