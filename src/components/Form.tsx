import { categories } from "../data/categories"
import { useState, ChangeEvent , FormEvent, Dispatch } from "react"
import { v4 as uuidv4} from "uuid"
import  type { Activity } from "../types"
import { ActivityActions } from "../reducers/activity-reducer"

type FormProps ={
 dispatch: Dispatch<ActivityActions>     
}
const initialState = {
      id : uuidv4(),
      category:1,
      name:'',
      calories:0
}
export default function Form({dispatch}: FormProps) {

    const [activity, setActivity]= useState<Activity>(initialState)

   
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) =>{
      const isNumberField = ['category', 'calories'].includes(e.target.id);
      setActivity({
        ...activity,
        [e.target.id] : isNumberField ? +e.target.value : e.target.value
      })
    }

    const isvalidActivity = () =>{
      const { name, calories } = activity;
      return name.trim() && calories > 0;
    }
  //Evita que se recargue la página al darle submit al formulario
    const handleSubmit = (e : FormEvent<HTMLFormElement>) =>{
     e.preventDefault();

     dispatch({type: ' save Activity', payload: {newActivity: activity}})

     setActivity({
      ...initialState,
      id: uuidv4()
      })
    }
  return (
    <form className="space-y-5 bg-white shadow rounded-lg p-10"
    onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold"> Categoría:
            <select
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            id="category"
            value={activity.category}
            onChange={handleChange}>
             {categories.map(category => (
                <option
                key={category.id}
                value={category.id}>
                {category.name}
                </option>
             ))
             }
            </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3"> 
        <label htmlFor="name" className="font-bold">Actividad:</label>
            <input
            id="name"
            type="text"
            className=" border border-slate-300 p-2 rounded-lg "
            placeholder="Ej, Comida , Jugo de Naranja, empanada, Ejercicio, pesas, bicicleta"
            value={activity.name}
            onChange={handleChange}/>
        
      </div>

      <div className="grid grid-cols-1 gap-3"> 
        <label htmlFor="calories" className="font-bold">Calorías:</label>
            <input
            id="calories"
            type="number"
            className=" border border-slate-300 p-2 rounded-lg "
            placeholder="Ej, Comida , Jugo de Naranja, empanada, Ejercicio, pesas, bicicleta"
            value={activity.calories}
            onChange={handleChange}/>
        
      </div>
      
      <input
      type="submit"
      className="bg-gray-800 hover:bg-gray-900 w-full p-2 text-white cursor-pointer font-bold uppercase disabled:opacity-10"
      disabled={!isvalidActivity()}
      value={activity.category == 1 ? "Guardar comida" :"Guardar ejercicio"}/>
    </form>
  )
}
