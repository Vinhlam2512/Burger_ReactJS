import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients)
        .map((igKey) => {
            // igKey is Ingredient Key
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        .reduce((arr, el) => {
            // flat array
            return arr.concat(el);
        }, []);

    if (transformedIngredient.length === 0) {
        transformedIngredient = <p>Please start adding ingredients</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredient}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default Burger;
