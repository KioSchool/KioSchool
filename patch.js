const fs = require('fs');
const content = fs.readFileSync('src/components/common/container/AppContainer.tsx', 'utf8');
const replaced = content.replace(
  /const isAdminHome = location\.pathname === '\/admin';\s*const title = isAdminHome \? '키오스쿨' : workspace\.name;\s*const label = isAdminHome \? `\$\{workspace\.owner\.name\}님 환영합니다\.` : getPageTitle\(location\.pathname\);/,
  `const isAdminHome = location.pathname === '/admin';
  const isSuperAdmin = location.pathname.startsWith('/super-admin');
  const title = isSuperAdmin ? '슈퍼 어드민' : isAdminHome ? '키오스쿨' : workspace.name;
  const label = isSuperAdmin ? getPageTitle(location.pathname) : isAdminHome ? \`\${workspace.owner.name}님 환영합니다.\` : getPageTitle(location.pathname);`
);
fs.writeFileSync('src/components/common/container/AppContainer.tsx', replaced);
