export default function(info: Error | Buffer | string): void {
  console.error(info);
  process.exit(2);
}
