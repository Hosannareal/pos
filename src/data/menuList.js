const restaurantPOSData = {
  restaurantName: "Tiwari's brother food plaza",
  categories: [
    {
      id: "cat1",
      name: "Starters",
      items: [
        {
          id: "item1",
          name: "Paneer Tikka",
          price: 180,
          veg: true,
          description: "Grilled cottage cheese cubes with spices",
          image: "/images/paneer-tikka.jpg",
          addons: [
            { id: "addon1", name: "Extra Mint Chutney", price: 20 },
            { id: "addon2", name: "Extra Cheese", price: 30 }
          ]
        },
        {
          id: "item2",
          name: "Chicken Wings",
          price: 220,
          veg: false,
          description: "Spicy BBQ wings served with dip",
          image: "/images/chicken-wings.jpg",
          addons: []
        }
      ]
    },
    {
      id: "cat2",
      name: "Main Course",
      items: [
        {
          id: "item3",
          name: "Butter Chicken",
          price: 280,
          veg: false,
          description: "Creamy tomato-based chicken curry",
          image: "/images/butter-chicken.jpg",
          addons: []
        },
        {
          id: "item4",
          name: "Paneer Butter Masala",
          price: 250,
          veg: true,
          description: "Paneer in rich tomato gravy",
          image: "/images/pbm.jpg",
          addons: []
        }
      ]
    },
    {
      id: "cat3",
      name: "Beverages",
      items: [
        {
          id: "item5",
          name: "Masala Chai",
          price: 40,
          veg: true,
          description: "Traditional Indian tea with spices",
          image: "/images/chai.jpg",
          addons: []
        },
        {
          id: "item6",
          name: "Cold Coffee",
          price: 90,
          veg: true,
          description: "Chilled coffee with ice cream",
          image: "/images/cold-coffee.jpg",
          addons: [
            { id: "addon3", name: "Add Chocolate", price: 15 }
          ]
        }
      ]
    }
  ],
  tables: [
    { id: "table1", name: "Table 1", status: "vacant" },
    { id: "table2", name: "Table 2", status: "occupied" },
    { id: "table3", name: "Take Away", status: "in progress" }
  ],
  currentOrders: [
    {
      orderId: "ord101",
      tableId: "table2",
      items: [
        {
          itemId: "item3",
          quantity: 2,
          selectedAddons: [],
          note: "Less spicy"
        },
        {
          itemId: "item5",
          quantity: 1,
          selectedAddons: []
        }
      ],
      orderTime: "2025-08-07T11:00:00",
      status: "preparing", // ordered | preparing | ready | served
      totalAmount: 600
    }
  ]
};


