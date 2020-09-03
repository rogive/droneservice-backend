const Solicitude = require('../models/solicitude.model');
const Client = require('../models/client.model');
module.exports = {

  async list(req, res) {
    try {
      const solicitude = await Solicitude.find()
      .populate({
        path: 'client',
        select: '_id name', // separados por un espacio
      })
      res.status(200).json(solicitude);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const { clientId }  = req.body;

      const client = await Client.findById(clientId)
      console.log("1")
      const solicitude = await Solicitude.create({...data, client })
      console.log("2")
      
      client.solicitudes.push(solicitude)
      console.log(`3`)
      await client.save()
      console.log("4")

      res.status(200).json(solicitude);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const solicitude = await Solicitude.findById(id);

      res.status(200).json(solicitude);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async showclient(req, res) {
    try {
      const { id } = req.params;
      const solicitude = await Solicitude.find({client: id});

      res.status(200).json(solicitude);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const solicitude = await Solicitude.findByIdAndUpdate(id, data, { new: true })

      res.status(200).json(solicitude);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const solicitude = await Solicitude.findByIdAndDelete(id)

      res.status(200).json(solicitude);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  }
}