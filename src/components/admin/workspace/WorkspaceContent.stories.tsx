import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import WorkspaceContent from './WorkspaceContent';
import { Workspace, UserRole, Product, ProductStatus } from '@@types/index';
import { defaultWorkspaceSetting } from '@@types/defaultValues';
import { adminWorkspacesAtom } from 'src/jotai/admin/atoms';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

const HydrateAtoms = ({ initialValues, children }: { initialValues: any; children: React.ReactNode }) => {
  useHydrateAtoms(initialValues);
  return <>{children}</>;
};

const JotaiWrapper = ({ children, workspaces }: { children: React.ReactNode; workspaces: Workspace[] }) => (
  <Provider>
    <HydrateAtoms initialValues={[[adminWorkspacesAtom, workspaces]]}>{children}</HydrateAtoms>
  </Provider>
);

const meta: Meta<typeof WorkspaceContent> = {
  title: 'Admin/Workspace/WorkspaceContent',
  component: WorkspaceContent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story, { args }) => (
      <BrowserRouter>
        <JotaiWrapper workspaces={args.workspaces}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', maxWidth: '1200px' }}>
            <Story />
          </div>
        </JotaiWrapper>
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkspaceContent>;

const createMockProducts = (count: number): Product[] => {
  return Array(count)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: `메뉴 ${index + 1}`,
      description: `메뉴 ${index + 1}에 대한 설명입니다`,
      price: 10000 + index * 1000,
      status: ProductStatus.SELLING,
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

export const Default: Story = {
  args: {
    workspaces: [createMockWorkspace(1, '스테이크 가게', '맛있는', 2)],
  },
};

export const Multiple: Story = {
  args: {
    workspaces: [
      createMockWorkspace(1, '스테이크 가게', '맛있는', 2),
      createMockWorkspace(2, '파스타 가게', '신선한', 5),
      createMockWorkspace(3, '한식당', '정갈한', 8),
    ],
  },
};

export const LongText: Story = {
  args: {
    workspaces: [
      createMockWorkspace(1, '정말로 긴 이름을 가진 레스토랑 스테이크 파스타 피자 다 있는 곳', '매우 긴 설명이 필요한 가게 정말로 긴 설명입니다', 20),
    ],
  },
};
