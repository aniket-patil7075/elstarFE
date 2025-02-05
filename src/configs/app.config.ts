export type AppConfig = {
  apiPrefix: string;
  authenticatedEntryPath: string;
  unAuthenticatedEntryPath: string;
  tourPath: string;
  locale: string;
  enableMock: boolean;
  superAdminEntryPath: string;
  dealerEntryPath: string;
  API_BASE_URL: string;
};

const appConfig: AppConfig = {
  apiPrefix: "/elstar-local",
  authenticatedEntryPath: "/",
  unAuthenticatedEntryPath: "/sign-in",
  tourPath: "/",
  locale: "en",
  enableMock: false,
  superAdminEntryPath: "/super-admin/home",
  dealerEntryPath: "/dealer/home",
  API_BASE_URL : 'https://testapi.247automotive.services',
  // API_BASE_URL: "http://localhost:1024",
};

export default appConfig;
