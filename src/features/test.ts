Skip to content
Search...
Log in
Create account

10

6

6

Cover image for How to setup Redux toolkit with TypeScript
How to setup Redux toolkit with TypeScript
#redux #reduxtoolkit #typescript #easyredux
debosthefirst profile image
Adebola
Aug 12, 2020 ・Updated on Aug 14, 2020 ・6 min read
Out with the old, in with the new!
First published at blog.adebola.dev/throw-out-redux-use-redux-toolkit

A while back when I started picking up Redux for the first time, I couldn't believe how much code I needed to write to get anything to work. Frankly speaking, it scared me! And even though writing all the setup code from memory can make you feel pretty darn smart, after some time, it gets boring and you want to work with something that's more intuitive and straightforward.

Redux can also be difficult for beginners to pick up and it certainly was difficult for me, well, until I discovered Redux toolkit. It's still surprising to me that it's not as widely talked about as it should be and people seem to be stuck on old Redux.

If you're looking to get started learning Redux or want a more intuitive way to write redux - RTK is the way to go!

In this article, I'll show you how to setup RTK with TypeScript and React.

Why use Redux Toolkit.
Type definitions - You can use it easily with TypeScript.
Mutate state directly - you no longer need to make a copy of state or spread state. RTK comes with Immer which allows you to mutate state directly in the code while immer does all the heavy lifting under the hood.
Redux-thunk - Writing async code in regular redux requires installing additional middlewares like Redux saga or Redux-thunk. Not anymore! RTK comes bundled with Redux-thunk for all that async beauty!
One file - one file for all your reducers, actions and action creators!
Redux dev-tools - I can't tell you how many times using Redux dev tools (you need to install the extension in your browser to use it) has helped me debug code faster and stopped me from having days where I want to smash my keyboard (no, I'd never do that - hopefully!). RTK comes with Redux dev tools which means you would never need to add any additional middlewares to use it.
You can see the finished repo for this application here.

Let's get cracking - Setup
First, as always, create a new Application called rtk-app using CRA with the TypeScript template.
npx create-react-app rtk-app --template typescript
cd rtk-app
Open up the app in your favorite code editor.

Setting up Redux toolkit
Let's start by installing the required packages. We will be building a simple application that makes a request to the NASA APOD API.

We need good ol' react-redux and redux-toolkit itself. Redux-toolkit is written in TypeScript so no need to install a @types for the package.
npm install @types/react-redux react-redux @reduxjs/toolkit
You may need to run npm install one more time for CRA to pick up other @types declarations in your package.json

Configuring the store
Redux is based around the idea of a single store i.e your entire state is stored in a single place.

Inside src/index.js, we will create our store.
// src/index.tsx

import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import { configureStore, Action } from "@reduxjs/toolkit"
import photosSliceReducer from "./features/photos/PhotoSlice"
import { ThunkAction } from "redux-thunk"
import { PhotoState } from "./features/photos/PhotoSlice"

// The AppThunk type will help us in writing type definitions for thunk actions
export type AppThunk = ThunkAction<void, PhotoState, unknown, Action<string>>;

const store = configureStore({
  reducer: {
    // the convention is to name this photos rather than photosStore but photosStore is clearer to me.
    photosStore: photosSliceReducer,

    // anyOtherStore: anyOtherSlice,
// middleware: ['array of middlewares'],
  devTools: process.env.NODE_ENV !== "development" ? false : true,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
)
Now, a couple of things to note.

We are using the configureStore method from RTK to create the store. The method takes an object with all your reducers as an argument.

We are our PhotoSlice reducer which is exported from a features/photos/PhotoSlice file (not yet created).

The RTK documentation encourages us to write all our state logic in a features folder with files named as SomethingSlice.ts.

Putting all our state logic in one file makes it easy for us to maintain our Application and improves readability.

NB You can pass as many reducers as you want to the store.

You can also pass an array of middlewares as an object to the configureStore. In production, we are also disabling redux devtools by using the devtools object like so devTools: process.env.NODE_ENV !== "development" ? false : true,.

Setting up the slice
Within the src directory, create a new folder called features/photo, inside this, create a PhotoSlice.ts file.

This is where the magic happens! And, all of that magic only relies on a single import.

First, we import createSlice - which is a function that takes one argument: an object with the slice name, initial state and all your reducer functions.

We will also import PayloadAction to help us with type definitions for our payload. This way we can ensure that our payload always receives the correct types.
// src / features / photos / PhotoSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { AppThunk } from "./../../index"

export interface PhotoState {
  photos: object[];
  loading: boolean;
  errors: string;
}

const initialState: PhotoState = {
  photos: [],
  loading: false,
  errors: "",
}

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },

    setErrors: (state, { payload }: PayloadAction<string>) => {
      state.errors = payload
    },

    setPhotos: (state, { payload }: PayloadAction<object[]>) => {
      state.photos = payload
    },
  },
})

export const { setLoading, setErrors, setPhotos } = photoSlice.actions

export default photoSlice.reducer

export const photosSelector = (state: { photosStore: PhotoState }) =>
  state.photosStore
We export the reducer object that's autommatically available on photoSlice as a result of using the createSlice method. This is the reducer that we passed to our store when we created our store using configureStore earlier.

RTK also automatically generates our actions for us and we can destructure them out of the photoSlice.actions object for use in our application.

PhotosSelector will allow us to select whatever state we want want from the redux store. We will come back to photosSelector in a bit.

