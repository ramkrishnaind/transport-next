//Furniture

//1. Sofasets
const sofaset = ["Sofasets"];
const seatModel = [
  "1 seat",
  "2 seats",
  "3 seats",
  "4 seats",
  "5 seats",
  "6 seats",
  "7+ seats",
];

const twoSeats = ["2", "1 + 1"];
const threeSeats = ["3", "2 + 1"];
const fourSeats = ["3", "2+ 2", "2 + 1 + 1", "4"];
const fiveSeats = ["4 + 1", "2 + 2 + 1", "3 + 1 + 1", "3 + 2"];
const sixSeats = ["4 + 2", "4 + 1 + 1", "3 + 2 + 1", "2 + 2 + 1 + 1"];
const seatType = ["Leather", "Wooden", "Fabric", "Cane"];
const sofaRecliner = ["Recliner", "Non Recliner"];
const storageType = ["With storage", "Without storage"];

//2. Tables
const table = ["Tables"];
const tableModel = ["Coffee/Centre", "Dinning Table", "Side Table", "Plastic Table", "Computer/Office Table", "Dressing Table", "Iron Board"];
const coffeeTableType = ["Glass top", "wododen top"];
const dinningTableType =["2 seaters", "3 seaters", "4 seaters", "5 seaters", "6 seaters", "7 or more seaters"];
const dinningTableTopType =["Wooden top", "Metal top", "Glass top"];
const sideTableType =["Wooden top", "Glass top"];
const dressingTableType =["Dismantlable", "Non-dismantlable"];
const tableStorageType = ["With storage", "Without storage"];

//3. Chairs
const chair = ["Chairs"];
const chairModel =["Office/Computer", "Kid","Dining","Rocking","Plastic","Executive"];

//4. Cot
const cot = ["Cots"];
const cotModel = ["King size", "Queen Size", "Double cot", "Single cot", "Bunk bed", "Diwan"];
const cotType = ["Dismantlable", "Foldable", "Neither"];
const cotStorageType = ["With storage", "Without storage"];

//5. Mattress
const mattress = ["Mattress"];
const mattressModel = ["Double", "Single"];
const size = ["< 4 inch thickness", "4 to 8 inch thickness", "> 8 inch thickness"];

//6. Cupboards
const cupboard = ["Cupboards"];
const cupboardModel = ["Wooden wardroble", "Steel almirah", "Plastic cupboard", "Show case", "Shoe rack", "Tv cabinet", "Book shelf"];
const cupboardHeight = ["Height < 2 ft", "Height 2-4 ft", "Height 4-6 ft", "Height > 6 ft"];
const cupboardWidth = ["Width < 2 ft", "Width 2-4 ft", "Width 4-6 ft", "Width > 6 ft"];
const steelAlmirahHeight = ["Height < 5 ft", "Height > 5 ft"];
const fitmentType =["With glass fitments", "without glass fitments"];
const cupboardType = ["Dismantlable", "Foldable", "Neither"];
const cupboardStorageType = ["With storage", "Without storage"];

//Electronic
// 1. TVs
const tv = ["TVs"];
const tvModel = ["LED", "LCD", "CRT"];
const tvSize = ["< 24 inch", "24-31 inch", "32 inch", "33-39 inch"];
const tvMounted = ["Wall mounted", "Non-wall mounted"];

//2. Refrigerator
const refrigerators = ["refrigerators1", "refrigerators2"];
const refrigeratorModel = ["Single door", "Double door", "Side by Side", "Triple door"]

//3. Washing Machine
const washingmachine = ["Washing Machine"];
const washingmachineModel = ["Top Loading","Front Loading"];
const washingmachineType = ["Automatic", "Semi automatic"];

//4. Ovens
const oven = ["Ovens"];
const ovenModel = ["Microwave", "Ofg", "Cooking range"];

//5. Air Conditioners
const airconditioner = ["Air Conditioners"];
const airconditionerModel = ["Window","Split"];
const airconditionerSize = ["< 1 ton", "1 - 1.5 ton", "1.5 - 2 ton"];

//6. Fans/ coolers
const fan = ["Fans/Coolers"];
const fanModel = ["Tower Cooler","Ceiling fan","Table fan", "Pedestal fan","Wall mounted fan"];

//Vehicle
//1. Bikes
const bike = ["Bikes"];
const bikeBrand = [
"Honda",
"Bajaj",
"Hero",
"TVS Motors",
"Royal Enfield",
"Yamaha",
"Suzuki",
"KTM",
"Mahindra",
"Kawasaki",
"Harley Davidson",
"BMW"
];

const honda =[
  "Activa",
  "CB Shine",
  "CB Unicorn",
  "Dio",
  "Livo",
  "CBR 150",
  "CB Trigger",
  "CBR 250",
  "Dream Yuga",
  "CB Twister",
  "Aviaton",
  "CBF Stunner",
  "Dream Neo",
  "CD 110 Dream",
  "CBR 1000 RR"
];

const bajaj = [
  "Pulsar DTS-i",
  "Pulsar RS200",
  "Pulsar 220F",
  "Pulsar NS 200",
  "Pulsar 135",
  "CT100",
  "Platina",
  "Avenger",
  "Pulsar AS",
  "Discover"
];

const hero = [
  "Splendor",
  "Passion",
  "Maestro",
  "Glamour",
  "Pleasure",
  "Splendor Classic",
  "HF Deluxe",
  "Hunk",
  "Ignitor",
  "Karizma",
  "Xtreme",
  "HF Dawn",
  "Achiever",
  "Impulse",
  "Duet"
];

