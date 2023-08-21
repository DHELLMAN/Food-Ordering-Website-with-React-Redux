import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';
import { fetchMeals } from '../../store/ui-actions';

const AvailableMeals = () => {

  const [meals,setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [hasError,setHasError] = useState();

  useEffect(()=>{

        const getMealsData = async ()=>{
          const data = await fetchMeals();
          if(data.status){
            setMeals(()=>data.loadedMeals);
            setIsLoading(false);
          }else{
            setHasError(data.message)
          }
        }
        getMealsData();
    
  },[])

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading ? <p className={classes.mealsLoading}>Loading...</p>:<ul>{mealsList}</ul>}
        {hasError && <p className={classes.mealsLoadingError}>{hasError}</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
