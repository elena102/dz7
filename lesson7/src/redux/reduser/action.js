export const addMessage = (chatId, author, text) => {
    return {
        type: "addMessage",
        payload: {
            chatId,
            author,
            text
        }
    }
}

export const addMessageThunk = (chatId, author, text) => (dispatch, getState) => {
    dispatch(addMessage(chatId, author, text));
    if (author !== "robot") {
        setTimeout(() => {
            dispatch(addMessage(chatId, "robot", "Спасибо за ваше сообщение!"))
        }, 2000)
    }
}
