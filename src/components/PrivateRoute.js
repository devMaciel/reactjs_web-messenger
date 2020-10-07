import React from 'react'
import { Route } from 'react-router-dom'

/**
* @author
* @function PrivateRoute
**/

const PrivateRoute = (props) => {
  return(
    <Route path={props.path} exact={props.exact} component={props.component}>

    </Route>
   )

 }

export default PrivateRoute