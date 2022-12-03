import { Card, CardContent, TextField, CardActions, FormControl, Button, Alert, Collapse, IconButton, Typography } from '@mui/material';
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
  business: String;
  message: string;
}

export default function Partners() {
  const [alertText, setAlertText] = useState('');
  const [alertColor, setAlertColor] = useState<AlertColor>('success');
  const [showAlert, setShowAlert] = useState(false);
  const [form, setForm] = useState<any>({
    name: '',
    email: '',
    business: '',
    message: '',
  });

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
      business: '',
      message: '',
    });
  };

  const postForm = async () => {
    if (!form.name) return alertUser('warning', 'Name is required');
    if (!form.email) return alertUser('warning', 'Email is required');
    if (!validateEmail(form.email)) return alertUser('warning', 'Email is invalid');
    if (!form.business) return alertUser('warning', 'Business is required');
    if (!form.message) return alertUser('warning', 'Message is required');

    try {
      await postApiData('/sponsor-requests', form);
      alertUser('success', 'Success! Thanks for your interest in partnering with us!');
      clearForm();
    } catch (err: any) {
      alertUser('error', err.response.data);
    }
  };

  return (
    <>
      <Head>
        <title>Partners | The Go Getters</title>
      </Head>

      <PageSection minHeight='100%'>
        <div id='partners'>
          <div id='contactInstructions'>
            <Typography sx={{ mb: 3 }} variant='h3' component='h2'>
              Why partner with us?
            </Typography>
            <Typography variant='body1'>
              We feature incredible guests from all walks of life. Increase your business&apos;s reach and get exposed to a community of Go-Getters by partnering with us! Drop us a line and let&apos;s get the conversation started.
            </Typography>
          </div>

          <Card id='contactForm' variant='outlined'>
            <CardContent>
              <FormControl fullWidth margin='normal' variant='outlined'>
                <TextField required fullWidth label='Name' margin='normal' value={form.name} onChange={handleChange('name')} />
                <TextField required fullWidth label='Email' margin='normal' value={form.email} onChange={handleChange('email')} />
                <TextField required fullWidth label='Business' margin='normal' value={form.business} onChange={handleChange('business')} />
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
              <Typography style={{ fontSize: '.75em' }}>
                Please leave a detailed message on how you would like to partner with us, and we will get back to you as soon as we can!
              </Typography>
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
