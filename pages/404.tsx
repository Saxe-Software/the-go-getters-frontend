import Link from 'next/link';

export default function Custom404() {
  return (
    <div id='custom404'>
      <div>Looks like the page you are looking for doesn&apos;t exist</div>
      <Link href='/'>Go home</Link>
    </div>
  );
}
