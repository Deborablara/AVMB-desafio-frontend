
const token = '274O5Td6rsR5QypP2huHk2OOJfr1FyeQ79p1tt3JCiIoH93GbnkwxF6S60yFQoZwYCzUwZVb-Lk9KvOx1EDnvfIQZw686hf3vJDivb0AfaXOgxUbp8n8vx6mYP1+0CEQmCzH+qStiAw8ZoKtUkawRanFROFIMGxC';

export const formatApiData = (data?: unknown) => {
  return {
    token: token,
    params: { ...data },
  }
};
