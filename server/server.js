// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/fruitvegmarket', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(cors()); // Use the cors middleware

const productSchema = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    price: Number,
    image: String,
    weight: Number // Add weight to the product schema
});

const Product = mongoose.model('Product', productSchema);

// Function to seed initial data into the database

		const seedDatabase = async () => {
			try {
				await Product.deleteMany(); // Clear existing data
		
				const products = [
					{
						name: 'Apple', type: 'Fruit',
						description: 'Fresh and crispy',
						price: 150,
						image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142542/apple.jpg',
						weight: 1000 // Weight in grams
					},
					{
						name: 'Banana',
						type: 'Fruit',
						description: 'Rich in potassium',
						price: 75,
						image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142554/banana.jpg',
						weight: 500
					},
					{
						name: 'Orange',
						type: 'Fruit',
						description: 'Packed with vitamin C',
						price: 200,
						image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142641/orange.jpg',
						weight: 800
					},
					{
						name: 'Carrot',
						type: 'Vegetable',
						description: 'Healthy and crunchy',
						price: 100,
						image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142613/carrot.jpg',
						weight: 300
					},
					{
						name: 'Broccoli',
						type: 'Vegetable',
						description: 'Nutrient-rich greens',
						price: 175,
						image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142601/brocoli.jpg',
						weight: 400
					},
					{
						name: 'Grapes',
						type: 'Fruit',
						description: 'Sweet and juicy',
						price: 250,
						image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142629/grapes.jpg',
						weight: 1200
					},
					{
						name: 'Strawberry',
						type: 'Fruit',
						description: 'Delicious red berries',
						price: 300,
						image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142657/strawberry.jpg',
						weight: 200
					},
					{
						name: 'Lettuce',
						type: 'Vegetable',
						description: 'Crisp and fresh',
						price: 120,
						image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142635/lettue.jpg',
						weight: 150
					},
					{
						name: 'Tomato',
						type: 'Vegetable',
						description: 'Versatile and flavorful',
						price: 180,
						image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142704/tomato.jpg',
						weight: 250
					},
					{
						name: 'Cucumber',
						type: 'Vegetable',
						description: 'Cool and hydrating',
						price: 130,
						image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142621/cocumber.jpg',
						weight: 350
					},
					// Add weight for other products
				];
		
				await Product.insertMany(products);
				console.log('Database seeded successfully');
			} catch (error) {
				console.error('Error seeding database:', error);
			}
		};

// Seed the database on server startup
seedDatabase();

// Define API endpoint for fetching all products
app.get('/api/products', async (req, res) => {
    try {
        // Fetch all products from the database
        const allProducts = await Product.find({}, { __v: 0 }); // Exclude version field

        // Send the entire products array as JSON response
        res.json(allProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
