import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Registration, Login } from '../../Service/service'


const initialState={
    token:localStorage.getItem('token') || null,
    user:JSON.parse(localStorage.getItem('user')) || null,
    status: null
}

export const loginUser=createAsyncThunk(
    "auth/loginUser",
    async({e,email,password,navigator,modalClose,setError,toastdispatch})=>{
        try{
            const res = await Login(e,email,password,navigator,modalClose,setError,toastdispatch)
            return res
        }catch(error){
          console.log(error)
        }
    }
)

export const signupUser=createAsyncThunk(
    "auth/signupUser",
    async({e,email,password,firstname,lastname,termsAndConditions,navigator,modalClose,setError,toastdispatch})=>{
        try{
            const res = await Registration(e,email,password,firstname,lastname,termsAndConditions,navigator,modalClose,setError,toastdispatch)
            return res
        }catch(error){
           console.log(error)
        }
    }
)

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        logoutUser:()=>{
       
            localStorage.removeItem("token")
            localStorage.removeItem("user")
         
            return{
                user:null,
                token:null
            }
        }
    },
    extraReducers:{
        [loginUser.pending]:(state)=>{
                state.status="loading";
        },
        [loginUser.fulfilled]:(state,action)=>{
                state.status="success";
                state.token=action.payload.data.encodedToken;
                state.user=action.payload.data.foundUser;
                localStorage.setItem('token',state.token);
                localStorage.setItem('user',JSON.stringify(state.user))
        },
        [loginUser.rejected]:(state,action)=>{
            state.status="failed";
        },
        [signupUser.pending]:(state)=>{
            state.status="loading"
        },
        [signupUser.fulfilled]:(state,action)=>{
            state.status="success";
            state.token=action.payload.data.encodedToken;
            state.user=action.payload.data.createdUser;
            localStorage.setItem('token',state.token);
            localStorage.setItem('user',JSON.stringify(state.user))
        },
        [signupUser.rejected]:(state,action)=>{
            state.status="failed";
        }
    }
})

export const {logoutUser} =authSlice.actions;
export default authSlice.reducer;