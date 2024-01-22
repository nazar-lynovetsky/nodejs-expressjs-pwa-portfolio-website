const appController = {

  getHome: ( req, res ) => {
    res.status( 200 ).render( 'home' )
  },

  getWorks: ( req, res ) => {
    res.status( 200 ).render( 'works' )
  }

}

export default appController