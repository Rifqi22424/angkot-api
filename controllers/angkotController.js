// controllers/angkotController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAngkots = async (req, res) => {
  try {
    const angkots = await prisma.angkot.findMany();
    res.json(angkots);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch angkots' });
  }
};

const addAngkot = async (req, res) => {
  const { name, driver, lat, lng } = req.body;
  try {
    const newAngkot = await prisma.angkot.create({
      data: {
        name,
        driver,
        lat,
        lng,
      },
    });
    res.json(newAngkot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add angkot' });
  }
};

module.exports = {
  getAngkots,
  addAngkot,
};
