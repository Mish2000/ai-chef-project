import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

function ChefRecipe(props) {

    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>AI Chef Recommendation:</h2>
            <ReactMarkdown>
                {props.recipe}
            </ReactMarkdown>
        </section>
    )

}

export default ChefRecipe;

ChefRecipe.propTypes = {
    recipe: PropTypes.string.isRequired
}