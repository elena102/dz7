const initialState = {
    username: "Пользователь",
    active: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "changeActive":
            return { ...state, active: !state.active }
        default:
            return state;
    }
}

export default reducer;