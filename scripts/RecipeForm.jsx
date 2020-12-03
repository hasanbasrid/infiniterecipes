import * as React from 'react';
import ReactDOM from 'react-dom';
import { List, Button, Container, Form, Icon, Header, Divider} from 'semantic-ui-react';
import { Content } from './Content';
import { Socket } from './Socket';
import ReactPlayer from "react-player"
import { Recipe } from './Recipe';

const diff_options = [
    {key: "easy", text:"Easy", value:"easy"},
    {key: "intermediate", text:"Intermediate", value:"intermediate"},
    {key: "advanced", text:"Advanced", value:"advanced"},
 ]

export function RecipeForm() {
    const [ingredientsField, setIngredientsField] = React.useState([
        {'name': '', 'amount': '', "unit": "" },
        ])
    const [instructionsField, setInstructionsField] = React.useState([
        {'step': ''},
        ]);
        
    const [tagsField, setTagsField] = React.useState([
        {'tag': ''}
        ]);
        
    const [recipe, setRecipe] = React.useState({});
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [servings, setServings] = React.useState("");
    const [image, setImage] = React.useState("");
    const [video, setVideo] = React.useState("");
    const [difficulty, setDifficulty] = React.useState("");
    const [time, setTime] = React.useState("");
        
    const ingredientsVals = ingredientsField.map((ingredient,index) => (
        <Form.Group key={index}>
            <Form.Field
                required
                name="name"
                label="Name"
                control="input"
                type="text"
                value={ingredient.name}
                onChange={event => onChangeIngredientInput(index, event)}
            />
            <Form.Field
                required
                label="Amount"
                name="amount"
                control="input"
                type="number"
                value={ingredient.amount}
                onChange={event => onChangeIngredientInput(index, event)}
            />
            <Form.Field
                label="Unit"
                name="unit"
                control="input"
                type="text"
                value={ingredient.unit}
                onChange={event => onChangeIngredientInput(index, event)}
            />
            <Button icon="minus" onClick={event => removeIngredientsField(index, event)}/>
        </Form.Group>
        ))
        
    const instructionVals = instructionsField.map((instruction,index) => (
        <Form.Group key={index}>
            <Form.Field
                required
                name="step"
                label="Instruction Name"
                control="input"
                type="text"
                value={instruction.step}
                onChange={event => onChangeInstructionInput(index, event)}
            />
            <Button icon="minus" onClick={event => removeInstructionsField(index, event)}/>
        </Form.Group>
    ));
    
    const tagVals = tagsField.map((tag,index) => (
        <Form.Group key={index}>
            <Form.Field
                required
                name="tag"
                label="Tag Name"
                control="input"
                type="text"
                value={tag.tag}
                onChange={event => onChangeTagInput(index, event)}
            />
            <Button icon="minus" onClick={event => removeTagsField(index, event)}/>
        </Form.Group>
    ));
    
    function getForkRecipeData() {
        React.useEffect(() => {
          Socket.on('load fork page', (data) => {
              setRecipe(data.recipe);
              setTitle(data.recipe.title);
              setDescription(data.recipe.description);
              setServings(data.recipe.servings);
              setImage(data.recipe.images);
              setDifficulty(data.recipe.difficulty);
              setTime(data.recipe.readyInMinutes);
              setIngredientsField(data.recipe.ingredients);
              setInstructionsField(data.recipe.instructions);
            //   setTagsField(data.recipe.tags);
              console.log("recipe title: " + title);
          });
        //   console.log("recipe title: " + data);
        });
    }
    
    function submitForm(e) {
        e.preventDefault();
        Socket.emit('new recipe', {
            'name' : title,
            'servings' : servings,
            'readyInMinutes' : time,
            'difficulty' : difficulty,
            'description': description,
            'image': [image],
            'video': [video],
            'ingredients' : ingredientsField,
            'instructions': instructionsField,
            'tags': tagsField,
            'user': localStorage.getItem('user_email'),
        })
        console.log('Sent recipe to server');
        Socket.emit('content page', {
            'content page' : 'content page'
        });
        ReactDOM.render(<Content />, document.getElementById('content'));
    }
    
    function changeTitle(event) {
        console.log(event.target.value);
        setTitle(event.target.value);
    }
    
    function changeTime(event) {
        console.log(event.target.value);
        setTime(event.target.value);
    }
    
    function changeServings(event) {
        setServings(event.target.value);
    }
    
    function changeDifficulty(event, { value } ) {
        console.log(value);
        setDifficulty(value);
    }
    
    function changeDescription(event) {
        setDescription(event.target.value);
    }
    
    function changeImage(event) {
        setImage(event.target.value);
    }
    
    function changeVideo(event) {
        setVideo(event.target.value);
    }
        
    function addIngredientField() {
        setIngredientsField([...ingredientsField, {'name': '', 'amount': '', "unit": "" }]);
    }
    
    function addInstruction() {
        setInstructionsField([...instructionsField, {'step': ''}]);
    }
    
    function addTag() {
        setTagsField([...tagsField, {'tag': ''}]);
    }
    
    function removeTagsField(index, event) {
        const rem_obj = tagsField[index];
        if (index > 0){
            setTagsField(instructionsField.filter(item => item !== rem_obj));
        }
    }
    
    function removeInstructionsField(index, event) {
        const rem_obj = instructionsField[index];
        if (index > 0){
            setInstructionsField(instructionsField.filter(item => item !== rem_obj));
        }
    }
    
    function removeIngredientsField(index, event) {
        const rem_obj = ingredientsField[index];
        if (index > 0){
            setIngredientsField(ingredientsField.filter(item => item !== rem_obj));
        }
    }
    
    function onChangeIngredientInput(index, event) {
        console.log(event.target.value);
        const values = [...ingredientsField];
        values[index][event.target.name] = event.target.value;
        setIngredientsField(values);
    }
    
    function onChangeInstructionInput(index, event) {
        console.log(event.target.value);
        const values = [...instructionsField];
        values[index][event.target.name] = event.target.value;
        setInstructionsField(values);
    }
    
    function onChangeTagInput(index, event) {
        console.log(event.target.value);
        const values = [...tagsField];
        values[index][event.target.name] = event.target.value;
        setTagsField(values);
    }
    getForkRecipeData();
    
    var paperback = {
    backgroundImage:"url('https://cdn.hipwallpaper.com/i/92/52/vZp6xG.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    }
    
    var titlestyle = {
    fontFamily: 'Comic Sans MS',
    fontSize: '24px'
    }
    
    var desc = {
    fontFamily: 'Georgia',
    fontSize: '17px'
    }
    
    return (
        <div  style={paperback}>
        <Container>
        <Header as="h1" style={titlestyle}>Post Recipe</Header>
        <Divider/>
        <Form onSubmit={submitForm} style={desc}>
            <Form.Group>
                <Form.Input
                    required
                    label="Recipe Name"
                    placeholder="Recipe Name"
                    value={title}
                    onChange={changeTitle}
                />
                <Form.Select
                    required
                    label="Difficulty"
                    options={diff_options}
                    value={difficulty}
                    placeholder="Difficulty"
                    onChange={changeDifficulty}
                />
                <Form.Field
                    required
                    label="Time"
                    control="input"
                    type="number"
                    value={time}
                    onChange={changeTime}
                />
                <Form.Field
                    required
                    label="Servings"
                    control="input"
                    type="number"
                    value={servings}
                    onChange={changeServings}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input 
                required 
                label="Image URL" 
                placeholder="Enter image URL" 
                value={image}
                onChange={changeImage}
                />
                <Form.Input 
                label="Youtube Video URL" 
                placeholder="Enter youtube video URL"
                value={video} 
                onChange={changeVideo}
                />
            </Form.Group>
            <Form.Field>
                <Form.TextArea 
                label='Description' 
                placeholder='Enter recipe description here...' 
                value={description}
                onChange={changeDescription}
                />
            </Form.Field>
            <Header>Ingredients</Header>
            {ingredientsVals}
            <Button onClick={addIngredientField} icon>
                <Icon name="plus"/> Add Ingredient
            </Button>
            <Header>Instructions</Header>
            {instructionVals}
            <Button onClick={addInstruction} icon>
                <Icon name="plus"/> Add Instruction
            </Button>
            <Header>Tags</Header>
            {tagVals}
            <Button onClick={addTag} icon>
                <Icon name="plus"/> Add Tag
            </Button>
            <br/>
            <br/>
            <br/>
            <Button type="submit" positive>Post Recipe</Button>
        </Form>
        </Container>
        </div>
    );
}