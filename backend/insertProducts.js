require("dotenv").config();
const sequelize = require('./db/config'); 
const Product = require("./models/pricelist");

const products = [
  {
    articleNo: "200001",
    product: "Organic Green Tea Leaves 500g",
    inPrice: 450,
    price: 750,
    unit: "grams",
    inStock: 900,
    description: "Premium handpicked green tea leaves from Assam"
  },
  {
    articleNo: "200002",
    product: "Wireless Mechanical Keyboard RGB",
    inPrice: 3500,
    price: 5000,
    unit: "unit",
    inStock: 320,
    description: "Bluetooth-enabled mechanical keyboard with customizable lights"
  },
  {
    articleNo: "200003",
    product: "Stainless Steel Pressure Cooker 5L",
    inPrice: 1600,
    price: 2200,
    unit: "unit",
    inStock: 650,
    description: "Durable cooker for quick and safe cooking"
  },
  {
    articleNo: "200004",
    product: "Ergonomic Office Chair with Lumbar Support",
    inPrice: 4800,
    price: 6800,
    unit: "unit",
    inStock: 200,
    description: "Adjustable chair designed for comfort during long hours"
  },
  {
    articleNo: "200005",
    product: "Smart LED Strip Lights 5m",
    inPrice: 900,
    price: 1500,
    unit: "meters",
    inStock: 1200,
    description: "Color-changing LED strip lights with remote control"
  },
  {
    articleNo: "200006",
    product: "Ceramic Dinner Set 18 Pieces",
    inPrice: 2200,
    price: 3500,
    unit: "set",
    inStock: 450,
    description: "Elegant dinnerware set for family meals"
  },
  {
    articleNo: "200007",
    product: "Portable Camping Stove",
    inPrice: 1400,
    price: 2100,
    unit: "unit",
    inStock: 600,
    description: "Lightweight gas stove for outdoor adventures"
  },
  {
    articleNo: "200008",
    product: "Electric Hair Dryer 2000W",
    inPrice: 1300,
    price: 1900,
    unit: "unit",
    inStock: 850,
    description: "Quick-dry hair dryer with heat protection"
  },
  {
    articleNo: "200009",
    product: "Smart Fitness Band Waterproof",
    inPrice: 1600,
    price: 2400,
    unit: "unit",
    inStock: 1100,
    description: "Tracks steps, heart rate, and sleep patterns"
  },
  {
    articleNo: "200010",
    product: "Cotton Bedsheet King Size",
    inPrice: 700,
    price: 1200,
    unit: "unit",
    inStock: 980,
    description: "Soft and breathable bedsheet with two pillow covers"
  },
  {
    articleNo: "200011",
    product: "Mini Projector Full HD 1080p",
    inPrice: 4800,
    price: 7200,
    unit: "unit",
    inStock: 300,
    description: "Portable projector for movies and presentations"
  },
  {
    articleNo: "200012",
    product: "Rechargeable LED Emergency Light",
    inPrice: 950,
    price: 1500,
    unit: "unit",
    inStock: 670,
    description: "Bright emergency light with long battery life"
  },
  {
    articleNo: "200013",
    product: "Leather Wallet RFID Protected",
    inPrice: 450,
    price: 800,
    unit: "unit",
    inStock: 1500,
    description: "Stylish wallet with card protection technology"
  },
  {
    articleNo: "200014",
    product: "Electric Rice Cooker 2L",
    inPrice: 1600,
    price: 2400,
    unit: "unit",
    inStock: 520,
    description: "Automatic rice cooker with keep-warm function"
  },
  {
    articleNo: "200015",
    product: "Wireless Earbuds with Charging Case",
    inPrice: 2200,
    price: 3200,
    unit: "unit",
    inStock: 750,
    description: "Compact earbuds with noise cancellation"
  },
  {
    articleNo: "200016",
    product: "Magnetic Phone Car Mount",
    inPrice: 300,
    price: 550,
    unit: "unit",
    inStock: 2100,
    description: "Strong magnetic holder for secure phone placement in cars"
  },
  {
    articleNo: "200017",
    product: "Cast Iron Skillet Pan 10 Inch",
    inPrice: 1200,
    price: 1800,
    unit: "unit",
    inStock: 400,
    description: "Pre-seasoned skillet ideal for searing and frying"
  },
  {
    articleNo: "200018",
    product: "Smart WiFi Plug with Voice Control",
    inPrice: 800,
    price: 1300,
    unit: "unit",
    inStock: 1400,
    description: "Control appliances remotely via smartphone or voice"
  },
  {
    articleNo: "200019",
    product: "Travel Backpack 40L Waterproof",
    inPrice: 2200,
    price: 3200,
    unit: "unit",
    inStock: 500,
    description: "Spacious and water-resistant travel backpack"
  },
  {
    articleNo: "200020",
    product: "Glass Storage Jar Set of 6",
    inPrice: 500,
    price: 900,
    unit: "set",
    inStock: 1300,
    description: "Airtight glass jars for kitchen storage"
  }
];


const insertProducts = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // Keep this in dev only

    await Product.bulkCreate(products, { ignoreDuplicates: true });
    console.log("✅ Products inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting products:", err);
  } finally {
    await sequelize.close(); // Optional: only if it's a standalone script
  }
};

insertProducts();
