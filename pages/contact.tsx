import { Card, CardContent, TextField, CardActions, FormControl, Button, Alert, Collapse, IconButton } from '@mui/material';
import { AlertColor } from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { useState, ChangeEvent } from 'react';
import { postApiData } from '../helpers/api';
import PageSection from '../components/PageSection';

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [alertText, setAlertText] = useState('');
  const [alertColor, setAlertColor] = useState<AlertColor>('success');
  const [showAlert, setShowAlert] = useState(false);
  const [form, setForm] = useState<any>({
    name: '',
    email: '',
    message: '',
  });

  const validateEmail = (email: any) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const alertUser = (color: AlertColor, text: string) => {
    setAlertColor(color);
    setAlertText(text);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleChange = (prop: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  const clearForm = () => {
    setForm({
      name: '',
      email: '',
      message: '',
    });
  };

  const postForm = async () => {
    if (!form.name) return alertUser('warning', 'Name is required');
    if (!form.email) return alertUser('warning', 'Email is required');
    if (!validateEmail(form.email)) return alertUser('warning', 'Email is invalid');
    if (!form.message) return alertUser('warning', 'Message is required');

    try {
      await postApiData('/user-contacts', form);
      alertUser('success', 'Success! Thanks for your feedback!');
    } catch (err: any) {
      alertUser('error', err.response.data);
    }

    clearForm();
  };

  return (
    <>
      <PageSection fullHeight>
        <div id='contact'>
          <div id='contactInstructions'>
            <div id='abstractIcon'>
              <p>........</p>
              <p>........</p>
              <p>........</p>
            </div>

            <h1>Tell us how we are doing</h1>
            <p>
              We love feedback! Please take a second to leave your review, or tell us how we can improve. You can fill out this form here, or go to our <a href='https://anchor.fm/thegogetterspodcast'>Anchor</a> page to leave us a voice message.
            </p>
          </div>

          <Card id='contactForm' variant='outlined'>
            <CardContent>
              <FormControl fullWidth margin='normal' variant='outlined'>
                <TextField required fullWidth label='Name' margin='normal' value={form.name} onChange={handleChange('name')} />
                <TextField required fullWidth label='Email' margin='normal' value={form.email} onChange={handleChange('email')} />
                <TextField required fullWidth multiline label='Message' rows={5} margin='normal' value={form.message} onChange={handleChange('message')} />
                <Collapse in={showAlert}>
                  <Alert
                    action={
                      <IconButton
                        aria-label='close'
                        color='inherit'
                        size='small'
                        onClick={() => {
                          setShowAlert(false);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    severity={alertColor}
                  >
                    {alertText}
                  </Alert>
                </Collapse>{' '}
              </FormControl>
            </CardContent>
            <CardActions>
              <Button variant='contained' onClick={postForm}>
                Submit
              </Button>
              <Button onClick={clearForm}>Clear</Button>
            </CardActions>
          </Card>
        </div>
      </PageSection>
    </>
  );
}
