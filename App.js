const express = require('express');
const morgan = require('morgan');
  const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like
const game = require('./playstore.js');

    app.get('/apps', (req, res) => {
        const { search = "", sort } = req.query;
      
        if (sort) {
          if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(sort)) {
            return res
              .status(400)
              .send('Sort must be one of the generes');
          }
        }
      
        let results = apps
              .filter(game =>
                  apps
                    .title
                    .toLowerCase()
                    .includes(search.toLowerCase()));
      
        if (sort) {
          results
            .sort((a, b) => {
              return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
          });
        }
      
        res
          .json(results);
      });

      module.exports = app;