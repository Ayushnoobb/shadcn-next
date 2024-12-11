export const collectionToOptions = (data: Record<string, string>[]) => {
    return data
      ? data?.length > 0 && data.map((item) => ({
        value: item?.id?.toString() ? item?.id?.toString() : item?.idx,
        label: item?.title ? item.title : item?.name,
      }))
      : [];
};

export const objectToOptions = (options: Record<string, string>): any[] => {
  return Object.entries(options).map(([value, label]) => ({
    value,
    label,
  }));
};