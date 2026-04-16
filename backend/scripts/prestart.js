const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const frontendDist = path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html');
const frontendDir = path.join(__dirname, '..', '..', 'frontend');

console.log('Prestart: current directory =', process.cwd());
console.log('Prestart: frontend directory =', frontendDir);
console.log('Prestart: frontend dist path =', frontendDist);

if (!fs.existsSync(frontendDist)) {
  console.log('Prestart: frontend dist missing, building frontend...');
  try {
    execSync('npm install --legacy-peer-deps', { cwd: frontendDir, stdio: 'inherit' });
    execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });
    console.log('Prestart: frontend build complete.');
  } catch (error) {
    console.error('Prestart: frontend build failed!');
    console.error(error.stdout ? error.stdout.toString() : 'no stdout');
    console.error(error.stderr ? error.stderr.toString() : 'no stderr');
    console.error(error.stack || error.message);
    process.exit(1);
  }
} else {
  console.log('Prestart: frontend dist exists, skipping build.');
}