Async actions
Next, we need to make a request to the NASA Apod API to get photos for us to display. We will use axios to do this.

Remember, RTK provides redux-thunk under the hood to allow us write async code!

We've already imported axios in our PhotoSlice.ts file but we need to install it. Install axios with
npm install axios
Below the line where we exported our photosSelector, we can start writing some async actions.
// src / features / photos / PhotoSlice.ts

// AppThunk sets the type definitions for the dispatch method
export const getPhotos = (): AppThunk => {
  return async dispatch => {
    dispatch(setLoading(true))
    try {
      const baseURL: string = "https://api.nasa.gov/planetary/apod"
      // your apiKey should ideally be in a .env file
      const apiKey = "AIzaSyBDipCJKnoTuhByJP2pB4A7Fx4SAOXoy-k"

      const res = await axios.get(
        `${baseURL}?api_key=${apiKey}&start_date=2020-05-07&end_date=2020-05-09`
      )

      dispatch(setLoading(false))
      dispatch(setPhotos(res.data))
    } catch (error) {
      dispatch(setErrors(error))
      dispatch(setLoading(false))
    }
  }
}
Connecting our Components to the Redux store
Let's hook up our App component to the redux store.

To connect App(or any other component) to the store - we do not need any of connect function, HOCs, mapStateToProps or any of that old stuff - Out with the old, in with the new!, remember?.

All we need to do is import the useSelector and useDispatch hooks and we're good to go!
// src/App.tsx
import React, { useEffect } from "react"
import { photosSelector, getPhotos } from "./features/photos/PhotoSlice"
import { useSelector, useDispatch } from "react-redux"
import "./App.css"

function App() {
  const dispatch = useDispatch()
  const { photos, loading, errors } = useSelector(photosSelector)

  console.log(photos, loading, errors)

  useEffect(() => {
    dispatch(getPhotos())
  }, [dispatch])

  return <div className="App">Hello world</div>
}

export default App
To select whatever elements we want from the state, we pass the state (exported as photosSelector) to our useSelector hook.

We also have access to our thunk actions(getPhotos) that we exported from our PhotosSlice.ts file.

Anddddd with just a few lines of code, we've been able to hook up our App component to the redux store! Isn't that just amazing! Notice how easy it is to also read the code? Beautiful!

Discussion (7)
Subscribe
pic
Add to the discussion
 
emil14 profile image
Emil Valeev
•
Aug 31 '20

Hello! Thank you for the article :)

Why don't you use createAsyncThunk? Could be even smaller with them


1
 like
Reply
 
debosthefirst profile image
Adebola
•
Sep 4 '20

Thank you for pointing that out. I didn't realize RTK had that API.


2
 likes
Reply
 
mavortius profile image
Marcelo Martins
•
Jan 16

Sorry, but why you still use class components?


1
 like
Reply
 
debosthefirst profile image
Adebola
•
Jan 23

Hi Marcelo.

Please point out where


2
 likes
Thread
mavortius profile image
Marcelo Martins
•
Jan 24

Sorry, I made a mistake. I should to reply Martin Rausher's comments below.


1
 like
Reply
 
hades32 profile image
Martin Rauscher
•
Dec 21 '20

Unfortunately, useDispatch is not allowed for class components. Is it possible to avoid connect for those, too?


2
 likes
Reply
 
oksanadev profile image
oksanadev
•
Jan 22

Thanks a lot for this! Shouldn't it be photosSlice instead of photosStore in your photosSlice.ts?


1
 like
Reply
Code of Conduct • Report abuse
Read next
puruvj profile image
Why I moved from Styled Components to (S)CSS modules
PuruVJ - Apr 16

quiibz profile image
Writing a CSS-in-JS library to rapidly create reusable designs
Tom Lienard - Apr 13

thejuju profile image
Creating a simple game with PhaserJS
Julien Gabriel - Apr 22

scottlepp profile image
Uploading files with Deno
Scott Lepper - Apr 11

Adebola profile image
Adebola
Fullstack Developer @Aeeiee. In love with Nigerian Jollof and plantain. 🇳🇬
Follow
WORK
Software Developer at Aeeiee
LOCATION
Nigeria
EDUCATION
Microverse / University of Helsinki / Eastern Mediterranean University
JOINED
Jan 20, 2020
Trending on DEV Community 
Iain Freestone profile image
🚀10 Trending projects on GitHub for web developers - 23rd April 2021
#react #javascript #typescript #webdev
krishna kakade profile image
How I got my first job with the help of DevCommunity☄️
#career #advice #watercooler #webdev
Daniel Krupnyy profile image
What is VS Code Johnny❓ 🤔
#discuss #watercooler #webdev #javascript
// src / features / photos / PhotoSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { AppThunk } from "./../../index"

export interface PhotoState {
  photos: object[];
  loading: boolean;
  errors: string;
}

const initialState: PhotoState = {
  photos: [],
  loading: false,
  errors: "",
}

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },

    setErrors: (state, { payload }: PayloadAction<string>) => {
      state.errors = payload
    },

    setPhotos: (state, { payload }: PayloadAction<object[]>) => {
      state.photos = payload
    },
  },
})

export const { setLoading, setErrors, setPhotos } = photoSlice.actions

export default photoSlice.reducer

export const photosSelector = (state: { photosStore: PhotoState }) =>
  state.photosStore
