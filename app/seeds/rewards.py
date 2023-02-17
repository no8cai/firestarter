from app.models import db, Reward, environment, SCHEMA
#startDate="2023-01-01"

def seed_rewards():
    #project1
    reward1 = Reward(title="Photobook + Thank You", price=10,
        description="One beautifully designed digital copy of the project photo book with photographs of all the pieces made for this project plus backer acknowledgement on our website", projectId=1, estimatedDelivery="2023-10-01")
    reward2 = Reward(title="Tiny pot + Photobook + Thank You", price=30, description="A miniature pot thrown on the potter's wheel and made with all the same love as a regular sized pot! shipping not included, see fulfillment.", projectId=1, estimatedDelivery="2023-11-01")
    reward3 = Reward(title="Handcrafted Mug", price=50, description="Handcrafted mug thrown on the potter's wheel, a reliable vessel for your favorite morning drink! INCLUDES: Backer Acknowledgement on Bright Raven Studio Website, Project Photobook (PDF), Handcrafted Mug", projectId=1, estimatedDelivery="2023-12-01")
    #project2
    reward4 = Reward(title="Arquitectura 3", price=30, description="🖌 Techniques: Burin engraving on copper 📐 Sizes: (Stamp 11,5 cm x 13,5 cm) on (Paper 19,5 cm x 16 cm)", projectId=2, estimatedDelivery="2023-10-01")
    reward5 = Reward(title="Netta Rufina", price=50, description="🖌 Techniques: Aquatint and drypoint on copper 📐 Sizes: (Stamp 12,2 cm x 16,5 cm) on (Paper 28,5 cm x 38 cm)", projectId=2, estimatedDelivery="2023-09-01")
    reward6 = Reward(title="Así como comiendo gambas", price=80, description="🖌 Techniques: Aquatint on copper 📐 Sizes: (Stamp 24,5 cm x 12 cm) on (Paper 56 cm x 38 cm)", projectId=2, estimatedDelivery="2023-11-01")
    #project3
    reward7 = Reward(title="Digital Copy", price=90, description="Receive a digital copy of Nicole Adams: Series.", projectId=3, estimatedDelivery="2023-10-01")
    reward8 = Reward(title="Physical Copy", price=210, description="Receive a physical copy of Nicole Adams: Series.", projectId=3, estimatedDelivery="2023-11-01")
    reward9 = Reward(title="Collector's Edition", price=360, description="Receive a physical copy of Nicole Adams: Series in a decorative box, 5 collector cards and 2 collectible key chains.", projectId=3, estimatedDelivery="2023-10-01")
    #project4
    reward10 = Reward(title="Standard Silver Edition", price=20,
        description="Get a copy of the SILVER EDITION of Unicorn: Vampire Hunter #1. We will only print enough to fill orders. These comics will not be numbered, but are otherwise identical to the Collector's Silver Edition. They will be signed by Caleb Palmquist.",
        projectId=4, estimatedDelivery="2023-10-01")
    reward11 = Reward(title="Collectors GOLD Edition", price=40,
        description="Get a copy of the GOLD EDITION of Unicorn: Vampire Hunter #1. These comics are limited edition, and numbered out of 100. They will also come signed by Caleb Palmquist.",
        projectId=4, estimatedDelivery="2023-11-01")
    reward12 = Reward(title="Collectors PLATINUM  Edition", price=60,
        description="Get a copy of the PLATINUM EDITION of Unicorn: Vampire Hunter #1. These comics are limited edition, and numbered out of 100. They will also come signed by Caleb Palmquist in gold pen.",
        projectId=4, estimatedDelivery="2023-12-01")
    #project5
    reward13 = Reward(title="1x Lifted Lumbar - Early Bird", price=30, description="Shipping will be calculated during the post-campaign survey process. Estimated shipping costs are available on campaign page. ", projectId=5, estimatedDelivery="2023-10-01")
    reward14 = Reward(title="BUY 2 GET 1 FREE | Kickstarter Special", price=155, description="One for your office 💻, one for your home 🏠, one for your car 🚗 Expected Retail: $387 You Save: $228 (~60% OFF", projectId=5, estimatedDelivery="2023-11-01")
    reward15 = Reward(title="3x Lifted Lumbar", price=90, description="One for your office 💻, one for your home 🏠, one for your car 🚗 Expected Retail: $387 You Save: $228 (~60% OFF)", projectId=5, estimatedDelivery="2023-12-01")
    #project6
    reward16 = Reward(title="Solo - Early Bird! 20% OFF", price=40, description="Get ONE pair of Mangrove Sunglasses and SAVE $25! Choose any of the three sunglasses designs, your frame colors, and lens color after the campaign ends on an email survey from Backerkit. 🌎 Worldwide shipping will be charged after the campaign ends on Backerkit too.", projectId=6, estimatedDelivery="2023-10-01")
    reward17 = Reward(title="DUO - Early Bird! 30% OFF", price=70, description="Get TWO pairs of Mangrove Sunglasses and SAVE $80! Choose any of the three sunglasses designs, your frame colors, and lens colors after the campaign ends on an email survey from Backerkit. 🌎 Shipping will be charged after the campaign ends on Backerkit too.", projectId=6, estimatedDelivery="2023-11-01")
    reward18 = Reward(title="TRIO - Early Bird! 40% OFF", price=100, description="Get THREE pairs of Mangrove Sunglasses and SAVE $185! Choose any of the three sunglasses designs, your frame colors, and lens colors after the campaign ends on an email survey from Backerkit. 🌎 Shipping will be charged after the campaign ends on Backerkit too.", projectId=6, estimatedDelivery="2023-12-01")
    #project7
    # reward19 = Reward(title="Awakening the Flow: 8 Week Workbook", price=100, description="Awakening the Flow: 8 Week Workbook is a workbook designed to help eliminate writer blocks and liberate creative flow.  The workbook includes chakra balancing exercises, writing prompts. and intelligently designed yin yoga sequences.", projectId=7, estimatedDelivery="2023-10-01")
    # reward20 = Reward(title="Vinyasa Yoga Online Video", price=250, description="Receive a 1-hour vinyasa yoga class video, intelligently sequenced to accommodate all levels.  This video can be used to practice yoga in the comfort of your own home, anytime you'd like!", projectId=7, estimatedDelivery="2023-11-01")
    # reward21 = Reward(title="30-minute Reiki Session", price=500, description="Receive a 30-minute online reiki session to promote health and wellbeing.", projectId=7, estimatedDelivery="2023-12-01")
    reward19 = Reward(title="Swag Box 1: Taj Mahal’s Treasure", price=100, description="Backing our project gets you into the Aladdin 3477 family! You'll receive updates and behind-the-scenes videos of everything happening, not only with the Kickstarter, but the release of the films! This tier also gets you physical rewards! The 1st introductory Aladdin 3477 Swag Box contains a whopping 8 item", projectId=7, estimatedDelivery="2023-10-01")
    reward20 = Reward(title="Swag Box 2: Jinn’s Wise Choice", price=300, description="Backing this reward tier gets you the previous Swag Boxes delivered earlier in the year, as well as the 3rd Swag Box this Fall. And this one has some awesome rewards!", projectId=7, estimatedDelivery="2023-11-01")
    reward21 = Reward(title="EARLY BIRD- Swag Box 4: Lochan’s Loot", price=500, description="There are only 100 spots to lock in the 4th Swag Box at a lower price. Backing this reward tier gets you all previous Swag Boxes delivered earlier in the year, as well as the 4th this coming Winter. As you might have guessed, this Swag Box also contains 8 new physical rewards!", projectId=7, estimatedDelivery="2023-12-01")


    #project8
    reward22 = Reward(title="A Song from the Soundtrack", price=35, description="Yet another lucky one, you will receive our special thanks via e-mail with the link of a song from the Original Soundtrack, which recorded in the jungle.", projectId=8, estimatedDelivery="2023-10-01")
    reward23 = Reward(title="Live Presentation", price=50, description="Meet with the director ! You will receive our special thanks via e-mail with the link of an online presentation of the director, about his previous documentary film.", projectId=8, estimatedDelivery="2023-11-01")
    reward24 = Reward(title="Online Premier Invitation", price=90, description="Yes you are on the list ! You will receive our special thanks via e-mail with the link of the online premier invitation.", projectId=8, estimatedDelivery="2023-12-01")
    #project9
    reward25 = Reward(title="Newly Branded Layers Tee", price=40, description="""Beat the crowds and get first dibs on newly branded Layers swag (yeahhhh, we're all grown up and rebranding).- One t-shirt, your size.""", projectId=9, estimatedDelivery="2023-10-01")
    reward26 = Reward(title="Limited Edition Yeti Coffee Tumbler", price=70, description="""Walk around Green Lake in style with your Limited Edition Layers Logo Yeti Coffee Tumbler. Say that 10 times fast!- One Limited Edition Layers Logo Yeti Coffee Tumbler with Magslider lid """, projectId=9, estimatedDelivery="2023-11-01")
    reward27 = Reward(title="Layers Sandwich Calendar and Custom Pen", price=100, description=""" Miss the truck already? Here's 12 moments at the truck we'll never forget.
        Beautiful imagery shot by Ryan Thrower;  busy services, elegant food shots and who else but Regina!""" , projectId=9, estimatedDelivery="2023-12-01")
    #project10
    reward28 = Reward(title="RED - Ultimate Sock Yarn 100g skein", price=30, description="""One skein of the OG Ultimate Sock Yarn.  Made from 85% extra fine super wash merino wool, and 15% nylon… this is the softest, squishiest, plumpest sock yarn you'll ever use!  Not just for socks… wonderful accessories and any next to skin application!  One random skein in shades of RED… dyer's choice!""", projectId=10, estimatedDelivery="2023-10-01")
    reward29 = Reward(title="PURPLE - SHIMMER ULtimate Sock Yarn", price=40, description="One skein of the OG Ultimate Sock Yarn.  Made from 80% extra fine super wash merino wool, 15% nylon, and 5% gold stellina shimmer… this is the softest, squishiest, plumpest sock yarn you'll ever use!  Not just for socks… wonderful accessories and any next to skin application!  One random skein in shades of PURPLE… dyer's choice!", projectId=10, estimatedDelivery="2023-11-01")
    reward30 = Reward(title="GREEN - SHIMMER Ultimate Sock Yarn", price=60, description="One skein of the OG Ultimate Sock Yarn.  Made from 80% extra fine super wash merino wool, 15% nylon, and 5% gold stellina shimmer… this is the softest, squishiest, plumpest sock yarn you'll ever use!  Not just for socks… wonderful accessories and any next to skin application!  One random skein in shades of GREEN… dyer's choice!", projectId=10, estimatedDelivery="2023-12-01")
    #project11
    reward31 = Reward(title="Hardship Tier", price=10, description="Just don't have the money to pay full price for .pdfs for the two books, much less pay for physical copies? Pay just $10.00--we work on the honor system here--and get a digital copy of the PLAYER'S GUIDE or the WORLD BOOK. You'll be listed in the PLAYER'S GUIDE as a backer.", projectId=11, estimatedDelivery="2023-10-01")
    reward32 = Reward(title="PDF Tier", price=25, description="Secure a digital copy of the PLAYER'S GUIDE or the WORLD BOOK and let the Viking gaming commence! The PDF Tier includes a .pdf of one of the two books plus .pdfs of all applicable stretch goals! You'll be listed in the PLAYER'S GUIDE as a backer.", projectId=11, estimatedDelivery="2023-11-01")
    reward33 = Reward(title="1 Book Tier", price=50, description="Buy either the PLAYER'S GUIDE or the WORLD BOOK in both digital and physical formats. Includes all applicable stretch goals. Shipping & Handling and Sales Tax are not included. You'll be listed in the PLAYER'S GUIDE as a backer.", projectId=11, estimatedDelivery="2023-12-01")
    #project12
    reward34 = Reward(title="Captain's Keepsakes (Physical/Digital)", price=40, description="Care for some physical tokens from our beloved LIs? At this tier, on top of the previously listed digital merch (except the lore book), you'll be sent double-sided bookmarks of the LIs, a cute sticker sheet, and two charms themed around the Seelie and Unseelie Courts! You'll also get early access to all game releases, from routes to side stories (if the side story stretch goal is reached)!", projectId=12, estimatedDelivery="2023-10-01")
    reward35 = Reward(title="The King's Patronage (Physical/Digital)", price=125, description="Can't decide between the physical merch and the art & lore book? Not to worry! With this tier, you'll get the best of both worlds... or should we say courts? ", projectId=12, estimatedDelivery="2023-11-01")
    reward36 = Reward(title="The Queen's Favour (Physical/Digital)", price=555, description="Really, darling, this is simply too much choice! Don't you just want it all, and then some? At this tier, you'll get everything listed previously, as well as SIX custom voice messages from the LIs and a personalized sprite of your MC, complete with expressions! Even better: If we achieve the MC/Daonna customization goal, your MC can become one of the canonical in-game appearances of MC, if you so wish!", projectId=12, estimatedDelivery="2023-12-01")
     #project13
    reward37 = Reward(title="B-Side Magazine Tote + Entry", price=50, description="""1 Raffle Ticket/Entry to win a Treefort Music Festival Pass. Your Name on our Founding Contributors Page on the Website. B-Side Magazine Tote Bag - Ltd. Edition - Founding Contributor """, projectId=13, estimatedDelivery="2023-10-01")
    reward38 = Reward(title="B-Side Magazine Tee + Entry", price=40, description="""Donate $85 or more and receive a Limited Edition B-Side Magazine Tee. These shirts are available to Founding Contributors only on Kickstarter. 1 Raffle Ticket/Entry to win a Treefort Music Festival Pass. Your Name on our Founding Contributors Page on the Website. B-Side Magazine Tee - Ltd. Edition - Founding Contributor """, projectId=13, estimatedDelivery="2023-11-01")
    reward39 = Reward(title="Graphic Design + Tote + Entry", price=60, description="""Graphic Design - I'll Create Your Logo/Design/Merch/Event Poster. B-Side Magazine Tote Bag - Ltd. Edition - Founding Contributor. 1 Raffle Ticket/Entry to win a Treefort Music Festival Pass. Your Name on our Founding Contributors Page on the Website""", projectId=13, estimatedDelivery="2023-12-01")
    #project14
    reward40 = Reward(title="Broken Record", price=60, description="Parents repeat themselves a lot. this will get you a copy of the new album on vinyl, with digital download codes to this and all of my music!", projectId=14, estimatedDelivery="2023-10-01")
    reward41 = Reward(title="Digital Daddy", price=75, description="LIMITED EDITION USB Drive containing all of Mega Ran's music, instrumentals and podcasts! You don't want a CD because you don't have any place to play it. You also get everything from previous tiers: album, bonus track and more.", projectId=14, estimatedDelivery="2023-11-01")
    reward42 = Reward(title="Action Figure Bundle", price=250, description="Get a limited edition Mega Ran Action Figure,  a new t-shirt, personalized thank you rap video as well as the new album on VINYL!", projectId=14, estimatedDelivery="2023-12-01")
    #project15
    reward43 = Reward(title="Digital Book & Thank You", price=15, description="Enjoy the lyrical adventure of this beautiful book on your electronic device.  Receive a personal thank-you email.", projectId=15, estimatedDelivery="2023-10-01")
    reward44 = Reward(title="Hardcover Book. Digital Book & Song", price=30, description="This hardcopy book is the best thing you could give yourself or that Sweet Fire in your life! Enjoy a First Edition hardcover copy of the book, an e-book, and the song--plus 8 New Narrative coloring sheets and 4 New Narrative die-cut stickers.", projectId=15, estimatedDelivery="2023-11-01")
    reward45 = Reward(title="2 Books & More!", price=100, description="Two First Edition Hardcover Books–one to keep, one to give! 2nd Book copy includes gifting sticker.  Includes amazing reward extras.", projectId=15, estimatedDelivery="2023-12-01")
    #project16
    reward46 = Reward(title="Paperbacks of Layla and Ian's Realm", price=55, description="Get the complete set of Ian's adventures in the Realm. 5 books total bound under two covers. Receive two Whomticker charms and bookmarks to help you cast your spells! Included is an art print postcard", projectId=16, estimatedDelivery="2023-10-01")
    reward47 = Reward(title="EBook Fantasy Extravaganza", price=60, description="Thirteen ebooks in all: Ian's Realm Trilogy, Layla, and the complete Sword of Cho Nisi Series (five books)as well as Silver Threads, a collection of 5 short stories to Sword of Cho Nisi, Geraldo, a short story, and the new Escapades of a Magic Thief. The digital book of the songs from Ian's realm with illustrations. Printable Digital paintings and word art for both series", projectId=16, estimatedDelivery="2023-11-01")
    reward48 = Reward(title="Hardcover Illustrated Layla", price=75, description="""Get an illustrated hardcover of Layla, Layla eBook, 2 Whomticker Charms and bookmarks, and a map. Your name in the acknowledgments and an art print post card or two.
If the first stretch goal is met ($750, the cover will have 3D Diamond printing.)""", projectId=16, estimatedDelivery="2023-12-01")
    #project17
    reward49 = Reward(title="Stickers", price=30, description="Get an assortment of D&Tea stickers including our logo but also class design stickers and other fun stuff we might have around the office we want to send you. Thanks for the support!(Sorry, this does not qualify for the Day One Backer Bonus)", projectId=17, estimatedDelivery="2023-10-01")
    reward50 = Reward(title="Five 4oz (~113g) Bags of Tea", price=60, description="Save $9 by getting 5 bags! You can choose what type of tea at the end of the campaign.", projectId=17, estimatedDelivery="2023-11-01")
    reward51 = Reward(title="ALL EIGHT TEAS! 4oz (~113g) Bags of Tea", price=105, description="Save $17 by getting 8 bags! The best deal of the campaign! You can choose what type of tea at the end of the campaign. You may choose the 8 teas at the end of the campaign. We are so touched that you want to try all 8 of our teas and we can't wait to send them to you.", projectId=17, estimatedDelivery="2023-12-01")
    #project18
    reward52 = Reward(title="Postcard made of Tibetan paper", price=10, description="A postcard made of handmade Tibetan paper using traditional Tibetan methods.", projectId=18, estimatedDelivery="2023-10-01")
    reward53 = Reward(title="Yak Khullu Hiking Sock", price=25, description="This pair of socks is made for you if you’re looking for a warm, soft feel with an above-ankle look!", projectId=18, estimatedDelivery="2023-11-01")
    reward54 = Reward(title="Yak Khullu Scarf", price=100, description="Our classic double-faced scarf is made of 100% yak cashmere providing a luxury and warm feel.", projectId=18, estimatedDelivery="2023-12-01")





    db.session.add(reward1)
    db.session.add(reward2)
    db.session.add(reward3)
    db.session.add(reward4)
    db.session.add(reward5)
    db.session.add(reward6)
    db.session.add(reward7)
    db.session.add(reward8)
    db.session.add(reward9)
    db.session.add(reward10)
    db.session.add(reward11)
    db.session.add(reward12)
    db.session.add(reward13)
    db.session.add(reward14)
    db.session.add(reward15)
    db.session.add(reward16)
    db.session.add(reward17)
    db.session.add(reward18)
    db.session.add(reward19)
    db.session.add(reward20)
    db.session.add(reward21)
    db.session.add(reward22)
    db.session.add(reward23)
    db.session.add(reward24)
    db.session.add(reward25)
    db.session.add(reward26)
    db.session.add(reward27)
    db.session.add(reward28)
    db.session.add(reward29)
    db.session.add(reward30)
    db.session.add(reward31)
    db.session.add(reward32)
    db.session.add(reward33)
    db.session.add(reward34)
    db.session.add(reward35)
    db.session.add(reward36)
    db.session.add(reward37)
    db.session.add(reward38)
    db.session.add(reward39)
    db.session.add(reward40)
    db.session.add(reward41)
    db.session.add(reward42)
    db.session.add(reward43)
    db.session.add(reward44)
    db.session.add(reward45)
    db.session.add(reward46)
    db.session.add(reward47)
    db.session.add(reward48)
    db.session.add(reward49)
    db.session.add(reward50)
    db.session.add(reward51)
    db.session.add(reward52)
    db.session.add(reward53)
    db.session.add(reward54)

    db.session.commit()

def undo_rewards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM rewards")

    db.session.commit()
