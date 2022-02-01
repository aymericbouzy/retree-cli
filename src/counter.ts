export default function counter(): () => string {
  let count = 0;
  return () => String(count++);
}
