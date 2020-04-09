import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ userIngredients, setUserIngredients ] = useState([]);

  useEffect(() => {
    fetch('https://react-hooks-update-3f047.firebaseio.com/ingredients.json').then(
      response => response.json()
      ).then(responseData => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          });
        }
        setUserIngredients(loadedIngredients)
      })
  }, []);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients)
  }, []);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update-3f047.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json();
    }).then(responseData => {setUserIngredients(prevIngredients => [...prevIngredients, { id: responseData.name, ...ingredient}])
  })
  }

  const removeIngredientHandler = id => {
    setUserIngredients(prevIngredients => [...prevIngredients.filter(ingredient => ingredient.id !== id)]) 
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
