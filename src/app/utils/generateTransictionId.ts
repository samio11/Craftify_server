export const generateTransictionId = () => {
  return `tran_${Date.now()}_${Math.random().toString(20).substring(2)}`;
};
