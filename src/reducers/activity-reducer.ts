import { Activity } from '../types/index';

export type ActivityActions = 
 { type : 'save-activity', payload : {  newActivity : Activity} } |
 { type : 'set-activeId', payload : {  id : Activity['id']} } |
 { type : 'delete-activity', payload : {  id : Activity['id']} } |
 { type : 'restart-app' }


export type ActivityState ={
    activities : Activity [],
    activeId : Activity['id']
}

const localStorageactivities = () : Activity[] =>{
    const activities = localStorage.getItem('activities');
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState= {
 activities : localStorageactivities(),
 activeId : ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    let updatedActivitities: Activity[] = []
 if(action.type === 'save-activity'){

    if(state.activeId){
     updatedActivitities = state.activities.map((activity) => activity.id === state.activeId? action.payload.newActivity : activity) 
    }else{
     updatedActivitities = [...state.activities, action.payload.newActivity]
    }
    return {
        ...state,
        activities: updatedActivitities,
        activeId : ''
 
    }
 }

 if(action.type === 'set-activeId'){
    return {
        ...state,
        activeId : action.payload.id
 
    }
 }

 if( action.type === 'delete-activity'){
    return{
        ...state,
        activities : state.activities.filter(activity => activity.id !== action.payload.id)
    }
 }

 if( action.type === 'restart-app'){
    return{
        activities: [],
        activeId: ''
    }
 }
 return state;

}