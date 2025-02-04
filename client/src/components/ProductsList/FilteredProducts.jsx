import { Search } from "lucide-react";
import ProductCard from "../UI/ProductCard";
import { useState, useRef } from "react";

const INITIAL_PRODUCTS = [
  { id: 1, name: 'HP Spray Gun', imgUrl: 'https://5.imimg.com/data5/WY/XE/LP/SELLER-11886370/spray-gun-hp-p70-without-cup-500x500.jpg', price: 3610 },
  { id: 2, name: 'Lead Acid Battery', imgUrl: 'https://batteryspecialists.com.au/cdn/shop/articles/Lead_Acid_Batteries.webp?v=1678797430', price: 1139 },
  { id: 3, name: 'High Pressure Water Pump Bitch ass nigga', imgUrl: 'https://images.jdmagicbox.com/quickquotes/images_main/industrial-high-pressure-water-pump-2217128590-wfzd764p.jpg', price: 42439 },
  { id: 4, name: 'Compact Tractor', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKJSLAEvZ2F19N0EwSVlxvHwmJsVWfqMOysQ&s', price: 32102 },
  { id: 5, name: 'Lithium-Ion Battery', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 30093 },
  { id: 6, name: 'Automatic Cultivator', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 9861 },
  { id: 7, name: 'Grain Harvester', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 47861 },
  { id: 8, name: 'Hydraulic Plough', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 22290 },
  { id: 9, name: 'Electric Irrigation Pump', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 41045 },
  { id: 10, name: 'Seed Planter', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 16808 },
  { id: 11, name: 'Fertilizer Spreader', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 5152 },
  { id: 12, name: 'Hose Reel System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 36047 },
  { id: 13, name: 'Soil Moisture Meter', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 36491 },
  { id: 14, name: 'Compost Turner', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 41577 },
  { id: 15, name: 'Crop Duster Sprayer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 33529 },
  { id: 16, name: 'Mobile Grain Mill', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 28187 },
  { id: 17, name: 'Power Tiller', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 3214 },
  { id: 18, name: 'Weed Control Machine', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 12483 },
  { id: 19, name: 'Rice Transplanter', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 29584 },
  { id: 20, name: 'Seed Drill', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 15329 },
  { id: 21, name: 'Electric Rotavator', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 5391 },
  { id: 22, name: 'Automatic Sprinkler', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 30422 },
  { id: 23, name: 'Tractor Towing Equipment', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 27610 },
  { id: 24, name: 'Cattle Feed Mixer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 18530 },
  { id: 25, name: 'Water Drip System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 43058 },
  { id: 26, name: 'Agricultural Rake', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 12930 },
  { id: 27, name: 'Multi-Function Farm Tool', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 25128 },
  { id: 28, name: 'Hydraulic Post Driver', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 18942 },
  { id: 29, name: 'Bale Wrapper', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 42567 },
  { id: 30, name: 'Irrigation Controller', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 5642 },
  { id: 31, name: 'Automatic Potato Planter', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 21950 },
  { id: 32, name: 'Soil pH Meter', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 24892 },
  { id: 33, name: 'Fodder Chopper', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 15780 },
  { id: 34, name: 'Poultry Feeder', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 7208 },
  { id: 35, name: 'Crop Cutter', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 38702 },
  { id: 36, name: 'Cattle Water Dispenser', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 5306 },
  { id: 37, name: 'Hydraulic Grain Bagger', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 6721 },
  { id: 38, name: 'Aerial Sprayer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 31250 },
  { id: 39, name: 'Feed Crusher', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 18296 },
  { id: 40, name: 'Electric Weed Wacker', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 23457 },
  { id: 41, name: 'Cattle Milking Machine', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 24830 },
  { id: 42, name: 'Soil Analyzer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 37411 },
  { id: 43, name: 'Motorized Sprayer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 13507 },
  { id: 44, name: 'Rotary Tiller', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 44356 },
  { id: 45, name: 'Compost Bagging Machine', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 5618 },
  { id: 46, name: 'Automatic Corn Planter', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 29467 },
  { id: 47, name: 'Portable Pump System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 6820 },
  { id: 48, name: 'Solar Irrigation System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 16891 },
  { id: 49, name: 'Agricultural Trailer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 5402 },
  { id: 50, name: 'Grain Dryer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 29935 },
  { id: 51, name: 'Solar Water Heater', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 35249 },
  { id: 52, name: 'Planting Machine', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 12692 },
  { id: 53, name: 'Hydraulic Seed Drill', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 20229 },
  { id: 54, name: 'Automatic Weeder', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 18492 },
  { id: 55, name: 'Grape Vine Harvester', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 15984 },
  { id: 56, name: 'Cattle Feeder', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 3298 },
  { id: 57, name: 'Hemp Harvester', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 41378 },
  { id: 58, name: 'Hydraulic Lift', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 24356 },
  { id: 59, name: 'Electric Fencing System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 28579 },
  { id: 60, name: 'High Yield Seeder', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 20764 },
  { id: 61, name: 'Fertigation System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 34656 },
  { id: 62, name: 'Tree Planter', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 13480 },
  { id: 63, name: 'Biogas Generator', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 26129 },
  { id: 64, name: 'Greenhouse Climate Control', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 5127 },
  { id: 65, name: 'Worm Composting Kit', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 13157 },
  { id: 66, name: 'Aquaponics System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 4638 },
  { id: 67, name: 'Solar Greenhouse', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 5829 },
  { id: 68, name: 'Wind Turbine for Farms', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 24192 },
  { id: 69, name: 'Tractor with Air-Conditioned Cab', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 61729 },
  { id: 70, name: 'High Pressure Wash System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 28193 },
  { id: 71, name: 'Electric Tractor', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 71364 },
  { id: 72, name: 'Livestock Scales', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 29681 },
  { id: 73, name: 'Precision Planter', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 54912 },
  { id: 74, name: 'Tractor Tire', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 8531 },
  { id: 75, name: 'Hay Baler', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 38567 },
  { id: 76, name: 'Air Seeder', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 31245 },
  { id: 77, name: 'Livestock Tags', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 3057 },
  { id: 78, name: 'Weed Control Drone', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 16798 },
  { id: 79, name: 'Farmer Smartwatch', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 6540 },
  { id: 80, name: 'Mini Harvesting Robot', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 13459 },
  { id: 81, name: 'Mobile Sprayer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 5271 },
  { id: 82, name: 'Farm Irrigation Truck', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 62190 },
  { id: 83, name: 'Automatic Poultry Incubator', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 39711 },
  { id: 84, name: 'High-Performance Harvester', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 14300 },
  { id: 85, name: 'Solar Water Pump', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 26839 },
  { id: 86, name: 'Geotextile Fabric', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 7321 },
  { id: 87, name: 'Agricultural GPS System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 8491 },
  { id: 88, name: 'Farm Automation System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 18964 },
  { id: 89, name: 'Greenhouse Construction Kit', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 35020 },
  { id: 90, name: 'Planting Tray', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 9871 },
  { id: 91, name: 'Farm Gate System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 11345 },
  { id: 92, name: 'Portable Windmill', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 24134 },
  { id: 93, name: 'Eco-Friendly Seed Pots', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 14102 },
  { id: 94, name: 'Hydroponic System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 39720 },
  { id: 95, name: 'Plant Growth Light', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 31281 },
  { id: 96, name: 'Crop Monitoring System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 55483 },
  { id: 97, name: 'Seedling Tray', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 6587 },
  { id: 98, name: 'LED Plant Growth Panel', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 24381 },
  { id: 99, name: 'Drip Irrigation Filter', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 9875 },
  { id: 100, name: 'Soil Aerator', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 10721 },
  { id: 101, name: 'Farm Fencing Kit', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 4568 },
  { id: 102, name: 'Wind Powered Water Pump', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 23971 },
  { id: 103, name: 'Solar Powered Crop Dryer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 28937 },
  { id: 104, name: 'Hydraulic Fruit Picker', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 36172 },
  { id: 105, name: 'Automatic Beekeeping System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 27964 },
  { id: 106, name: 'Mobile Water Tank', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 12408 },
  { id: 107, name: 'Cabbage Harvester', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 34258 },
  { id: 108, name: 'Vertical Hydroponic System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 32847 },
  { id: 109, name: 'Tractor GPS Kit', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 49382 },
  { id: 110, name: 'Pressure Washer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 15723 },
  { id: 111, name: 'Tree Pruning Tool', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 19242 },
  { id: 112, name: 'Hay Rake', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 24133 },
  { id: 113, name: 'Hydraulic Forklift', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 62458 },
  { id: 114, name: 'Aquaculture System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 22105 },
  { id: 115, name: 'Fruit Sorting Machine', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 14807 },
  { id: 116, name: 'Solar-Powered Weeder', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 38795 },
  { id: 117, name: 'Drip Irrigation Kit', imgUrl: 'https://placehold.co/600x400?text=Hello+World}', price: 27605 },
  { id: 118, name: 'Thermal Fogger', imgUrl: 'https://placehold.co/600x400?text=Hello+World}', price: 10394 },
  { id: 119, name: 'Farm Tractor Loader', imgUrl: 'https://placehold.co/600x400?text=Hello+World}', price: 54262 },
  { id: 120, name: 'Agricultural Drone', imgUrl: 'https://placehold.co/600x400?text=Hello+World}', price: 43254 },
  { id: 121, name: 'Seedling Placer', imgUrl: 'https://placehold.co/600x400?text=Hello+World}', price: 13240 },
  { id: 122, name: 'Rope Winch', imgUrl: 'https://placehold.co/600x400?text=Hello+World}', price: 18702 },
  { id: 123, name: 'Tractor Plow', imgUrl: 'https://placehold.co/600x400?text=Hello+World}', price: 27836 },
  { id: 124, name: 'Soil Moisture Sensor', imgUrl: 'https://placehold.co/600x400?text=Hello+World}', price: 36813 },
  { id: 125, name: 'Soil Texture Tester', imgUrl: 'https://placehold.co/600x400?text=Hello+World}', price: 16964 },
  { id: 126, name: 'Farm Seed Tank', imgUrl: 'https://placehold.co/600x400?text=Hello+World}', price: 29834 },
  { id: 127, name: 'Spraying Robot', imgUrl: 'https://placehold.co/600x400?text=Hello+World}', price: 14792 },
  { id: 128, name: 'Hydraulic Harvesting Equipment', imgUrl: 'https://placehold.co/600x400?text=Hello+World}', price: 37785 },
  { id: 129, name: 'Farming Drone Kit', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 48293 },
  { id: 130, name: 'Solar Windmill Pump', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 25496 },
  { id: 131, name: 'Automated Seed Planter', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 41350 },
  { id: 132, name: 'Vertical Farm System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 21309 },
  { id: 133, name: 'Farm Weed Machine', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 9237 },
  { id: 134, name: 'Automated Greenhouse System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 27863 },
  { id: 135, name: 'Farm Water Sprinkler', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 20191 },
  { id: 136, name: 'Wind Powered Irrigation System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 47012 },
  { id: 137, name: 'Dairy Farm Equipment', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 30556 },
  { id: 138, name: 'Tractor Plow', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 40788 },
  { id: 139, name: 'Hydraulic Earth Drill', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 35429 },
  { id: 140, name: 'Aquaculture Water Circulator', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 24604 },
  { id: 141, name: 'Farm Irrigation Water Tank', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 51213 },
  { id: 142, name: 'Automatic Harvesting Equipment', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 39485 },
  { id: 143, name: 'Watering Robot', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 15867 },
  { id: 144, name: 'Vegetable Harvester', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 47964 },
  { id: 145, name: 'Poultry Egg Incubator', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 25439 },
  { id: 146, name: 'Solar Pumping System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 30457 },
  { id: 147, name: 'Tractor Rake', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 21809 },
  { id: 148, name: 'Farm Automatic Seedling', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 14450 },
  { id: 149, name: 'Tractor Sprayer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 30198 },
  { id: 150, name: 'Farm Greenhouse Kit', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 39865 },
  { id: 151, name: 'Tree Planting Tool', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 12544 },
  { id: 152, name: 'Electric Irrigation System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 56347 },
  { id: 153, name: 'Organic Fertilizer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 20219 },
  { id: 154, name: 'Solar Irrigation System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 37581 },
  { id: 155, name: 'Farm Wind Turbine', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 27941 },
  { id: 156, name: 'Greenhouse Fan', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 18726 },
  { id: 157, name: 'Farm Irrigation System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 45632 },
  { id: 158, name: 'Tractor Hitch', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 14738 },
  { id: 159, name: 'Vegetable Sorting Machine', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 29391 },
  { id: 160, name: 'Solar Fence Charger', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 8390 },
  { id: 161, name: 'Farm Equipment Maintenance Kit', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 25843 },
  { id: 162, name: 'Livestock Weighing Scale', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 34592 },
  { id: 163, name: 'Farm Water Filtration System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 12367 },
  { id: 164, name: 'Farm Greenhouse Fan', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 21749 },
  { id: 165, name: 'Tractor Harrow', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 25839 },
  { id: 166, name: 'Farm Tractor Loader', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 62412 },
  { id: 167, name: 'Tractor Post Hole Digger', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 32651 },
  { id: 168, name: 'Seed Sower', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 48251 },
  { id: 169, name: 'Farm Irrigation Sprayer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 24656 },
  { id: 170, name: 'Livestock Vaccination Gun', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 14984 },
  { id: 171, name: 'Livestock Handling System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 56134 },
  { id: 172, name: 'Solar Trickle Charger', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 7632 },
  { id: 173, name: 'Electric Farm Sprayer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 27651 },
  { id: 174, name: 'Agricultural Fertilizer Spreader', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 49832 },
  { id: 175, name: 'Tractor Hydraulic System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 63214 },
  { id: 176, name: 'Farm Automatic Seeder', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 29843 },
  { id: 177, name: 'Agricultural Drone Kit', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 45217 },
  { id: 178, name: 'Water Storage Tank', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 10479 },
  { id: 179, name: 'Agricultural Subsoiler', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 57421 },
  { id: 180, name: 'Mobile Farming App', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 7534 },
  { id: 181, name: 'Soil Nutrient Analyzer', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 16925 },
  { id: 182, name: 'Vertical Plant Grower', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 32814 },
  { id: 183, name: 'Farming Tool Set', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 12946 },
  { id: 184, name: 'Soil Fertility Tester', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 17565 },
  { id: 185, name: 'Water Conservation Kit', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 31523 },
  { id: 186, name: 'Crop Dusting Drone', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 18342 },
  { id: 187, name: 'Greenhouse Temperature Sensor', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 23948 },
  { id: 188, name: 'Farming GPS System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 34256 },
  { id: 189, name: 'Livestock Feeding System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 52194 },
  { id: 190, name: 'Agricultural Field Roller', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 62483 },
  { id: 191, name: 'Windmill Irrigation System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 17391 },
  { id: 192, name: 'Automatic Livestock Feeder', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 26731 },
  { id: 193, name: 'Agricultural Digger', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 31645 },
  { id: 194, name: 'Solar Powered Weeder', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 28126 },
  { id: 195, name: 'Hydraulic Press Machine', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 21853 },
  { id: 196, name: 'Farming Drill', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 15294 },
  { id: 197, name: 'Tractor Log Splitter', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 29847 },
  { id: 198, name: 'Automated Irrigation System', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 46239 },
  { id: 199, name: 'Solar Powered Pump', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 32904 },
  { id: 200, name: 'Farming Crop Protector', imgUrl: 'https://placehold.co/600x400?text=Hello+World', price: 74261 },
]


const FilteredProducts = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const scrollableProductsDivRef = useRef();

  const scrollToTop = () => {
    scrollableProductsDivRef.current.scrollTop = 0;
  }

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchText) ||
      product.price.toString().includes(searchText)
    );
  });

  return (
    <div className={`p-6 m-2 shadow bg-white rounded`}>
      {/* Search Bar */}
      <div className="flex justify-between rounded-md">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value.toLowerCase());
            scrollToTop();
          }}
          placeholder="Search by name or price"
          className="border-2 w-full px-2 rounded-l-md border-r-0 py-1 outline-primary"
        />
        <button className="bg-primary text-white px-2 min-h-full min-w-10 py-1 rounded-r-md flex items-center justify-center">
          <Search size={20} />
        </button>
      </div>
      {/* Products */}
      <div className="grid grid-cols-[1fr,1fr,1fr,1fr] gap-2 p-2 my-4" ref={scrollableProductsDivRef}>
        {filteredProducts.length > 0 ? filteredProducts.map((product, index) => {
          return (
            <ProductCard
              key={index}
              name={product.name}
              imgUrl={product.imgUrl}
              price={product.price}
            />
          );
        }) : <span className="text-sm">No products found</span>}
      </div>
    </div>
  );
};
export default FilteredProducts;
