from app.models import db, Project, environment, SCHEMA
 # 2023-10-01

# Adds a demo user, you can add other users here if you want
def seed_projects():
     project1=Project(creatorId=1,title="Make 100 Bowls, Ceramic Mugs, and Pottery Vases",category='Arts',city="New Haven",state="Connecticut",country="USA",
        imageUrl="https://ksr-ugc.imgix.net/assets/039/651/363/1a9218465f4f2de136a8b38eab0dd3b9_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1673528351&auto=format&frame=1&q=92&s=059030ffe223145e300a22d9bf161652",
        fundingGoal=5000,startDate="2023-01-01",endDate="2024-01-01",
        description="""A Make 100 Project by GEMS. \n We are Gabriela and Ericka, two self-taught artists collaborating this year to create  handcrafted ceramic artworks. GEMS: Functional Fine Art. We are calling these new works "GEMS" after the combination of our pottery signatures and to reflect the precious nature of these one-of-a kind handcrafted ceramics. Why handmade ceramics? We believe the objects you use most should spark joy. Good craft = good vibes. Everything here is made with intention by two artists passionate about their craft.""",
        risks="Both Ericka & Gabriela have run Kickstarter campaigns in the past and have learned of potential pitfalls and how to work around them! We are confident we can deliver this project & make it a positive experience for all involved. For more info, visit the FAQ.")

     project2=Project(creatorId=2,title="Original art for your home",category="Arts",city="Denver",state="Colorado",country="USA",
        imageUrl="https://ksr-ugc.imgix.net/assets/039/663/415/7db61d6cb1ddaf5479409690193e34fc_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1673637253&auto=format&frame=1&q=92&s=aaaeec022e60e893e96027c667b0df83",
        fundingGoal=915,startDate="2023-01-01",endDate="2024-01-01",
        description="""Context:
        Who doesn't have some kind of art hanging on theirs house walls? But what frustrates me a bit is that in the end, due to ignorance or laziness or I don't know... many people buy prefabricated "art" from stores such Ikea or from Stock-images websites. I don't want to say that this is bad, but having artists who are passionate and good about what they do... why not have their art, works and illustrations?
        Techniques: The printmakings that I present to you are a series of limited and original illustrations stamped in traditional press, hand signed and numbered. None of this project is digital printing. Everything is made with traditional techniques.
        To stamp the drawings I have used specific printmaking inks, plates, tools and techniques such: Aquatint, etching, drypoint, mezzotint, burin and lithography  As well, I've used high density papers to stamp the motives, from 200 gr - 350 gr. (Michelle, Fabriano, Gvarro, etc.).""",
        risks="I don't foresee any issues / risks that would affect the production of the artworks. Actually most of them are already produced / stamped. I will always make sure to keep you guys updated and respond to everyone's questions / comments / requests. :)")

     project3=Project(creatorId=3,title="Nicole Adams: Series",category="Comics & Illustration",city="Albuquerque",state="New Mexico",country="USA",
        imageUrl="https://ksr-ugc.imgix.net/assets/039/609/387/ba668bfe62b47537487b712974628704_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1673046172&auto=format&frame=1&q=92&s=87402e25ea42ad1965865996172d0ff3",
        fundingGoal=500,startDate="2023-01-01",endDate="2024-01-01",
        description="This is the tragic and interesting love story between a highway driver and a woman named Nicole. I mainly illustrated some of the images during my last year of specializing in design, then the narration and history were as part of a project on narrative. I think this story can go deeper than expected with its narrative and suspense.",
        risks="Some details may arise with what is related to the print, such as ink, only small details. So I'm trying to finance this project to cover all shipping and printing costs. Everything else is already 100% complete.")

     project4 = Project(creatorId=4, title='Unicorn: Vampire Hunter SILVER EDITION', category='Comics & Illustration', city='Spokane', state='Washington', country='USA',
        imageUrl='https://ksr-ugc.imgix.net/assets/039/475/917/b948376487d5170cde790a861eadd29e_original.jpg?ixlib=rb-4.0.2&crop=faces&w=352&h=198&fit=crop&v=1671168562&auto=format&frame=1&q=92&s=cf2e4c07acd39d2a78ea2c1e67b418f6',
        fundingGoal=1500,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="""The perfect vampire hunter is a unicorn... and he's on a mission to find answers about his past. Over the past three years we have successfully funded issues #1-5 of Unicorn: Vampire Hunter, and now we are back as part of Kickstarter's Make 100 initiative to create a special SILVER EDITION of the first issue. This is a reprint of the first issue with a brand new, commemorative silver cover by artist Matthew Warlick.
        Unicorn: Vampire Hunter is a fantasy adventure comic about a curious young woman, a wise wizard, and a unicorn with a penchant for killing vampires. It is a heartfelt story about friendship, love, and finding purpose in an unpredictable world.""",
        risks='This is my sixteenth Kickstarter project. I already have a printer I trust lined up, and if any issues arise I will be communicative and honest with backers. Feel free to message me with any questions.'
        )
     project5 = Project(creatorId=5, title='Doctor-Developed Seat Cushion for Better Posture 💻 ✈️ 🚘', category='Design & Tech', city='Irvine', state='California', country='USA',
        imageUrl='https://ksr-ugc.imgix.net/assets/039/533/598/cfdb8f6f653e37a058150b7310efcedf_original.gif?ixlib=rb-4.0.2&w=680&fit=max&v=1672091830&gif-q=50&q=92&s=2b0b577d76d1d23eb40fb79db7757f1b',
        fundingGoal=10000,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="""Backed by years of research by Dr. Aaron Fu, DPT and his hands-on clinical experience with thousands of screaming backs, necks and legs — Lifted Lumbar is a patent-pending,
        ultra comfortable seat cushion that gives your spine the support it needs, while promoting optimal blood circulation and giving you the ability to control lumbar support in any seat.
        Through Dr. Aaron Fu's physical therapy practice, he has worked with plenty of patients to alleviate pain caused by hours of sitting. Because he knows that many people don't have the option of sitting less,
        he set his mind to creating the perfect cushion to help people sit right. Based on the principles of the neutral spine position, it is fully adjustable and made from premium Memory Foam, infused with bamboo charcoal for extra cooling.""",

        risks="""This isn't our first campaign and that's why we know to expect the unexpected. To set things off on the right foot, we've been in constant communication with our manufacturer and have built a great relationship with them with super clear and honest communications between us. We also have established a great relationship with our 3PL that will deliver your rewards. Since we've not only done a Kickstarter campaign before, but also consistent retail and ecommerce sales (thanks to all of you!), we feel confident in our ability to deliver your rewards, safely and on time.
        Clear communication is what we stand for. So you can expect that along the entire way we will be clear, honest and prepared for anything. If there are any hiccups along the way, you'll be the first to know.
        Always consult your physician before beginning any new exercise regimen. The information provided is not intended to prevent, diagnose or treat any medical condition or disease. If you experience any pain, dizziness, discomfort or difficulty with any of the exercises depicted or while otherwise using the Lifted Lumbar, please stop and consult your physician. Trigger Point Systems shall not be liable for any claims for injuries or damage """
        )
     project6 = Project(creatorId=6, title='PANGEA Mangrove Sunglasses: Designed for Life', category='Design & Tech', city='Miami', state='Florida', country='USA',
        imageUrl='https://ksr-ugc.imgix.net/assets/039/159/630/a0791a75ebe84c3365bcaa9981eed310_original.gif?ixlib=rb-4.0.2&w=680&fit=max&v=1667843975&gif-q=50&q=92&s=5432ae532b2254c189ee7b608ff0f3b1',
        fundingGoal=10000,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="Unique, unbreakable sunglasses with lifetime warranty. Handcrafted from plastic trash collected at the world's biggest mangrove cleanup. We will sort and recycle all the trash we collect and discard properly the non-recyclables. We will use the Polypropylene for our sunglasses. This project is promoted by Jellop, the ad tech power behind the best Kickstarters with 2,400+ successful Kickstarter projects with over $800MM raised between them.",
        risks="""We have managed three previous campaigns and delivered them using a similar process of producing a sample from the factory that is ready for mass production. Our samples are ready and up to our standard of quality. As long as we can produce the minimum order quantity we can fulfill our customers' orders.
        After the campaign ends we will collect the address and order preferences in a software called BackerKit. After this we will send the orders to our factory to create the right combination of sizes and colors for our backers. We will run two rounds of inspections: halfway through the production and at the end of production.
        When we are sure that the quality is up to our standard we will ship the sunglasses to our global fulfillment center to send the orders around the world. We have used this fulfillment center before and 99% of the orders arrive within 2-4 weeks. We offer a refund or replacement for any of our orders to ensure our backers are fully satisfied.
        This is our fourth campaign, and we want to reduce any possibility of failing to deliver on time. In order to do this we have allocated 5% of the budget for unexpected costs. This will ensure that we can stay flexible with changing shipping costs and pay additional fees for expedited services when necessary.""")

