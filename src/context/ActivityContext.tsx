import { createContext, ReactNode, Dispatch, useReducer, useMemo } from 'react';
import { ActivityActions, activityReducer,ActivityState,initialState } from "../reducers/activity-reducer";
import { Activity } from "../types"
import { categories } from "../data/categories"

type ActivityProviderProps ={
    children: ReactNode
}

type ActivityContextProps={
    state: ActivityState
    dispatch:Dispatch<ActivityActions>
    caloriesConsumed: number
    caloriesBurned: number
    netCalories: number
    isEmptyActivities:boolean
    categoryName :  (category: Activity["category"]) => string[]
}
export const ActivityContext = createContext<ActivityContextProps>(null!)


export const ActivityProvider = ({children}:ActivityProviderProps)=>{
    const [state, dispatch] = useReducer(activityReducer, initialState)

     const caloriesConsumed = useMemo(()=> state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total,0)
        ,[state.activities])
    
        const caloriesBurned = useMemo(()=> state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total,0)
        ,[state.activities])
        const netCalories = useMemo(()=> state.activities.reduce(() => caloriesConsumed - caloriesBurned,0),[state.activities])
        
         const categoryName = useMemo(()=> 
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
        ,[categories])

    const isEmptyActivities = useMemo ( ()=> state.activities.length === 0,[state.activities])
    return(
        <ActivityContext.Provider 
        value={{
         state,
         dispatch,
         caloriesConsumed,
         caloriesBurned,
         netCalories,
         categoryName,
         isEmptyActivities
        }}>
          {children}
        </ActivityContext.Provider>
    )
}