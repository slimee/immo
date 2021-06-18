#!/usr/bin/env node
require('dotenv').config()
const debug = require('debug')('main')
const fs = require('fs');
const readline = require('readline');
const { dbConnect, col } = require('./db')

const processLineByLine = (file) => async () => {
  debug('START', file)
  const immo = col('immo');
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let first = true;
  let header = null;
  let i = 0;
  let batch = [];
  for await (const line of rl) {
    const parsed = line.split(',');
    if(first){
      first = false;
      header = parsed;
    } else {
      const document = {};
      header.forEach((key, i) => document[key] = get(key, parsed[i]));
      batch.push(document)
      if(batch.length === 100000) {
        debug(i++, 'batch is 100000, send...')
        await immo.insertMany(batch)
        debug('done')
        batch = []
      }
    }
  }
}

function get(key, raw){
  if(key === 'valeur_fonciere'
    || key === 'surface_reelle_bati'
    || key === 'nombre_pieces_principales'
    || key === 'longitude'
    || key === 'latitude'
    || key === 'nombre_lots'
    || key === 'surface_terrain') return Number(raw)
  if(key === 'date_mutation'){
    const [year, month, day] = raw.split("-")
    const date = new Date(year, month - 1, day)
    date.setHours(0,0,0,0)
    return date
  }
  return raw
}

dbConnect()
  .then(processLineByLine('full.2014.csv'))
  .then(processLineByLine('full.2015.csv'))
  .then(processLineByLine('full.2016.csv'))
  .then(processLineByLine('full.2017.csv'))
  .then(processLineByLine('full.2018.csv'))
  .then(processLineByLine('full.2019.csv'))
  .then(processLineByLine('full.2020.csv'))
  .catch(e => debug(e))
