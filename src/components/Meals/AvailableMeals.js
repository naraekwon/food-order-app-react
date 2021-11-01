import { useEffect, useState } from 'react'; 

import classes from "./AvailableMeals.module.css";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";


const AvailableMeals = () => {
  const [ meals, setMeals ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ httpError, setHttpError ] = useState(); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://react-http-74ba0-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok) {
        throw new Error('Something went wrong!');
      }
      const json = await response.json();
      const loadedMeals = [];

      for(let key in json) {
        loadedMeals.push({
          id: key,
          name: json[key].name,
          description: json[key].description,
          price: json[key].price
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    }

    fetchData().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    
  }, [])

  if(isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if(httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
