import {useState} from "react";
import ChefRecipe from "./ChefRecipe.jsx";
import IngredientsList from "./IngredientsList.jsx";
import {getRecipeFromLLM} from "../ai.js";

function MainComp() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");

    async function getRecipe() {
        const response = await getRecipeFromLLM(ingredients);
        setRecipe(response);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>+ Add ingredient</button>
            </form>
            {ingredients.length > 0
                &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}/>}
            {recipe && <ChefRecipe recipe={recipe} />}
        </main>
    )
}

export default MainComp;