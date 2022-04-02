

import burgerLogo from '../../assets/images/Logo.png'
import classes from './Logo.module.css'

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
)

export default Logo;