import { Card, CardContent, TextField, CardActions, FormControl, Button, Link, Alert, Collapse, IconButton, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AlertColor } from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { useState, ChangeEvent } from 'react';
import { postApiData } from '../helpers/api';
import { validateEmail } from '../helpers';
import PageSection from '../components/PageSection';
import Head from 'next/head';

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [alertText, setAlertText] = useState('');
  const [alertColor, setAlertColor] = useState<AlertColor>('success');
  const [showAlert, setShowAlert] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState<any>({
    name: '',
    email: '',
    message: '',
  });

  const alertUser = (color: AlertColor, text: string) => {
    setAlertColor(color);
    setAlertText(text);
    setShowAlert(true);
    setFormLoading(false);

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
    setFormLoading(false);
  };

  const postForm = async () => {
    setFormLoading(true);
    if (!form.name) return alertUser('warning', 'Name is required');
    if (!form.email) return alertUser('warning', 'Email is required');
    if (!validateEmail(form.email)) return alertUser('warning', 'Email is invalid');
    if (!form.message) return alertUser('warning', 'Message is required');

    try {

      await postApiData('/user-contacts', form);
      alertUser('success', 'Success! Thanks for your feedback!');
      clearForm();
    } catch (err: any) {
      alertUser('error', err.response.data);
    }

    setFormLoading(false);
  };

  return (
    <>
      <Head>
        <title>Contact | The Go Getters</title>
      </Head>

      <PageSection minHeight='100%'>
        <div id='contact'>
          <div id='contactInstructions'>
            <Typography sx={{ mb: 3 }} variant='h3' component='h2'>
              Tell us how we are doing
            </Typography>
            <Typography variant='body1'>
              We love feedback! Please take a second to leave your review, or tell us how we can improve. You can fill out this form here, or go to our <Link href='https://anchor.fm/thegogetterspodcast'>Anchor</Link> page to leave us a voice message.
            </Typography>
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
              <LoadingButton loading={formLoading} variant='contained' onClick={postForm}>
                Submit
              </LoadingButton>

              <Button onClick={clearForm}>Clear</Button>
            </CardActions>
          </Card>
        </div>
      </PageSection>
    </>
  );
}