const tvsMotors =[
  "Apache RTR",
  "Jupiter",
  "Sport",
  "StarCity Plus",
  "Heavy Duty super XL",
  "Scooty",
  "Wego",
  "Phoenix",
  "MAX4R"
];

const royalEnfield = [
  "Classic 350",
  "Thunderbird 350",
  "Bullet 350",
  "Bullet Electra",
  "Classic 500",
  "Thunderbird 500",
  "Continental GT (Cafe Racer)",
  "Bullet 500"
];

const yamaha=[
  "FZ S",
  "YZF R15",
  "Fazer",
  "FZ",
  "SZRR",
  "YZF-R3",
  "Crux",
  "Saluto",
  "Ray",
  "Alpha",
  "Fascino",
  "Vmax",
  "YZF R1",
  "FZ1"
];

const ktm=[
  "Duke 200",
  "RC 200",
  "390 Duke ABS",
  "RC 390"
];

const mahindra =[
  "Gusto",
  "Rodeo",
  "Centuro",
  "Duro",
  "Mojo"
];

const harleyDavidson =[
    "Street 750",
    "Iron 883",
    "Superlow",
    "Forty Eight",
    "V Rod",
    "CVO Limited",
    "Fat Bob",
    "Street Bob",
    "Fat Boy Special",
    "Breakout",
    "Road King 2016",
    "Heritage Softail Classic",
    "Street Glide Special"
];

const bmw = [
    "S1000RR",
    "K1300",
    "K1600",
    "S1000R",
    "R nineT",
    "R1200"
];

const suzuki =[
  "Gixxer",
  "Gixxer SF",
  "GS150R",
  "Hayate",
  "SlingShot Plus",
  "Swish 125 facelift",
  "Lets",
  "Access",
  "GSX-R1000",
  "M1800R",
  "M800",
  "GSX-S1000",
  "Bandit",
  "Hayabusa",
  "V-Strom 1000"
]


//2. Cars
const car = ["Cars"];
const carBrand = ["Maruti Suzuki",
"Hyundai",
"Honda siel",
"Mahindra",
"Tata Motors",
"Toyota",
"Volkswagen",
"Ford",
"Datsun",
"Chevrolet",
"Renault",
"Audi",
"Mercedes-Benz",
"Nissan",
"BMW",
"Skoda",
"Fait",
"Ssangyong",
"Eicher",
"Isuzu"];


const marutiSuzuki = [
  "Alto",
  "Wagon R",
  "Celerio",
  "Ritz",
  "Swift",
  "Swift Drize",
  "Ertiga",
  "Ciaz",
  "S-Cross",
  "Omni",
   "800",
  "Baleno",
  "A-Star",
  "Zen estilo",
  "Esteem",
  "Eeco",
  "Versa",
  "Gypsy"
];

const toyota=[
  "Etios Liva",
  "Etios",
  "Qualis",
  "Innova",
  "Corolla Altis"
];

const volkswagen = [
  "Polo",
  "Vento",
  "Jetta",
  "Beetle"
];

const ford =[
  "Figo",
  "Figo Aspire",
  "Classic",
  "EcoSport",
  "Fiesta"
];

const datsun =[
  "Go"
];

const audi = [
  "Audi A3"
];

const mercedesBenz = [
  "A-class",
  "B-class",
  "CLA-class",
  "GLA-class"
];

const isuzu =[
  "MU7"
];

const eicher = [
  "Polaris Multix"
]

const ssangyong = [
  "Rexton"
];

const fiat = [
  "Punto",
  "Linea",
  "Avventura"
];

const skoda = [
  "Rapid",
  "Octavia",
  "Fabia",
  "Yeti",
  "Superb"
];

const bmwCar = [
  "1 Series",
  "3 Series",
  "X1"
];

const nissan =[
  "Micra",
  "Sunny",
  "Evalia",
  "Teana",
  "Terrano"
];

const renault = [
  "Kwid",
  "Pulse",
  "Scala",
  "Lodgy",
  "Duster",
  "Fluence",
  "Koleos"
];

const hyundai = [
  "Eon",
  "i10",
  "Grand i10",
  "Xcent",
  "i20",
  "Verna",
  "Creta",
  "Elantra",
  "Santro",
  "Sonata",
  "Tucson",
  "Accent"
];

const hondaSiel = [
  "Brio",
  "Amaze",
  "Jazz",
  "Mobilio",
  "City",
  "CR-V",
  "Accord",
  "Civic"
];

const mahindraCar =[
  "Thar",
  "XUV500",
  "Xylo",
  "Scorpio",
  "e2o",
  "Verito Vibe",
  "Bolero",
  "Quanto",
  "Verito",
  "TUV300"
];

const tataMotors =[
  "Nano",
  "Indica",
  "Bolt",
  "Zest",
  "Indigo eCS",
  "Manza",
  "Sumo",
  "Safari",
  "XenonXT",
  "Aria"
];

const chevrolet = [
  "Spark",
  "Beat",
  "Sail Hatchback",
  "Sail",
  "Enjoy",
  "Tavera",
  "Cruze",
  "Captiva",
  "Trailblazer"
];


//3. Cycles
const cycle = ["Cycles"];
const cycleModel = ["With gear", "Without gear"];

