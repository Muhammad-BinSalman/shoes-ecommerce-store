const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

try {
    if (fs.existsSync(envPath)) {
        console.log('.env.local exists.');
        const content = fs.readFileSync(envPath, 'utf8');
        const lines = content.split('\n');
        let hasUser = false;
        let hasPass = false;

        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('GMAIL_USER=')) hasUser = true;
            if (trimmed.startsWith('GMAIL_PASS=')) hasPass = true;
        });

        console.log(`GMAIL_USER present: ${hasUser}`);
        console.log(`GMAIL_PASS present: ${hasPass}`);

        if (!hasUser || !hasPass) {
            console.log('Error: One or more required environment variables are missing in .env.local');
        } else {
            console.log('Environment variables seem to be present in .env.local');
        }
    } else {
        console.log('.env.local does NOT exist.');
    }
} catch (err) {
    console.error('Error reading .env.local:', err);
}
