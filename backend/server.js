const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/audit', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL requerida para análisis' });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const results = await new AxePuppeteer(page).analyze();
    await browser.close();

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error al realizar la auditoría', details: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
