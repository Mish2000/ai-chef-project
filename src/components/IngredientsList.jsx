import PropTypes from "prop-types";

function IngredientsList(props){

    const ingredientsListItems = props.ingredients.map((ingredient) => (
        <li key={ingredient}>{ingredient}</li>
    ))

    return(
        <div>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients.length > 0 && <div className="get-recipe-container">
                <div ref={props.ref}>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>Get a recipe</button>
            </div>}
        </div>
    )
}

export default IngredientsList;

IngredientsList.propTypes = {
    ingredients: PropTypes.array.isRequired,
    getRecipe: PropTypes.func.isRequired,
    ref: PropTypes.object
}

