const mockInsert = async (data: Record<string, unknown>) => {
  console.log('[mock] song_requests insert:', data);
  await new Promise(res => setTimeout(res, 1200));
  return { error: null };
};

export const supabase = {
  from: (_table: string) => ({
    insert: (data: Record<string, unknown>) => mockInsert(data),
  }),
};
