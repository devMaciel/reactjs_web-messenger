import React from 'react';
import './footer.css';

class Footer extends React.Component{
    Copyright = () => {
        return(
            <h2 variant="body2" color="textSecondary" align="center">
                {'Copyright ₢'}
                {'Coding Cafe'}
                {new Date().getFullYear()}
                {'.'}
            </h2>
        )
    }

    render(){
        return(
            <footer>
                <div class="footer 1-box is-center">
                    {this.Copyright()}
                </div>
            </footer>
        )
    }
}
 
export default Footer;