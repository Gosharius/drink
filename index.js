import express from "express";
import axios, { all } from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {

    try {
      const result = await axios.get( API_URL + "random.php" );
      const  cocktail = result.data.drinks[0];     
      const ingredients = [];
      const allIngredients = await axios.get( API_URL + "list.php?i=list" );
            const ingrData = allIngredients.data.drinks;
            

      for (let i=1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
          if (ingredient !== null) {
            const amount = cocktail[`strMeasure${i}`];

            ingredients.push(ingredient + " - " + amount);
          }
        }
          res.render("index.ejs", { 
            name: cocktail.strDrink,
            picture: cocktail.strDrinkThumb,
            instruction: cocktail.strInstructions,
            ingredients: ingredients,
            ingrData
            
          });
               } catch (error) {
      res.status(404).send(error.message);
    }
    });

    app.get("/random", async (req, res) => {

      try {
        const result = await axios.get( API_URL + "random.php" );
        const  cocktail = result.data.drinks[0];     
        const ingredients = [];
        const allIngredients = await axios.get( API_URL + "list.php?i=list" );
            const ingrData = allIngredients.data.drinks;
           
  
        for (let i=1; i <= 15; i++) {
          const ingredient = cocktail[`strIngredient${i}`];
            if (ingredient !== null) {
              const amount = cocktail[`strMeasure${i}`];
  
              ingredients.push(ingredient + " - " + amount);
            }
          }
            res.json( { 
              name: cocktail.strDrink,
              picture: cocktail.strDrinkThumb,
              instruction: cocktail.strInstructions,
              ingredients: ingredients,
              ingrData
              
            });
                 } catch (error) {
        res.status(404).send(error.message);
      }
      });
  
      app.get("/gin", async (req, res) => {

        try {
          const result = await axios.get( API_URL + "filter.php?i=Gin" );
          const  cocktail = result.data.drinks[Math.floor(Math.random()*result.data.drinks.length)];     
          const coctailId = cocktail.idDrink;
          const ginCocktail = await axios.get( API_URL + "lookup.php?i=" + coctailId );
          const cocktailData =  ginCocktail.data.drinks[0];
          const ingredients = [];
          const allIngredients = await axios.get( API_URL + "list.php?i=list" );
            const ingrData = allIngredients.data.drinks;
            
          
    
          for (let i=1; i <= 15; i++) {
            const ingredient = cocktailData[`strIngredient${i}`];
              if (ingredient !== null) {
                const amount = cocktailData[`strMeasure${i}`];
    
                ingredients.push(ingredient + " - " + amount);
              }
            }
              res.json( { 
                name: cocktailData.strDrink,
                picture: cocktailData.strDrinkThumb,
                instruction: cocktailData.strInstructions,
                ingredients: ingredients,
                ingrData
                
              });
                   } catch (error) {
          res.status(404).send(error.message);
        }
        });
    
        app.get("/select", async (req, res) => { 

         
          try {
            const selectIngr = req.query.ing;
            const result = await axios.get( API_URL + `filter.php?i=${selectIngr}` );
            const  cocktail = result.data.drinks[Math.floor(Math.random()*result.data.drinks.length)];     
            const coctailId = cocktail.idDrink;
            const ginCocktail = await axios.get( API_URL + "lookup.php?i=" + coctailId );
            const cocktailData =  ginCocktail.data.drinks[0];
            const ingredients = [];
            const allIngredients = await axios.get( API_URL + "list.php?i=list" );
            const ingrData = allIngredients.data.drinks;
            
            
      
            for (let i=1; i <= 15; i++) {
              const ingredient = cocktailData[`strIngredient${i}`];
                if (ingredient !== null) {
                  const amount = cocktailData[`strMeasure${i}`];
      
                  ingredients.push(ingredient + " - " + amount);
                }
              }

              
              res.json(  { 
                  name: cocktailData.strDrink,
                  picture: cocktailData.strDrinkThumb,
                  instruction: cocktailData.strInstructions,
                  ingredients: ingredients,
                  ingrData
                  
                });
                     } catch (error) {
            res.status(404).send(error.message);
          }
          });

app.get("/noalc", async (req, res) => {


try {
  const selectIngr = req.query.ing ? req.query.ing : 'gin';
  const result = await axios.get( API_URL + `filter.php?a=Non_Alcoholic` );
  const  cocktail = result.data.drinks[Math.floor(Math.random()*result.data.drinks.length)];     
  const coctailId = cocktail.idDrink;
  const ginCocktail = await axios.get( API_URL + "lookup.php?i=" + coctailId );
  const cocktailData =  ginCocktail.data.drinks[0];
  const ingredients = [];
  const allIngredients = await axios.get( API_URL + "list.php?i=list" );
  const ingrData = allIngredients.data.drinks;
  
  

  for (let i=1; i <= 15; i++) {
    const ingredient = cocktailData[`strIngredient${i}`];
      if (ingredient !== null) {
        const amount = cocktailData[`strMeasure${i}`];

        ingredients.push(ingredient + " - " + amount);
      }
    }

    
      res.json( { 
        name: cocktailData.strDrink,
        picture: cocktailData.strDrinkThumb,
        instruction: cocktailData.strInstructions,
        ingredients: ingredients,
        ingrData
        
      });
            } catch (error) {
  res.status(404).send(error.message);
}
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
