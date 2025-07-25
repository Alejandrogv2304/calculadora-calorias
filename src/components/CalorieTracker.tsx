import { useActivity } from "../hooks/useActivity"
import CalorieDisplay from "./CalorieDisplay"



export default function CalorieTracker() {

  const { caloriesBurned, caloriesConsumed, netCalories} = useActivity()

 
   
  return (
    <>
    <h2 className="font-black text-4xl text-white text-center"> Resumen de Calorías</h2>
    <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
    <CalorieDisplay
    calories={caloriesConsumed}
    text="Consumidas"
    />
    <CalorieDisplay
    calories={caloriesBurned}
    text="Ejercicio"
    />
    <CalorieDisplay
    calories={netCalories}
    text="Balance"
    />
  
    </div>
    
    </>
  )
}
