const Home = require('../models/homes');
const mongoose = require('mongoose');

const main = async () => {
    try {
        const homes = [
            {
                houseInformation: "5 beds | 6 baths | 5,614 sqft",
                houseAddress: {
                    street: "1 Hilbert Court",
                    city: "Montville Twp.",
                    state: "NJ",
                    zip: "07082"
                },
                aboutTheHome: "Introducing a breathtaking masterpiece of architectural design, this newly constructed custom-built home is a testament to luxury and sophistication. Nestled within a prestigious neighborhood. Step through the impressive double doors and be prepared to be enchanted by the stunning interior. The grand foyer welcomes you with soaring ceilings, creating a sense of opulence from the moment you enter. Currently Under Construction. Still time to pick your finishes.",
                agentId: null,
                homeImgPathURL: "https://photos.zillowstatic.com/fp/2a6bc17cca5981a008551e2cbd7ef215-cc_ft_1152.webp"
            },
            {
                houseInformation: "5 beds | 8 baths | 7,240 sqft",
                houseAddress: {
                    street: "5499 Dune Dr",
                    city: "Avalon",
                    state: "NJ",
                    zip: "08202"
                },
                aboutTheHome: "Take advantage of this once-in-a-lifetime opportunity to watch the sun rise over the Atlantic and set on Great Sound from the privacy of your seashore retreat. Located on a massive 27,702 sq. ft. lot in the exclusive High Dunes section of Avalon, this stunning 7,240-sq. ft. Malibu-style home commands perhaps the island’s highest elevation, and offers unobstructed 360-degree views from its wrap-around 3rd-floor deck as well as complete privacy in an unspoiled maritime forest setting.",
                agentId: null,
                homeImgPathURL: "https://photos.zillowstatic.com/fp/10756a904bafc71042b8a0465a9fd3d2-cc_ft_768.webp"
            },
            {
                houseInformation: "7 beds | 12 baths | 25,700 sqft",
                houseAddress: {
                    street: "48 Rio Vista Dr",
                    city: "Alpine",
                    state: "NJ",
                    zip: "07620"
                },
                aboutTheHome: "Chateau de la Roche, a rare sanctuary of grand scale, less than 30 mins from Manhattan. This grand residence of luxury and convenience was built for the most prominent buyer. Advanced technology and security through out the home. Lush landscaping creating a relaxed setting while providing privacy. This grand residence of approximately 25,700 square feet is perfect for indoor or outdoor entertaining.",
                agentId: null,
                homeImgPathURL: "https://photos.zillowstatic.com/fp/27b932dba2d1e5e0f4106205e460faa7-cc_ft_768.webp"
            },
            {
                houseInformation: "7 beds | 11 baths | 40,000 sqft",
                houseAddress: {
                    street: "2801 Riverton Rd",
                    city: "Cinnaminson",
                    state: "NJ",
                    zip: "08077"
                },
                aboutTheHome: "Rarely does a residence of such luxury and distinction present itself. The home has more than 40,000 square feet of living space with multiple elevators to easily navigate the 4 floors and features 6 fireplaces. Upon entering the home one is greeted by impressive dual floating staircases as well as a view out of the French doors to a courtyard with reflecting pool. Much more can be said of this modern masterpiece, but it absolutely must be experienced to truly appreciate the workmanship. An extraordinary lifestyle is to be lived within these walls.",
                agentId: null,
                homeImgPathURL: "https://photos.zillowstatic.com/fp/3f4aaf76adee44e3bd271116d0520971-cc_ft_768.webp"
            },
            {
                houseInformation: "7 beds | 11 baths | Undisclosed sqft",
                houseAddress: {
                    street: "12 The Esplanade",
                    city: "Alpine",
                    state: "NJ",
                    zip: "07620"
                },
                aboutTheHome: "In the most sought after, influential & premier address in Alpine. This estate home showcases amazing outdoor amenities to include pool, cabana, sports court, bocce & outdoor living with oversized BBQ. With one of the largest home theaters in Bergen County, it can seat up to 30 or accommodate a party for up to 100+ guests. The home theater screen is 25'-amazing for a Super Bowl party! With high ceilings, 5+ fireplaces, 3-car garage, generator, property surveillance, this powerful home is truly a one-of-a-kind. It's the only choice. Minutes to Manhattan.",
                agentId: null,
                homeImgPathURL: "https://photos.zillowstatic.com/fp/4338c6d8c42f805613b06c97d83087d0-cc_ft_768.webp"
            },
            {
                houseInformation: "7 beds | 12 baths | 25,000 sqft",
                houseAddress: {
                    street: "318-322 Route 537",
                    city: "Colts Neck",
                    state: "NJ",
                    zip: "07722"
                },
                aboutTheHome: "This world-class 160-acre horse farm and estate dedicated to the breeding, sale, and racing of thoroughbreds is centrally located just one hour from Manhattan. A grand staircase connects to three levels of the home, in addition to an elevator that services all four floors. The third floor houses the estate's business office, four generous en-suite bedrooms, and lavish primary suite. A private staircase ascends to the fourth floor, offering two commodious en-suite bedrooms, a sitting room, and a dining area served by a Pullman kitchen.",
                agentId: null,
                homeImgPathURL: "https://photos.zillowstatic.com/fp/4823290e384bc701d3698657f35e726e-cc_ft_768.webp"
            }
        ];

        const createdHomes = await Home.insertMany(homes);
        console.log('Created homes:', createdHomes);
    } catch (error) {
        console.error('Error creating homes:', error);
    } finally {
        mongoose.connection.close();
    }
};

const run = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/cv-luxury-homes-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connected to MongoDB');
        await main();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

run();
