const path = require('path')
const events = require('events')
const fs = require('fs')

const server = require('./server')

const program = require('commander')

program
  .command('run')
  .description('Launch web code editor ')
  .action(args => server(args))

program.parse(process.argv)
