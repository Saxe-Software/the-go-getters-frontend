import type { NextPage } from 'next';

const Custom404: NextPage = () => {
  return (
    <div id='custom404'>
      <div>Looks like the page you are looking for doesn't exist</div>
      <a href='/'>Go home</a>
    </div>
  );
};

export default Custom404;
