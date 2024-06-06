import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    asset: null
}


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setAsset: (state, action) => {
            state.asset = action.payload
        },
        setAssetReview: (state, action) => {
            state.asset.review.push(action.payload)
        },
        setCart: (state, action) => {
            if (action.payload.op) {
                state.user.cart.push(action.payload.item)
            }
            else {
                state.user.cart.splice(state.user.cart.findIndex(object => object.asset._id === action.payload.item.asset._id), 1)
            }
        },
        setWishlist: (state, action) => {
            if (action.payload.op) {
                state.user.wishlist.push(action.payload.item)
            }
            else {
                state.user.wishlist.splice(state.user.wishlist.findIndex(object => object._id === action.payload.item._id), 1)
            }
        },
        updateWishlistUrl: (state, action) => {
            state.user.wishlist = action.payload
        },
        setAssets: (state, action) => {
            if (action.payload.op) {
                state.user.assets.push(action.payload.asset)
            }
            else {
                state.user.assets.splice(state.user.assets.findIndex(object => object._id === action.payload.asset._id), 1)
            }
        }
    },
})
export const { setUser, setWishlist, setCart, setAssets, setAsset, setAssetReview } = userSlice.actions

export default userSlice.reducer