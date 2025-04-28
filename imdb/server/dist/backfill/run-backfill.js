"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const script_1 = require("./script");
console.log('Starting backfill process...');
(0, script_1.backfillData)()
    .then(() => {
    console.log('Backfill completed successfully');
    process.exit(0);
})
    .catch((error) => {
    console.error('Backfill failed:', error);
    process.exit(1);
});
