import { Container, List, ListItem, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { chatSelector } from "../redux/reduser/chatSelector/selector";

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'teal',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#2e7d32',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#2e7d32',
        },
        '&:hover fieldset': {
            borderColor: '#2e7d32',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#2e7d32',
        },
    },
});


const theme = createTheme({
    palette: {
        secondary: {
            main: '#2e7d32',
        },
    },
});

let newChatName = "";
export default function ChatsListMain({ createAvailable }) {
    const chats = useSelector(chatSelector)
    const dispatch = useDispatch();
    const createNewChat = () => {
        dispatch({ type: "createChat", payload: newChatName });
    }
    const deleteChat = (value) => {
        dispatch({ type: "deleteChat", payload: value })
    }
    const onNameChange = (event) => {
        newChatName = event.target.value
    }
    return <ChatsList
        createNewChat={createNewChat}
        deleteChat={deleteChat}
        chats={chats}
        onNameChange={onNameChange}
        createAvailable={createAvailable} />
}

const ChatsList = ({ createNewChat, deleteChat, chats, onNameChange, createAvailable }) => {

    return <Container>
        <ThemeProvider theme={theme}>
            <List sx={{ fontSize: 20 }} >
                {Object.keys(chats).map((value) => {
                    return <ListItem key={value}>
                        <Link to={"/chats/" + value}
                            style={{ textDecoration: "none", display: "block" }}>
                            {chats[value].name}
                        </Link>

                        <Button
                            variant="outlined"
                            color="success"
                            sx={{ ml: 5 }}
                            onClick={() => { deleteChat(value) }}>
                            ??????????????
                        </Button>
                    </ListItem>
                })}
            </List>

            {<Container
                sx={{ flexDirection: "column", display: "flex" }}
                maxWidth="sm">

                <h2 className="myHeader">C?????????????? ?????????? ??????</h2>

                <CssTextField
                    id='chat-name'
                    variant='outlined'
                    label='???????????????? ????????'
                    onChange={onNameChange}
                ></CssTextField>

                <Button
                    color="success"
                    variant="contained"
                    type='button'
                    onClick={() => { createNewChat(newChatName) }}>
                    ????????????????
                </Button>
            </Container>
            }
        </ThemeProvider>
    </Container>
}