import { createContext, useState } from "react";

// 1. Create the context
const POSContext = createContext();

// 2. Initial Data (Restaurant POS)
const initialData = {
  restaurantName: "Tiwari Brother's ",
  categories: [
    {
      id: "cat1",
      name: "Starters",
      items: [
        {
          id: "item1",
          name: "Paneer Tikka",
          price: 200,
         type: "veg",
          customisable :  [
                       {
                        id:"custom1" , name:"Half" ,price : "180"
                       } ,
                       {
                        id:"custom2" , name:"Full" ,price : "360"
                       } 
                    ],
          description: "Grilled cottage cheese cubes with spices",
          image: "/images/paneer-tikka.jpg",
          addons: [
            { id: "addon1", name: "Extra Mint Chutney", price: 20 },
            { id: "addon2", name: "Extra Cheese", price: 30 },
            { id: "addon3", name: "lsjdfhj", price: 30 },
            { id: "addon4", name: "tikki", price: 30 },
            { id: "addon5", name: "tikki", price: 30 },
            { id: "addon6", name: "tikki", price: 30 },
            { id: "addon7", name: "tikki", price: 30 },
            
            
          ]
        },
        {
          id: "item2",
          name: "Chicken Wings",
          price: 220,
          type: "non-veg",
          description: "Spicy BBQ wings served with dip",
          image: "/images/chicken-wings.jpg",
          addons: []
        },
                {
          id: "item3",
          name: "Pizaa",
          price: 180,
           type:  "veg",
          customisable :  [
                       {
                        id:"custom1" , name:"Half" ,price : "180"
                       } ,
                       {
                        id:"custom2" , name:"Full" ,price : "360"
                       } 
                    ],
          description: "",
          image: "/images/paneer-tikka.jpg",
          addons: [
            // { id: "addon1", name: "Extra Mint Chutney", price: 20 },
            { id: "addon2", name: "Extra Cheese", price: 30 }
          ]
        }
      ]
    },
    {
      id: "cat2",
      name: "Main Course",
      items: [
        {
          id: "item4",
          name: "Butter Chicken",
          price: 280,
          type: "non-veg",
          customisable :  [
                       {
                        id:"custom1" , name:"Half" ,price : "280"
                       } ,
                       {
                        id:"custom2" , name:"Full" ,price : "560"
                       } 
                    ],
          description: "Creamy tomato-based chicken curry",
          image: "/images/butter-chicken.jpg",
          addons: []
        },
        {
          id: "item5",
          name: "Paneer Butter Masala",
          price: 250,
          type : "veg",
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
          id: "item6",
          name: "Masala Chai",
          price: 40,
            type:  "veg",
          description: "Traditional Indian tea with spices",
          image: "/images/chai.jpg",
          addons: []
        },
        {
          id: "item7",
          name: "Cold Coffee",
          price: 90,
           type:  "veg",
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
  currentOrders: []
};

// 3. Create Provider component
export default function POSProvider({ children }) {
  const [posData, setPosData] = useState(initialData);

  return (
    <POSContext.Provider value={{ posData, setPosData }}>
      {children}
    </POSContext.Provider>
  );
}

export { POSContext };
