// Import necessary functions from the database module
const { createUser, createAdminUser, createProduct } = require("./db");

// Function to initialize dummy data
const SampleData = async () => {
  try {
    // Create sample admin user
    const adminUser = await createAdminUser({
      username: "admin",
      password: "admin123",
      is_admin: true
    });

    // Create sample users
    const users = await Promise.all([
      createUser({
        username: "user1",
        email: "user1@example.com",
        password: "password1",
        address: "123 Street, City, Country",
        payment_method: "Credit Card"
      }),
      createUser({
        username: "user2",
        email: "user2@example.com",
        password: "password2",
        address: "456 Avenue, Town, Country",
        payment_method: "PayPal"
      }),
    ]);

    const animeFigures = await Promise.all([
        createProduct({
          name: "Naruto Uzumaki Figure",
          description: "A highly detailed figure of Naruto Uzumaki, the main character from the Naruto anime series.",
          price: 49.99,
          stock_quantity: 100,
          category: "Shounen",
        }),
        createProduct({
          name: "Mikasa Ackerman Statue",
          description: "A beautifully crafted statue of Mikasa Ackerman from the Attack on Titan series.",
          price: 89.99,
          stock_quantity: 50,
          category: "Action",
        }),
        createProduct({
          name: "Sailor Moon Funko Pop",
          description: "A cute Funko Pop vinyl figure of Sailor Moon, the titular character from the Sailor Moon anime.",
          price: 14.99,
          stock_quantity: 200,
          category: "Magical Girl",
        }),
        createProduct({
          name: "Vegeta Collectible Figure",
          description: "A highly collectible figure of Vegeta, the Prince of Saiyans, from the Dragon Ball Z series.",
          price: 59.99,
          stock_quantity: 75,
          category: "Action",
        }),
        createProduct({
          name: "Luffy Gear Fourth Figuarts Zero",
          description: "A dynamic figure of Monkey D. Luffy in his Gear Fourth form from the One Piece anime series.",
          price: 79.99,
          stock_quantity: 60,
          category: "Shounen",
        }),
        createProduct({
          name: "Zero Two Nendoroid",
          description: "An adorable Nendoroid figure of Zero Two from the anime Darling in the Franxx.",
          price: 39.99,
          stock_quantity: 100,
          category: "Romance",
        }),
        createProduct({
          name: "Sakura Kinomoto Cardcaptor Statue",
          description: "A beautiful statue of Sakura Kinomoto in her Cardcaptor outfit, capturing the essence of the magical girl genre.",
          price: 69.99,
          stock_quantity: 80,
          category: "Magical Girl",
        }),
        createProduct({
          name: "Ichigo Kurosaki Figure",
          description: "A detailed figure of Ichigo Kurosaki, the protagonist of the Bleach anime series.",
          price: 54.99,
          stock_quantity: 70,
          category: "Action",
        }),
        createProduct({
          name: "Asuna Sword Art Online Figure",
          description: "A stunning figure of Asuna, one of the main characters from the Sword Art Online anime series.",
          price: 64.99,
          stock_quantity: 90,
          category: "Fantasy",
        }),
        createProduct({
          name: "Levi Ackerman Figuarts Zero",
          description: "A highly detailed figure of Levi Ackerman, known as Humanity's Strongest Soldier, from Attack on Titan.",
          price: 84.99,
          stock_quantity: 40,
          category: "Action",
        }),
        createProduct({
          name: "Kagome Higurashi Statue",
          description: "A beautiful statue of Kagome Higurashi, the main female protagonist from the Inuyasha anime series.",
          price: 49.99,
          stock_quantity: 60,
          category: "Fantasy",
        }),
        createProduct({
          name: "Roy Mustang Fullmetal Alchemist Figure",
          description: "A captivating figure of Roy Mustang, the Flame Alchemist, from Fullmetal Alchemist.",
          price: 74.99,
          stock_quantity: 55,
          category: "Action",
        }),
        createProduct({
          name: "Chopper One Piece Plushie",
          description: "A cuddly plushie of Tony Tony Chopper, the adorable reindeer from One Piece.",
          price: 19.99,
          stock_quantity: 120,
          category: "Shounen",
        }),
        createProduct({
          name: "Kiki's Delivery Service Figurine",
          description: "A charming figurine of Kiki, the young witch from the Studio Ghibli film Kiki's Delivery Service.",
          price: 29.99,
          stock_quantity: 70,
          category: "Fantasy",
        }),
        createProduct({
          name: "Hatsune Miku Figma",
          description: "A highly articulated Figma figure of Hatsune Miku, the virtual pop idol.",
          price: 44.99,
          stock_quantity: 100,
          category: "Music",
        }),
        createProduct({
          name: "Lelouch Lamperouge Code Geass Figure",
          description: "A figure capturing the commanding presence of Lelouch Lamperouge from the Code Geass anime series.",
          price: 79.99,
          stock_quantity: 50,
          category: "Action",
        }),
        createProduct({
          name: "Madoka Kaname Puella Magi Statue",
          description: "A beautifully sculpted statue of Madoka Kaname, the main character from Puella Magi Madoka Magica.",
          price: 94.99,
          stock_quantity: 30,
          category: "Magical Girl",
        }),
        createProduct({
          name: "Goku Super Saiyan God Action Figure",
          description: "An action-packed figure of Goku in his Super Saiyan God form from Dragon Ball Super.",
          price: 99.99,
          stock_quantity: 35,
          category: "Action",
        }),
        createProduct({
          name: "Inuyasha & Kagome ArtFX J Statue",
          description: "A stunning statue featuring Inuyasha and Kagome in a dramatic pose, capturing the essence of their relationship.",
          price: 109.99,
          stock_quantity: 25,
          category: "Fantasy",
        }),
        createProduct({
          name: "Saitama One Punch Man Figure",
          description: "A figure capturing Saitama, the One Punch Man himself, in his iconic hero suit.",
          price: 69.99,
          stock_quantity: 45,
          category: "Action",
        }),

              createProduct({
        name: "Rem Re:Zero Figuarts Mini",
        description: "A cute and compact Figuarts Mini figure of Rem from the Re:Zero anime series.",
        price: 24.99,
        stock_quantity: 80,
        category: "Fantasy",
      }),
      createProduct({
        name: "Sakura Cardcaptor Funko Pop",
        description: "A Funko Pop vinyl figure featuring Sakura Kinomoto in her Cardcaptor outfit.",
        price: 14.99,
        stock_quantity: 100,
        category: "Magical Girl",
      }),
      createProduct({
        name: "Kirito Sword Art Online Statue",
        description: "A finely sculpted statue of Kirito, the main character from Sword Art Online.",
        price: 89.99,
        stock_quantity: 60,
        category: "Fantasy",
      }),
      createProduct({
        name: "Edward Elric Fullmetal Alchemist Figure",
        description: "A dynamic figure capturing Edward Elric in action, with his signature automail arm.",
        price: 64.99,
        stock_quantity: 70,
        category: "Action",
      }),
      createProduct({
        name: "Chika Fujiwara Kaguya-sama Nendoroid",
        description: "An adorable Nendoroid figure of Chika Fujiwara, the lovable character from Kaguya-sama: Love Is War.",
        price: 39.99,
        stock_quantity: 90,
        category: "Romance",
      }),
      createProduct({
        name: "Gon Freecss Hunter x Hunter Figure",
        description: "A highly detailed figure of Gon Freecss, the young protagonist from Hunter x Hunter.",
        price: 54.99,
        stock_quantity: 80,
        category: "Shounen",
      }),
      createProduct({
        name: "Mikasa Ackerman Figma",
        description: "A Figma figure capturing the strength and agility of Mikasa Ackerman from Attack on Titan.",
        price: 44.99,
        stock_quantity: 100,
        category: "Action",
      }),
      createProduct({
        name: "Rin Tohsaka Fate/Stay Night Statue",
        description: "A beautifully crafted statue of Rin Tohsaka in her mage outfit from Fate/Stay Night.",
        price: 79.99,
        stock_quantity: 50,
        category: "Fantasy",
      }),
      createProduct({
        name: "Natsu Dragneel Fairy Tail Figure",
        description: "A fiery figure of Natsu Dragneel, the Dragon Slayer from the Fairy Tail anime series.",
        price: 59.99,
        stock_quantity: 60,
        category: "Fantasy",
      }),
      createProduct({
        name: "Zero Two Darling in the Franxx Figure",
        description: "A striking figure of Zero Two in her iconic pilot suit from Darling in the Franxx.",
        price: 69.99,
        stock_quantity: 70,
        category: "Romance",
      }),
    ]);
      console.log("Anime figures added successfully:", animeFigures);
    } catch (error) {
      console.error("Error adding anime figures:", error);
    }
  };

// Export the 
module.exports = { SampleData };