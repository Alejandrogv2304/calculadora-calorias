import { categories } from "../data/categories"
import { useState } from "react"
export default function Form() {
    const [activity, setActivity]= useState({
        category:1,
        name:'',
        calories:0
    })
  return (
    <form className="space-y-5 bg-white shadow rounded-lg p-10">
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold"> Categoría:
            <select
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            id="category"
            value={activity.category}>
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
            value={activity.name}/>
        
      </div>

      <div className="grid grid-cols-1 gap-3"> 
        <label htmlFor="calories" className="font-bold">Calorías:</label>
            <input
            id="calories"
            type="number"
            className=" border border-slate-300 p-2 rounded-lg "
            placeholder="Ej, Comida , Jugo de Naranja, empanada, Ejercicio, pesas, bicicleta"
            value={activity.calories}/>
        
      </div>
      
      <input
      type="submit"
      className="bg-gray-800 hover:bg-gray-900 w-full p-2 text-white cursor-pointer font-bold uppercase"
      value="Guardar Comida o Guardar ejercicio"/>
    </form>
  )
}
