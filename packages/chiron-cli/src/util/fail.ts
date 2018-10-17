export default function(info: Error | Buffer | string) {
  console.error(info);
  process.exit(1);
}
