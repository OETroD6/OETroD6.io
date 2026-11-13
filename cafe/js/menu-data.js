/* ============================================================
   MENU DATA — edit dishes here
   Each item: [image file name (in img/, without .png), name, price in Bells, description]
   To add a dish: put its picture in img/ and add one line below.
   ============================================================ */

const MENU = {
  drinks: {
    title: "Coffee & Drinks",
    blurb: "Hand-brewed coffee, bubble teas and fresh juices.",
    items: [
      ["takeout_coffee","Takeout Coffee",250,"Our house blend in a paper cup, for islanders on the move."],
      ["iced_coffee","Iced Coffee",300,"Slow-brewed and poured over ice. Bold, clean and refreshing."],
      ["iced_caffe_latte","Iced Caffè Latte",380,"Double espresso over cold milk and ice. Smooth and mellow."],
      ["boba_milk_tea","Boba Milk Tea",420,"Black tea and creamy milk with chewy tapioca pearls."],
      ["boba_green_tea","Boba Green Tea",420,"Light, grassy green tea with brown-sugar pearls."],
      ["boba_strawberry_tea","Boba Strawberry Tea",450,"Pink strawberry milk tea, sweet and fruity, with pearls."],
      ["iced_lemon_tea","Iced Lemon Tea",320,"Chilled black tea with a fresh slice of island lemon."],
      ["melon_soda","Melon Soda",350,"Fizzy green melon soda. A café classic."],
      ["milkshake","Milkshake",400,"Thick vanilla shake topped with whipped cream."],
      ["peach_smoothie","Peach Smoothie",450,"Blended ripe peaches and yogurt. Tastes like summer."],
      ["blood_orange_juice","Blood-Orange Juice",380,"Freshly squeezed, tangy and bright ruby red."]
    ]
  },
  light: {
    title: "Light Bites",
    blurb: "Sandwiches, soups and savoury bakes for a quick lunch.",
    items: [
      ["salmon_bagel","Salmon Bagel Sandwich",680,"Toasted bagel with smoked salmon, cream cheese and greens."],
      ["tomato_bagel","Tomato Bagel Sandwich",580,"Sun-ripened tomato and fresh lettuce on a soft bagel."],
      ["veggie_sandwich","Veggie Sandwich",550,"Garden vegetables layered on fresh bread."],
      ["mixed_fruits_sandwich","Mixed-Fruits Sandwich",600,"Fluffy bread with whipped cream and seasonal fruit."],
      ["veggie_quiche","Veggie Quiche",620,"Buttery pastry filled with egg, cheese and vegetables."],
      ["mushroom_crepe","Mushroom Crepe",640,"A thin crepe folded around creamy sautéed mushrooms."],
      ["pumpkin_soup","Pumpkin Soup",480,"Velvety soup made with home-grown pumpkins."],
      ["salad","Garden Salad",450,"Crisp leaves and veggies with our light house dressing."],
      ["potato_galette","Potato Galette",500,"Thinly sliced potatoes baked until golden and crispy."],
      ["pull_apart_bread","Pull-Apart Bread",520,"Warm, buttery rolls made for sharing."],
      ["pretzels","Pretzels",300,"Soft baked pretzels with a sprinkle of salt."]
    ]
  },
  desserts: {
    title: "Desserts",
    blurb: "Cakes, pastries and sweet treats to go with your coffee.",
    items: [
      ["apple_pie","Apple Pie",520,"Golden lattice crust over cinnamon-spiced apples."],
      ["cherry_tart","Cherry Tart",500,"Crisp tart shell piled high with glossy cherries."],
      ["carrot_cake","Carrot Cake",480,"Moist spiced sponge with smooth cream-cheese frosting."],
      ["fruit_pancakes","Fruit-Topped Pancakes",600,"A fluffy stack crowned with fresh fruit and cream."],
      ["mixed_fruits_crepe","Mixed-Fruits Crepe",560,"Rolled crepe stuffed with fruit and whipped cream."],
      ["fruit_scones","Fruit Scones",380,"Crumbly scones studded with dried fruit. Best with jam."],
      ["fruit_cupcakes","Fruit Cupcakes",420,"Little cupcakes with fruity frosting on top."],
      ["thumbprint_cookies","Thumbprint Jam Cookies",280,"Buttery cookies with a sweet jam centre."],
      ["coconut_pudding","Coconut Pudding",450,"Silky chilled pudding made with fresh coconut milk."],
      ["matcha_donut","Matcha Donut",300,"Soft ring donut dipped in green-tea glaze."],
      ["strawberry_donut","Strawberry Donut",300,"Pink strawberry icing on a fluffy donut."]
    ]
  }
};
