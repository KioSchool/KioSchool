const COMPONENT_RETURN = 'FunctionDeclaration[id.name=/^[A-Z]/] ReturnStatement:not(:function :function ReturnStatement)';

const restrictedSyntax = {
  ternaryWithNullish: {
    selector: "ConditionalExpression[consequent.operator='??'], ConditionalExpression[alternate.operator='??']",
    message: '삼항식 안에 ??를 섞지 않는다. 기본값을 먼저 중간 변수에 담거나 guard 절 함수로 푼다.',
  },
  ternaryWithOr: {
    selector: "ConditionalExpression[consequent.operator='||'], ConditionalExpression[alternate.operator='||']",
    message: '삼항식 안에 ||를 섞지 않는다. 조건을 이름 있는 중간 변수로 빼거나 guard 절 함수로 푼다.',
  },
  topLevelFragment: {
    selector: `${COMPONENT_RETURN} > JSXFragment`,
    message:
      '컴포넌트가 반환하는 JSX(early return 포함)는 Styled 컴포넌트로 감싼다. 스타일이 없으면 const Container = styled.div`` 처럼 빈 styled 컴포넌트를 쓴다.',
  },
  topLevelHtmlTag: {
    selector: `${COMPONENT_RETURN} > JSXElement > JSXOpeningElement > JSXIdentifier[name=/^[a-z]/]`,
    message: '컴포넌트가 반환하는 JSX(early return 포함)의 맨 바깥에 HTML 태그를 바로 쓰지 않는다. 같은 태그의 Styled 컴포넌트(styled.div 등)로 바꾼다.',
  },
  styledPrefix: {
    selector: 'VariableDeclarator[id.name=/^Styled[A-Z]/]',
    message: 'Styled 접두사는 공통 컴포넌트(src/components/common)에서만 쓴다. 역할이 드러나는 이름(Container, Title 등)으로 바꾼다.',
  },
};

const COMMON_COMPONENT_PATH = 'src/components/common/';
const SVG_RESOURCE_PATH = 'src/resources/svg/';

const syntaxFor = (file, exempt = []) => {
  const skipped = new Set(exempt);
  if (file.startsWith(COMMON_COMPONENT_PATH)) skipped.add('styledPrefix');
  if (file.startsWith(SVG_RESOURCE_PATH)) skipped.add('topLevelHtmlTag');
  return Object.entries(restrictedSyntax)
    .filter(([key]) => !skipped.has(key))
    .map(([, rule]) => rule);
};

const LEGACY_VIOLATIONS = {
  'src/App.tsx': ['topLevelFragment'],
  'src/components/admin/order/statistic/HourlySalesChart.tsx': ['topLevelFragment'],
  'src/components/admin/order/table-manage/detail/TableDetailPanel.tsx': ['topLevelFragment'],
  'src/components/admin/order/table-manage/detail/TableOrderCard.tsx': ['topLevelFragment'],
  'src/components/admin/product-category/CategoryDraggableContents.tsx': ['topLevelFragment'],
  'src/components/admin/product/SelectWithProductStatus.tsx': ['local-rules/style-motion-values-only'],
  'src/components/admin/workspace/dashboard/InsightCard.tsx': ['react/no-multi-comp'],
  'src/components/common/button/ImageRouteButton.tsx': ['local-rules/style-motion-values-only', 'appLabel'],
  'src/components/common/container/PreviewContainer.tsx': ['appLabel'],
  'src/components/common/date-picker/CustomDatePicker.tsx': ['react/no-multi-comp', 'react/function-component-definition'],
  'src/components/common/input/NewAppInputLayout.tsx': ['local-rules/style-motion-values-only'],
  'src/components/common/nav/MobileNav.tsx': ['topLevelFragment'],
  'src/components/common/nav/NavBar.tsx': ['topLevelFragment'],
  'src/components/common/nav/TitleNavBar.tsx': ['local-rules/style-motion-values-only', 'appLabel'],
  'src/components/common/test/SentryTestPage.tsx': ['local-rules/style-motion-values-only', 'react/no-multi-comp', 'react/function-component-definition'],
  'src/components/super-admin/bank/SuperAdminBankContent.tsx': ['local-rules/style-motion-values-only'],
  'src/components/super-admin/dashboard/DailyChartSection.tsx': ['react/no-multi-comp'],
  'src/components/super-admin/dashboard/OnboardingTimeSection.tsx': ['react/no-multi-comp'],
  'src/components/super-admin/festival-calendar/FestivalDayDetail.tsx': ['topLevelFragment'],
  'src/components/super-admin/festival-calendar/FestivalUniversityTable.tsx': ['react/no-multi-comp', 'topLevelHtmlTag'],
  'src/components/super-admin/festival-calendar/FestivalWorkspaceRankingTable.tsx': ['react/no-multi-comp', 'topLevelHtmlTag'],
  'src/components/user/AuthenticationButton.tsx': ['topLevelFragment'],
  'src/components/user/home/CountUpNumber.tsx': ['react/forbid-dom-props', 'local-rules/style-motion-values-only'],
  'src/components/user/home/CtaSection.tsx': ['local-rules/style-motion-values-only'],
  'src/components/user/home/hero/HeroSection.tsx': ['local-rules/style-motion-values-only'],
  'src/components/user/info/InfoCaseStudiesSection.tsx': ['local-rules/style-motion-values-only'],
  'src/components/user/info/InfoFaqSection.tsx': ['react/no-multi-comp', 'local-rules/style-motion-values-only'],
  'src/components/user/info/InfoFeaturesSection.tsx': ['local-rules/style-motion-values-only'],
  'src/components/user/info/InfoHowToUseSection.tsx': ['local-rules/style-motion-values-only'],
  'src/components/user/info/InfoTeamSection.tsx': ['local-rules/style-motion-values-only'],
  'src/components/user/info/InfoVisionSection.tsx': ['local-rules/style-motion-values-only'],
  'src/hooks/useInputConfirm.tsx': ['local-rules/style-motion-values-only', 'react/function-component-definition', 'appLabel'],
  'src/pages/user/Register.tsx': ['local-rules/style-motion-values-only'],
  'src/pages/user/ResetPassword.tsx': ['local-rules/style-motion-values-only'],
};

