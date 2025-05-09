import ProductCard from '@components/admin/product/ProductCard';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Components/Admin/Product/ProductCard',
  component: ProductCard,
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <div style={{ width: '100%', height: '100vh', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  argTypes: {
    product: { control: 'object' },
    onClick: { control: 'function' },
  },
};

export default meta;

export const Basic = {
  args: {
    product: {
      name: 'test',
      description: 'test description',
      price: 10000,
      isSellable: true,
      imageUrl: 'https://www.lowcarbcanada.ca/cdn/shop/products/Impastable_Penne_82136a7a-d0bb-47bc-9ab9-8f8f076b85a2_600x.jpg?v=1729450547',
      id: 1,
    },
    onClick: () => alert('Product clicked!'),
  },
};

export const Unsellable = {
  args: {
    product: {
      name: 'test',
      description: 'test description',
      price: 10000,
      isSellable: false,
      imageUrl: 'https://www.lowcarbcanada.ca/cdn/shop/products/Impastable_Penne_82136a7a-d0bb-47bc-9ab9-8f8f076b85a2_600x.jpg?v=1729450547',
      id: 1,
    },
    onClick: () => alert('Product clicked!'),
  },
};
