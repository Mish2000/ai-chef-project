import {useEffect, useRef, useState} from "react";
import ChefRecipe from "./ChefRecipe.jsx";
import IngredientsList from "./IngredientsList.jsx";
import {getRecipeFromLLM} from "../ai.js";

function MainComp() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");
    const getRecipeSection = useRef(null);
    const [inputValue, setInputValue] = useState("");


    useEffect(() => {
        if (recipe.length > 0 && getRecipeSection.current !== null) {
            //getRecipeSection.current.scrollIntoView({behavior: 'smooth'})
            const yCord = getRecipeSection.current.getBoundingClientRect().top;
            window.scroll({
                top: yCord,
                behavior: 'smooth'
            });
        }
    }, [recipe])


    async function getRecipe() {
        const response = await getRecipeFromLLM(ingredients);
        setRecipe(response);
    }

    function addIngredient(event) {
        event.preventDefault();
        setIngredients(prevIngredients => [...prevIngredients, inputValue]);
        setInputValue("");
    }

    function handleInputChange (event) {
        setInputValue(event.target.value);
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    ref={getRecipeSection}
                    type="text"
                    placeholder="e.g canned tuna"
                    aria-label="Add ingredient"
                    name="ingredient"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button type="submit">+ Add ingredient</button>
            </form>
            {ingredients.length > 0
                &&
                <IngredientsList
                    ref={getRecipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}/>}
            {recipe && <ChefRecipe recipe={recipe}/>}
        </main>
    )
}

export default MainComp;