import path from 'path'
import { fileURLToPath } from 'url'

import express  from 'express'

import config from './utils/config.js'
import appRoutes from './routes/app.js'


const app = express()

const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )

/**
 * Sets up a view engine
 */

app.set( 'view engine', 'ejs' )
app.set( 'views', path.join( __dirname, 'views' ) )

/**
 * Appends application/x-www-form-urlencoded data to request objects
 */

app.use( express.urlencoded( { extended: false } ) )

/**
 * Sets up a public directory
 */

app.use( express.static( path.join( __dirname, 'public' ) ) )

/**
 * Sets up a routes
 */

app.use( appRoutes )

/**
 * Sets up a error page
 */

app.use( ( req, res, next ) => {
  res.status( 404 ).render( '404' )
} )


const PORT = process.env.PORT || config.fallbackPort

async function startServer() {
  try {
    app.listen( PORT, () => {
      console.log( `Server listening on port ${PORT}` )
    } );
  } catch ( error ) {
    console.error( 'Error starting server:', error )
    process.exit( 1 )
  }
}

startServer()