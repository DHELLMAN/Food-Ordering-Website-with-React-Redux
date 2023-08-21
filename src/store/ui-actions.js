export const fetchMeals = async () =>{

    const response = await fetch('https://react-http-e7949-default-rtdb.firebaseio.com/meals.json');
    
    if(!response.ok){
        return {
            status:false,
            message:'Error while fetching the menu. Please Try Again'
        }
    }
    const responseData = await response.json();

    const loadedMeals = [];

    for(const key in responseData){
        loadedMeals.push({
        id:key,
        name:responseData[key].name,
        description:responseData[key].description,
        price:responseData[key].price
        })
    }
    
    return {
        status:true,
        loadedMeals
    }
}