const restrictedImportPatterns = {
  srcPath: { group: ['src/*'], message: 'src/ 경로로 부르지 않는다. @components, @utils 같은 @ 별칭을 쓴다.' },
  parentPath: {
    group: ['../*', '../**'],
    message: '상위 폴더는 상대 경로로 부르지 않는다. @ 별칭을 쓴다. 상대 경로는 같은 폴더(./)에서만 쓴다.',
  },
  appLabel: { group: ['**/AppLabel'], message: 'AppLabel은 새로 쓰지 않는다.' },
};

const importPatternsFor = (exempt = []) =>
  Object.entries(restrictedImportPatterns)
    .filter(([key]) => !exempt.includes(key))
    .map(([, pattern]) => pattern);

const legacyOverrides = Object.entries(LEGACY_VIOLATIONS).map(([file, exempt]) => ({
  files: [file],
  rules: {
    'no-restricted-syntax': ['error', ...syntaxFor(file, exempt)],
    'no-restricted-imports': ['error', { patterns: importPatternsFor(exempt) }],
    ...Object.fromEntries(exempt.filter((key) => key.includes('/')).map((rule) => [rule, 'off'])),
  },
}));

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.app.json'],
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['plugin:import/recommended', 'airbnb-typescript', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['import', 'prettier', 'react', 'react-hooks', 'local-rules'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.stories.tsx', '**/*.test.{ts,tsx}', '**/setupTests.ts', '.storybook/**'],
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react/function-component-definition': ['error', { namedComponents: 'function-declaration', unnamedComponents: 'arrow-function' }],
    'react/no-multi-comp': ['error', { ignoreStateless: false }],
    'react/forbid-dom-props': [
      'error',
      {
        forbid: [{ propName: 'style', message: 'inline style을 쓰지 않는다. 스타일은 Styled 컴포넌트에 두고, 값이 바뀌면 props로 넘긴다.' }],
      },
    ],
    'local-rules/style-motion-values-only': 'error',
    'no-nested-ternary': 'error',
    'no-restricted-imports': ['error', { patterns: importPatternsFor() }],
    'no-restricted-syntax': ['error', ...syntaxFor('')],
  },
  overrides: [
    {
      files: [`${COMMON_COMPONENT_PATH}**`],
      rules: {
        'no-restricted-syntax': ['error', ...syntaxFor(COMMON_COMPONENT_PATH)],
      },
    },
    {
      files: [`${SVG_RESOURCE_PATH}**`],
      rules: {
        'no-restricted-syntax': ['error', ...syntaxFor(SVG_RESOURCE_PATH)],
      },
    },
    ...legacyOverrides,
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
        'react/function-component-definition': 'off',
        'react/no-multi-comp': 'off',
        'react/forbid-dom-props': 'off',
        'local-rules/style-motion-values-only': 'off',
        'no-restricted-syntax': 'off',
      },
    },
  ],
};
