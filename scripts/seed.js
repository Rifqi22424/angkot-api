const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seed = async () => {
  try {
    // Routes seeding
    await prisma.angkot.deleteMany({});
    await prisma.route.deleteMany({});
    console.log('All existing routes and angkots deleted');

    const routesSeedData = [
      {
        name: 'Bhayangkara',
        points: [
          [-6.9102818099772625, 106.92185821037722],
          [-6.910787615410421, 106.92713950692838],
          [-6.9146914254527765, 106.932557475203],
          [-6.92174485429241, 106.92606935702598],
          [-6.9189652161925626, 106.91598922166885],
          [-6.916010806189064, 106.9193662349931],
          [-6.9102818099772625, 106.92185821037722],
          [-6.910787615410421, 106.92713950692838],
        ],
      },
      {
        name: 'Sukaraja',
        points: [
          [-6.917415065105264, 106.97326188265825],
          [-6.916898254206801, 106.96675438018379],
          [-6.919654572462727, 106.9529584749379],
          [-6.923013813579127, 106.93569190170564],
          [-6.921635666269813, 106.92311073025498],
        ],
      },
      {
        name: 'Cisaat',
        points: [
          [-6.90800857487026, 106.89179072257717],
          [-6.911976403503695, 106.89967642027659],
          [-6.912298117879199, 106.90486153657208],
          [-6.914989990964045, 106.90604979238985],
          [-6.918911439205859, 106.91541322681269],
        ],
      },
      {
        name: 'Nyomplong',
        points: [
          [-6.922346953478976, 106.92775060682526],
          [-6.94176348904733, 106.92268661674952],
          [-6.942926352245266, 106.92022497399904],
          [-6.947324691865975, 106.91635577990957],
        ],
      },
    ];

    for (const routeData of routesSeedData) {
      const existingRoute = await prisma.route.findFirst({
        where: { name: routeData.name },
      });

      if (!existingRoute) {
        await prisma.route.create({
          data: routeData,
        });
        console.log(`Route "${routeData.name}" seeded`);
      } else {
        console.log(`Route "${routeData.name}" already seeded`);
      }
    }

    // Angkots seeding
    const angkotsSeedData = [ 
      { name: 'Angkot Sukaraja', driver: 'Nanang', lat: -6.916907165951253, lng: 106.96715455392672 },
      { name: 'Angkot Sukaraja', driver: 'Ujang', lat: -6.916907165951253, lng: 106.96659289671413 },
      { name: 'Angkot Sukaraja', driver: 'Anang', lat: -6.922949301473362, lng: 106.93454241757584 },
      
      { name: 'Angkot Bhayangkara', driver: 'Ihsan', lat: -6.912751706719622, lng: 106.92024341695564 },
      { name: 'Angkot Bhayangkara', driver: 'Zara', lat: -6.911741894303433, lng: 106.92838106392898 },
      { name: 'Angkot Bhayangkara', driver: 'Junaid', lat: -6.920113499753767, lng: 106.92066998715988 },

      { name: 'Angkot Pelabuan', driver: 'Junai', lat: -6.927623891422729, lng: 106.92657860824687 }, 
      { name: 'Angkot Pelabuan', driver: 'Ana', lat: -6.938117380649877, lng: 106.92382072049308 },

      { name: 'Angkot Cisaat', driver: 'Ical', lat: -6.912545318922986, lng: 106.90501266758835 }, 
    ];

    for (const angkotData of angkotsSeedData) {
      const existingAngkot = await prisma.angkot.findFirst({
        where: { driver: angkotData.driver },
      });

      if (!existingAngkot) {
        await prisma.angkot.create({
          data: angkotData,
        });
        console.log(`Angkot "${angkotData.name}" seeded`);
      } else {
        console.log(`Angkot "${angkotData.name}" already seeded`);
      }
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = seed;
