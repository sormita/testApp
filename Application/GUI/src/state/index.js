export const initialState = {
    isLoading:true,
}

export const setLoading = ( payload)=>({
...initialState,
isLoading:payload, 
})