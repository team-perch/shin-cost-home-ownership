/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const controller = require('./controller');
const keysToCamel = require('./camelCaseUtil');

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/api/costHomeOwnership/properties', async (req, res) => {
  const { id } = req.query;
  // TODO - check security implications

  try {
    const [properties] = await controller.getPropertyData(id);
    res.json(keysToCamel(properties));
  } catch (err) {
    res.status(400).end('server could not retrieve property data');
  }
});

app.get('/api/costHomeOwnership/rates', async (req, res) => {
  const {
    cost, zipCode, term, type, downPay, credit, origYear,
  } = req.query;
  // TODO - check security implications

  try {
    const [rates] = await controller.getRates(
      cost, zipCode, term, type, downPay, credit, origYear,
    );
    res.json(keysToCamel(rates));
  } catch (err) {
    res.status(400).end('server could not retrieve rates data');
  }
});

module.exports = app;