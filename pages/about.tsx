import { Typography } from '@mui/material';
import PageSection from '../components/PageSection';
import Head from 'next/head';

export default function About() {
    return (
        <>
            <Head>
                <title>About | The Go Getters</title>
            </Head>

            <div id='about'>
                <PageSection>
                    <Typography variant='h2' component='h1'>
                        About us
                    </Typography>
                    <div id='imageWrapper'>
                        <img src='/at-table-with-flag.jpg' alt='The Go Getters' />
                    </div>

                    <PageSection title='The Go Getters' maxContentWidth='1000px' className='aboutPageSection'>
                        <p>
                            Here at &quot;The Go Getters Podcast&quot; our objective is to take a deep dive into conversation head on and hit an array of topics featuring Mindset, Business, Athletics, World topics, Life stories or anything from
                            intellectual to idiotic conversations with friends and Guests. Hosts Kevin Kaskey & Darrian Tyson are primarily joined by small to big time entrepreneurs, artists, creatives, athletes or anyone we feel are &quot;Go
                            Getters&quot;
                        </p>
                    </PageSection>

                    <PageSection title='Kevin Kaskey' maxContentWidth='1000px' className='aboutPageSection'>
                        <p>
                            Hello everyone, I&apos;m Kevin. I&apos;m a 21 year old kid with a dream from Wilkes-Barre PA! I have a Passion for Podcasting, Entertaining, Business, Fitness, Personal Development, Gaming the list goes on & on. I started
                            this venture as a form of creative expression for myself & with hunger to give the world more than I have taken from it. I hope you stick around & enjoy this wild ride! To the Moon!
                        </p>
                    </PageSection>

                    <PageSection title='Darrian Tyson' maxContentWidth='1000px' className='aboutPageSection'>
                        <p>
                            Hello people, I am Darrian Tyson, a 22 year old young man from Wilkes-Barre, Pennsylvania. I&apos;d say I have many interests that include Fitness, Learning, and Travel. This Podcast to me is a great opportunity to
                            simultaneously express myself and learn more about myself, while also getting the chance to sit down with some of the world&apos;s most fascinating people, all while being able to connect with my beloved community and the
                            rest of the world. Like they say it&apos;s not about the destination, but the journey. So cheers to the unknown. Stay Hard.
                        </p>
                    </PageSection>
                </PageSection>
            </div>
        </>
    );
}
