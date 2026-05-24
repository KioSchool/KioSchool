import { Location } from 'react-router-dom';

export interface Order {
  tableNumber: number;
  phoneNumber: string;
  customerName: string;
  orderProducts: Array<OrderProduct>;
  totalPrice: number;
  status: OrderStatus;
  cancelReason: string;
  orderNumber: number;
  orderSession: OrderSession | null;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProductBase {
  productId: number;
  quantity: number;
  productPrice: number;
}

export interface OrderWebsocket {
  type: 'CREATED' | 'UPDATED';
  data: Order;
}

export const GHOST_TYPE = {
  NONE: 'NONE',
  USER: 'USER',
  BATCH: 'BATCH',
} as const;
export type GhostType = typeof GHOST_TYPE[keyof typeof GHOST_TYPE];

export interface OrderSession {
  expectedEndAt: string;
  endAt: string | null;
  tableNumber: number;
  usageTime: number;
  totalOrderPrice: number;
  orderCount: number;
  ghostType: GhostType;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderSessionWithOrder extends OrderSession {
  orders: Array<Order>;
  customerName: string;
}

export interface OrderProduct extends OrderProductBase {
  productName: string;
  isServed: boolean;
  servedCount: number;
  totalPrice: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export enum ProductStatus {
  SELLING = 'SELLING',
  SOLD_OUT = 'SOLD_OUT',
  HIDDEN = 'HIDDEN',
}

export interface Product {
  name: string;
  description: string;
  price: number;
  status: ProductStatus;
  imageUrl: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  productCategory: ProductCategory | null;
}

export interface ProductCategory {
  id: number;
  name: string;
  index: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductAddedImage extends Product {
  image: {};
}
export type ProductEdit = Omit<ProductAddedImage, 'createdAt' | 'updatedAt' | 'imageUrl'>;

export interface ProductStateType {
  name: string;
  description: string;
  price: number;
  productId?: string;
  workspaceId: string | undefined;
  productCategoryId: string | number;
}

export interface ProductActionType {
  type: string;
  payload: any;
}

export interface Workspace {
  name: string;
  description: string;
  owner: User;
  products: Array<Product>;
  productCategories: Array<ProductCategory>;
  images: Array<WorkspaceImage>;
  notice: string;
  tableCount: number;
  isOnboarding: boolean;
  workspaceSetting: WorkspaceSetting;
  id: number;
  createdAt: string;
  updatedAt: string;
  memo: string;
}

export interface WorkspaceImage {
  url: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceSetting {
  useOrderSessionTimeLimit: boolean;
  orderSessionTimeLimitMinutes: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PaginationResponse<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  sort: Sort;
  first: boolean;
  empty: boolean;
}

export enum OrderStatus {
  PAID = 'PAID',
  SERVED = 'SERVED',
  CANCELLED = 'CANCELLED',
  NOT_PAID = 'NOT_PAID',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface User {
  name: string;
  email: string;
  role: UserRole;
  account: Account | null;
  accountUrl: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  bank: Bank;
  accountNumber: string;
  accountHolder: string;
  tossAccountUrl: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Bank {
  name: string;
  code: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmailDomain {
  name: string;
  domain: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Table {
  tableNumber: number;
  tableHash: string;
  orderSession: OrderSession | null;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export const RIGHT_SIDEBAR_ACTION = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
} as const;

export type RightSidebarAction = typeof RIGHT_SIDEBAR_ACTION[keyof typeof RIGHT_SIDEBAR_ACTION];

interface OpenSidebarOptions {
  action: typeof RIGHT_SIDEBAR_ACTION.OPEN;
  location: Location;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

interface CloseSidebarOptions {
  action: typeof RIGHT_SIDEBAR_ACTION.CLOSE;
  location?: never;
  title?: never;
  subtitle?: never;
  content?: never;
}

export type ExternalRightSidebarOptions = OpenSidebarOptions | CloseSidebarOptions;

export type ButtonSize = 'xs' | 'sm' | 'md';
export type ButtonColor = 'kio_orange' | 'blue_gray';

export interface DashboardWorkspace {
  name: string;
  notice: string;
  memo: string;
  occupiedTables: number;
  totalTables: number;
}

export interface DashboardStats {
  totalSales: number;
  totalOrderCount: number;
  averageOrderAmount: number;
}

export interface TopSellingProduct {
  product: Product;
  totalQuantity: number;
}

export interface DashboardResponse {
  dashboardWorkspaceInfo: DashboardWorkspace;
  stats: DashboardStats;
  topSellingProducts: TopSellingProduct[];
  recentOrders: Order[];
  outOfStockProducts: Product[];
}

export interface PreviousDayComparison {
  revenueGrowthRate: number;
  orderCountDifference: number;
}

export interface HourlySales {
  hour: number;
  orderCount: number;
  revenue: number;
}

export interface PopularProductItem {
  productId: number;
  name: string;
  value: number;
}

export interface PopularProducts {
  byQuantity: PopularProductItem[];
  byReorderRate: PopularProductItem[];
  byRevenue: PopularProductItem[];
}

export interface DailyStatistics {
  referenceDate: string;
  totalSalesVolume: number;
  totalRevenue: number;
  averageOrderAmount: number;
  totalOrders: number;
  averageOrdersPerTable: number;
  tableTurnoverRate: number;
  averageStayTimeMinutes: number;
  previousDayComparison: PreviousDayComparison | null;
  salesByHour: HourlySales[];
  popularProducts: PopularProducts;
  isRealTime: boolean;
  lastUpdated: string;
}

// Super Admin 전용 타입
export interface UserStats {
  total: number;
  newLast7Days: number;
  newLast30Days: number;
}

export interface WorkspaceStats {
  total: number;
  newLast7Days: number;
  newLast30Days: number;
  onboardingCompletionRate: number;
}

export interface RevenueStats {
  totalRevenueAllTime: number;
  totalOrdersAllTime: number;
  totalRevenueLast30Days: number;
  totalOrdersLast30Days: number;
}

export interface DailyPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface WorkspaceRankItem {
  workspaceId: number;
  workspaceName: string;
  revenue: number;
  orders: number;
}

export interface DashboardFunnel {
  totalUsers: number;
  workspacesCreated: number;
  onboardingCompleted: number;
  hadFirstOrder: number;
}

export interface OnboardingDistributionBucket {
  label: string;
  count: number;
}

export interface OnboardingTimeStats {
  averageMinutes: number;
  medianMinutes: number;
  neverCreatedCount: number;
  distribution: OnboardingDistributionBucket[];
}

export interface DashboardInsights {
  dailyLast30Days: DailyPoint[];
  activeWorkspacesLast7Days: number;
  activeWorkspacesLast30Days: number;
  averageOrderValue: number;
  cancelledOrdersLast30Days: number;
  totalOrdersForCancelRate: number;
  topWorkspaces: WorkspaceRankItem[];
  funnel: DashboardFunnel;
  onboardingTimeStats: OnboardingTimeStats;
}

export interface SuperAdminDashboard {
  users: UserStats;
  workspaces: WorkspaceStats;
  revenue: RevenueStats;
  insights: DashboardInsights;
}

export interface WorkspaceAdminDetail {
  id: number;
  name: string;
  owner: User;
  description: string;
  notice: string;
  memo: string;
  tableCount: number;
  memberCount: number;
  productCount: number;
  isOnboarding: boolean;
  workspaceSetting: WorkspaceSetting;
  createdAt: string;
  updatedAt: string;
}

export interface SuperAdminOrder {
  id: number;
  workspaceId: number;
  workspaceName: string;
  tableNumber: number;
  customerName: string;
  orderProducts: Array<OrderProduct>;
  totalPrice: number;
  status: OrderStatus;
  orderNumber: number;
  createdAt: string;
  updatedAt: string;
}

export interface AccountConnectionStatus {
  totalUsers: number;
  usersWithAccount: number;
  usersWithoutAccount: number;
  connectionRate: number;
  usersWithToss: number;
  tossRateOfTotal: number;
  tossRateOfAccount: number;
}

export interface OrdersFilter {
  workspaceId: string;
  statuses: OrderStatus[];
  startDate: string;
  endDate: string;
}

export type CardTemplate = 'SINGLE_TROPHY' | 'STORY_NUMBERS' | 'MILESTONE';

export interface CardPayload {
  totalRevenue?: number;
  totalOrders?: number;
  averageOrderAmount?: number;
  tableCount?: number;
  averageStayMinutes?: number;
  cohortAverageRatio?: number;
  absoluteValue?: number;
  milestoneStep?: number;
}

export interface MetricSummary {
  key: string;
  label: string;
  value: string;
  percentile: number | null;
  milestoneStep: number | null;
  rank: number;
  highlighted: boolean;
}

export interface InsightCardResponse {
  referenceDate: string;
  template: CardTemplate;
  bestMetricKey: string | null;
  bestMetricPercentile: number | null;
  headline: string;
  payload: CardPayload;
  topMetrics: MetricSummary[];
}

export interface FestivalWorkspace {
  statisticId: number;
  workspaceId: number;
  workspaceName: string;
  universityName: string;
  totalOrders: number;
  totalRevenue: number;
  averageOrderAmount: number;
  tableTurnoverRate: number;
  averageStayTimeMinutes: number;
  peakHour: number | null;
  excluded: boolean;
}

export interface FestivalMonthSummary {
  totalFestivalDays: number;
  uniqueUniversities: number;
  totalOrders: number;
  totalRevenue: number;
  busiestDay: string | null;
}

export interface FestivalUniversityStats {
  universityName: string;
  festivalDays: number;
  totalOrders: number;
  totalRevenue: number;
}

export interface FestivalWorkspaceRankItem {
  workspaceId: number;
  workspaceName: string;
  universityName: string;
  festivalDays: number;
  totalOrders: number;
  totalRevenue: number;
  averageOrderAmount: number;
}

export interface FestivalCalendar {
  monthSummary: FestivalMonthSummary;
  universityBreakdown: FestivalUniversityStats[];
  workspaceRanking: FestivalWorkspaceRankItem[];
  calendar: Record<string, FestivalWorkspace[]>;
}
