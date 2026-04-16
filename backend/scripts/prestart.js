const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const frontendDist = path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html');
const frontendDir = path.join(__dirname, '..', '..', 'frontend');

if (!fs.existsSync(frontendDist)) {
  console.log('Prestart: frontend dist missing, building frontend...');
  execSync('npm install --legacy-peer-deps', { cwd: frontendDir, stdio: 'inherit' });
  execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });
  console.log('Prestart: frontend build complete.');
} else {
  console.log('Prestart: frontend dist exists, skipping build.');
}
