import { backfillData } from './script';

console.log('Starting backfill process...');

backfillData()
  .then(() => {
    console.log('Backfill completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Backfill failed:', error);
    process.exit(1);
  }); 