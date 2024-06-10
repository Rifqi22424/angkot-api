const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getRoutes = async (req, res) => {
  try {
    const routes = await prisma.route.findMany();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch routes' });
  }
};

const addRoute = async (req, res) => {
  const { name, points } = req.body;
  try {
    const newRoute = await prisma.route.create({
      data: {
        name,
        points,
      },
    });
    res.json(newRoute);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add route' });
  }
};

module.exports = {
  getRoutes,
  addRoute,
};