#      projectNo = Project(creatorId=1, title='ALCHEMY: A FOUR PART DOCUSERIES', category='Film', city='Huntington Beach', state='California', country='USA',
#         imageUrl="https://ksr-ugc.imgix.net/assets/039/670/973/36f2a098e96fc4460ee34dfb9aeea9ac_original.jpeg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1673743288&auto=format&frame=1&q=92&s=c85c1a7cedd2a031b61696894a2f9822",
#         fundingGoal=10000,
#         startDate='2023-01-01',
#         endDate='2024-01-01',
#         description="""ALCHEMY ăl'kə-mē noun To transmute lead to gold. We've all heard the terms "reiki," "breathwork," "sound healing," "acupuncture" but few of us know what these healing arts ACTUALLY ARE, THEIR BENEFITS or where they ORIGINATED.  So, I saw a need.  A space to lend my voice and over a decade of experience as a practitioner in the field of the healing arts.  Our bodies are yearning for an awakening to creativity, play, and healing.  It's time we listened. ALCHEMY is a four part docuseries walking you through ancient and modern healing practices used around the world.  We're finding the most powerful modalities in the sacred spaces of Bali, Peru, India and the US and educating you about them.  The practitioners in the field will be sharing their stories - their awakening and calls to heal.  We're listening.
# We're heading to Bali for Part One, where I've chosen to illuminate breathwork, sound healing, and holistic spa treatments.  We will take you into the beauty of Bali to show you why it is considered a sacred space and how these sacred sciences are changing lives. My Mission: To research, experience and document modern and ancient healing arts used in sacred spaces across the world.
# The Project:  ALCHEMY is a four part series documenting sacred sciences used in four sacred places around the world (healing arts includes art therapy, earthing, meditation techniques, pranayama, reiki, sound healing, yoga, and more). You can think of this as a cross between Michael Pollan’s “How to Change your Mind” (Netflix) and Anthony Bourdain’s “Anthony Bourdain: Parts Unknown” (HBO Max). This kickstarter is to fund the first part of the four part series; a 60 minute docuseries pilot episode in Bali. """,
#         risks='The biggest challenge I face is not having social media or funds to market this campaign, or spread awareness about the project. I have chosen to live a life free of social media because it helps me stay focused on my goals while supporting my ability to provide health and wellness services. I am relying solely on the support of family and close friends, which I hope will help me overcome these obstacles.'
#         )

     project7 = Project(creatorId=1, title='ALADDIN 3477: The Motion Picture Trilogy', category='Film', city='Macomb', state='Michigan', country='USA',
        imageUrl="https://ksr-ugc.imgix.net/assets/039/564/813/2ffb9154ca12ea60178babfebf0b6530_original.jpg?ixlib=rb-4.0.2&w=680&fit=max&v=1672575570&gif-q=50&q=92&s=1dcad5f58fccf85c47b2e1538cfd04fe",
        fundingGoal=10000,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="""Hi! I'm Matt Busch, a visual storyteller who got my start in Hollywood as a concept designer and storyboard artist for feature films. I've also worked in licensing and publishing for properties like Lord of the Rings, Indiana Jones, and Stranger Things. By far, I'm mostly known for the massive amount of art I've created for the Star Wars universe. I've produced countless illustrations for posters, books, apparel, trading cards, games, and anything else you can think of. If you live on the planet Earth, you've probably seen my work. """,
        risks="""Any Kickstarter has risk, however I've run 2 Kickstarter campaigns in the past (both successful with super happy backers) and I'm definitely not going to let anyone down with my Magnum Opus project, Aladdin 3477. In general, I've built a career in the entertainment industry with a solid reputation to deliver top-notch quality work on time. The biggest challenge I foresee is potential delays with rewards, most of which would be out of my control. Potential delays in manufacturing and/or product shipping to me… these are all minor factors that could slow down the time frame getting your rewards. That said, customer satisfaction is always my priority. I've been building this particular campaign for years and have had these rewards planned out well ahead of time. If there ends up being any delays, my guess is they will be minimal, and most of these rewards should be ready to rock and roll, arriving at your door when intended!"""
        )


     project8 = Project(creatorId=2, title='The Medicine Men of the River People', category='Film', city='St Paul', state='Minnesota', country='USA',
        imageUrl='https://ksr-ugc.imgix.net/assets/039/230/346/3b17cd09c562bf1e61de7984c72f4ddf_original.jpg?ixlib=rb-4.0.2&w=680&fit=max&v=1668497027&gif-q=50&q=92&s=a91ffae242c9bdcc5955e30f4cd6cf6c',
        fundingGoal=8970,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="""How it started? It all started when I met Khyati at a meditation meeting. I was going through a difficult period in my life, I had both psychological and physical problems.

        I had three different issues in my large intestine. When  I took the prescribed drugs the symptoms decreased, but when I did not take them, the symptoms returned. As soon as I told Khyati about my health situation, she advised me to work with the Papas of the Shipibo medicine tradition. I began with a Plant Dieta for 10 days  and then a second Plant Dieta for a month.
        After each session I noticed the positive effects on my health. And during my time in the jungle, I met with the “Papas”, Papa Ben and Papa Gil. Papa Ben is now very elderly and no longer working in the way he once  did. Papa Gil is in good strength, yet with the harsh conditions of Amazonian life and the constant demand on his body as a healer, he too is aging and is now in his mid 70's.  Papa Gil is the last of the brothers still working with full power carrying the tradition of his lineage with the highest skill and integrity. The medicine that has run through all of them is priceless.
        Khyati mentioned to me that she really felt it incredibly important to document these Papas with film footage to preserve their teachings. I started to think about this project as a way of giving back - to document these special healers and this ancient wisdom which has been carried and held sacred for thousands of years.""",
        risks='One of our current remaining challenges is to get access to old footage that was shot almost a decade ago while Papa Pascual was still alive. It is very important to us to include it in this film. We also hope to raise 100% of the funds necessary to help this project move forward and so our second challenge is to raise the remaining C$12,000 through a public platform. We hold faith that it will unfold so that this film can be completed and inspire many around the world.'
        )
     project9 = Project(creatorId=3, title='Layers Sandwich Co. - Food Truck to Sandwich Shop!', category='Food & Craft', city='Seattle', state='Washington', country='USA',
        imageUrl='https://ksr-ugc.imgix.net/assets/039/583/731/604eecdd42779460b790c488ac205143_original.jpg?ixlib=rb-4.0.2&w=680&fit=max&v=1672802291&gif-q=50&q=92&s=de7a40fb98de382c56b003ec3aa08429',
        fundingGoal=75000,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="""Dynamic sandwich duo to open shop on Green Lake in Seattle, WA. We are a husband and wife team, Seattle based food truck, serving fancy sandwiches - if you can imagine a composed dish thoughtfully placed between two pieces of bread - that's us!  We also serve smash-fried fingerling potatoes with nearly chuggable green goddess dipping sauce, and our warm banana walnut bread griddled to order and finished with maldon sea salt.  We have a weekly sandwich special, and the occasional beverage or dessert special.  """,
        risks="""Inherently, there are risks and challenges involved with opening a brick and mortar.
        While we are planning ahead and hoping for the best, we are expecting a few snags along the way - Murphy's law shall we say? Here are the risks and challenges we plan to overcome.
        Not Reaching Our $75K Goal: We bootstrapped the opening of the food truck and have put our profits directly back into the business. That said, we'll be selling our truck, Regina, and putting that money towards the opening. What we are asking for is a kickstart to help get us from where we are now, to our opening day and we'll take it from there. This entails labor, construction, equipment, rebranding, licensing and permits, securing our team, and stocking our shelves."""
        )
     project10 = Project(creatorId=4, title='2023 Make 100 Hand Dyed Yarn Skeins', category='Food & Craft', city='Coupeville', state='Washington', country='USA',
        imageUrl='https://ksr-ugc.imgix.net/assets/039/629/049/0373aec49b2840fe99539dc33bbc1ff6_original.jpeg?ixlib=rb-4.0.2&w=680&fit=max&v=1673308736&gif-q=50&q=92&s=89f5f5dd7fb323f263f1a8edb574ed7e',
        fundingGoal=900,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="Hand dyed yarn in your choice of yarn weight base! I live on a rural-ish island, that used to have three proper, well stocked LYS's (Local or Little Yarn Shops, depending on who you ask.) But over the years, two of them have closed. There are a couple of other shops that carry just their own hand dyed yarns, and no judgement… that's what I'll be doing too!  The one remaining full service yarn shop carries some of my hand dyed yarns, but not every line I carry… and it's quite a distance from many of my loyal patrons.  I spent more than a year looking at commercial real estate, and even tried to buy one of the closing shops… to no avail. ",
        risks="Honestly, I've prepped for this! All materials, shipping supplies etc are on hand and I've already begun to dye. Barring a medical emergency, I intend to have all rewards in the post NO LATER THAN February 10, 2024!"
        )
     project11 = Project(creatorId=5, title='The Fury of the Northmen', category='Games', city='Tomball', state='Texas', country='USA',
        imageUrl='https://ksr-ugc.imgix.net/assets/039/600/683/7cfc5c7f3397a833a041b0ff3d727484_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1672957376&auto=format&frame=1&q=92&s=9cc1ffe29cb156bc99a53ce7b074976d',
        fundingGoal=30000,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="""The Fury of the Northmen is a 5e-compatible roleplaying game set during the Viking invasion of England in 865-871 C.E. The Fury of the Northmen is a 5th edition-compatible game setting written by Jess Nevins with art by Russell Marks, Kim Van Deun, David Joyce, Elizabeth Peiró, and a host of others. The homepage for Northmen is here; eventually, that page will be the start page of a free website that hosts the errata for the Northmen books,  the monsters from the Bestiary (one of the three core books of Northmen), and other freebies.
In the spirit of Michael Hirst's Vikings, Jeb Stuart's Vikings: Valhalla, and Robert Eggers' The Northman, The Fury of the Northmenis a game of Viking adventure set in England during the Viking invasion of 865-871 C.E. Historically, the invasion resulted in the unification of the English Four Kingdoms under the control of Wessex and the establishment of the Viking colony in England, the "Danelaw." Northmen is set during the first seven years of the conflict, 865-871, when the outcome of the invasion is still in doubt.""",
        risks="""The main risk to this project is not going to be timeliness--the PLAYER'S GUIDE, the WORLD BOOK, and the BESTIARY are already written--but budget. The Kickstarter has a number of things which need to be paid for, and while I believe I've sufficiently budgeted for them all, I can't anticipate unknown price increases."""
        )
     project12 = Project(creatorId=6, title='The Good People (Na Daoine Maithe) | A Fantasy & Romance VN', category='Games', city='Marquette', state='Michigan', country='USA',
        imageUrl='https://ksr-ugc.imgix.net/assets/038/911/450/ac1a675c06474cea49c863383f85873c_original.png?ixlib=rb-4.0.2&w=680&fit=max&v=1665773536&gif-q=50&lossless=true&s=0fac9be3eddae8646a16f0ad851fa68c',
        fundingGoal=10000,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="""The Good People (Na Daoine Maithe) is a lore-rich, choice-driven visual novel inspired by Irish mythology and Celtic folklore. Play as an Irish tenant farmer from the mid-19th century, whose path becomes inexplicably entwined with fairy affairs after getting robbed by the roadside and lured into the mythic and war-torn world of Tír na nÓg: A once unified land, now divided into the Seelie and Unseelie Courts. Will you escape with your stolen belongings? Or does fate have something else in mind?""",
        risks="""As a small team of independent creators with day jobs, our main challenge will be maintaining the interest of our audience (as well as expanding it) over the course of our development. A project as large as this, being essentially 7-novellas long (not including the prologue or any potential side stories), will take at least 5 years to fully complete — and this Kickstarter will not fully sustain us for the duration of these years, short of raising an implausible amount of money. Well, unless you feel like giving it to us. (Godspeed.)"""
        )
     project13 = Project(creatorId=1, title="B-Side Magazine : Boise's Independent Music Source", category='Music', city='Boise', state='Idaho', country='USA',
        imageUrl='https://ksr-ugc.imgix.net/assets/039/456/535/485b2e9d0e1f6c6e12df88409a31cbe7_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1670959025&auto=format&frame=1&q=92&s=b73a228666d6932e8793e01cb44868e0',
        fundingGoal=8000,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="""We're working to help strengthen Boise's music community by bridging and fostering connections between artists, venues, and audiences. B-Side Music Project (B-Side Magazine) intends to help build and strengthen Boise's music community by bridging and fostering connections between artists, venues, and audiences throughout the Treasure Valley.
        As someone who has been heavily involved in the music scene throughout the West Coast, I'll tell you that I have never experienced anything like the aftermath of a pandemic that kept us apart for 2+ years. (Pollstar estimated the total lost revenue for the live music industry in 2020 at more than $30 billion). While Boise's live music scene came to a screeching halt, we also experienced dramatic and sudden population growth and rent increases that many of us couldn't afford. Not to mention, lack of mental health access, took on second jobs, and are still dealing with plenty of stressors that pushed many artists and musicians out of Idaho.""",
        risks='The biggest challenge we face is really just financial. We need to secure enough startup costs to operate and build B-Side Magazine on solid ground. Please take a look at the rewards offered for backing us as founding contributors!'
        )
     project14 = Project(creatorId=2, title="Let's Make A Children's Album!", category='Music', city='Phoenix', state='Arizona', country='USA',
        imageUrl='https://ksr-ugc.imgix.net/assets/039/355/178/f2dea79a1eab0d73077792904f615b84_original.png?ixlib=rb-4.0.2&crop=faces&w=352&h=198&fit=crop&v=1669789607&auto=format&frame=1&q=92&s=35e27a6c26c6e9a69ce312fe6a2e4d9c',
        fundingGoal=14000,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="""Heyo. It's Mega Ran, rocker of mics. I've done a few things, played a few games and dropped a few songs. Many of you may know that in November of 2021, my life changed forever. My partner Rachel and I decided to take foster parent classes, and a short time after graduation, we were blessed with the greatest miracle: a 3-week old baby boy who had unfortunately had a rough go of it. We call him affectionately "Buddy." I want to make songs that are not just FOR KIDS, but that can help kids to understand and cope with some things that are just too complicated sometimes. I want to help teach good character traits, reinforce positive behaviors, and make something that will be FUN most importantly!  """,
        risks="""As a guy who has done a few Kickstarters in the past, I have learned to keep goals and promises manageable and are working with trustworthy collaborators to make the best project possible. Our history for release quality and consistency combined should give any backer reasonable assurance that we will complete this project on time and that it will exceed expectations.
        Anything can happen, but I will do my best to over-deliver when it comes to this project!"""
        )
     project15 = Project(creatorId=3, title='Sweet Fire', category='Publishing', city='Columbus', state='Ohio', country='USA',
      #   imageUrl='https://ksr-ugc.imgix.net/assets/039/510/527/f44ee5d0358bbd7c1e03d3207caeb7ea_original.png?ixlib=rb-4.0.2&w=680&fit=max&v=1671668158&gif-q=50&lossless=true&s=6442699b45d02c8c5b94b42436782d68',
        imageUrl='https://ksr-ugc.imgix.net/assets/039/666/383/3fe64e251128ab1c2e8ff7c4ce7324d3_original.png?ixlib=rb-4.0.2&w=680&fit=max&v=1673672490&gif-q=50&lossless=true&s=9c24a59d814d06e968aed4fff393f12f',
        fundingGoal=12500,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="""A book to empower the girls we love.  Sweet Fire is a children's book that inspires girls to live full and free. The goal of this Kickstarter campaign is to print 500 hardcover copies of the Sweet Fire  and to get them into the hands of children who need this message.  Additional items such as the accompanying song and custom stickers  are also part of the project's goals.
        The author has financed the illustrations, promotion and initial book design.  Now the Kickstarter community can help take the project over the finished line to a finished, industry-quality publishing product!""",
        risks="""The central risk with this campaign is not meeting the funding goal. If the funding goal is not reached, unfortunately no one receives their rewards.
        We are working with a reputable and reliable U.S. printer and the books are on track for completion at the end of this campaign. The one risk to all of publishing that we cannot control is the supply chain issues created by COVID. The risk associated with this would be a delay in shipping. This should be unlikely, however, since margin has been built into the schedule to hopefully allow for this."""
        )
     project16 = Project(creatorId=4, title='100 Stolen Magic Spells and an Evil Temptress', category='Publishing', city='Seattle', state='Washington', country='USA',
        imageUrl='https://ksr-ugc.imgix.net/assets/039/447/059/f6c632718bdfeea75da99bfabfca966b_original.png?ixlib=rb-4.0.2&w=680&fit=max&v=1670860476&gif-q=50&lossless=true&s=006e578a4ec9958b786bd56f668ec903',
        fundingGoal=400,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="""A Young Adult Science Fiction-Fantasy adventure with wizards, witches, dragons, and scientists hacking a portal to a parallel world. 100 illustrated hardcover limited editions of Layla and  100 charms to go with them. Numbered according to the order in which you pledge. All paperbacks and hard copies are signed. Only Layla hard copies are limited edition and numbered. All copies are illustrated including eBooks. Paperbacks are black and white illustrations.
        Layla is book 4 to Ian's Realm Saga, ... which is available in this project as well. Pick up the first four books of this series (Ian's Realm books 1-3 and Layla), in the tiers offered here or in the add-ons.""",
        risks="""As with everything, things can go wrong...a natural calamity, who knows. But the book is written and will be formatted and ready to print but for the names in the acknowledgment by the time this Kickstarter project launches. I can't think of any other risks involved."""
        )
     project17 = Project(creatorId=5, title='D&Tea: A Great Infusion of RPGs and Tea', category='Games', city='Bellingham', state='Washington', country='USA',
        imageUrl='https://ksr-ugc.imgix.net/assets/039/649/384/d903f859c0dd16d8ede96fc95aa82242_original.gif?ixlib=rb-4.0.2&w=680&fit=max&v=1673505428&gif-q=50&q=92&s=c7994364f73892b6d541610bcf090343',
        fundingGoal=5000,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="""You demanded more flavours, you're going to love what we've been blending. D&Tea began life as two friends who thought it would be fun to sell tea at a comic convention. After the first hour at PAX South we were buying the domain name and coming up with ideas for new blends, while talking with excited people who wanted to know "where could we buy more?". We are still two friends and we are still trying to answer that question for you all.
        Two years ago we launched our Kickstarter with little understanding of how Kickstarter works or who our customers were. We ended those 30 days as the largest tea Kickstarter in history. We are not marketing gurus, we just make a great product and the people who enjoy our tea have stepped up for us and spread the word - something for which we are forever grateful!
        Today we are back, with a slightly better understanding of Kickstarter but a much bigger more ravenous fanbase and most importantly six new amazing blends of evocative, adventurous teas.""",
        risks="""This is our second Kickstarter and as such we learned a lot from our first. One, although we anticipate completing our Kickstarter rapidly after we get funding (due to the ease of getting the materials we need) we gave ourselves an extra 2 months to complete fulfilment based on our last campaign having been delayed by a month.
        Here's our challenge: We dropped the ball with communication last time: we simply were not ready for the volume of interest (we though we might get 100 orders if we were very lucky, we got 1500...) . We were open and honest, and people appreciated that, but we also went deep into just getting things going and didn't take a second to stop and tell people what was happening. We will be doing better on this this time around.
        There are minimal risks here, we could fund this project ourselves in a years time. We will fulfil every order and no one will be left behind. The risks are all customer service issues like us missing an email or us not updating the Kickstarter as much as we should. We know this, we have support staff now, we don't anticipate this being an issue."""
        )
     project18 = Project(creatorId=6, title='Luxury & Sustainable Yak from Tibetan Plateau', category='Arts', city='Mountain View', state='California', country='USA',
        imageUrl='https://ksr-ugc.imgix.net/assets/039/421/661/2a35dfb996ab199d2b8cd59369620e27_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1670516490&auto=format&frame=1&q=92&s=27b99114f23adcc749921b415cf1d491',
        fundingGoal=3000,
        startDate='2023-01-01',
        endDate='2024-01-01',
        description="""Explore sustainable, soft and warm scarves, socks and blankets made with Yak Khullu. This winter, we are excited to launch  our first SUSTAINABLE project—— SNOPHLEKA, a warm, breathable, luxury TIBETAN YAK product line with classic designed Scarves, Socks and Blankets! Hello! We are Gilly, Lazeena and Zoey,  the team behind " SNOPHLEKA” project. We spent 6 long and cold winters in Ann Arbor, Michigan (GO BLUE!) and had always been looking for materials and textures that could protect us from the freezing winters in Michigan. And we found yak cashmere -- a precious brown fiber the Tibetans called Khullu that insulates them from the bitter winter coldness!""",
        risks="""Our products and manufacturing process have already been tested through a sample production run. As soon as the campaign succeeds, the full manufacturing will start.
        Some risks we may face:
        - Yak Fiber Shortage: we may end up using more yak fiber than we planned and expected but we have two extra back sources we have in touch.
        - Quality Control: There will be products with less quality in the factory production process, but we will be there in person and check every item before it is out for delivery.
        Through the test run, we are fully aware of the obstacles that we may face and have confidence in delivering the product on time. Once the campaign succeeds, we will also keep all the backers updated of every progress in the manufacturing process. Again, thank you for all the support and we are ready to deliver the products together with your trust."""
        )


     db.session.add(project1)
     db.session.add(project2)
     db.session.add(project3)
     db.session.add(project4)
     db.session.add(project5)
     db.session.add(project6)
     db.session.add(project7)
     db.session.add(project8)
     db.session.add(project9)
     db.session.add(project10)
     db.session.add(project11)
     db.session.add(project12)
     db.session.add(project13)
     db.session.add(project14)
     db.session.add(project15)
     db.session.add(project16)
     db.session.add(project17)
     db.session.add(project18)
     db.session.commit()

#categories = ['Arts', 'Comics & Illustration', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music', 'Publishing']

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM projects")

    db.session.commit()
