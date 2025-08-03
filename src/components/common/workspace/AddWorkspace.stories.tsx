import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import AddWorkspace from './AddWorkspace';
import { Workspace, UserRole, Product } from '@@types/index';
import { defaultWorkspaceSetting } from '@@types/defaultValues';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { adminWorkspacesAtom } from 'src/jotai/admin/atoms';

const HydrateAtoms = ({ initialValues, children }: { initialValues: any; children: React.ReactNode }) => {
  useHydrateAtoms(initialValues);
  return <>{children}</>;
};

const JotaiWrapper = ({ children, workspaces }: { children: React.ReactNode; workspaces: Workspace[] }) => (
  <Provider>
    <HydrateAtoms initialValues={[[adminWorkspacesAtom, workspaces]]}>{children}</HydrateAtoms>
  </Provider>
);

const meta: Meta<typeof AddWorkspace> = {
  title: 'Common/Workspace/AddWorkspace',
  component: AddWorkspace,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story, { args }) => (
      <BrowserRouter>
        <JotaiWrapper workspaces={args.workspaces}>
          <Story />
        </JotaiWrapper>
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AddWorkspace>;

const createMockProducts = (count: number): Product[] => {
  return Array(count)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: `메뉴 ${index + 1}`,
      description: `메뉴 ${index + 1}에 대한 설명입니다`,
      price: 10000 + index * 1000,
      isSellable: true,
      imageUrl: 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      productCategory: {
        id: 1,
        name: '카테고리',
        index: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }));
};

const createMockWorkspace = (id: number, name: string, description: string, productCount: number): Workspace => ({
  id,
  name,
  description,
  products: createMockProducts(productCount),
  productCategories: [
    {
      id: 1,
      name: '카테고리',
      index: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  images: [
    {
      id: 1,
      url: 'https://via.placeholder.com/300',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  notice: '공지사항입니다.',
  tableCount: 10,
  workspaceSetting: defaultWorkspaceSetting,
  owner: {
    id: 1,
    name: '테스트 사용자',
    email: 'test@example.com',
    role: UserRole.ADMIN,
    account: null,
    accountUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const Available: Story = {
  args: {
    workspaces: [createMockWorkspace(1, '스테이크 가게', '맛있는', 2)],
  },
};
