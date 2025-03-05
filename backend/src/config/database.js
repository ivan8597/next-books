export const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'postgres',
  database: process.env.DB_NAME || 'book_db',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
};

export const getConfig = () => {
  return process.env.NODE_ENV === 'test' ? dbConfig.test : dbConfig.development;
}; 