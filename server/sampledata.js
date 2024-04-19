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
            name: "Naruto Uzumaki",
            description: "Celebrate 20 years of the Naruto anime with this dazzling figure of Naruto Uzumaki! Naruto is taking a break from his usual gear and wearing a Kurama mask on his head. He's dressed in orange and black garments that feature a pattern of his famous Rasengan technique!",
            price: 26.99,
            stock_quantity: 100,
            category: "Shounen",
            series: "Naruto",
            image_url: "https://resize.cdn.otakumode.com/ex/700.700/shop/product/32ed71c8a91e4929b62d4bafd3bd0ba7.jpg.webp",
        }),
        createProduct({
            name: "Mikasa Ackerman",
            description: "From the popular anime series Attack on Titan comes a 1/8th scale figure of Eren's childhood friend, Mikasa Ackerman! She is sculpted in a dynamic pose based on the cover illustration of the second volume of the Blu-ray and DVD.",
            price: 199.99,
            stock_quantity: 50,
            category: "Action",
            series: "Attack on Titan",
            image_url: "https://resize.cdn.otakumode.com/full/shop/product/daf6031d53dd4ae788de8b8774221c03.jpg.webp",
        }),
        createProduct({
            name: "Saber",
            description: "The King of Knights, Saber! Figure of Saber-class Servant Altria Pendragon in her Stage 2 appearance from the popular smartphone game Fate/Grand Order! ",
            price: 24.99,
            stock_quantity: 200,
            category: "Fantasy",
            series: "Fate/Grand Order",
            image_url: "https://resize.cdn.otakumode.com/ex/700.630/shop/product/15dcd07db9734b77a1b95c0fd8c6a5b8.jpg.webp",
        }),
        
        createProduct({
            name: "Vegeta",
            description: "From the popular anime series, Dragon Ball Z, comes the prince of all Saiyans. Regal, egotistical, and full of pride, Vegeta was once a ruthless, cold-blooded warrior and outright killer, but later abandons his role in the Galactic Frieza Army, instead opting to remain and live on Earth, fighting alongside the universe’s most powerful warrior, specifically with the mission to defeat and surpass Goku in power.",
            price: 26.99,
            stock_quantity: 75,
            category: "Action",
            series: "Dragon Ball Z",
            image_url: "https://resize.cdn.otakumode.com/ex/700.700/shop/product/55b491c0cb0f44139e84fbb50b1d6e86.jpg.webp",
        }),
        createProduct({
            name: "Monkey D. Luffy",
            description: "Monkey D. Luffy, also known as “Straw Hat Luffy”, is from the popular anime series One Piece. Luffy is a pirate and his lifelong dream is to become the Pirate King by finding the legendary treasure left behind by the late Pirate King, Gol D. Roger. He believes that being Pirate King means having the most freedom in the world.",
            price: 26.99,
            stock_quantity: 60,
            category: "Shounen",
            series: "One Piece",
            image_url: "https://resize.cdn.otakumode.com/ex/700.700/shop/product/d7c6409dd38a466ab09002069e67a269.jpg.webp",
        }),
        createProduct({
            name: "Zero Two",
            description: "From the anime series 'DARLING in the FRANXX' comes a Nendoroid of Zero Two in her pilot suit! Figure of Zero Two, also known as Code:002.",
            price: 70.99,
            stock_quantity: 100,
            category: "Romance",
            series: "Darling in the Franxx",
            image_url: "https://resize.cdn.otakumode.com/ex/700.980/shop/product/fe5a744fd3ff4e809cd8e15e16487cd3.jpg.webp",
        }),
        createProduct({
            name: "Frieren",
            description: "Frieren is the main protagonist of the new anime series, Frieren: Beyond Journey’s End. She is the Mage for the Hero Party and travels alongside Himmel, Eisen and Heiter in a ten-year adventure to defeat the Demon King. Frieren is known for being an adept mage, proficient in various forms of magic and also has a high concentration of mana.",
            price: 38.99,
            stock_quantity: 80,
            category: "Magical Girl",
            series: "Frieren: Beyond Journey's End",
            image_url: "https://resize.cdn.otakumode.com/ex/700.980/shop/product/9508b94a09ca49308d069e35527f9f31.jpg.webp",
        }),
        createProduct({
            name: "Ichigo Kurosaki",
            description: "Ichigo Kurosaki is the main character of the popular anime series, Bleach. Stumbling into the world of the Shinigami, Ichigo becomes a substitute Shinigami for an injured Shinigami to take on her duties to fight off against the Hallows and bring lost spirits to peace.",
            price: 26.99,
            stock_quantity: 70,
            category: "Action",
            series: "Bleach",
            image_url: "https://resize.cdn.otakumode.com/ex/700.700/shop/product/1c3be26802f541048491b9b86f7aba7d.jpg.webp",
        }),
        createProduct({
            name: "Asuna Yuuki",
            description: "Asuna from Sword Art Online: Alicization – War of Underworld is here as a figure portraying her avatar as Stacia, the Goddess of Creation. This figure captures a moment where she is soaring across the sky and is about to attack.",
            price: 285.99,
            stock_quantity: 90,
            category: "Fantasy",
            series: "Sword Art Online: Alicization - War of Underworld",
            image_url: "https://resize.cdn.otakumode.com/ex/700.625/shop/product/7e6a4ea42b594d06984f892cf2d3962a.jpg.webp",
        }),
        createProduct({
            name: "Levi Ackerman",
            description: "Humanity’s Strongest Soldier returns to the figma battlefield with this must-have re-release! His valiant look from the series has been faithfully captured in fully articulated figure form with smooth joints for easy posing.",
            price: 26.99,
            stock_quantity: 40,
            category: "Action",
            series: "Attack on Titan",
            image_url: "https://resize.cdn.otakumode.com/ex/700.700/shop/product/6c0772c4c43444c38fb3e4a451ef489e.jpg.webp",
        }),
        createProduct({
            name: "Kagome Higurashi",
            description: "A beautiful statue of Kagome Higurashi, the main female protagonist from the Inuyasha anime series. Kagome-chan is dressed in her classic green and white school uniform and has a cheerful smile on her face.",
            price: 38.99,
            stock_quantity: 60,
            category: "Fantasy",
            series: "Inuyasha",
            image_url: "https://resize.cdn.otakumode.com/full/shop/product/dc0c9beee8574c068992ca25cd1c397f.jpg.webp",
        }),
        createProduct({
            name: "Roy Mustang",
            description: "Flame Alchemist, Lieutenant Colonel Roy Mustang from Fullmetal Alchemist: Brotherhood! The Flame Alchemist is dressed in his iconic blue military uniform. With his trusty alchemy gloves on, his fingers are poised to snap!",
            price: 37.99,
            stock_quantity: 55,
            category: "Action",
            series: "Fullmetal Alchemist",
            image_url: "https://resize.cdn.otakumode.com/full/shop/product/e6e4e2b5c068401bb47ee505fbfcb143.jpg.webp",
        }),
        createProduct({
            name: "Tony Tony Chopper",
            description: "Tony Tony Chopper, also known as “Cotton Candy Lover,” is from the popular anime series One Piece. Chopper is a reindeer that ate the Hito Hito no Mi which is a devil fruit that allows its user to transform into a human hybrid or a human at will.",
            price: 26.99,
            stock_quantity: 120,
            category: "Shounen",
            series: "One Piece",
            image_url: "https://resize.cdn.otakumode.com/ex/700.700/shop/product/04adb32598074dac8c8f049dad23ba7b.jpg.webp",
        }),
        createProduct({
            name: "Tatsumaki",
            description: "Tornado of Terror Tatsumaki, the S-class hero, Fubuki's older sister, and the most powerful esper from the anime One Punch Man, is now available as a figure from AMAKUNI!",
            price: 218.99,
            stock_quantity: 70,
            category: "Action",
            series: "One-Punch Man",
            image_url: "https://resize.cdn.otakumode.com/ex/700.980/shop/product/fd1122dd315c433aa4456a2364dfba65.jpg.webp",
        }),
        createProduct({
            name: "Hatsune Miku",
            description: "A highly articulated Figma figure of Hatsune Miku, the virtual pop idol. The Wing of Form and Wing of Sound created with the theme of Wings of Creation have been have been faithfully captured in figure form ",
            price: 202.99,
            stock_quantity: 100,
            category: "Music",
            series: "Character Vocal Series 01",
            image_url: "https://resize.cdn.otakumode.com/ex/700.824/shop/product/2bfbdd968fd9476587d66fe2539a0450.jpg.webp",
        }),
        createProduct({
            name: "Lelouch Lamperouge",
            description: "A figure capturing the commanding presence of Lelouch Lamperouge from the Code Geass anime series. Beautifully sculpted in a majestic pose, the 1/8th scale non-articulated figure from Megahouse stands at 9.6cm tall",
            price: 135.99,
            stock_quantity: 50,
            category: "Action",
            series: "Code Geass",
            image_url: "https://resize.cdn.otakumode.com/full/shop/product/4941cf2cdb5b40c69a5c8bb04948acbd.jpg.webp",
        }),
        createProduct({
            name: "Madoka Kaname",
            description: "A statue of Madoka Kaname, the main character from Puella Magi Madoka Magica. The 9.4cm figure captures Madoka-chan wearing her cute magical girl outfit and holding Kyubey in her arms as she gives a warm smile.",
            price: 38.99,
            stock_quantity: 30,
            category: "Magical Girl",
            series: "Puella Magi Madoka Magica",
            image_url: "https://resize.cdn.otakumode.com/ex/700.735/shop/product/5561fe23ff04460190064466b706b52a.jpg.webp",
        }),
        createProduct({
            name: "Goku",
            description: "An action-packed figure of Goku in his Super Saiyan God form from Dragon Ball Super. Goku is captured in a mid-battle pose with battle damage on his orange gi as he prepares to fire a ki blast.",
            price: 20.99,
            stock_quantity: 35,
            category: "Action",
            series: "Dragon Ball Super",
            image_url: "https://resize.cdn.otakumode.com/ex/700.700/shop/product/0e30c658438b492b8b311839c922810a.jpg.webp",
        }),
        createProduct({
            name: "Houshou Marine",
            description: "Houshou no Ichimi crew, your fearless captain has arrived in the Pop Up Parade series! From Good Smile Company and sculptor hashifu comes the third generation hololive VTuber.",
            price: 36.99,
            stock_quantity: 25,
            category: "Fantasy",
            series: "Hololive Production",
            image_url: "https://resize.cdn.otakumode.com/full/shop/product/47c6477d519b449fb26803a205c76d15.jpg.webp",
        }),
        createProduct({
            name: "Saitama",
            description: "A figure capturing Saitama, the One Punch Man himself, in his iconic hero suit.",
            price: 19.99,
            stock_quantity: 45,
            category: "Action",
            series: "One Punch Man",
            image_url: "https://resize.cdn.otakumode.com/ex/700.700/shop/product/7f97ab66acab478692ebd52b9902fe05.jpg.webp",
        }),
        createProduct({
            name: "Rem",
            description: "A figure of Rem from the Re:Zero anime series. Rem is on her knees - make sure you forgive her right away by getting yourself one of these beautiful figures! ",
            price: 101.99,
            stock_quantity: 80,
            category: "Fantasy",
            series: "Re:Zero",
            image_url: "https://resize.cdn.otakumode.com/ex/700.1030/shop/product/862ef681a75f438788521357417a4fff.jpg.webp",
        }),
        createProduct({
            name: "Delta",
            description: "Delta is one of the founding members of the Shadow Garden in the anime series, The Eminence in Shadow. Delta holds the honorary fourth seat of the Seven Shadows.",
            price: 19.99,
            stock_quantity: 100,
            category: "Fantasy",
            series: "The Eminence in Shadow",
            image_url: "https://resize.cdn.otakumode.com/ex/700.700/shop/product/1ed983d3d2e3426499760c9e6bf50435.jpg.webp",
        }),
        createProduct({
            name: "Kirito",
            description: "The hero in black returns! From Sword Art Online: Alicization - War of Underworld, Kirito is dressed in his classic black coat from the original Aincrad days. ",
            price: 89.99,
            stock_quantity: 60,
            category: "Fantasy",
            series: "Sword Art Online",
            image_url: "https://resize.cdn.otakumode.com/ex/700.700/shop/product/90b12338e0e3485b87384dee74449e33.jpg.webp",
        }),
        createProduct({
            name: "Edward Elric",
            description: "Edward Elric, the heroic Fullmetal Alchemist, is back to do battle! Sculpted by Yoshihiro Nishimaru, Tatsuya Hattori, and HIDE, Edward sports a serious expression.",
            price: 109.99,
            stock_quantity: 70,
            category: "Action",
            series: "Fullmetal Alchemist",
            image_url: "https://resize.cdn.otakumode.com/full/shop/product/fb29e633f561446cac87da5ccc351933.jpg.webp",
        }),
        createProduct({
            name: "Chika Fujiwara",
            description: "An adorable Nendoroid figure of Chika Fujiwara, the lovable character from Kaguya-sama: Love Is War.",
            price: 68.99,
            stock_quantity: 90,
            category: "Romance",
            series: "Kaguya-sama: Love Is War",
            image_url: "https://resize.cdn.otakumode.com/full/shop/product/784ca223b8b1458e83f8d4c0bb3c4a50.jpg.webp",
        }),
        createProduct({
            name: "Gon Freecss",
            description: "A figure of Gon, the young protagonist from Hunter x Hunter.",
            price: 38.99,
            stock_quantity: 80,
            category: "Shounen",
            series: "Hunter x Hunter",
            image_url: "https://resize.cdn.otakumode.com/full/shop/product/4ac0eddb52704918bcf67de90562d204.jpg.webp",
        }),
        createProduct({
            name: "Killua Zoldyck",
            description: "A figure of Killua, the young protagonist and Gon best bud from Hunter x Hunter.",
            price: 38.99,
            stock_quantity: 100,
            category: "Shounen",
            series: "Hunter x Hunter",
            image_url: "https://resize.cdn.otakumode.com/full/shop/product/1abfdf7925e94c8b81cfee0e890aad52.jpg.webp",
        }),
        createProduct({
            name: "Rin Tohsaka",
            description: "A beautifully crafted statue of Rin Tohsaka in her dress outfit from Fate/Stay Night.",
            price: 79.99,
            stock_quantity: 50,
            category: "Fantasy",
            series: "Fate/Stay Night",
            image_url: "https://resize.cdn.otakumode.com/ex/700.781/shop/product/3cb1375feecb4663ac6ba00cf31325d5.jpg.webp",
        }),
        createProduct({
            name: "Natsu Dragneel",
            description: "A fiery figure of Natsu Dragneel, the Dragon Slayer from the Fairy Tail anime series.",
            price: 25.99,
            stock_quantity: 60,
            category: "Fantasy",
            series: "Fairy Tail",
            image_url: "https://resize.cdn.otakumode.com/full/shop/product/261a9918da3248de9a9c3e1580c3903a.jpg.webp",
        }),
    createProduct({
        name: "Usagi Tsukino",
        description: "From the upcoming two-part movie Pretty Guardian Sailor Moon Cosmos the Movie comes main character Usagi Tsukino in her Eternal Sailor Moon form! Part of Banpresto’s Glitter & Glamours line of affordable prize figures, Eternal Sailor Moon is captured at 9.1cm tall as she poses with her angelic wings spread wide and a hand on her heart.",
        price: 24.99,
        stock_quantity: 200,
        category: "Magical Girl",
        series: "Sailor Moon",
        image_url: "https://resize.cdn.otakumode.com/ex/700.700/shop/product/f2f8fd110e744ebfa6ef33c32095ff5a.jpg.webp",
    }),
    ]);
    
  
      console.log("Anime figures added successfully:", animeFigures);
    } catch (error) {
      console.error("Error adding anime figures:", error);
    }
  };

// Export the 
module.exports = { SampleData };