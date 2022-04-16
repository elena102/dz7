import MessageList from './MessageList';
import { useRef } from 'react';
import { Container, Alert, Button, TextField } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import '../styles/link.css';
import { chatSelector } from '../redux/reduser/chatSelector/selector'
import { addMessageThunk } from '../redux/reduser/action'


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


let newAuthor = '', newText = '';

export default function Chats() {
    let { chatId } = useParams();
    const chats = useSelector(chatSelector);
    const dispatch = useDispatch();
    let chat = chats[chatId];
    let textFieldRef = useRef(null);

    const onFormSubmit = (event) => {
        event.preventDefault();
        dispatch(addMessageThunk(chatId, newAuthor, newText));
        textFieldRef?.current.focus();
    }

    if (!chat) {
        return <Container >
            <Alert severity="error">Чат не найден</Alert>
            <Link to="/chats">Вернуться</Link>
        </Container>
    }
    return <Container id="chat" >
        <ThemeProvider theme={theme}>
            <MessageList messages={chat.messages} />
            <form
                className='send-form'
                action='#'
                onSubmit={onFormSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "auto"

                }}>

                <CssTextField
                    id='name'
                    variant='outlined'
                    label='имя'
                    inputRef={textFieldRef}
                    autoFocus
                    onChange={(event) => {
                        newAuthor = event.target.value;
                    }}
                ></CssTextField>

                <CssTextField
                    id='message'
                    variant='outlined'
                    label='сообщение'
                    multiline={true}
                    rows='5'
                    onChange={(event) => {
                        newText = event.target.value;
                    }} />
                <Button
                    color="success"
                    variant="contained"
                    type='submit'>Отправить</Button>
            </form>
        </ThemeProvider>
    </Container>
}