export const collectionToOptions = (data: Record<string, string>[]) => {
    return data
      ? data.map((item) => ({
        value: item?.id?.toString() ? item?.id?.toString() : item?.idx,
        label: item?.title ? item.title : item?.name,
      }))
      : [];
  };