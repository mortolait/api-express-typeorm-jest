module.exports = async () => {
    const connection = global.testDataSource;
    if (connection && connection.isInitialized) {
      await connection.destroy();
    }
  };
  